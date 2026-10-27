# Bovine News Network — Development Roadmap

This roadmap tracks the delivery phases and milestones defined in [`spec.md`](file:///Users/ryanjohnson/Projects/nonsense/bovine-news/spec.md).

---

## Phase Status Summary

| Phase | Description | Status |
|---|---|---|
| **Phase 1: Foundation & Layouts** | Base Hugo setup, typographic system, core templates, robots.txt, 404 | **Completed** |
| **Phase 2: Editorial Architecture** | News, Sports, Weather, Opinion, Special Reports ("The Gate Files") | **Completed** |
| **Phase 3: Visual Artwork & Media** | Custom 16:9 WebP artwork for news heroes, team portraits, module teasers | **Completed** |
| **Phase 4: Weather Dashboard Revamp** | Modern responsive weather hub, radar preview, 7-day grid, cameras, trivia | **Completed** |
| **Phase 5: Display Controls & A11y** | Enforcement against empty `#` links and decorative app store download links | **Completed** |
| **Phase 6: Interactive Widgets & Polish** | Moo meter refinements, breaking overlay, dynamic radar simulations | **In Progress** |
| **Phase 7: Video & Livestream Subsystem** | Video hub, live broadcasts, clip archives, media players | **Deferred** |

---

## Completed Milestones

### Foundation & Information Architecture
- [x] Initial Hugo setup and responsive desktop/mobile layouts.
- [x] Complete editorial taxonomy: News, Sports, Weather, Opinion, Team, Special Reports, Contact, Corrections.
- [x] Breaking news ticker, hero carousel, trending bar, and sidebar widgets.
- [x] Investigative series ("The Gate Files") with timeline, evidence, and memo shortcodes.

### Visual Identity & Media
- [x] All primary news story hero images generated and integrated (`static/images/news/`).
- [x] Newsroom staff portrait suite deployed (`static/images/team/`).
- [x] Section scene-setters and radar graphic deployed (`static/images/modules/`).

### Weather Center Overhaul
- [x] Overhauled `layouts/weather/list.html` with grid-based layout matching modern television stations.
- [x] Integrated current pasture conditions card with high-priority cow correspondent imagery.
- [x] Added radar preview with precipitation gradient scale.
- [x] Added 7-day forecast cards with weather icons and rain probability.
- [x] Added live traffic/park camera still previews and display-only weather trivia.
- [x] Mobile/tablet responsive styling in `assets/css/main.css`.

### Quality & Standards Enforcement
- [x] Automated display controls test suite (`tests/display-controls.py`).
- [x] Eliminated dead anchor links (`href="#"`) across footer, header, contact, reporter cards, and team pages.
- [x] Replaced fake app download badges with transparent decorative preview copy.
- [x] GitNexus code intelligence index updated.

---

## Active & Near-Term Priorities

1. **Interactive Experience Enhancements:**
   - Client-side interactive trivia answer reveal for the weather dashboard.
   - Live radar animation or tile toggle.
   - Moo meter community feedback interaction.

2. **Search Experience:**
   - Refine client-side search index (`layouts/index.json`) and `/search/` results rendering.

3. **Editorial Expansion:**
   - Additional investigative dossiers following up on "The Gate Files".
   - Seasonal pasture sports tournament coverage.

---

## Deferred Items

- **Video & Livestream Hub:**
  - Disabled by scope override via `params.features.video = false` in `hugo.toml`.
  - To be activated only after sustainable production pipelines, accessible captioning, and video delivery infrastructure are established.
