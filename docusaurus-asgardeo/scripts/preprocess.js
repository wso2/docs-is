#!/usr/bin/env node

const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DOCS_SRC = path.join(REPO_ROOT, 'en', 'asgardeo', 'docs');
const INCLUDES_DIR = path.join(REPO_ROOT, 'en', 'includes');
const GENERATED_DIR = path.join(__dirname, '..', '.generated-docs');

const templateVars = {
  product_name: 'Asgardeo',
  base_path: '',
  product: 'asgardeo',
  product_url_format: 'https://api.asgardeo.io',
  is_version: '99.0.0',
  content: {
    sdkconfig: {
      baseUrl: 'https://api.asgardeo.io/t/<your-organization-name>',
    },
  },
};

const env = nunjucks.configure(REPO_ROOT, {
  autoescape: false,
  trimBlocks: true,
  lstripBlocks: true,
  throwOnUndefined: false,
});

const SKIP_DIRS = new Set(['assets', '__pycache__', '.venv', '.DS_Store', 'node_modules']);

function renderTemplate(filePath) {
  try {
    const relativePath = path.relative(REPO_ROOT, filePath);
    return env.render(relativePath, templateVars);
  } catch (err) {
    console.error(`  ERROR rendering ${filePath}: ${err.message}`);
    return fs.readFileSync(filePath, 'utf-8');
  }
}

function stripFrontmatter(content) {
  return content.replace(/^---\s*\n[\s\S]*?^---\s*\n/gm, (match) => {
    if (match.includes('template:')) return '';
    return match;
  });
}

function stripPageNotFound(content) {
  if (content.includes('<head>') && content.includes('page-not-found')) {
    return '# Page Not Found\n\nThe page you are looking for does not exist.\n';
  }
  return content;
}

function stripScriptBlocks(content) {
  return content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
}

function convertImageSyntax(content) {
  return content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)\{:\s*([^}]+)\}/g,
    (match, alt, src, attrs) => {
      const widthMatch = attrs.match(/width=["']?([^"'\s]+)/);
      const styleMatch = attrs.match(/style=["']([^"']+)["']/);
      let htmlAttrs = '';
      if (widthMatch) htmlAttrs += ` width="${widthMatch[1]}"`;
      if (styleMatch) htmlAttrs += ` style="${styleMatch[1]}"`;
      if (htmlAttrs) {
        return `<img src="${src}" alt="${alt}"${htmlAttrs} />`;
      }
      return `![${alt}](${src})`;
    }
  );
}

function convertLinkSyntax(content) {
  return content
    .replace(/\[([^\]]*)\]\(([^)]+)\)\{:\s*target=["']_blank["']\s*\}/g, (m, t, u) => `[${t}](${u})`)
    .replace(/\{:target="_blank"\}/g, '');
}

function resolveRelativePaths(content, sourceFilePath) {
  const sourceDir = path.dirname(sourceFilePath);

  content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) return match;
    const resolved = path.resolve(sourceDir, src);
    const relToDocs = path.relative(DOCS_SRC, resolved);
    if (!relToDocs.startsWith('..')) return `![${alt}](/${relToDocs})`;
    return `![${alt}](/${path.relative(REPO_ROOT, resolved)})`;
  });

  content = content.replace(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/g, (match, src) => {
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) return match;
    const resolved = path.resolve(sourceDir, src);
    const relToDocs = path.relative(DOCS_SRC, resolved);
    if (!relToDocs.startsWith('..')) return match.replace(src, `/${relToDocs}`);
    return match.replace(src, `/${path.relative(REPO_ROOT, resolved)}`);
  });

  return content;
}

function stripAttrLists(content) {
  return content.replace(/\{:([^}]+)\}/g, (match, attrs) => {
    if (attrs.includes('target=')) return '';
    if (attrs.includes('width=') || attrs.includes('style=')) return '';
    return '';
  });
}

function fixHtmlTags(content) {
  content = content.replace(/<br\s*\/?>/gi, '<br />');
  content = content.replace(/<\/br>/gi, '');
  content = content.replace(/<hr\s*\/?>/gi, '<hr />');
  return content;
}

