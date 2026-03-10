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
    redoc_pattern = re.compile(r'<redoc[^>]*\sspec-url=["\']([^"\']+)["\']', re.IGNORECASE | re.DOTALL)
    match = redoc_pattern.search(content)
    if match:
        spec_url = match.group(1)
        spec_path = os.path.abspath(os.path.join(docs_dir if spec_url.startswith('/') else os.path.dirname(page_src_path), spec_url.lstrip('/')))
        if os.path.exists(spec_path):
            with open(spec_path, 'r', encoding='utf-8') as f:
                return content + f"\n\n## API Specification (OpenAPI)\n\n```yaml\n{f.read()}\n```\n"
    return content

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
                        
                        tech_raw = path_parts[cg_idx+1]
                        tech_prefix = prettify_tech_name(tech_raw.split('-')[0])
                        display_title = item.title if tech_prefix.lower() in item.title.lower() else f"{tech_prefix} {item.title}"
                        
                        create_merged_guide(item, guide_slug, display_title, config)
                walk_nav(item.children) # Recurse into sub-sections

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
                except Exception as e: print(f"Error: {e}")
            elif item.is_section:
                md_text += collect_md(item.children)
        return md_text

    combined_md += collect_md(section_item.children)
    dest_path = os.path.join(config['site_dir'], "complete-guides", f"{guide_slug}.md")
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(combined_md)
    
    rel_url = f"complete-guides/{guide_slug}.md"
    GENERATED_GUIDES.append({
        "title": title, 
        "url": rel_url, 
        "desc": f"Comprehensive {title.lower()} integration"
    })

def on_post_page(output, page, config):
    if "complete-guides/" in page.file.src_path and "index" in page.file.src_path: return
    dest_path = os.path.splitext(page.file.abs_dest_path)[0] + ".md"
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    content = resolve_includes(page.markdown, os.path.dirname(page.file.abs_src_path), config['docs_dir'])
    content = inject_api_spec(content, page.file.abs_src_path, config['docs_dir'])
    content = promote_headings_outside_fences(content)
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(content)
    rel_url = os.path.relpath(dest_path, config['site_dir'])
    if not any(p["url"] == rel_url for p in ALL_PAGES):
        ALL_PAGES.append({"title": page.title, "url": rel_url})

def on_post_build(config):
    # Restored Exact llms.txt Formatting
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
    
    lines.extend([
        "",
        "---",
        "## Site Map",
        "- [Comprehensive file index for advanced discovery](./llms-full.txt)"
    ])
    
    with open(llms_path, "w", encoding="utf-8") as f: f.write("\n".join(lines))
    
    # Restored Exact llms-full.txt Formatting
    full_path = os.path.join(config['site_dir'], "llms-full.txt")
    full_lines = ["# WSO2 Identity Server - Full Document Index", ""]
    for p in sorted(ALL_PAGES, key=lambda x: x['url']):
        full_lines.append(f"- [{p['title']}](./{p['url']})")
    with open(full_path, "w", encoding="utf-8") as f: f.write("\n".join(full_lines))
    print(f"SUCCESS - llms.txt and llms-full.txt generated.")
    