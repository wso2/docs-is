#! /bin/sh
set -e
mdspell  -n -a --en-us docs/**/*.md -d dictionary/en_US-large
mdspell  -n -a --en-us mkdocs.yml -d dictionary/en_US-large
mdspell  -n -a --en-us theme/material/templates/home-page.html -d dictionary/en_US-large
find docs/** -type f -name '*.md'  | xargs -L1 markdown-link-check -c ./markdown-link-check-config.json  --quiet || exit 1 
find docs/**/* -type f -name '*.md' | xargs -L1 markdown-link-check -c ./markdown-link-check-config.json  --quiet || exit 1
mkdocs build -c
