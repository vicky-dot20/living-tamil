# Version roadmap: v0.2 to v0.5

This roadmap turns Living Tamil into a larger but still trustworthy cultural discovery product. Version numbers represent user-visible capability, not the amount of code merged.

## Release rules

- Each version is implemented in its own branch and lands as one release commit.
- Every change begins with an issue assigned to one milestone.
- Engineering completion never implies scholarly or rights approval.
- Imported records require an item-level source URL, licence state, and review state.
- `feature -> dev` uses squash merge; `dev -> main` uses a merge commit.

## v0.2.0-alpha.1: functional MVP baseline

The current baseline contains guided Markdown journeys, the complete Kural index, focused Kural reading, local progress, correction links, private local metrics, sharing metadata, and PWA foundations. Issues #14 and #15 remain release risks rather than silently accepted debt.

## v0.3.0: library foundation

Goal: make a larger Tamil catalogue discoverable without copying uncleared modern material.

Planned cards:

1. Define work, author, period, genre, source, licence, and review schemas.
2. Build an item-level provenance registry and automated dataset validation.
3. Add a Tamil Wikisource catalogue adapter with caching and failure states.
4. Add unified search across journeys, discoveries, Kurals, authors, and works.
5. Curate the first 75 reusable catalogue records with direct source links.
6. Add catalogue browsing by period, genre, and review/licence status.

Exit criteria: 75 validated records, no unlabelled rights state, accessible search, passing CI, and documented source decisions.

## v0.4.0: understanding and learning

Goal: help readers retain words and ideas rather than merely browse them.

Planned cards:

1. Add contextual word annotations to the Markdown content model.
2. Add a local personal glossary with export and clear controls.
3. Add reader preferences for Tamil size, spacing, and default language layer.
4. Add optional journey checkpoints with explanations rather than scores alone.
5. Add saved collections and a unified recent-reading trail.
6. Add explicit offline collection management and update status.

Exit criteria: learning state remains local and resilient, controls meet keyboard/screen-reader expectations, and offline content can be updated or removed deliberately.

## v0.5.0: trustworthy community MVP

Goal: make the project ready for sustained public contribution and moderated user validation.

Planned cards:

1. Add reviewer identity, review date, scope, and revision history to editorial records.
2. Build a maintainer-facing content and provenance status dashboard.
3. Complete the Five Landscapes expert-review workflow (#14).
4. Complete the Kural commentary and meaning rights audit (#15).
5. Publish three to five reviewed journeys and at least 150 catalogue records.
6. Run and document accessibility, performance, privacy, and comprehension checks.
7. Add deployment configuration, operational fallbacks, and a release checklist.

Exit criteria: no content is presented above its evidence level, critical rights states are resolved or restricted, the public build passes quality checks, and moderated user findings are documented.

## Dataset policy

Large-data growth begins with metadata and links. Full text is stored or cached only when the individual item permits redistribution. Tamil Wikisource items can carry public-domain, CC0, or CC BY-SA status, so rights are recorded per item. Tamil Virtual Academy material is used only when it appears in an explicitly reusable collection or permission has been obtained; general availability to read does not equal redistribution permission.

## Deferred beyond v0.5

- Generic AI chatbot
- Unmoderated social network
- Bulk import without item-level provenance
- Automatically generated translations presented as reviewed
- Commercial use of unresolved third-party commentary
