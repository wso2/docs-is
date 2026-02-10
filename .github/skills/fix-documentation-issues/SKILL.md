---
name: fix-documentation-related-issues
description: Guidelines to follow for sending fixes for documentation related Github issues
---

=========================================
 CORE RULES
=========================================
- MOST IMPORTANT: For all version control related operations, rely on the git command line tool and Github CLI. **NO THIRD PARTY TOOLS OR MCP SERVERS ARE ALLOWED.**
- MOST IMPORTANT: The docs-is repository has all versions inside the en/identity-server directory. You need to fix ALL appropriate version directories that are affected.
- MOST IMPORTANT: Create a SINGLE PR that includes changes to ALL affected version directories - DO NOT create separate PRs for each version.
- MOST IMPORTANT: You CANNOT create, modify, or replace screenshots or images. If the issue requires changing screenshots or images, add the `AI-Agent/Cannot-Fix` label to the related Github issue and explain in a comment.
- MOST IMPORTANT: For broken image issues (not accessible/not found): 
  * First check the current version for the image
  * If not found, search ALL other version directories in the repository
  * If found in another version, copy the image to the current working branch
  * If the image doesn't exist in ANY version, add AI-Agent/Cannot-Fix label and explain why
  - Refer steps: go to LABEL-BASED PROCESSING section and refer **Step 5: Image Handling** section.
