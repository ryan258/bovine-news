# Image Registry & Asset Guide

All production image assets are deployed in `static/images/` as 16:9 WebP files formatted at 1920×1080.

**Visual Aesthetic:** Authentic local television news presentation with plush bovine journalism—overlit studio lighting, dramatic angles, exaggerated cow facial expressions, and tabloid chyron-ready framing.

---

## 1. Team Portraits

Used in `layouts/team/single.html`, reporter bylines, and author cards (`content/team/*.md`).

| Destination | Subject / Beat | Visual Description |
|---|---|---|
| `static/images/team/bessie-barnes.webp` | Bessie Barnes (Chief Investigative Reporter) | Navy blazer, squinting with intense suspicion directly at camera like she is about to blow the lid off something, harsh studio key light. Also featured on Weather page. |
| `static/images/team/clyde-calf.webp` | Clyde Calf (Field Reporter) | Windbreaker, mid-shout into a microphone, fur whipped sideways in front of dramatic off-frame field event. |
| `static/images/team/dairy-dan.webp` | Dairy Dan (Senior Evening Anchor) | Older distinguished bull in navy suit and red tie, arms crossed, chin raised, studio backdrop with soft blue fill. |
| `static/images/team/mooira-nav.webp` | Mooira Nav (Chief Meteorologist) | Blue blazer, manic excitement, mid-gesture pointing at an incoming storm system. Also featured on Weather page quote card. |
| `static/images/team/patty-page.webp` | Patty Page (Morning Co-Anchor) | Red blazer, warm television smile, upright posture, hands folded on anchor desk. |
| `static/images/team/tex-longhorn.webp` | Tex Longhorn (Sports Director) | Gold blazer, mid-laugh with mouth wide open, novelty tie, locker-room studio backdrop. |

---

## 2. News Article Heroes

Used in `layouts/news/single.html` (article hero), `story-card.html`, `list-item.html`, and section feeds.

| Destination | Article Slug | Visual Description |
|---|---|---|
| `static/images/news/barn-dance-headliner-announced.webp` | `barn-dance-headliner-announced` | Spotlighted banjo player on outdoor stage, crowd of cows staring blankly, festival string lights overhead. |
| `static/images/news/barn-specialist-visa-fee.webp` | `barn-specialist-visa-fee` | Bureaucratic pasture visa checkpoint with clipboard-bearing cow examining credentials. |
| `static/images/news/championship-herd-advances-to-finals.webp`★ | `championship-herd-advances-to-finals` | Floodlit sports field, bulls colliding in overtime scrum, flying turf, blurred scoreboard. |
| `static/images/news/city-council-approves-park-plan.webp`★ | `city-council-approves-park-plan` | Packed council chamber at night, exhausted cow official at podium, late clock, folding chair spotlighted. Also featured in Weather camera previews. |
| `static/images/news/creekside-park-expansion-announced.webp`★ | `creekside-park-expansion-announced` | Ground-breaking ceremony with cow in hard hat holding ceremonial shovel, park bench staged in foreground. Also featured in Weather camera previews. |
| `static/images/news/dairy-prices-five-year-high.webp`★ | `dairy-prices-five-year-high` | Low-angle towering hay bale stack, cow standing beside it looking personally offended, warehouse lighting. Also featured in Weather related stories. |
| `static/images/news/herd-election-mail-ballots.webp` | `herd-election-mail-ballots` | Stacked ballot drop-boxes at the pasture fence line with official election cow monitoring submissions. |
| `static/images/news/investigation-illegal-salt-lick.webp` | `investigation-illegal-salt-lick` | Grainy handheld night shot behind feed supply warehouse, flashlight beam cutting across salt lick evidence. |
| `static/images/news/local-calf-wins-science-fair.webp` | `local-calf-wins-science-fair` | Proud young calf beside pasture-rotation diorama with blue ribbon, gymnasium fluorescent lights. |
| `static/images/news/mysterious-gate-opens-overnight.webp`★ | `mysterious-gate-opens-overnight` | Foggy pasture at dawn, metal gate standing wide open into empty field, single set of hoofprints stopping abruptly. |
| `static/images/news/north-forty-hay-tariff-standoff.webp` | `north-forty-hay-tariff-standoff` | Standoff at the North Forty boundary line over disputed hay tariffs. |
| `static/images/news/robotic-feeding-system.webp` | `robotic-feeding-system` | Robotic feeder arm dispensing into trough while cow glares jealously from behind partition. |
| `static/images/news/severe-thunderstorm-western-pasture.webp` | `severe-thunderstorm-western-pasture` | Storm-chaser shot of lightning and dark shelf cloud over pasture, cow pointing at sky. Also featured in Weather related stories. |
| `static/images/news/traffic-delayed-cows-intersection.webp` | `traffic-delayed-cows-intersection` | Aerial traffic-cam view of busy intersection blocked by cows having an impromptu meeting. Also featured in Weather camera previews and stories. |
| `static/images/news/water-trough-strait-delays.webp` | `water-trough-strait-delays` | Bottleneck at the central water trough strait causing logistics backup. |

★ = Reused in homepage hero carousel (`layouts/partials/hero.html`).

---

## 3. Section Modules & Weather Dashboard

Generic scene-setters and dashboard panels.

| Destination | Used In | Visual Description |
|---|---|---|
| `static/images/modules/dont-miss-barn-dance.webp` | `layouts/partials/dont-miss.html` | Wide festival establishing shot with string lights and excited cow audience. |
| `static/images/modules/sports-game-day.webp` | `layouts/partials/sports-widget.html` | Under-the-lights football suspended mid-air over scrum of bulls. |
| `static/images/modules/weather-radar-coming-soon.webp` | `layouts/weather/list.html` & `radar.html` | Vivid radar storm swirl graphic overlaid on dark pasture sky. |

---

## 4. Video & Livestream Assets (Deferred)

The video subsystem is dormant (`params.features.video = false` in `hugo.toml`). Video asset production is deferred until video features are re-enabled.
