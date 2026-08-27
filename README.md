# Living Tamil

Living Tamil is an open-source, mobile-first cultural discovery app for young Tamil speakers. It turns trustworthy Tamil literature and history into short, connected journeys: original Tamil, simple Tamil, English, context, and a visible source.

The product thesis is intentionally narrow: **help someone understand one meaningful piece of Tamil in five minutes, then give them a reason to continue the journey.** Read the evidence and decisions behind it in [docs/RESEARCH.md](docs/RESEARCH.md).

## What the MVP contains

- 13 Markdown discoveries across three journeys
- A layered contextual reader and searchable discovery library
- Local journey progress and bookmarks
- A complete in-app Thirukkural library: 1,330 Kurals, 3 Paals, 133 Athikaarams, search, filters, Tamil commentaries, and English meanings
- Cached server-side integration with the Senkanthal and nramc Thirukkural APIs
- Source, licence, attribution, and review status in the editorial model

This is a functional product prototype, not a finished scholarly edition. Public user validation and expert review are still required.

## Run locally

```bash
npm install
npm run dev
```

Development runs at [http://localhost:4050](http://localhost:4050).

To test the production build:

```bash
npm run build
npm run start
```

Production runs at [http://localhost:4060](http://localhost:4060).

## Content architecture

Local Markdown in `content/discoveries` is the canonical editorial layer. Copy an existing discovery, preserve its frontmatter, and provide the sections `Hook`, `Original`, `Simple`, `English`, `Context`, and `Today`. The build adds it to journeys, search, and static routes.

External APIs supply structured source material; they do not replace editorial judgment. See [docs/SOURCES.md](docs/SOURCES.md) and [docs/EDITORIAL_POLICY.md](docs/EDITORIAL_POLICY.md).

## Contributing and project direction

Start by opening a structured issue. Once its scope is accepted and assigned, work from `dev` on a dedicated branch and submit a linked pull request back to `dev`. Maintainers review before merge; culturally sensitive or scholarly material can require an additional subject review. Read the [contribution guide](CONTRIBUTING.md) before beginning substantial work.

- [Research and product thesis](docs/RESEARCH.md)
- [Roadmap](docs/ROADMAP.md)
- [Source and rights register](docs/SOURCES.md)
- [Editorial policy](docs/EDITORIAL_POLICY.md)
- [Contribution guide](CONTRIBUTING.md)
- [Security policy](SECURITY.md)
- [Community standards](CODE_OF_CONDUCT.md)

Items marked `needs-scholar-review`, `needs-archaeology-review`, or `draft` must never be presented as expert-reviewed. Corrections with reliable sources are especially welcome.

## Licensing

The software is licensed under the [MIT License](LICENSE). Original Living Tamil editorial contributions are licensed under [CC BY-SA 4.0](CONTENT_LICENSE.md). Third-party texts, translations, commentaries, images, audio, and API responses retain their own rights and must be checked item by item. The project name and visual identity are not granted as trademarks by either licence.
