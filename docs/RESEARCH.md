# Living Tamil: research, opportunity, and product thesis

**Status:** working research brief for contributors  
**Purpose:** preserve the evidence and reasoning that shaped the MVP, distinguish facts from hypotheses, and guide what to test next.

## Executive summary

Tamil does not lack digital content. It has major archives, dictionaries, learning portals, digitization projects, reading platforms, and increasingly capable language technology. The opportunity is not another enormous collection or “the digital ecosystem for Tamil.” The observed gap is a trustworthy, contemporary consumer experience that helps an interested person discover difficult cultural material, understand it quickly, and return to continue a meaningful path.

Living Tamil therefore starts with this proposition:

> A daily guided-discovery app that helps young Tamil speakers understand the language and culture they inherited but were never given an accessible way to explore.

The initial audience is Tamil-speaking young adults, approximately 18–30, who can speak or recognize Tamil but find classical literature and cultural history difficult, scattered, or time-consuming. This audience and the retention thesis remain hypotheses to validate, not demographic facts.

## How the direction changed

The original question was broad: what websites and apps exist for Tamil language, literature, Sangam material, history, and technology—and is a new app worth building?

The first temptation was a comprehensive Tamil knowledge product. Ecosystem research changed that direction. Strong projects already perform preservation, digitization, formal learning, dictionary lookup, reading, and even Sangam exploration. A new product needs a sharper job rather than a larger feature list.

## Existing digital ecosystem

### Archives and references

