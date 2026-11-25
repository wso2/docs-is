"""Check the links on the guided home page.

The guided home page (templates/guided-home-page.html) reads its content from
the `home` front matter of a site's index.md. Each internal link names a docs
source file through `path` (for example, `quick-starts/react.md`). This hook
logs a warning when that file is not part of the site, so a moved or renamed
page shows up at build time instead of as a broken link on the home page.
"""

import logging

log = logging.getLogger("mkdocs.plugins.home_page_links")


def _paths(node, trail):
    """Yield (trail, path) for every `path` value in the front matter tree."""
    if isinstance(node, dict):
        label = node.get("title") or node.get("label")
        here = trail + [label] if label else trail
        if isinstance(node.get("path"), str):
            yield " > ".join(here), node["path"]
        for value in node.values():
            yield from _paths(value, here)
    elif isinstance(node, list):
        for value in node:
            yield from _paths(value, trail)


def on_page_markdown(markdown, page, config, files):
    home = page.meta.get("home") if page.meta else None
    if not home:
        return markdown

    for where, path in _paths(home, []):
        if files.get_file_from_path(path) is None:
            log.warning(
                "Home page link '%s' points to '%s', which is not a page in this site.",
                where,
                path,
            )

    return markdown