function escapeMdxBraces(content) {
  const lines = content.split('\n');
  let inFence = false;
  const result = [];

  for (const line of lines) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
      inFence = !inFence;
      result.push(line);
      continue;
    }
    if (inFence) {
      result.push(line);
      continue;
    }
    result.push(line.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;'));
  }
  return result.join('\n');
}

function convertAdmonitions(content) {
  // Map custom mkdocs admonition types to Docusaurus-supported types
  const typeMap = {
    example: 'info',
    abstract: 'note',
    prerequisite: 'info',
    question: 'info',
    quote: 'info',
    bug: 'warning',
    failure: 'danger',
    important: 'warning',
    success: 'tip',
  };

  return content
    .replace(/^!{3}\+?\s*(\w+)\s*"(.*?)"\s*$/gm, (_, type, title) => {
      const mapped = typeMap[type.toLowerCase()] || type.toLowerCase();
      return `:::${mapped} ${title}`;
    })
    .replace(/^!{3}\+?\s*(\w+)\s*$/gm, (_, type) => {
      const mapped = typeMap[type.toLowerCase()] || type.toLowerCase();
      return `:::${mapped}`;
    })
    .replace(/^!{3}\s*$/gm, ':::note')
    .replace(/^\?{3}\+?\s*(\w+)\s*"(.*?)"\s*$/gm, (_, type, title) => `<details><summary>${title}</summary>`)
    .replace(/^\?{3}\+?\s*(\w+)\s*$/gm, '<details><summary>Details</summary>')
    .replace(/^\?{3}\s*$/gm, '<details><summary>Details</summary>');
}

function postProcess(content, sourceFilePath) {
  let processed = content;
  processed = stripFrontmatter(processed);
  processed = stripPageNotFound(processed);
  processed = stripScriptBlocks(processed);
  processed = convertAdmonitions(processed);
  processed = convertImageSyntax(processed);
  processed = convertLinkSyntax(processed);
  processed = resolveRelativePaths(processed, sourceFilePath);
  processed = fixRedocSpecUrls(processed);
  processed = stripAttrLists(processed);
  processed = fixHtmlTags(processed);
  processed = escapeMdxBraces(processed);
  return processed;
}

function fixRedocSpecUrls(content) {
  // Fix absolute spec-url paths to include baseUrl
  content = content.replace(
    /(<redoc\s+[^>]*spec-url=")(\/[^"]+)("[^>]*>)/g,
    '$1/asgardeo/docs$2$3'
  );
  // Fix relative spec-url paths (e.g. ../../apis/...)
  content = content.replace(
    /(<redoc\s+[^>]*spec-url=")(\.\.\/[^"]+)("[^>]*>)/g,
    (match, prefix, path, suffix) => {
      // Resolve relative path to absolute and add baseUrl
      const resolved = path.replace(/\.\.\/+/g, '');
      return `${prefix}/asgardeo/docs/${resolved}${suffix}`;
    }
  );
  // Inject Asgardeo redoc theme (orange primary color)
  content = content.replace(
    /theme=''/g,
    `theme='{"colors":{"primary":{"main":"#ff7300"}}}'`
  );
  return content;
}

function shouldProcess(file) {
  return fs.statSync(file).isFile() && file.endsWith('.md');
}

function processDirectory(srcDir, destDir) {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || SKIP_DIRS.has(entry.name)) continue;

    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      processDirectory(srcPath, destPath);
    } else if (shouldProcess(srcPath)) {
      const rendered = renderTemplate(srcPath);
      const processed = postProcess(rendered, srcPath);
      const destDirPath = path.dirname(destPath);
      if (!fs.existsSync(destDirPath)) fs.mkdirSync(destDirPath, { recursive: true });
      fs.writeFileSync(destPath, processed, 'utf-8');
      console.log(`  Processed: ${path.relative(REPO_ROOT, srcPath)}`);
    }
  }
}