- [Project Madurai](https://www.projectmadurai.org/index_en.html), active since 1998, publishes free electronic editions of Tamil literary works in formats including HTML and PDF. Its value is preservation and access; reuse conditions still need checking per edition.
- [Tamil Virtual Academy](https://www.tamilvu.org/en/library-content) provides literature, dictionaries, history, folklore, children's material, and media. TVA states that TVA-owned content is under [CC BY-SA 4.0](https://www.tamilvu.org/coresite/html/free-content-mediaen.htm), but ownership and item-level terms still matter.
- [CICT Digital Library](https://www.digitalarchives.cict.in/) exposes digitized manuscripts and classical works with OCR and IIIF. Rights vary by item, including CC BY and CC BY-NC examples.
- [Tamil Wikisource](https://wikisource.org/wiki/Help%3ACopyright) supports collaborative transcription of public-domain and freely licensed texts.
- The [University of Madras Tamil Lexicon](https://dsal.uchicago.edu/dictionaries/tamil-lex/) is a major scholarly lexical reference.

**Finding:** preservation and source access are substantial. Duplicating an archive is unlikely to create a daily consumer habit by itself.

### Products and direct competitors

- [SangamTamil](https://www.sangamtamil.com/) presents thousands of Sangam poems across the canonical works with explanations, translations, thinai classification, knowledge-graph elements, games, and quizzes.
- [TamilTimeline](https://tamiltimeline.com/) offers an interactive route through Tamil history.
- [Tamilcube](https://tuition.tamilcube.com/), [Tamil Virtual Academy](https://www.tamilvu.org/), and Tamil Nadu's [DIKSHA](https://diksha.gov.in/tn/) serve formal and diaspora learning.
- Modern reading and audio platforms such as Pratilipi and Storytel compete for reading attention.
- [Agarathi](https://agarathi.com/) offers large-scale Tamil dictionary search and a paid API.

**Finding:** “Tamil literature in an app,” an interactive timeline, a dictionary, or a conventional course is not enough differentiation. Living Tamil must compete on comprehension, editorial trust, product taste, and a journey-shaped return loop.

### Language technology

[AI4Bharat](https://ai4bharat.iitm.ac.in/) and the wider Indic open-source ecosystem provide translation, transliteration, speech recognition, text-to-speech, language models, and datasets. These reduce implementation cost, but are increasingly infrastructure rather than a defensible consumer product.

**Finding:** AI can assist search, drafting, accessibility, and personalization behind the scenes. A generic Tamil chatbot is easy to copy and difficult to trust; it should not be the core proposition.

## The unmet job

Valuable information is distributed across archives, institutional portals, specialist interfaces, PDFs, editions, and isolated social posts. A curious non-specialist still has to decide where to begin, decode unfamiliar language, establish context, and judge trustworthiness.

Living Tamil's proposed job is:

> Help me discover and genuinely understand one fascinating piece of Tamil culture in about five minutes, without hiding the original or the source.

This is an editorial and interaction problem as much as a data problem. The product adds value by choosing, sequencing, explaining, connecting, and citing—not by placing an external link where an explanation should be. Links remain for verification and deeper study.

## Product decision

### Journeys, not random facts

Random facts create novelty; progression creates a reason to return. The home screen may say “Today's discovery,” while the product structure is:

```text
Journey
└── The Five Landscapes
    ├── Discovery 1
    ├── Discovery 2
    └── …
```

The first journey, **The Five Landscapes**, introduces Sangam poetic landscapes through questions such as why mountains became associated with secret love. It is bounded enough to test and rich enough to demonstrate the layered reader.

### The core reading stack

```text
Original Tamil
→ word or line assistance
→ simple Tamil
→ English
→ why it matters
→ trusted source
```

Translation alone can flatten a source; original text alone excludes the intended reader; context without provenance asks for unearned trust.

### Deliberate exclusions

The MVP avoids a universal Tamil chatbot, massive knowledge graph, API-first platform, replacement archive, OCR product, unmoderated social network, and broad school curriculum. These may become tools or later layers, but each expands scope before the central behavior is proven.

## Data and rights research

The app currently uses two Thirukkural services:

- [Senkanthal Thirukkural API](https://github.com/senkanthal/thirukkural-api): an MIT-licensed repository exposing the 1,330 original couplets, Paals, and Athikaarams. The API uses `$` as a line separator.
- [nramc Thirukkural API](https://github.com/nramc/thirukkural-api): an MIT-licensed repository used for attributed Tamil commentaries and English meanings.

An MIT licence on API software does not automatically prove that every modern commentary or translation in its dataset can be redistributed under MIT. Those fields remain attributed and provisional pending a source-by-source rights review. The [Sentamizh Corpus](https://github.com/indic-corpora/sentamizh-corpus) is a promising Apache-2.0 dataset, but inherited translations and source fields require the same provenance check.

Under India's Copyright Act, literary copyright generally continues for the author's life plus sixty years, with separate rules for government and other works ([Copyright Act, Chapter V](https://copyright.gov.in/Copyright_Act_1957/chapter_v.html)). Ancient originals may be public domain while a modern translation, commentary, performance, scan, photograph, or edited database remains protected. This motivates the repository's separation of code, original editorial content, and third-party rights.

This is a project risk framework, not legal advice.

## Validation plan

The codebase proves that the experience can be built; it does not prove demand. The strongest early test is one excellent discovery shown to real users, followed by a short journey.

“Nice design” and “good information” are weak signals. Stronger signals are spontaneous surprise, finishing the item, opening the next item, returning later, saving or sharing, and asking for another journey.

Primary measures:

1. discovery completion;
2. next-discovery continuation;
3. Day 2 and Day 7 return;
4. journey completion;
5. saves and shares;
6. voluntary requests for new subjects;
7. correction and trust feedback.

Before deployment, local testing can validate comprehension with 10–20 target users, improve onboarding, add privacy-conscious event logging, establish editorial review, test offline/PWA behavior, and prepare direct shareable routes.

## Expansion logic

Research identified contextual reading and diaspora family cultural learning as especially promising. Other possibilities include vocabulary through culture, dialect assistance, creator localization, oral history, schools, maps, and manuscript tooling. They should follow evidence, not lead it.

```text
Daily discovery
→ more journeys
→ contextual reader
→ language through culture
→ diaspora and family experience
→ broader Tamil knowledge system
```

Each arrow is conditional on demonstrated use.

## Known risks

- **Editorial trust:** oversimplification or invented certainty would destroy the differentiator.
- **Rights:** modern commentary and translation provenance must be resolved before broad distribution or monetization.
- **Retention:** cultural admiration does not automatically become daily behavior.
- **Audience breadth:** “Tamil people” is not one useful segment; ability, geography, and diaspora context vary.
- **Content operations:** excellent journeys require sustained research, Tamil editing, translation, and expert review.
- **Dependency resilience:** public APIs may change; canonical editorial material should remain local and traceable.

## Current conclusion

Living Tamil is worth pursuing as a focused, testable product—not because Tamil identity guarantees adoption, but because strong cultural resources still lack a consistently simple, trustworthy, journey-shaped consumer layer. The MVP makes that thesis concrete. The next milestone is proving that carefully layered discoveries create comprehension, trust, and return behavior.

## Maintaining this research

This document records the reasoning as of August 2026. Update it when competitors, source licences, interviews, metrics, or contrary evidence change a conclusion. Add evidence and dates; do not rewrite old hypotheses as if they had always been facts.
