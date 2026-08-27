# Contributing to Living Tamil

Living Tamil welcomes code, design, accessibility, Tamil-language editing, historical research, source verification, and rights-review contributions.

## Start locally

1. Fork and clone the repository.
2. Run `npm install`.
3. Run `npm run dev` and open `http://localhost:4050`.
4. Before a pull request, run `npm run lint` and `npm run build`.

## Editorial contributions

Use an existing file in `content/discoveries` as the schema. Every discovery needs a source title, direct source URL, licence or rights status, and honest review status. Follow [docs/EDITORIAL_POLICY.md](docs/EDITORIAL_POLICY.md).

Do not submit:

- unsourced historical or linguistic claims;
- AI-generated facts or translations presented as authoritative;
- copyrighted modern translations, commentary, images, or audio without permission;
- a licence guess based only on the age of the original work;
- copied material whose provenance cannot be traced.

AI may assist drafting, comparison, transcription, or code, but the contributor remains responsible for verifying every claim, quotation, translation, source, and right.

## Pull-request checklist

- The change has a clear user or editorial purpose.
- Claims and quotations have direct, reliable sources.
- Third-party licences and attribution are recorded.
- Review status is not overstated.
- Tamil text has been checked by a competent reader when applicable.
- `npm run lint` and `npm run build` pass for code changes.
- The change does not contain personal data, credentials, or private research notes.

By submitting a contribution, you agree that code is provided under MIT and your original editorial content under CC BY-SA 4.0. See [CONTENT_LICENSE.md](CONTENT_LICENSE.md).
