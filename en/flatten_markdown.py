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
            # Safely promote headings by adding an extra '#'
            line = re.sub(r'^(#{1,6})(\s+)', r'#\1\2', line)
        out.append(line)
    return "\n".join(out)

def on_nav(nav, config, files):
    # We no longer need a strict mapping for filenames, 
    # but we can keep it to know which sections to "Merge"
    TARGET_PARENT_DIR = "complete-guides/"

    def walk_nav(items):
        for item in items:
            if item.is_section:
                first_page = find_first_page(item)
                # Check if this section is inside the complete-guides directory
                if first_page and TARGET_PARENT_DIR in first_page.file.src_path:
                    parts = first_page.file.src_path.split('/')
                    # find the index of 'complete-guides' and take the folder immediately after it
                    try:
                        cg_idx = parts.index('complete-guides')
                        if len(parts) > cg_idx + 1:
                            # This is the specific guide folder (e.g., 'nextjs-b2b')
                            folder_name = parts[cg_idx + 1]
                            
                            # Use the section title (e.g., "Next.js B2B") for the header
                            # but the actual folder name for the filename
                            create_merged_guide(item, folder_name, item.title, config)
                    except ValueError:
                        pass
                
                # Continue walking the tree
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

def resolve_includes(content, current_dir, docs_dir, visited=None):
    if visited is None:
        visited = set()
    
    include_pattern = re.compile(r'\{%\s*include\s*[\'"](.+?)[\'"]\s*%\}')

    def replace_match(match):
        rel_path = match.group(1)
        target = os.path.join(docs_dir, rel_path.lstrip('/')) if rel_path.startswith('/') else os.path.normpath(os.path.join(current_dir, rel_path))
        
        if target in visited:
            return ""
            
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
    if "complete-guides/" in full_dest_path:
        base_path = full_dest_path.split("complete-guides/")[0]
        dest_dir = os.path.join(base_path, "complete-guides")
    else:
        dest_dir = os.path.dirname(os.path.dirname(full_dest_path))

    dest_path = os.path.join(dest_dir, f"{folder_name}.md")
    
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
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
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
    
    for guide in GENERATED_GUIDES:
        lines.append(f"- [{guide['title']} Complete Guide](./{guide['url']}) - Comprehensive {guide['title'].lower()} integration")
    
    lines.extend([
        "",
        "## Quick Start Guides", 
        "Condensed framework tutorials for fast implementation:",
        "- [React Quick Start](./quick-starts/react.md)",
        "- [Angular Quick Start](./quick-starts/angular.md)", 
        "- [Next.js Quick Start](./quick-starts/nextjs.md)",
        "- [Express.js Quick Start](./quick-starts/expressjs.md)",
        "- [JavaScript Quick Start](./quick-starts/javascript.md)",
        "- [Spring Boot Quick Start](./quick-starts/springboot.md)",
        "",
        "---",
        "## Site Map",
        "- [Comprehensive file index for advanced discovery](./llms-full.txt)"
    ])
    
    with open(llms_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    full_path = os.path.join(config['site_dir'], "llms-full.txt")
    full_lines = ["# WSO2 Identity Server - Full Document Index", ""]
    
    for page in sorted(ALL_PAGES, key=lambda x: x['url']):
        full_lines.append(f"- [{page['title']}](./{page['url']})")

    with open(full_path, "w", encoding="utf-8") as f:
        f.write("\n".join(full_lines))
    
    print(f"SUCCESS - llms.txt and llms-full.txt generated.")
