# Changelog

## 1.0.0 — 2026-11-02

First release.

- **A reader, not a repertoriser.** Seventeen volumes from
  `drsamonline/homoeopathic-materia-medica-repertory-json` — 271,421 rubrics and
  744,394 graded remedy links — read straight from the library's own JSON over
  GitHub, with no server of its own.
- **Chapter-first reading.** Split volumes open on their printed contents
  (Knerr's 43 chapters, Kent's 34, Gentry's A–Z); single-file volumes build their
  contents from the sections inside the file.
- **Search with three scopes.** The open chapter, then the volume, then every
  volume already on the device. Remedy abbreviations and resolved names are
  searched alongside rubric text.
- **Remedy-first navigation.** Any remedy chip filters the volume to the rubrics
  that list it; the rail can list a volume by its drugs instead of its chapters.
- **Five themes** — paper, vellum, sage, slate, lampblack — with the choice
  remembered; serif text at a measured line length.
- **Offline after the first page.** Fetched chapters are kept in IndexedDB and a
  service worker serves them with the connection off. HTML is network-first so a
  release is never hidden behind a stale cache.
- **No dependencies, no build.** One HTML file, one service worker, one manifest,
  one icon. See `LOCKED.md`.
