# Changelog

## 1.1.0 — 2026-11-02

**The materia medicas are readable now.** They were being flattened like a
repertory — symptoms with no remedy attached, which is useless: a materia medica
*is* remedy → symptoms. A materia medica now opens as:

- **a remedy rail** — every remedy in the volume, with its abbreviation and
  symptom count, instead of a single "whole book" entry;
- **a remedy portrait** — canonical name (where the extraction resolved one),
  the printed name beneath it when they differ, abbreviation, and the clinical
  indications as clickable chips that filter that remedy's symptoms;
- **symptoms grouped by their printed chapter** — "Skin", "Stools",
  "Aggravation" — with modality lines where the source carries them;
- **search by remedy name**, so "nux" or "acon" finds the remedy as well as its
  text.

Bell's *Therapeutics* (103 remedies) and both parts of Jahr's *Manual* (199
remedies) now read as books of remedies rather than anonymous lists.


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
