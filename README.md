# Bovine News Network

> **No Bull. Just Moo-Point.**

A satirical local television news website and fictional digital broadcast brand built around a team of stuffed cow journalists operating a professional newsroom in Bentonville, Arkansas.

---

## Overview

Bovine News Network combines the aesthetics, typography, information architecture, breaking-news urgency, and layout standards of a modern regional television news station with bovine journalism.

### Core Sections & Features

- **News & Local Reporting:** 15+ articles covering local politics, agricultural economics, community events, and pasture controversies, supported by custom 16:9 WebP artwork.
- **Weather Center (`/weather/`):** Full weather dashboard featuring current pasture conditions, radar preview, 7-day forecast grid, meteorologist commentary, camera previews, and weather trivia.
- **Sports (`/sports/`):** Pasture league scores, game previews, and sports desk coverage.
- **Opinion (`/opinion/`):** Thought leadership essays and pasture commentary.
- **Special Reports (`/special-reports/the-gate-files/`):** Multi-part investigative reporting series ("The Gate Files") complete with evidence dossiers, suspects, memos, and timelines.
- **Newsroom Staff (`/team/`):** Dedicated reporter profiles with beats, bios, and quotes.
- **Accessibility & Controls:** Validated display controls preventing dead anchor links (`href="#"`) and fake app downloads.
- **Video Feature Flag:** Video and livestream sections are temporarily dormant (`params.features.video = false` in `hugo.toml`).

---

## Local Development

### Prerequisites

- [Hugo Extended](https://gohugo.io/) (v0.120+ recommended)
- Python 3 (for test execution)
- Node.js (for GitNexus code intelligence)

### Development Server

Start the local Hugo server with live reload:

```bash
hugo server -D
```

By default, the site is served at `http://localhost:1313/`.

### Production Build

Compile the static site to the `public/` directory:

```bash
hugo --minify
```

---

## Verification & Testing

Run the automated display-controls validation against generated pages:

```bash
# 1. Build the site
hugo --minify

# 2. Run display controls test
python3 -B tests/display-controls.py public
```

### Code Intelligence

This project is indexed with GitNexus for graph analysis and blast-radius tracking:

```bash
# Check index freshness
node .gitnexus/run.cjs status

# Detect graph changes across modified files
node .gitnexus/run.cjs detect-changes --scope all --repo .
```

---

## Documentation

- [Project Specification](file:///Users/ryanjohnson/Projects/nonsense/bovine-news/spec.md)
- [Project Roadmap](file:///Users/ryanjohnson/Projects/nonsense/bovine-news/ROADMAP.md)
- [Image & Asset Guide](file:///Users/ryanjohnson/Projects/nonsense/bovine-news/docs/image-list.md)
- [Testing Guidelines](file:///Users/ryanjohnson/Projects/nonsense/bovine-news/docs/testing.md)
- [Agent Operating Guidelines](file:///Users/ryanjohnson/Projects/nonsense/bovine-news/AGENTS.md)
