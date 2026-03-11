import os
import re

# Global trackers for llms.txt files
GENERATED_GUIDES = []
ALL_PAGES = []

def promote_headings_outside_fences(content):
    """Safely promotes headings only when they are outside of code blocks."""
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
    """Dynamically formats tech slugs with standard overrides."""
    if not name: return ""
    overrides = {
        "nextjs": "Next.js", 
        "dotnet": ".NET", 
        "javascript": "JavaScript", 
        "expressjs": "Express.js",
        "springboot": "Spring Boot"
    }
    return overrides.get(name.lower(), name.capitalize())

def on_pre_build(config):
    """Reset global trackers at the start of every build to prevent accumulation across repeated runs."""
    global GENERATED_GUIDES, ALL_PAGES
    GENERATED_GUIDES = []
    ALL_PAGES = []

def on_nav(nav, config, files):
    """
    Scans navigation to identify unique sections within 'complete-guides/'.
    """
    TARGET_PARENT_DIR = "complete-guides/"
    processed_folders = set() 

    def walk_nav(items):
        for item in items:
            if item.is_section:
                first_page = find_first_page(item)
                if first_page and TARGET_PARENT_DIR in first_page.file.src_path:
                    parts = first_page.file.src_path.split('/')
                    try:
                        cg_idx = parts.index('complete-guides')
                        if len(parts) > cg_idx + 1:
                            folder_name = parts[cg_idx + 1]
                            
                            if folder_name not in processed_folders:
                                processed_folders.add(folder_name)
                                tech_slug = folder_name.split('-')[0]
                                tech_prefix = prettify_tech_name(tech_slug)
                                
                                clean_item_title = item.title
                                if clean_item_title.lower().startswith(tech_prefix.lower()):
                                    display_title = clean_item_title
                                elif tech_prefix.lower() in clean_item_title.lower():
                                    display_title = clean_item_title
                                else:
                                    display_title = f"{tech_prefix} {clean_item_title}"
                                
                                create_merged_guide(item, folder_name, display_title, config)
                    except ValueError:
                        pass
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
    docs_root = os.path.abspath(os.path.normpath(docs_dir))

    def _within_docs_dir(path):
        abs_path = os.path.abspath(os.path.normpath(path))
        return os.path.commonpath([docs_root]) == os.path.commonpath([docs_root, abs_path])

    redoc_pattern = re.compile(r'<redoc[^>]*\sspec-url=["\']([^"\']+)["\']', re.IGNORECASE | re.DOTALL)
    match = redoc_pattern.search(content)
    if match:
        spec_relative_path = match.group(1)
        page_dir = os.path.dirname(page_src_path)
        if spec_relative_path.startswith('/'):
            spec_path = os.path.abspath(os.path.normpath(os.path.join(docs_dir, spec_relative_path.lstrip('/'))))
        elif spec_relative_path.startswith('../'):
            spec_path = os.path.abspath(os.path.normpath(os.path.join(page_dir, spec_relative_path)))
        else:
            spec_path = os.path.abspath(os.path.normpath(os.path.join(page_dir, spec_relative_path)))
        if not _within_docs_dir(spec_path):
            print(f"ERROR: spec-url resolves outside docs_dir, skipping: {spec_path}")
            return content
        if not os.path.exists(spec_path):
            filename = os.path.basename(spec_relative_path)
            fallback_path = os.path.abspath(os.path.normpath(os.path.join(docs_dir, "apis", "restapis", filename)))
            if not _within_docs_dir(fallback_path):
                print(f"ERROR: fallback path resolves outside docs_dir, skipping: {fallback_path}")
                return content
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

