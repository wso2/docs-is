import os
import re

# Global trackers for llms.txt files
GENERATED_GUIDES = []
ALL_PAGES = []

def promote_headings_outside_fences(content):
    in_fence = False
    out = []
    for line in content.splitlines():
        if line.strip().startswith("```"):
            in_fence = not in_fence
            out.append(line)
            continue
        if not in_fence:
            line = re.sub(r'^(#{1,6})(\s+)', r'#\1\2', line)
        out.append(line)
    return "\n".join(out)

def prettify_tech_name(name):
    if not name: return ""
    overrides = {
        "nextjs": "Next.js", 
        "dotnet": ".NET", 
        "javascript": "JavaScript", 
        "expressjs": "Express.js",
        "springboot": "Spring Boot"
    }
    return overrides.get(name.lower(), name.capitalize())

def resolve_includes(content, current_dir, docs_dir, visited=None):
    if visited is None:
        visited = set()
    include_pattern = re.compile(r'\{%\s*include\s*[\'"](.+?)[\'"]\s*%\}')
    frontmatter_re = re.compile(r'^---.*?---\s*', re.DOTALL)

    def replace_match(match):
        rel_path = match.group(1)
        target = os.path.abspath(os.path.join(docs_dir if rel_path.startswith('/') else current_dir, rel_path.lstrip('/')))
        if target in visited: return ""
        if os.path.exists(target):
            visited.add(target)
            with open(target, 'r', encoding='utf-8') as f:
                body = frontmatter_re.sub('', f.read())
                return resolve_includes(body, os.path.dirname(target), docs_dir, visited)
        return ""
    return include_pattern.sub(replace_match, content)

def inject_api_spec(content, page_src_path, docs_dir):
    redoc_pattern = re.compile(r'<redoc[^>]*\sspec-url=["\']([^"\']+)["\'][^>]*>.*?</redoc>|<redoc[^>]*\sspec-url=["\']([^"\']+)["\'][^>]*/>', re.IGNORECASE | re.DOTALL)

    def replace_with_yaml(match):
        spec_url = match.group(1) or match.group(2)
        if not spec_url: return match.group(0)

        spec_url = re.sub(r'\{\{\s*base_path\s*\}\}', '', spec_url)
        filename = os.path.basename(spec_url)
        
        # 1. Try standard relative/absolute paths first
        page_dir = os.path.dirname(page_src_path)
        paths_to_check = [
            os.path.abspath(os.path.join(page_dir, spec_url)),
            os.path.abspath(os.path.join(docs_dir, spec_url.lstrip('/'))),
            os.path.abspath(os.path.join(docs_dir, "apis", "restapis", filename))
        ]

        target_path = next((p for p in paths_to_check if os.path.exists(p)), None)

        # 2. THE NUCLEAR OPTION: If still not found, search the whole project for the filename
        if not target_path:
            # Search upwards from docs_dir to find the project root if necessary
            search_root = os.path.dirname(docs_dir) 
            for root, dirs, files in os.walk(search_root):
                if filename in files:
                    target_path = os.path.join(root, filename)
                    break

        if target_path:
            try:
                with open(target_path, 'r', encoding='utf-8') as f:
                    yaml_content = f.read()
                # Success! Log where we actually found it to help debug
                print(f"FOUND: {filename} at {target_path}")
                return f"\n\n## API Specification (OpenAPI)\n\n```yaml\n{yaml_content}\n```\n"
            except Exception as e:
                return f"\n\n"
        
        print(f"CRITICAL FAILURE: Cannot find {filename} anywhere in {search_root}")
        return f"\n\n"

    return redoc_pattern.sub(replace_with_yaml, content)

def on_pre_build(config):
    global GENERATED_GUIDES, ALL_PAGES
    GENERATED_GUIDES = []
    ALL_PAGES = []

def on_nav(nav, config, files):
    TARGET_PARENT_DIR = "complete-guides/"
    processed_paths = set() 

    def walk_nav(items):
        for item in items:
            if item.is_section:
                first_page = find_first_page(item)
                if first_page and TARGET_PARENT_DIR in first_page.file.src_path:
                    guide_dir = os.path.dirname(first_page.file.src_path)
                    if guide_dir != TARGET_PARENT_DIR.rstrip('/') and guide_dir not in processed_paths:
                        processed_paths.add(guide_dir)
                        path_parts = guide_dir.split('/')
                        cg_idx = path_parts.index('complete-guides')
                        guide_slug = "-".join(path_parts[cg_idx+1:])
                        tech_prefix = prettify_tech_name(path_parts[cg_idx+1].split('-')[0])
                        display_title = item.title if tech_prefix.lower() in item.title.lower() else f"{tech_prefix} {item.title}"
                        create_merged_guide(item, guide_slug, display_title, config)
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