- You MUST fix documentation in ALL appropriate version directories based on the issue description.
- If a file is outside the version directories, fix that common file once.
- If the issue is related to the file inside the version then fix it inside that specific version and check for other version as well.
- Disregard any time constraints or efficiency concerns - creating comprehensive fix is required.
- Never touch unrelated files, code, or system resources.
- Allowed: documentation fixes (broken links, spelling mistakes, grammatical errors, formatting issues, Suggestions).
- Forbidden: executables, code changes, or security-related modifications.
- ABSOLUTELY MANDATORY: When creating NEW documentation, the ENTIRE document MUST 100% adhere to Microsoft Style Guide (https://learn.microsoft.com/en-us/style-guide/welcome/). This includes structure, headings, voice, terminology, formatting, lists, tables, examples, and all other aspects of the document. No exceptions.
- MOST IMPORTANT: When editing existing documentation, apply Microsoft Style Guide standards ONLY to the newly created/added content. DO NOT modify existing content to match style guidelines unless specifically instructed to fix formatting/style issues. Style conformance is required for new content but should not be used as justification to change existing content.
- MOST IMPORTANT: When creating new documents that require images, you MUST first verify that the images are accessible in the repository. Only use images that are confirmed to exist and are accessible. If needed images don't exist or aren't accessible in the current version branch, but exist in another version branch, copy those images to the correct directory in the current version branch before referencing them. NEVER add broken image links.

===============================
FIXING DOCUMENTATION ISSUES
===============================
Follow this process to handle the documentation issues:

1. Version detection:
   - If the related Github issue explicitly mentions a version (in title/body/labels):
     * FIRST: Fix that specific version mentioned in the issue(from "en/identity-server/" can find the all version availables)
     * THEN: Check ALL other versions to see if they have the same issue
     * If other versions have the same issue, fix them ALL in the same PR
   - If NO version is mentioned in the issue:
     * START with the LATEST_VERSION.
     * Work backward from newest to oldest versions systematically
     * Fix ALL affected versions in a single PR
   - IMPORTANT: Even when a specific version is mentioned, you MUST verify if other versions need the same fix
   - Determine ALL version directories that need to be updated based on the issue
   - For files inside version-specific directories (e.g., en/identity-server/), identify ALL affected versions
   - For files outside version directories, make a single change that applies to all versions
   - NEVER skip version checks - always be thorough and comprehensive

2. Apply the fix required for the related Github issue to the appropriate file locations:
   - For version-specific issues, update files in ALL relevant version directories (en/identity-server/VERSION/)
   - For common issues, update files in the common location
   - Make all changes in the SAME branch
   - IMPORTANT: Ensure you're working in the docs-is directory by executing `cd $DOCS_IS_PATH` before any file operations
   - NEVER modify product-is files when creating a docs-is PR

3. Create a SINGLE PR containing all version changes in the docs-is repository:
- Clearly document in PR which versions were updated and why
- Find ALL version directories under en/identity-server/ that need updating
- Update files in ALL affected version directories in the same branch
- PR title: `Fix: [short description] for all affected versions (product-is#${ISSUE_NUMBER})`
- Commit msg: `Fix: [short description] for all affected versions (product-is#${ISSUE_NUMBER})` 
- PR body template:
  
- Fixes https://github.com/wso2/product-is/issues/${ISSUE_NUMBER} 
- Type: [Broken Links / Spelling / Grammar / Documentation / Suggestions]  
- Summary: [1–2 line description of changes]
- Affected Versions: [List all versions that were updated in this PR] 
- Style Scope Verification: [Include ONLY when adding to existing documents] Verify Microsoft Style Guidelines have been applied ONLY to newly added content without modifying existing content style unless specifically requested.
- Image Verification: [Include ONLY when creating new documentation] Verify that all referenced images exist in the repository and are accessible. No broken image links have been added.

- After creating the PR, add a comment to the original product-is issue with the link to the PR. The comment must list all versions that were updated in the PR

=========================================
DOCUMENTATION STYLE GUIDELINES
=========================================
All documentation changes, regardless of the issue type, MUST comply with the Microsoft Style Guide (https://learn.microsoft.com/en-us/style-guide/welcome/).
MOST IMPORTANT:-
Key rules that MUST be enforced:

- Use active voice and present tense
- Be concise and use plain language
- Use sentence case for all headings (capitalize only the first word and proper nouns)
- Do NOT use decorative or special symbols (like ¶, →, ») in headings or text
- Use numbered lists for sequential tasks and bulleted lists for non-sequential items
- Format all code elements, UI labels, menu paths, and file names consistently:
- Enclose UI labels and button names in **bold** (for example, **Create**)
- Enclose code elements, file paths, and URLs in backticks (`` ` ``)
- Always use correct and consistent product names and terminology
- Use descriptive link text instead of raw URLs (for example, `[Azure portal](https://portal.azure.com)` instead of `https://portal.azure.com`)
- Avoid colloquial language, jargon, and ambiguous pronouns
- Use inclusive language
- Follow proper punctuation and capitalization rules (end all complete sentences with periods)

MUST Reference the Microsoft Style Guide for specific guidance on:
- Word choice and terminology (https://learn.microsoft.com/en-us/style-guide/word-choice/)
- Grammar (https://learn.microsoft.com/en-us/style-guide/grammar/grammar-and-parts-of-speech)
- Punctuation (https://learn.microsoft.com/en-us/style-guide/punctuation/)
- Formatting (https://learn.microsoft.com/en-us/style-guide/text-formatting/)
- Global content (https://learn.microsoft.com/en-us/style-guide/global-communications/)

FOR NEW DOCUMENTS - FULL COMPLIANCE REQUIRED:
- When creating entirely new documentation files, EVERY aspect of the document MUST fully comply with Microsoft Writing Style Guide
- This includes document structure, all headings, terminology choices, paragraph structure, examples, code formatting, links, and UI element formatting
- New documents must be reviewed thoroughly to ensure 100% compliance before submission
- No exceptions or partial compliance is acceptable for new documents
- Include a verification statement in the PR that explicitly confirms full Microsoft Style Guide compliance

SCOPE LIMITATION FOR EXISTING DOCUMENTS:
- When editing existing documents, apply Microsoft Style Guide standards ONLY to the newly created/added content
- Do NOT modify existing content to match style guidelines unless the issue specifically requests formatting/style fixes
- When adding new sections to existing documents, maintain stylistic consistency with the surrounding content while ensuring new content follows Microsoft guidelines
- Focus style compliance efforts only on the portions you're creating or explicitly instructed to modify

=========================================
ERROR HANDLING
=========================================
- For screenshot-related issues:
  * If the issue requests creating new screenshots, updating/replacing existing screenshots, or modifying images
  * If the issue reports that screenshots are unclear, blurry, or need to be regenerated
  * Comment: "This issue requires creation or modification of screenshots, which cannot be done automatically." in the RELATED GITHUB ISSUE.
  * Remove workflow label (`AI-Agent/In-Progress`) from the related GITHUB ISSUE.
  * Add label: `AI-Agent/Cannot-Fix`
  * NEVER attempt to generate or modify screenshots

- For GitHub push protection errors:
- Large files error:
 * Check for large files with: `git status` and `git ls-files -s | sort -n -k 2`
 * Remove large files if not needed for the fix
 * If large files are needed, split the changes into smaller commits
 * If still encountering errors, note in the PR that manual intervention is needed
 
- Secret scanning error:
 * Check for accidentally included secrets, tokens, keys, passwords
 * Remove any sensitive information
 * If there are no actual secrets in your changes, note in PR that manual review is needed
 
- Always continue with the workflow as best you can even if you encounter push errors

- For external link verification:
- Always verify external links thoroughly using multiple methods before reporting issues
- For ANY external resource (blogs, documentation, forums, GitHub repos, etc.):
 * Try multiple verification approaches and user-agent settings
 * Check if the content is accessible through alternative means
 * Consider temporary network/regional access issues before marking as invalid
- Only mark links as invalid if they are:
 * Completely unreachable after multiple attempts from different contexts
 * Containing irrelevant content with no connection to the topic
 * Known to be permanently removed or deprecated
- If a link is technically challenging to access but likely valuable:
 * Note the access challenge in the PR
 * Include a summary of the content if you can access it
 * Proceed with implementation using the best available information
 * Consider suggesting an archive.org link as a fallback

- For invalid suggestions with references:
- Comment: "Reference verification failed: [specific reason]. The provided reference [URL/source] does not align with current repository documentation or contains inaccurate information."
- Remove workflow labels(AI-Agent/In-Progress)
- Add label: AI-Agent/Cannot-Fix

- For partially verifiable suggestions:
- Comment: "Partial verification completed. Verified: [what was confirmed]. Requires manual review for: [what needs verification]."
- Remove workflow labels(AI-Agent/In-Progress)  
- Add label: AI-Agent/Cannot-Fix

=========================================
SUCCESS CRITERIA
=========================================
- You must correctly identify ALL version directories in the docs-is repository that need to be updated.
- Create a SINGLE PR that includes changes to ALL affected version directories.
- Use a single branch for all changes, including changes across multiple version directories.
- The task is NOT complete until ALL required version directories have been updated in the PR.
- Only relevant files are changed in each version directory.
- Fix verified with running the docs-is repository successfully after fixing. How to run --> README.md file of the docs-is repository.
- MOST IMPORTANT: After successful build, you MUST verify that the reported issue is actually resolved. Building without errors is not sufficient - you must confirm that the specific problem mentioned in the issue has been fixed.
- MOST IMPORTANT: The PR is comprehensive, includes changes to ALL affected version directories, and targets the master branch of docs-is.
- MOST IMPORTANT: For all operations on the docs-is repository, you MUST be in the docs-is working directory ($DOCS_IS_PATH).
- MOST IMPORTANT: Only docs-is content is ever pushed to the docs-is repository. NEVER push product-is content to docs-is.
- For issues that cannot be resolved, add the label `AI-Agent/Cannot-Fix` and provide the reason in a comment on the related Github issue.
- Add `AI-Agent/Fixed` label to the related Github issue after creating the PR.
- Always add a comment to the related Github issue with the link to the created PR, clearly indicating which versions were updated.
