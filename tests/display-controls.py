"""Check generated local-edition controls. Usage: python3 -B tests/display-controls.py SITE_DIRECTORY."""
from html.parser import HTMLParser
from pathlib import Path
import sys

class Controls(HTMLParser):
    def __init__(self):
        super().__init__(); self.problems = []
    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == 'a' and attrs.get('href') == '#':
            self.problems.append('Empty destination appears as a real link')
        if tag == 'a' and 'app-badge' in attrs.get('class', '').split():
            self.problems.append('Decorative app badge appears as a download')

root = Path(sys.argv[1])
pages = list(root.rglob('*.html'))
if not pages: raise SystemExit('No generated HTML; pass the fresh Hugo destination.')
failures = []
for page in pages:
    parser = Controls(); parser.feed(page.read_text())
    failures.extend(f'{page.relative_to(root)}: {issue}' for issue in parser.problems)
if failures: raise SystemExit('\n'.join(failures))
print(f'Local display control checks passed across {len(pages)} pages: no empty links or pretend app downloads.')
