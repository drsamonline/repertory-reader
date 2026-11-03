# Changelog

## 1.9.0 — 2026-11-03

- **Treatises.** The library gained a third kind of book: a prose work with numbered
  paragraphs. `type: "treatise"` is normalised into the same row shape as a rubric —
  one row per paragraph, no parent, no remedy chips — so search, the reading rail and
  paging work on it without a second code path.
- **The Organon, both editions.** The sixth (Boericke 1922, 291 paragraphs) and the fifth
  (Dudgeon 1849, 294 paragraphs) are separate volumes in the library, shown with the
  right noun on their covers ("paragraphs", "treatise") rather than "rubrics".
- A paragraph prints its own number and its printed footnotes under it; nothing is
  invented to fill a gap.
## 1.8.0 — 2026-11-02

- The damage banner now prints the measured figures behind its flag — duplicate
  rubric rate and the share with no remedy list — so a warning is checkable
  rather than asserted.
- Every volume in `catalog.json` carries an `integrity` block: rubrics, exact
  duplicates (same parent and text) with a percentage, and rubrics with no remedy
  list with a percentage.

## 1.7.0 — 2026-11-02

Audit pass over both repositories.

- **The count was wrong on the shelf.** The library headline said "Seventeen
  repertories" while the statistics counted 18 — because Jahr's *Part I* is one
  volume in two files. Both now derive from the catalogue: **17 volumes · 18
  files**, and the headline reads from the same number.
- **Materia medica pages had no `<h1>`** — the remedy portrait used `<h2>`, so a
  whole class of volume shipped without a top-level heading. It is an `<h1>` now;
  every page has exactly one.
- **Two inline `onclick` handlers** (the retry buttons in the error states) were
  replaced with delegated listeners — the app now has no inline script handlers.
- Verified in the same pass: all 18 volumes open with no console errors and no
  empty states, zero text overlaps at 1440/1024/430 px, and the reader stays
  responsive after opening eleven chapters and scrolling to the end forty times.

## 1.6.0 — 2026-11-02

**One remedy is one remedy.** The books print the same drug with whatever spacing,
punctuation and case the compositor had — `Nux-v.`, `Nux v.`, `NuxVom`, `(Calc-c)`,
`Calc-c.)`, `ph-ac,`, `PH-ac` — and the reader was treating each spelling as a
separate medicine. Across the library that is **27,062 printed tokens collapsing to
20,786 remedies: 6,276 duplicate spellings**.

- Every remedy now carries a **letters-only key** (`Nux-v.` and `Nux v.` both → `nuxv`).
- A chip filters by the key, so tapping `Nux-v.` finds the rubrics printed `Nux v.`
  and `NuxVom` as well.
- The remedy rail lists **one row per remedy**, showing the most common printed form,
  the resolved name, and how many spellings collapsed into it — Gentry's rail now
  shows 286 remedies instead of 1,354 tokens, 98 of them marked with their variants.
- Search matches remedy keys as well as printed forms.
- Each volume in `catalog.json` now records `remedy_spellings` — tokens, keys and how
  many merged — and the library totals carry the same three figures.

## 1.5.0 — 2026-11-02

- **A Wanted shelf.** Volumes that are not in the library, or that were extracted and
  held back because the scan in hand is not readable, now appear on the shelf as
  dashed ghost covers — with their state ("not extracted", "in progress", "extracted,
  held", "better scan wanted") and a line on why. Each one *is* the request: clicking
  a ghost cover opens a mail draft to sohilmomin2000@gmail.com with that volume's
  title, author and year already filled in.
- Six to start: Ruoff 1845, Lee's *Characteristic Symptoms*, Jahr's Part II repertory,
  Kimball 1888, Worcester 1880, and a complete Kent 1897.
- The generic "have a cleaner scan?" strip is suppressed when the Wanted shelf is
  present, so the ask is not made twice on the same page.

## 1.4.1 — 2026-11-02

- **No text overlaps anywhere.** A geometry probe now walks every leaf text node at
  1440, 1024 and 430 px and reports any pair of boxes that intersect: it found 24
  collisions on the shelf and none after the fix, in the library or in the reader.
  - The cover's monogram stamp sat on top of the author line; the year and the
    stamp now share a head row, so the author gets the full width.
  - The "damaged scan" band covered the year; it now sits on its own line beneath
    the head.
  - Rail labels, the book bar's title and chapter, the resume strip, the damage
    banner and long remedy chips all shrink and ellipsise instead of running under
    their neighbours.

## 1.3.1 — 2026-11-02

Interaction and performance pass, driven by clicking every control in a headless
browser and watching for errors and dead ends rather than guessing.

- **The rail toggle was dead on desktop** — it only had an effect under 820px.
  It now folds the rail away at any width; on a phone it opens the overlay, a
  scrim closes it, and choosing a chapter closes it too.
- **The row loader could stall and could cascade.** An IntersectionObserver only
  fires when the sentinel *changes* state, so after a batch that left it visible
  nothing fired again (the list stopped growing), and a fast scroll could queue
  batch after batch in one go (the page locked). It now pumps explicitly, one
  batch per animation frame, until the viewport is covered — and never re-enters.
- **Search is indexed.** Every loaded chapter keeps one lowercase copy of its text
  and a remedy → rubric map, built once at load. Typing used to lowercase the
  whole volume on each keystroke; on Knerr's 131,685 rubrics that was the sticky
  feeling. Remedy lookups are now a map hit, not a scan.
- **Memory is bounded**: at most eight chapters are kept in the search pool.
- **The support button opened a toast.** It opens a real dialog — portrait, UPI
  with copy and QR, Ko-fi, PayPal, the bookstore, the hub and email.
- **The header crumb** now names the volume you are reading instead of always
  saying "library".

## 1.2.0 — 2026-11-02

A design pass. The reader was correct and plain; a repertory is a printed book,
and the shelf should look like one.

- **The library is a shelf.** Every volume is drawn as a bound book — eight
  book-cloth colours assigned by a hash of its id, so a volume keeps its cloth on
  every visit and every device — with the year on the spine head, the title set
  in the display serif, the author beneath a hairline rule, a monogram stamp and
  the counts on the shelf edge. No images: the covers are CSS, so they cost
  nothing to load.
- **A resume strip** appears above the shelf once you have opened something.
- **A book bar in the reader**: mini cover, volume title, the chapter you are in
  ("chapter 4 of 30"), previous/next chapter, and a live percentage.
- **A drop cap** opens each chapter — the first letter of the first rubric, in
  the accent, the way a printed page starts.
- **Remedy chips carry their grade**: a printed grade 1 is quiet, 2 is tinted,
  3 is weighted and bordered, so the eye finds the strong remedies first.
- Warm radial paper behind the reader; five themes re-tuned to match.

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
