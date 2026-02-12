#!/usr/bin/env node

/**
 * Unit tests for the no-consecutive-headings custom markdownlint rule.
 * Uses Node.js built-in assert module - no external dependencies required.
 * 
 * Run with: node lint-config/no-consecutive-headings.test.js
 */

const assert = require("assert");
const noConsecutiveHeadings = require("./no-consecutive-headings");

// Helper to create mock params for the rule
function createMockParams(content) {
    const lines = content.split("\n");
    const tokens = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineNumber = i + 1;

        const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
        if (headingMatch) {
            const level = headingMatch[1].length;
            tokens.push({ type: "heading_open", tag: `h${level}`, lineNumber });
            tokens.push({ type: "inline", content: headingMatch[2], lineNumber });
            tokens.push({ type: "heading_close", tag: `h${level}`, lineNumber });
        } else if (line.trim().startsWith("```")) {
            tokens.push({ type: "fence", lineNumber });
        } else if (line.trim().startsWith(">")) {
            tokens.push({ type: "blockquote_open", lineNumber });
        } else if (line.trim().startsWith("-") || line.trim().startsWith("*")) {
            tokens.push({ type: "bullet_list_open", lineNumber });
        } else if (line.trim() !== "") {
            tokens.push({ type: "paragraph_open", lineNumber });
            tokens.push({ type: "inline", content: line, lineNumber });
            tokens.push({ type: "paragraph_close", lineNumber });
        }
    }

    return { tokens, lines };
}

// Helper to run the rule and collect errors
function lintContent(content) {
    const params = createMockParams(content);
    const errors = [];
    noConsecutiveHeadings.function(params, (error) => errors.push(error));
    return errors;
}

// Test runner
let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`  ✓ ${name}`);
        passed++;
    } catch (error) {
        console.log(`  ✗ ${name}`);
        console.log(`    ${error.message}`);
        failed++;
    }
}

function describe(name, fn) {
    console.log(`\n${name}`);
    fn();
}

// Tests
console.log("Running tests for no-consecutive-headings rule...\n");

describe("Rule metadata", () => {
    test("has correct name", () => {
        assert.ok(noConsecutiveHeadings.names.includes("no-consecutive-headings"));
    });

    test("has description", () => {
        assert.strictEqual(noConsecutiveHeadings.description, "Disallow consecutive headings");
    });

    test("has headings tag", () => {
        assert.ok(noConsecutiveHeadings.tags.includes("headings"));
    });

    test("has a function property", () => {
        assert.strictEqual(typeof noConsecutiveHeadings.function, "function");
    });
});

describe("Valid cases - should NOT report errors", () => {
    test("headings with paragraph content between them", () => {
        const content = `# Heading 1

This is some paragraph content.

## Heading 2

More content here.`;
        assert.strictEqual(lintContent(content).length, 0);
    });

    test("single heading only", () => {
        const content = `# Single Heading

Some content below.`;
        assert.strictEqual(lintContent(content).length, 0);
    });

    test("headings with code block between them", () => {
        const content = `# Heading 1

\`\`\`javascript
const x = 1;
\`\`\`

## Heading 2`;
        assert.strictEqual(lintContent(content).length, 0);
    });

    test("headings with list between them", () => {
        const content = `# Heading 1

- Item 1
- Item 2

## Heading 2`;
        assert.strictEqual(lintContent(content).length, 0);
    });

    test("headings with blockquote between them", () => {
        const content = `# Heading 1

> This is a quote.

## Heading 2`;
        assert.strictEqual(lintContent(content).length, 0);
    });
});

describe("Invalid cases - SHOULD report errors", () => {
    test("two consecutive headings without content", () => {
        const content = `# Heading 1

## Heading 2`;
        const errors = lintContent(content);
        assert.ok(errors.length > 0, "Should report at least one error");
        assert.strictEqual(errors[0].detail, "Consecutive headings are not allowed.");
    });

    test("three consecutive headings", () => {
        const content = `# Heading 1

## Heading 2

### Heading 3`;
        const errors = lintContent(content);
        assert.ok(errors.length >= 2, "Should report at least 2 errors");
    });

    test("consecutive headings at same level", () => {
        const content = `## Heading A

## Heading B`;
        assert.ok(lintContent(content).length > 0, "Should report error");
    });

    test("error contains correct line number", () => {
        const content = `# Heading 1

## Heading 2`;
        const errors = lintContent(content);
        assert.strictEqual(errors[0].lineNumber, 3);
    });

    test("error contains context", () => {
        const content = `# Heading 1

## Heading 2`;
        assert.ok(lintContent(content)[0].context !== undefined, "Should have context");
    });
});

describe("Edge cases", () => {
    test("empty document", () => {
        assert.strictEqual(lintContent("").length, 0);
    });

    test("document with no headings", () => {
        const content = `This is just some text.

And more text here.`;
        assert.strictEqual(lintContent(content).length, 0);
    });

    test("only blank lines between consecutive headings still reports error", () => {
        const content = `# Heading 1



## Heading 2`;
        assert.ok(lintContent(content).length > 0, "Should report error");
    });
});

// Summary
console.log(`\n${"=".repeat(50)}`);
console.log(`Tests: ${passed} passed, ${failed} failed`);
console.log(`${"=".repeat(50)}`);

process.exit(failed > 0 ? 1 : 0);
