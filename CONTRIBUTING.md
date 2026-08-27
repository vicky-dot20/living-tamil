# Contributing to Living Tamil

Living Tamil welcomes code, design, accessibility, Tamil-language editing, historical research, source verification, and rights-review contributions.

## Contribution workflow

Please do not begin substantial work with an unsolicited pull request. The normal workflow is:

1. Search existing issues and the roadmap to avoid duplicate work.
2. Open the appropriate **bug**, **feature**, or **content/research** issue using the repository form.
3. Agree on scope, sources, rights concerns, and acceptance criteria with a maintainer.
4. Wait until a maintainer marks the issue `status: ready` and assigns it to you. Small typo or documentation fixes may skip this approval.
5. Fork the repository and create a branch from the latest `dev` branch.
6. Make focused commits for that single issue.
7. Open a pull request into `dev` and link it with `Closes #123`.
8. Address automated checks and maintainer, editorial, or scholarly review.
9. A maintainer merges the pull request. Contributors should not merge their own pull requests.

Use branch names such as `feature/123-short-name`, `fix/123-short-name`, `content/123-short-name`, or `docs/123-short-name`. Keep one issue per branch and pull request. Maintainers periodically promote reviewed work from `dev` to `main`; `main` represents the public stable state.

Opening an issue does not reserve the work. Assignment prevents two contributors from implementing the same change.

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
- The pull request targets `dev`, links its issue with `Closes #...`, and stays within the agreed acceptance criteria.
- Commits are focused and do not include unrelated formatting or generated files.

## Review and merge policy

All pull requests require maintainer review. Changes to Tamil text, translation, history, etymology, archaeology, or cultural interpretation may also require a qualified editorial reviewer. Approval of code does not imply scholarly approval. Maintainers may request revisions, reduce scope, or close inactive work; decisions should be explained on the issue or pull request.

Use squash merge for ordinary feature branches unless preserving separate commits materially helps the project history. Delete the source branch after merge. Security vulnerabilities follow [SECURITY.md](SECURITY.md), not public issues.

By submitting a contribution, you agree that code is provided under MIT and your original editorial content under CC BY-SA 4.0. See [CONTENT_LICENSE.md](CONTENT_LICENSE.md).

Participation is governed by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
