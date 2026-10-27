# Testing & Quality Gates

This repository uses automated validation gates to ensure layout integrity, link hygiene, and accessibility conformance.

## 1. Display Controls Test

Empty anchor destinations (`href="#"`) and decorative app-badge download links are strictly prevented across all generated HTML output.

**Runner:**
```bash
python3 -B tests/display-controls.py public
```

**Checked Invariants:**
- `a[href="#"]`: Prohibited. Social icons, toolbars, and profile links must use valid URLs or non-link semantic elements (e.g. `<span class="social-preview" role="img">`).
- `a.app-badge`: Prohibited. App store badges are display-only and must be wrapped in `<span>` tags with explanatory copy indicating no download is available.

## 2. Hugo Static Build

The static site generator builds the production artifact:
```bash
hugo --minify
```

Run before running tests to refresh the output in `public/`.

## 3. Code Intelligence (GitNexus)

Code graph freshness and change impact:
```bash
node .gitnexus/run.cjs status
node .gitnexus/run.cjs detect-changes --scope all --repo .
```