function main() {
  console.log('Preprocessing MkDocs content for Docusaurus...\n');
  if (fs.existsSync(GENERATED_DIR)) fs.rmSync(GENERATED_DIR, { recursive: true });

  console.log(`Source: ${DOCS_SRC}`);
  console.log(`Output: ${GENERATED_DIR}`);
  console.log(`Includes: ${INCLUDES_DIR}\n`);

  processDirectory(DOCS_SRC, GENERATED_DIR);

  deduplicateIndexPages(GENERATED_DIR);

  // Remove source index.md since we create our own index.mdx
  const oldIndexPath = path.join(GENERATED_DIR, 'index.md');
  if (fs.existsSync(oldIndexPath)) fs.rmSync(oldIndexPath);

  createHomePage();
  createSDKsPage();

  const fileCount = fs.readdirSync(GENERATED_DIR, { recursive: true }).filter(f => f.endsWith('.md')).length;
  console.log(`\nPreprocessing complete. ${fileCount} files generated.`);
}

function deduplicateIndexPages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      deduplicateIndexPages(path.join(dir, entry.name));
    }
  }

  const dirEntries = fs.readdirSync(dir, { withFileTypes: true });
  const dirName = path.basename(dir);
  const hasIndexMd = fs.existsSync(path.join(dir, 'index.md'));
  const hasDirNamedMd = fs.existsSync(path.join(dir, `${dirName}.md`));

  // Case 1: foo.md + foo/index.md at sibling level -> remove foo.md
  for (const entry of dirEntries) {
    if (!entry.isFile() || !entry.name.endsWith('.md') || entry.name === 'index.md') continue;
    const baseName = entry.name.replace(/\.md$/, '');
    const subDir = dirEntries.find(e => e.isDirectory() && e.name === baseName);
    if (subDir && fs.existsSync(path.join(dir, subDir.name, 'index.md'))) {
      console.log(`  Removing duplicate: ${path.relative(GENERATED_DIR, path.join(dir, entry.name))}`);
      fs.rmSync(path.join(dir, entry.name));
    }
  }

  // Case 2: foo/index.md + foo/foo.md -> rename foo/foo.md to avoid Docusaurus folder-index conflict
  if (hasIndexMd && hasDirNamedMd) {
    const newName = `${dirName}-guide.md`;
    console.log(`  Renaming to avoid conflict: ${path.relative(GENERATED_DIR, path.join(dir, `${dirName}.md`))} -> ${path.relative(GENERATED_DIR, path.join(dir, newName))}`);
    fs.renameSync(path.join(dir, `${dirName}.md`), path.join(dir, newName));
  }
}

function createHomePage() {
  const homePath = path.join(GENERATED_DIR, 'index.mdx');
  const homeContent = `---
sidebar_label: Home
---

import HomePageCards from '@site/src/components/HomePageCards';

<HomePageCards />
`;
  fs.writeFileSync(homePath, homeContent, 'utf-8');
}

