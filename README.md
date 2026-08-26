# Living Tamil

A mobile-first, open-source cultural discovery product for young Tamil speakers. The MVP turns trusted Tamil material into short, connected journeys with original Tamil, simple Tamil, English, context and visible provenance.

## MVP contents

- 13 shareable discoveries across three journeys
- Markdown-based editorial content in `content/discoveries`
- Original Tamil, simple Tamil and English reading modes
- Searchable discovery library
- Local journey completion and bookmark persistence
- Source, licence and review status on every item
- Optional cached proxy for the MIT-licensed Senkanthal Thirukkural API
- Complete in-app Thirukkural library with 1,330 couplets, three Paals, 133 Athikaarams, Tamil-text/number search, filters, and copy actions
- Static generation for every discovery route

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Add a discovery

Copy one file in `content/discoveries`, keep the frontmatter fields, and write the six sections: `Hook`, `Original`, `Simple`, `English`, `Context`, and `Today`. The build automatically adds the item to its journey, search index and static routes.

## Editorial status

The interface and reading experience are a product prototype. Items marked `needs-scholar-review` or `needs-archaeology-review` must not be represented as expert-reviewed. Maintain a source and licence record for every text, translation, image and recording added to the project. See `docs/SOURCES.md`.
