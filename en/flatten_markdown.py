import os
import re

# Global trackers for llms.txt files
GENERATED_GUIDES = []
ALL_PAGES = []

def on_nav(nav, config, files):
    GUIDE_FOLDERS = {
        "react": "React",
        "angular": "Angular",
        "javascript": "JavaScript",
        "nextjs": "Next.js",
        "dotnet": ".NET",
        "expressjs": "Express.js"
    }

    def walk_nav(items):
        for item in items:
            if item.is_section:
                first_page = find_first_page(item)
                if first_page and "complete-guides/" in first_page.file.src_path:
                    parts = first_page.file.src_path.split('/')
                    folder_name = parts[1] if len(parts) > 1 else ""
                    
                    if folder_name in GUIDE_FOLDERS:
                        create_merged_guide(item, folder_name, GUIDE_FOLDERS[folder_name], config)
                walk_nav(item.children)

    walk_nav(nav)
    return nav

def find_first_page(section):
    for child in section.children:
        if child.is_page: return child
        if child.is_section:
            res = find_first_page(child)
            if res: return res
    return None

def inject_api_spec(content, page_src_path, docs_dir):
    redoc_pattern = re.compile(r'<redoc[^>]*\sspec-url=["\']([^"\']+)["\']', re.IGNORECASE | re.DOTALL)
    match = redoc_pattern.search(content)
    
    if match:
        spec_relative_path = match.group(1)
        page_dir = os.path.dirname(page_src_path)
        
        if spec_relative_path.startswith('/'):
            spec_path = os.path.normpath(os.path.join(docs_dir, spec_relative_path.lstrip('/')))
        elif spec_relative_path.startswith('../'):
            spec_path = os.path.normpath(os.path.join(page_dir, spec_relative_path))
        else:
            spec_path = os.path.join(page_dir, spec_relative_path)
        
        if not os.path.exists(spec_path):
            filename = os.path.basename(spec_relative_path)
            fallback_path = os.path.join(docs_dir, "apis", "restapis", filename)
            if os.path.exists(fallback_path):
                spec_path = fallback_path

        if os.path.exists(spec_path):
            try:
                with open(spec_path, 'r', encoding='utf-8') as f:
                    yaml_content = f.read()
                return content + f"\n\n## API Specification (OpenAPI)\n\n```yaml\n{yaml_content}\n```\n"
            except Exception as e:
                print(f"ERROR: Read failed: {e}")
            
    return content

