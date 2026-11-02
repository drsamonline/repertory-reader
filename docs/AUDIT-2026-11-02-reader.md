# Audit — reader and library, second pass

Run against fresh clones of both repositories: `repertory-reader` and
`homoeopathic-materia-medica-repertory-json`. Nothing below is a claim; every
figure was recomputed from the published files.

## Library — clean

| check | result |
|---|---|
| volumes in catalogue | 18 (17 titles; Jahr's Part I is one volume in two files) |
| rubrics + materia medica symptoms | 303,702 (271,421 + 32,281) |
| remedy links | 744,394 |
| `book.counts` vs the file | **0 mismatches** |
| chapter index vs chapter file | **0 mismatches** (Knerr 44, Gentry 25, Kent 34) |
| remedy spellings: tokens / keys / merged | 27,062 / 20,786 / **6,276** — recomputed, matches the catalogue |
| placeholder titles (`x`) | none |
| files present but not in the catalogue | none |
| volumes carrying a quality flag | 6, each with the measured reason |

## Reader — three defects, all fixed

1. **The shelf count contradicted the headline.** The hero said "Seventeen
   repertories" while the statistics said 18, because the catalogue counts files
   and Jahr is one volume in two. Both now derive from one number: 17 volumes ·
   18 files.
2. **Materia medica pages had no `<h1>`.** The remedy portrait used `<h2>`, so
   Bell and both Jahr parts shipped with no top-level heading. Now `<h1>`; every
   page has exactly one.
3. **Two inline `onclick` handlers** in the error states were the only inline
   script in the app. Replaced with delegated listeners.

## Reader — verified after the fixes

| check | result |
|---|---|
| all volumes open | 18/18, no console errors, no empty states |
| text overlaps (leaf boxes, 1440 / 1024 / 430 px) | 0 / 0 / 0 |
| controls that do nothing | none |
| stress: 11 chapters + 40 full scrolls | 1,016 ms, 30 MB heap, theme responds in 68 ms |
| external scripts or stylesheets | none |
| images without `alt` | none |
| inline event handlers | none |
| app weight | 68 KB, one file |

## Known, and deliberately not "fixed"

- The four damaged extractions (Clarke, Vilas, Lippe, Pulford) and the
  under-extracted Jahr repertory are flagged in the data and warned about in the
  reader. They need re-extraction from a scan, not a patch.
- Kent's 3,314 "duplicate spellings" are mostly OCR debris (`S7/`, `s%`, `sé/`)
  rather than spacing. Keying groups them; only a clean scan removes them.
- Six volumes are listed as Wanted; none can be shown until a scan arrives.