def resolve_includes(content, current_dir, docs_dir, visited=None):
    if visited is None:
        visited = set()
    docs_root = os.path.abspath(docs_dir)
    include_pattern = re.compile(r'\{%\s*include\s*[\'"](.+?)[\'"]\s*%\}')
    def replace_match(match):
        rel_path = match.group(1)
        raw = os.path.join(docs_dir, rel_path.lstrip('/')) if rel_path.startswith('/') else os.path.join(current_dir, rel_path)
        target = os.path.abspath(raw)
        if os.path.commonpath([docs_root]) != os.path.commonpath([docs_root, target]):
            return ""
        if target in visited: return ""
        if os.path.exists(target):
            visited.add(target)
            with open(target, 'r', encoding='utf-8') as f:
                return resolve_includes(f.read(), os.path.dirname(target), docs_dir, visited)
        return ""
    return include_pattern.sub(replace_match, content)

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
                    content = promote_headings_outside_fences(content)
                    md_text += f"\n\n---\n## Section: {item.title}\n\n{content}\n"
                except Exception as e: 
                    print(f"Error merging {item.title}: {e}")
            elif item.is_section: 
                md_text += collect_md(item.children)
        return md_text

    combined_md += collect_md(section_item.children)
    full_dest_path = first_page.file.abs_dest_path
    dest_dir = os.path.join(full_dest_path.split("complete-guides/")[0], "complete-guides") if "complete-guides/" in full_dest_path else os.path.dirname(os.path.dirname(full_dest_path))
    dest_path = os.path.join(dest_dir, f"{folder_name}.md")
    rel_url = os.path.relpath(dest_path, config['site_dir'])
    
    GENERATED_GUIDES.append({"title": title, "url": rel_url, "desc": f"Comprehensive {title.lower()} integration"})
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with open(dest_path, 'w', encoding='utf-8') as f: f.write(combined_md)

def on_post_page(output, page, config):
    # Skip index files inside complete-guides
    if "complete-guides/" in page.file.src_path:
        parts = page.file.src_path.split('/')
        if len(parts) > 2 and parts[2].startswith("index"): return 

    docs_dir = config['docs_dir']
    current_file_dir = os.path.dirname(page.file.abs_src_path)
    content = resolve_includes(page.markdown, current_file_dir, docs_dir)
    content = inject_api_spec(content, page.file.abs_src_path, docs_dir)
    content = promote_headings_outside_fences(content)
    
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
    with open(dest_path, 'w', encoding='utf-8') as f: f.write(content)
    
    rel_url = os.path.relpath(dest_path, config['site_dir'])
    if not any(p["url"] == rel_url for p in ALL_PAGES):
        ALL_PAGES.append({"title": page.title, "url": rel_url})

def on_post_build(config):
    llms_path = os.path.join(config['site_dir'], "llms.txt")
    lines = [
        "# WSO2 Identity Server Documentation",
        "> Comprehensive Identity and Access Management (IAM) platform documentation",
        "> Optimized for AI agents, LLMs, and developers",
        "",
        "## Complete Integration Guides (Flattened)",
        "End-to-end framework-specific implementation guides with all details:",
    ]
    
    seen_urls = set()
    for guide in sorted(GENERATED_GUIDES, key=lambda x: x['title']):
        if guide['url'] not in seen_urls:
            lines.append(f"- [{guide['title']} Complete Guide](./{guide['url']}) - {guide['desc']}")
            seen_urls.add(guide['url'])
    
    lines.extend(["", "---", "## Site Map", "- [Comprehensive file index for advanced discovery](./llms-full.txt)"])
    
    with open(llms_path, "w", encoding="utf-8") as f: f.write("\n".join(lines))
    
    full_path = os.path.join(config['site_dir'], "llms-full.txt")
    full_lines = ["# WSO2 Identity Server - Full Document Index", ""]
    for page in sorted(ALL_PAGES, key=lambda x: x['url']):
        full_lines.append(f"- [{page['title']}](./{page['url']})")
    with open(full_path, "w", encoding="utf-8") as f: f.write("\n".join(full_lines))
    print(f"SUCCESS - llms.txt and llms-full.txt generated.")