def create_merged_guide(section_item, folder_name, title, config):
    combined_md = f"# {title} Complete Guide\n\n"
    docs_dir = config['docs_dir']
    first_page = find_first_page(section_item)
    if not first_page: return

    def collect_md(items):
        md_text = ""
        for item in items:
            if item.is_page:
                try:
                    with open(item.file.abs_src_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    content = resolve_includes(content, os.path.dirname(item.file.abs_src_path), docs_dir)
                    content = inject_api_spec(content, item.file.abs_src_path, docs_dir)
def promote_headings_outside_fences(content):
    in_fence = False
    out = []
    for line in content.splitlines():
        if line.strip().startswith("
                    md_text += f"\n\n---\n## Section: {item.title}\n\n{content}\n"
                except Exception as e: print(f"Error: {e}")
            elif item.is_section: md_text += collect_md(item.children)
        return md_text

    combined_md += collect_md(section_item.children)

    full_dest_path = first_page.file.abs_dest_path
    if "complete-guides/" in full_dest_path:
        base_path = full_dest_path.split("complete-guides/")[0]
        dest_dir = os.path.join(base_path, "complete-guides")
    else:
        dest_dir = os.path.dirname(os.path.dirname(full_dest_path))

    dest_path = os.path.join(dest_dir, f"{folder_name}.md")
    
    # TRACK FOR llms.txt and llms-full.txt
    rel_url = os.path.relpath(dest_path, config['site_dir'])
    GENERATED_GUIDES.append({"title": title, "url": rel_url})

    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(combined_md)

def on_post_page(output, page, config):
    if "complete-guides/" in page.file.src_path:
        parts = page.file.src_path.split('/')
        if len(parts) > 2 and parts[2].startswith("index"):
             return 

    docs_dir = config['docs_dir']
    current_file_dir = os.path.dirname(page.file.abs_src_path)
    content = resolve_includes(page.markdown, current_file_dir, docs_dir)
    content = inject_api_spec(content, page.file.abs_src_path, docs_dir)
    
    abs_dest_path = page.file.abs_dest_path
    if config.get('use_directory_urls'):
        current_dir = os.path.dirname(abs_dest_path)
        parent_dir = os.path.dirname(current_dir)
        folder_name = os.path.basename(current_dir)
        is_version = re.match(r'^\d+\.\d+\.\d+$', folder_name)
        if folder_name in ['en', 'next', 'latest'] or is_version:
            dest_path = os.path.join(current_dir, "index.md")
        else:
            dest_path = os.path.join(parent_dir, f"{folder_name}.md")
    else:
        dest_path = os.path.splitext(abs_dest_path)[0] + ".md"

    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    # TRACK FOR llms-full.txt
    rel_url = os.path.relpath(dest_path, config['site_dir'])
    if not any(p["url"] == rel_url for p in ALL_PAGES):
        ALL_PAGES.append({"title": page.title, "url": rel_url})

def on_post_build(config):
    # 1. Generate your original llms.txt (Curated)
    llms_path = os.path.join(config['site_dir'], "llms.txt")
    lines = [
        "# WSO2 Identity Server Documentation",
        "> Comprehensive Identity and Access Management (IAM) platform documentation",
        "> Optimized for AI agents, LLMs, and developers",
        "",
        "## Complete Integration Guides (Flattened)",
        "End-to-end framework-specific implementation guides with all details:",
    ]
    
    # Dynamics loop for guides
    for guide in GENERATED_GUIDES:
        lines.append(f"- [{guide['title']} Complete Guide](./{guide['url']}) - Comprehensive {guide['title'].lower()} integration")
    
    # Original manual sections preserved exactly
    lines.extend([
        "",
        "## Quick Start Guides", 
        "Condensed framework tutorials for fast implementation:",
        "- [React Quick Start](./quick-starts/react.md) - React SPA authentication setup",
        "- [Angular Quick Start](./quick-starts/angular.md) - Angular application integration", 
        "- [Next.js Quick Start](./quick-starts/nextjs.md) - Next.js SSR authentication",
        "- [Express.js Quick Start](./quick-starts/expressjs.md) - Node.js API protection",
        "- [JavaScript Quick Start](./quick-starts/javascript.md) - Vanilla JS integration",
        "- [Spring Boot Quick Start](./quick-starts/springboot.md) - Java Spring Boot setup",
        "",
        "## Core Documentation",
        "",
        "### API Reference",
        "Complete REST API documentation for all WSO2 IS capabilities:",
        "- [APIs Overview](./apis.md) - Authentication methods and API categories (System, Management, Organization, End User)",
        "",
        "### Implementation Guides", 
        "Step-by-step configuration and setup instructions:",
        "- [Applications Guide](./guides.md) - Register and configure applications for different types (SPA, Web, Mobile, M2M)",
        "",
        "### Reference Documentation",
        "Technical references and specifications:",
        "- [References Overview](./references.md) - Technical reference materials and specifications",
        "",
        "### Tutorials and Learning",
        "Learning resources and tutorials:", 
        "- [Tutorials Overview](./tutorials.md) - Step-by-step learning tutorials",
        "",
        "### SDKs and Integration",
        "Software Development Kits and integration tools:",
        "- [SDKs Overview](./sdks.md) - Available SDKs for different platforms and languages", 
        "",
        "### Connectors and Extensions", 
        "Third-party integrations and extensions:",
        "- [Connectors Overview](./connectors.md) - Identity verification and other service connectors",
        "",
        "### Additional Integrations",
        "Platform and service integrations:",
        "- [Integrations Overview](./integrations.md) - Platform integrations and partnerships",
        "",
        "## Key Features and Capabilities",
        "",
        "### Authentication",
        "- OAuth 2.0, OpenID Connect (OIDC), and SAML-based authentication",
        "- Multi-factor authentication (MFA) and passwordless authentication", 
        "- Risk-based and adaptive authentication",
        "- Social login integrations",
        "",
        "### Authorization",  
        "- Fine-grained access control and policy management",
        "- Role-based access control (RBAC)",
        "- Attribute-based access control (ABAC)",
        "- API security and scopes management",
        "",
        "### User Management",
        "- SCIM 2.0 compliant user provisioning",
        "- Self-service user account management", 
        "- Organization and tenant management for B2B",
        "- Identity verification and KYC workflows",
        "",
        "### Enterprise Features", 
        "- Multi-tenancy and organization isolation",
        "- Workflow engine and approval processes",
        "- Analytics and monitoring capabilities",
        "- Custom branding and UI customization",
        "",
        "## Standards Compliance",
        "- **OAuth 2.0** (RFC 6749) - Authorization framework",
        "- **OpenID Connect 1.0** - Identity layer on OAuth 2.0",
        "- **SAML 2.0** - XML-based authentication protocol", 
        "- **SCIM 2.0** (RFC 7643, 7644) - User provisioning standard",
        "- **FIDO2/WebAuthn** - Passwordless authentication",
        "- **JWT** (RFC 7519) - JSON Web Tokens",
        "- **PKCE** (RFC 7636) - OAuth security extension",
        "- **FAPI** - Financial-grade API security profile",
        "",
        "## Usage Guidelines for AI Agents",
        "",
        "### Recommended Flow",
        "1. **Choose appropriate guide** - Use Complete Guides for comprehensive integration, Quick Starts for rapid implementation",
        "2. **Check APIs documentation** - Most functionality is exposed via REST APIs",
        "3. **Review standards** - Understand OAuth 2.0, OIDC, and SAML concepts",
        "4. **Select integration pattern** - SPA, Web App, Mobile, or M2M authentication flows",
        "",
        "### Common Integration Patterns",
        "- **Single Page Apps (SPA)**: Authorization Code + PKCE flow",
        "- **Web Applications**: Authorization Code flow with server-side handling",  
        "- **Mobile Apps**: Authorization Code + PKCE with native app redirects",
        "- **APIs/Microservices**: Client Credentials flow for service-to-service",
        "- **B2B SaaS**: Organization management with SCIM provisioning",
        "",
        "---",
        "## Site Map",
        "- [Comprehensive file index for advanced discovery](./llms-full.txt)"
    ])
    
    with open(llms_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    # 2. Generate llms-full.txt (Comprehensive)
    full_path = os.path.join(config['site_dir'], "llms-full.txt")
    full_lines = [
        "# WSO2 Identity Server - Full Document Index",
        "> Comprehensive list of all flattened Markdown files.",
        "",
        "## Complete Guides",
    ]
    
    for guide in GENERATED_GUIDES:
        full_lines.append(f"- [{guide['title']}](./{guide['url']})")
        
    full_lines.append("\n## All Pages")
    # Sorting to make it clean for the agent
    for page in sorted(ALL_PAGES, key=lambda x: x['url']):
        full_lines.append(f"- [{page['title']}](./{page['url']})")

    with open(full_path, "w", encoding="utf-8") as f:
        f.write("\n".join(full_lines))
    
    print(f"SUCCESS - llms.txt and llms-full.txt generated.")

def resolve_includes(content, current_dir, docs_dir):
    include_pattern = re.compile(r'\{%\s*include\s*[\'"](.+?)[\'"]\s*%\}')
    def replace_match(match):
        rel_path = match.group(1)
        target = os.path.join(docs_dir, rel_path.lstrip('/')) if rel_path.startswith('/') else os.path.normpath(os.path.join(current_dir, rel_path))
        if os.path.exists(target):
            with open(target, 'r', encoding='utf-8') as f:
                return resolve_includes(f.read(), os.path.dirname(target), docs_dir)
        return ""
    return include_pattern.sub(replace_match, content)
