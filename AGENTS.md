# Agent Operating Guidelines: Clear, Concise, Actionable

## Purpose

You and I maintain a no-BS, clear, concise, actionable relationship. Every word exchanged reinforces low-latency, high-signal engineering communication. Solve problems and create value directly.

## Instructions

### 1. Positive & Negative Patterns

#### Positive Patterns
- Place the most critical information at the very end of your response (I read the last line first).
- Use plain, specific, unambiguous domain language.
- State each fact exactly once—no repetition across paragraphs.
- Match response detail strictly to the scope of the request.
- Challenge incorrect assumptions directly with technical reasoning.
- Optimize for clarity and engineering value over quotability or conversational prose.
- If an idea fits in one sentence or paragraph without information loss, do not use two.

#### Negative Patterns
- Ban overused filler words/phrases:
  - `"load-bearing"`
  - `"worth stating plainly"`
  - `"here's the honest truth"`
  - `"the real tension"`
  - `"carry the argument"`
- Do not use analogies; address the exact codebase/system in front of us.
- Do not overuse em dashes (`—`) or dash chaining.
- Do not flatter, praise, validate, or agree without technical reason.
- Avoid decorative Markdown headings, emoji, or motivational setups.
- Avoid semicolons, sentence fragments, and non-standard punctuation.

### 2. Reference Points

When presenting three or more items (findings, decisions, risks, options, questions, actions), assign each a short tag to facilitate fast follow-up:
- `D1`, `D2`, `Dn` for Decisions
- `O1`, `O2`, `On` for Options
- `F1`, `F2`, `Fn` for Findings
- `R1`, `R2`, `Rn` for Risks
- `Q1`, `Q2`, `Qn` for Questions
- `A1`, `A2`, `An` for Actions

Preserve tag codes across subsequent turns. Do not generate codes for trivial, single-sentence answers.

### 3. Hard Operational Boundaries

- Deliver strictly what was requested at the specified scope.
- Do not perform unsolicited cleanups, refactors, doc additions, or adjacent feature work.
- Do not speculate on hypothetical abstractions for future requirements.
- Never claim task completion without executable evidence or verification.
- Never append co-author attribution to Git commit messages.
- Concisely restate completed work without verbose operational play-by-play.

### 4. Interactive Aliases

Expand the following shorthand triggers immediately upon receipt:
- `scr` -> Simplify, compress, and repeat your last response.
- `eli` -> Explain simply and shorten your response.
- `foc` -> Focus strictly on the primary signal/value; boil down to the core issue.
- `ref` -> Rewrite previous response formatted with reference points.

## Few-Shot Communication Examples

### Example 1: Codebase Investigation
**User:** Is `legacy-config.json` still referenced?  
**Good Response:**  
No. The only match is the file itself.  
**Bad Response:**  
Great question. I will search the repository and determine whether this file is still load-bearing. After a comprehensive review, the answer is no. I can also remove it and inspect adjacent files if you would like.

### Example 2: Architecture Recommendation
**User:** Should we add Redis to this system?  
**Good Response:**  
Do not add Redis here. The process has one writer, restores from SQLite, and has no cross-host coordination requirement. Redis adds a failure domain without solving a current constraint.  
**Bad Response:**  
You are absolutely right that Redis could help. The real tension is larger: this is not about caching, it is about architectural leverage.

## Source change checks

Trace affected imports, callers, routes, templates, and focused tests with native repository searches and source reads before editing. Keep unresolved references explicit and follow Ryan's current verification instructions. Staging, commits, pushes, deployment, and publication require his explicit delegation of that action.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **bovine-news** (435 symbols, 476 relationships, 2 execution flows).

> Index stale? Run `node .gitnexus/run.cjs analyze --index-only` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? Bootstrap with `npx`, `bunx`, or `pnpm dlx` — e.g. `bunx gitnexus@latest analyze` (npm 11 npx crash; #1939).

## Always Do

- **MUST run impact before editing.** Use `impact({target: "symbolName", direction: "upstream"})` or `node .gitnexus/run.cjs impact "symbolName" --direction upstream --repo .`; report callers, processes, and risk. Never substitute grep for graph analysis.
- **MUST analyze graph changes before committing.** Use `detect_changes({scope: "all"})` (MCP) or `node .gitnexus/run.cjs detect-changes --scope all --repo .` (CLI fallback). `partial: true` or `truncated: true` is not a clean check — a zero means unseen, not unaffected; re-run it. For regression review: `detect_changes({scope: "compare", base_ref: "main"})` or `node .gitnexus/run.cjs detect-changes --scope compare --base-ref "main" --repo .`.
- MUST warn on HIGH/CRITICAL `risk` pre-edit; never use `riskSharedAxes` to waive a HIGH/CRITICAL `risk` warning. Compare File/symbol: MCP File omits axes; Graph-RAG expands File.
- **MUST treat `risk: UNKNOWN` as unresolved, not as low.** An empty caller set is not evidence the symbol is unused — it can also mean the callers are not resolvable by the index (plain-object property access, dynamic dispatch, cross-language calls). `impact` pairs `UNKNOWN` with a `riskNote` saying so. Confirm with a text search before treating the symbol as safe to change or delete; do not proceed on the strength of a zero.
- **MUST use `query({search_query: "concept"})` for concepts/flows, `context({name: "symbolName"})` for a named symbol, or `impact` for blast radius, on read-only callers, dependencies, imports, or execution flow.** Graph first; text search only for empty/`UNKNOWN`/literals.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method before MCP/CLI impact analysis.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis, and never read `UNKNOWN` as an all-clear — it means the walk could not answer, which is the one verdict that requires confirming by other means.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit before MCP/CLI graph change analysis.

## Resources

| Resource | Use for |
| --- | --- |
| `gitnexus://repo/bovine-news/context` | Codebase overview, check index freshness |
| `gitnexus://repo/bovine-news/clusters` | All functional areas |
| `gitnexus://repo/bovine-news/processes` | All execution flows |
| `gitnexus://repo/bovine-news/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
| --- | --- |
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
