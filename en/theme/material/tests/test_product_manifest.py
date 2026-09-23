"""Run with the Asgardeo MkDocs dependencies (MkDocs 1.6.1)."""

import importlib.util
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

from mkdocs.structure.files import File, Files, InclusionLevel

ROOT = Path(__file__).resolve().parents[4]
PRODUCTS = ['asgardeo'] + [
    f'identity-server/{version}'
    for version in ['7.0.0', '7.1.0', '7.2.0', '7.3.0', 'next']
]


class ProductManifestTests(unittest.TestCase):
    def test_manifest_lists_only_published_documentation(self):
        for product in PRODUCTS:
            with self.subTest(product=product), tempfile.TemporaryDirectory() as site_dir:
                folder = ROOT / 'en' / product
                previous_cwd = Path.cwd()
                try:
                    os.chdir(folder)
                    spec = importlib.util.spec_from_file_location('product_hooks', folder / 'hooks.py')
                    hooks = importlib.util.module_from_spec(spec)
                    spec.loader.exec_module(hooks)
                finally:
                    os.chdir(previous_cwd)

                files = Files([])
                for name, inclusion in [
                    ('index.md', InclusionLevel.INCLUDED),
                    ('guides/shared.md', InclusionLevel.INCLUDED),
                    ('guides/hidden-from-nav.md', InclusionLevel.NOT_IN_NAV),
                    ('guides/excluded.md', InclusionLevel.EXCLUDED),
                    ('guides/draft.md', InclusionLevel.DRAFT),
                    ('assets/logo.svg', InclusionLevel.INCLUDED),
                ]:
                    file = File(name, str(folder / 'docs'), site_dir, use_directory_urls=True)
                    file.inclusion = inclusion
                    files.append(file)
                if product == 'asgardeo':
                    hooks.files_to_remove['page'] = ['guides/feature-disabled.md']
                    files.append(File('guides/feature-disabled.md', str(folder / 'docs'), site_dir,
                                      use_directory_urls=True))
                with patch.dict(os.environ, {'ENABLE_HOOKS': 'true'}):
                    hooks.on_files(files, {'site_dir': site_dir})
                    hooks.on_post_build({'site_dir': site_dir})
                script = (Path(site_dir) / 'page-manifest.js').read_text()
                prefix = 'window.__WSO2_DOCS_MANIFEST__='
                self.assertTrue(script.startswith(prefix))
                pages = json.loads(script[len(prefix):-1])
                self.assertEqual(pages, ['./', 'guides/hidden-from-nav/', 'guides/shared/'])


if __name__ == '__main__':
    unittest.main()