def create_merged_guide(section_item, guide_slug, title, config):
    docs_dir = config['docs_dir']
    frontmatter_re = re.compile(r'^---.*?---\s*', re.DOTALL)
    combined_md = f"# {title} Complete Guide\n\n"

    def collect_md(items):
        md_text = ""
        for item in items:
            if item.is_page:
                try:
                    with open(item.file.abs_src_path, 'r', encoding='utf-8') as f:
                        body = frontmatter_re.sub('', f.read())
                    res = resolve_includes(body, os.path.dirname(item.file.abs_src_path), docs_dir)
                    res = inject_api_spec(res, item.file.abs_src_path, docs_dir)
                    res = promote_headings_outside_fences(res)
                    if res.strip():
                        md_text += f"\n\n---\n## Section: {item.title}\n\n{res}\n"
                except Exception as e: print(f"Error merging {item.title}: {e}")
            elif item.is_section:
                md_text += collect_md(item.children)
        return md_text

    combined_md += collect_md(section_item.children)
    dest_path = os.path.join(config['site_dir'], "complete-guides", f"{guide_slug}.md")
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with open(dest_path, 'w', encoding='utf-8') as f: f.write(combined_md)
    
    GENERATED_GUIDES.append({"title": title, "url": f"complete-guides/{guide_slug}.md", "desc": f"Comprehensive {title.lower()} integration"})

def on_post_page(output, page, config):
    if "complete-guides/" in page.file.src_path and page.file.src_path.endswith("index.md"): return

    docs_dir = config['docs_dir']
    abs_dest = page.file.abs_dest_path
    
    # Handle Directory URLs vs Direct File URLs to fix 404s
    if abs_dest.endswith("index.html"):
        parent_dir = os.path.dirname(os.path.dirname(abs_dest))
        folder_name = os.path.basename(os.path.dirname(abs_dest))
        dest_path = os.path.join(parent_dir, f"{folder_name}.md")
    else:
        dest_path = os.path.splitext(abs_dest)[0] + ".md"

    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    
    content = resolve_includes(page.markdown, os.path.dirname(page.file.abs_src_path), docs_dir)
    content = inject_api_spec(content, page.file.abs_src_path, docs_dir)
    content = promote_headings_outside_fences(content)
    
    with open(dest_path, 'w', encoding='utf-8') as f: f.write(content)
        
    rel_url = os.path.relpath(dest_path, config['site_dir'])
    if not any(p["url"] == rel_url for p in ALL_PAGES):
        ALL_PAGES.append({"title": page.title, "url": rel_url})

def on_post_build(config):
    # llms.txt and llms-full.txt generation
    llms_path = os.path.join(config['site_dir'], "llms.txt")
    lines = [
        "# WSO2 Identity Server Documentation",
        "> Comprehensive Identity and Access Management (IAM) platform documentation",
        "> Optimized for AI agents, LLMs, and developers",
        "",
        "## Complete Integration Guides (Flattened)",
        "End-to-end framework-specific implementation guides with all details:",
    ]
    for g in sorted(GENERATED_GUIDES, key=lambda x: x['title']):
        lines.append(f"- [{g['title']} Complete Guide](./{g['url']}) - {g['desc']}")
    
    lines.extend(["", "---", "## Site Map", "- [Comprehensive file index for advanced discovery](./llms-full.txt)"])
    with open(llms_path, "w", encoding="utf-8") as f: f.write("\n".join(lines))
    
    full_path = os.path.join(config['site_dir'], "llms-full.txt")
    full_lines = ["# WSO2 Identity Server - Full Document Index", ""]
    for p in sorted(ALL_PAGES, key=lambda x: x['url']):
        full_lines.append(f"- [{p['title']}](./{p['url']})")
    with open(full_path, "w", encoding="utf-8") as f: f.write("\n".join(full_lines))
    print(f"SUCCESS - llms.txt and llms-full.txt generated.")
