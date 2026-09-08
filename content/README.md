# Editorial content

Each Markdown file becomes a discovery page and an item in the home library.

Required frontmatter:

- `title`, `tamilTitle`
- `journey`, `journeyTitle`, `order`
- `duration`, `category`, `accent`, `summary`
- `sourceTitle`, `sourceUrl`, `license`, `reviewStatus`

Required sections:

- `## Hook`
- `## Original`
- `## Simple`
- `## English`
- `## Context`
- `## Today`

Do not use AI-generated cultural claims as sources. AI may assist drafting, but a named reviewer should verify language, interpretation, history, and rights before an item is marked reviewed.
# Optional contextual words

Discoveries may include a `## Words` section after the core reader sections. Add one reviewed annotation per line using:

```text
Tamil term | simple Tamil meaning | English meaning | direct source URL | review status
```

Meanings must describe the word in that discovery's context. Do not imply that a contextual gloss is the only possible meaning. Every annotation inherits the project's source, rights, and human-review requirements.

## Editorial review evidence

`reviewStatus: reviewed` is allowed only when `reviewer`, `reviewDate` (`YYYY-MM-DD`), and `reviewScope` are present. Do not invent or infer identity. Pending records omit those fields and remain visibly pending. Optional `## Revision history` entries should state the date, change, issue or pull request, and responsible contributor without rewriting history.

An optional checkpoint uses four lines under `## Checkpoint`: question, pipe-separated choices, zero-based answer index, and explanatory feedback. Checkpoints reinforce understanding; they do not gate progress or assign scores.
