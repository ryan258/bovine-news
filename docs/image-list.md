# Image List — Current Mockup

Every image slot on the site is currently the `media-plate` SVG placeholder (camera icon) — no `<img>` wiring exists yet. This list is prep for when real images get dropped in.

**Spec for every image:** 16:9, saved at 1920×1080. Style: shot-on-a-local-news-camera energy — slightly overlit, dramatic angle, exaggerated expression on the cow, tabloid chyron-bait framing. This is a satire site; the images should look like they're trying too hard to get a click, not like stock photography.

Destination paths assume `static/images/...` (doesn't exist yet — create it when you save these).

## Team portraits

`layouts/team/single.html` — one per person, from `content/team/*.md`.

| Destination | Prompt |
|---|---|
| `static/images/team/bessie-barnes.webp` | Local-news headshot of an investigative-reporter cow, navy blazer, squinting with intense suspicion directly at camera like she's about to blow the lid off something, harsh studio light, slightly too close to the lens |
| `static/images/team/clyde-calf.webp` | Local-news headshot of a young field-reporter calf, windbreaker, mid-shout into a microphone, hair (fur) whipped sideways as if standing in front of something dramatic just off-frame |
| `static/images/team/dairy-dan.webp` | Local-news anchor headshot of an older, distinguished bull in a navy suit and red tie, arms crossed, chin raised, "trust me" expression, studio backdrop with soft glow |
| `static/images/team/mooira-nav.webp` | Local-news meteorologist cow headshot, blue blazer, wild-eyed manic excitement, mid-gesture like she's pointing at an incoming storm system, slightly unhinged energy |
| `static/images/team/patty-page.webp` | Local-news co-anchor headshot of a cow in a red blazer, warm plastic smile, perfect posture, hands folded on an anchor desk |
| `static/images/team/tex-longhorn.webp` | Local-news sports anchor headshot of a longhorn steer in a gold blazer, mid-laugh with mouth wide open like he just told the funniest stat of the night, big novelty tie |

## News article images

`layouts/news/single.html` (article hero) — same image also feeds `story-card.html` and `list-item.html` wherever that story is listed. Five of these (marked below) also feed the homepage hero carousel via `hero.html`, and one also feeds the `/news/` lead story via `breaking_news`.

| Destination | Article | Prompt |
|---|---|---|
| `static/images/news/barn-dance-headliner-announced.webp` | Barn Dance Festival headliner | Wide shot of a single spotlighted man awkwardly playing a banjo on an outdoor stage, a crowd of cows in the foreground staring blankly, festival string lights overhead, framed like a huge reveal |
| `static/images/news/championship-herd-advances-to-finals.webp`★ | Bulls advance to finals | Chaotic overtime moment on a floodlit sports field, bulls mid-collision in a scrum, dirt flying, scoreboard visible and blurry in the background, freeze-frame action-shot energy |
| `static/images/news/city-council-approves-park-plan.webp`★ | Council approves park plan | Packed city council chamber at night, exhausted-looking cow official mid-gesture at a podium, wall clock prominently showing a very late hour, one folding chair spotlighted as if it's the star of the story |
| `static/images/news/creekside-park-expansion-announced.webp`★ | Creekside Park groundbreaking | Ground-breaking ceremony with a cow in a hard hat holding an oversized ceremonial shovel over dirt, a single park bench staged dramatically in the foreground like the hero of the shot |
| `static/images/news/dairy-prices-five-year-high.webp`★ | Hay prices five-year high | Dramatic low-angle shot of a hay bale stack towering over camera like a skyscraper, a cow standing beside it looking personally offended, golden-hour warehouse lighting |
| `static/images/news/investigation-illegal-salt-lick.webp` | Illegal salt lick investigation | Grainy, handheld-style night shot behind a feed supply warehouse, flashlight beam cutting across an unassuming salt lick like it's evidence at a crime scene, "DO NOT CROSS"-style tape optional |
| `static/images/news/local-calf-wins-science-fair.webp` | Calf wins science fair | Proud young calf standing next to an elaborate pasture-rotation diorama with a blue ribbon, judges in the background applauding with exaggerated enthusiasm, gymnasium fluorescent lighting |
| `static/images/news/mysterious-gate-opens-overnight.webp`★ | Mysterious gate opens overnight | Foggy pasture at dawn, a single metal gate standing wide open with nothing but empty field beyond it, one set of hoofprints leading up to it and stopping, ominous backlighting |
| `static/images/news/robotic-feeding-system.webp` | Robotic feeding system | Sleek robotic feeder arm dispensing feed into one trough while a cow glares jealously from behind a fence at a favored neighbor getting extra portions, sci-fi-meets-farm lighting |
| `static/images/news/severe-thunderstorm-western-pasture.webp` | Severe thunderstorm watch | Dramatic storm-chaser-style shot of black storm clouds and lightning over an open pasture, a meteorologist cow in the foreground pointing at the sky with wild excitement |
| `static/images/news/traffic-delayed-cows-intersection.webp` | Traffic delayed by herd | Aerial/traffic-cam angle of a busy intersection completely blocked by a herd of cows standing in a loose circle as if having a meeting, backed-up cars and a furious driver visible |

★ = also used as a homepage hero carousel slide (`ratio: hero`, full-bleed widescreen — same file works, just make sure the main subject isn't too close to the left/right edges since the carousel crops wider than the article view).

## Homepage / section modules

Not tied to a specific article — generic scene-setters.

| Destination | Used in | Prompt |
|---|---|---|
| `static/images/modules/dont-miss-barn-dance.webp` | `dont-miss.html` featured event (`data/events.yaml`) | Wide festival establishing shot, string lights, a banjo player on a small stage, crowd of cows with excited expressions, "you won't believe this lineup" energy |
| `static/images/modules/sports-game-day.webp` | `sports-widget.html` homepage teaser | Dramatic under-the-lights shot of a football stuck mid-air over a chaotic scrum of bulls, motion blur, "GAME DAY" tabloid energy |
| `static/images/modules/weather-radar-coming-soon.webp` | `weather/list.html` radar placeholder | Ominous radar-green storm swirl graphic overlaid on a dark pasture sky, ready to be swapped for a real radar feed later |

## Not needed right now

Video section (`content/video/*`, `layouts/video/*`) is disabled — `params.features.video = false` in `hugo.toml`, and `content/video/_index.md` cascades `build.render/list: never` to every video page. Skip those images until video is turned back on.