function createSDKsPage() {
  const sdkPath = path.join(GENERATED_DIR, 'sdks', 'index.md');
  const sdkContent = `---
sidebar_label: SDKs
---

import Card from '@site/src/components/Card';

# SDKs

Explore our official and community SDKs to integrate with Asgardeo easily.

## Official SDKs

Official SDKs developed and maintained by the Asgardeo team for seamless integration.

<div className="flex-grid">

<Card
  icon="/assets/img/logo/react-logo.svg"
  name="React SDK"
  artifact="@asgardeo/react"
  description="React implementation of Asgardeo JavaScript SDK."
  docsLink="/sdks/react/overview"
  sourceLink="https://github.com/asgardeo/javascript/tree/main/packages/react"
/>

<Card
  icon="/assets/img/logo/nextjs-logo-dark.svg"
  name="Next.js SDK"
  artifact="@asgardeo/nextjs"
  description="Next.js implementation of Asgardeo JavaScript SDK."
  docsLink="/sdks/nextjs/overview"
  sourceLink="https://github.com/asgardeo/javascript/tree/main/packages/nextjs"
/>

<Card
  icon="/assets/img/logo/javascript-logo.svg"
  name="Auth SPA SDK"
  artifact="@asgardeo/auth-spa"
  description="An SDK to integrate Asgardeo into single page applications."
  docsLink="/get-started/try-your-own-app/javascript"
  sourceLink="https://github.com/asgardeo/asgardeo-auth-spa-sdk"
/>

<Card
  icon="/assets/img/logo/expressjs-logo.svg"
  darkIcon="/assets/img/logo/expressjs-logo-dark.svg"
  name="Auth Node SDK"
  artifact="@asgardeo/auth-node"
  description="An SDK to integrate Asgardeo into JS/TS-based frameworks such as ExpressJS."
  sourceLink="https://github.com/asgardeo/asgardeo-auth-node-sdk"
/>

<Card
  icon="/assets/img/logo/java-logo.svg"
  name="Tomcat OIDC Agent"
  artifact="io.asgardeo.tomcat.oidc.agent"
  description="A Tomcat agent for implementing login/logout for Tomcat web apps."
  docsLink="/get-started/try-your-own-app/java-ee-oidc"
  sourceLink="https://github.com/asgardeo/asgardeo-tomcat-oidc-agent"
/>

<Card
  icon="/assets/img/logo/java-logo.svg"
  name="Tomcat SAML Agent"
  artifact="io.asgardeo.tomcat.saml.agent"
  description="A SAML Tomcat agent for implementing SAML login/logout for Tomcat web apps."
  docsLink="/get-started/try-your-own-app/java-ee-saml"
  sourceLink="https://github.com/asgardeo/asgardeo-tomcat-saml-agent"
/>

<Card
  icon="/assets/img/logo/android-logo.svg"
  name="Android Mobile UI SDK"
  artifact="io.asgardeo:asgardeo-android"
  description="Android SDK for app-native authentication with Asgardeo."
  sourceLink="https://github.com/asgardeo/mobile-ui-sdks/tree/main/android"
/>

</div>

## Community SDKs

Third-party SDKs built by the community to support OIDC and OAuth integration with any provider.

<div className="flex-grid">

<Card
  icon="/assets/img/logo/angular-logo.svg"
  name="Angular OAuth2 OIDC"
  artifact="angular-oauth2-oidc"
  description="A library for implementing OAuth2 and OIDC in Angular applications."
  sourceLink="https://github.com/manfredsteyer/angular-oauth2-oidc"
/>

<Card
  icon="/assets/img/logo/nextjs-logo.svg"
  darkIcon="/assets/img/logo/nextjs-logo-dark.svg"
  name="Next Auth"
  artifact="next-auth"
  description="A library for implementing OAuth2 and OIDC in NextJS applications."
  sourceLink="https://github.com/nextauthjs/next-auth"
/>

<Card
  icon="/assets/img/logo/flutter-logo.svg"
  name="Flutter AppAuth"
  artifact="flutter_appauth"
  description="An SDK to integrate OAuth2 and OIDC providers with Flutter apps."
  sourceLink="https://github.com/MaikuB/flutter_appauth/tree/master/flutter_appauth"
/>

<Card
  icon="/assets/img/logo/react-logo.svg"
  name="React Native AppAuth"
  artifact="react-native-app-auth"
  description="An SDK to integrate OAuth2 and OIDC providers into React Native apps."
  docsLink="/get-started/try-your-own-app/react-native-cli-app-auth"
  sourceLink="https://github.com/FormidableLabs/react-native-app-auth"
/>

<Card
  icon="/assets/img/logo/android-logo.svg"
  name="AppAuth Android"
  artifact="net.openid:appauth"
  description="A client SDK to integrate OAuth2 and OIDC providers into Android applications."
  sourceLink="https://github.com/openid/AppAuth-Android"
/>

<Card
  icon="/assets/img/logo/apple-idp-illustration.svg"
  darkIcon="/assets/img/logo/apple-logo-dark.svg"
  name="AppAuth iOS"
  artifact="AppAuth"
  description="A client SDK to integrate OAuth2 and OIDC providers into iOS applications."
  sourceLink="https://github.com/openid/AppAuth-iOS"
/>

</div>
`;
  const sdkDir = path.join(GENERATED_DIR, 'sdks');
  if (!fs.existsSync(sdkDir)) fs.mkdirSync(sdkDir, { recursive: true });
  fs.writeFileSync(sdkPath, sdkContent, 'utf-8');
}

main();
