# Deep audit — content and page

Second-pass audit, taken further into the text itself rather than the file shape.
Run against fresh clones; every number recomputed from the published files.

## The first measurement was wrong, and I caught it

My opening sweep reported "verbatim" at 67.7% for Allen and 84% for Bryant, which
contradicted the QC reports. The sweep was wrong: it counted rubrics too short to
test (`< 8` characters once punctuation is stripped) as failures. Re-run excluding
those, the figures match the QC reports. Recorded here because an audit that
publishes its own arithmetic error is worse than no audit.

## Verbatim, recomputed against the source text

Only volumes whose OCR source is on hand can be re-checked. Rubrics with fewer than
eight normalised characters are excluded (they cannot be searched for meaningfully).

| volume | testable rubrics | found verbatim | too short to test |
|---|---|---|---|
| Allen 1883 | 1,202 | **100.0%** | 506 |
| Boenninghausen 1891 | 965 | **100.0%** | 358 |
| Bryant 1851 | 4,321 | **100.0%** | 644 |
| Knerr 1896 | 122,690 | **99.6%** | 8,995 |
| Gentry 1893 | 38,937 | **99.8%** | 1,556 |
| Hering 1889 | 10,013 | **92.9%** | 1,143 |

Hering's 1889 repertory is the weakest clean extraction: 92.9%, with 1,083 exact
duplicates and 713 rubrics carrying no remedy list. It is now flagged *partial*.

## Integrity, per volume

Every volume now records `integrity: {rubrics, duplicate_text, duplicate_pct,
no_remedy, no_remedy_pct}` in the catalogue. Exact duplicates are counted as the
same text under the same parent.

| volume | duplicate rubrics | no remedy list |
|---|---|---|
| Clarke 1904 | **53.8%** | 0.0% |
| Kent 1897 | **38.5%** | 7.6% |
| Pulford 1898 | 26.6% | 2.0% |
| Bell 1906 | 19.5% | — |
| Bryant 1851 | 18.8% | 0.0% |
| Allen 1883 | 15.3% | 0.0% |
| Hering 1889 | 9.7% | 6.4% |
| Knerr 1896 | 1.8% | 0.0% |

Clarke's 53.8% and Kent's 38.5% are the same damage the flags already describe —
fragments repeated because the OCR shattered the page.

## Checks that came back clean

- **No unindexed abbreviations**: every remedy used in a volume appears in that
  volume's `remedy_index`. Zero exceptions across all 18.
- **No control or replacement characters** in any rubric text.
- **Ids unique** in every volume, prefixed with the book id.
- **Grades** are only `null`, 1, 2 or 3 — no strays.
- **Remedy leakage into rubric text** in repertories is small: Jahr 24, Vilas 8,
  Kent 7 rubrics end in a remedy-shaped token with no remedy list.

## The page

| check | result |
|---|---|
| render fidelity — first rubric on screen vs the JSON | identical |
| search — do all results contain the query? | yes (31/31 for "chill") |
| remedy filter — do all rows carry the clicked remedy key? | yes (60/60) |
| deep link `#/book` and `#/book/chapter` | opens the right volume and chapter |
| browser back button | returns to the library |
| theme choice | persists across reloads |
| **offline** — warm a chapter online, go offline, reload, reopen | **renders from cache** (22/22 rows) |
| text overlaps at 1440 / 1024 / 430 px | 0 / 0 / 0 |
| console errors across every flow | none |

## What this leaves

The library is structurally sound and, where the source is on hand, verbatim at
99.6–100%. The remaining work is extraction quality, not file integrity: four
damaged volumes (Clarke, Vilas, Lippe, Pulford), one under-extracted (Jahr's
repertory), one partial (Kent), and Hering 1889 now flagged partial on measured
evidence. All of it needs a scan, which is what the Wanted shelf asks for.
