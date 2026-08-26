# Data sources and licensing

Living Tamil uses local Markdown as its canonical editorial layer. External APIs and collections are source material or optional enrichment; they are not imported blindly.

| Source | Access | Stated licence | MVP use |
| --- | --- | --- | --- |
| Tamil Virtual Academy | Web collection | CC BY-SA 4.0 for TVA-owned text, images, audio, video and data | Source references and editorial research |
| Tamil Wikisource | MediaWiki REST/Action APIs | Public domain or CC BY-SA compatible works | Planned public-domain text lookup |
| Senkanthal Thirukkural API | REST JSON | MIT | Optional `/api/thirukkural/random` enrichment |
| CICT Digital Library | IIIF Presentation/Image APIs | Item-specific; examples include CC BY and CC BY-NC | Linked research only until each manifest is checked |
| Sentamizh Corpus | Repository/dataset | Apache-2.0 at dataset level | Candidate structured import; inherited fields require provenance review |
| Project Madurai | HTML/PDF electronic texts | Reuse conditions vary; site describes personal-use downloads | Linked research; no bulk commercial import in this MVP |

## Required editorial rule

Every discovery must declare `sourceTitle`, `sourceUrl`, `license`, and `reviewStatus`. A source collection's openness does not automatically clear every modern translation, commentary, photograph, recording, or derived edition.

## Product content licence

The software repository currently carries an MIT code licence. Before accepting public content contributions, add a separate content contribution agreement and an explicit content licence—recommended: CC BY-SA 4.0 for original editorial material.
