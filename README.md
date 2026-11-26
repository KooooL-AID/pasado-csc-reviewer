# Pasado — Philippine Civil Service Examination (CSE-PPT Professional) Reviewer

A clean, distraction-free, offline-first study web application designed specifically for Filipinos preparing for the **Philippine Civil Service Examination – Professional Level (CSE-PPT Professional)**.

Target Examination: **March 14, 2027** (customizable in Settings).

---

## 1. Product Philosophy & Learning Design

- **Digital Study Notebook**: Warm stone paper tones (`#f4f1eb` background, `#fefdf9` surface), deep teal accent (`#0F766E`), high-contrast accessible typography.
- **No AI Slop**: Free of purple-to-blue gradients, decorative floating shapes, fake metric counters, or condescending gamification badges.
- **The Core User Journey**: **Open → Learn → Practice → Understand → Review → Improve.**
- **Offline First**: Runs completely in the browser via standard ES Modules and IndexedDB. No external cloud dependencies, subscriptions, or authentication hurdles.

---

## 2. Examination Scope & Initial Modules

Structured strictly according to the **CSC Professional Level** scope:

1. **Verbal Ability — English Grammar & Correct Usage** (20 questions from sample reviewer)
   - Subject-verb agreement, irregular plurals, modal verbs, gerunds, progressive aspect, causative structures, and adjective formations.
2. **Verbal Ability — English Vocabulary Synonyms** (13 questions from sample reviewer)
   - Contextual vocabulary questions: ambivalent, ominous, susceptible, adamant, futile, ostentatious, grotesque, clandestine, fleeting, sordid, euphoria, blurb, labyrinth.
3. **Analytical Ability — Word Analogies** (10 questions from sample reviewer)
   - Semantic analogies: part-to-whole, cause-to-effect, function-to-tool, and category relationships.
4. **Vocabulary Flashcards** (20 curated vocabulary cards)
   - Definitions, parts of speech, synonyms, antonyms, and contextual sample sentences.

---

## 3. Spaced Repetition System (SRS)

Pasado implements a transparent, lightweight SM-2 based spaced repetition algorithm:
- Correct answers and "Got It" ratings extend the review interval (1 day → 3 days → 7+ days).
- Missed questions and "Review Again" ratings immediately reset the interval to 1 day and surface the item on the **Review** tab and in daily recommended sessions.
- Bookmarking allows examinees to mark tricky terms for fast reference anytime.

---

## 4. Running Locally

Pasado requires no build steps or heavy node dependencies to preview or use. It runs as standard browser ES modules:

```bash
# Using Python's built-in HTTP server:
cd csc-quest
python3 -m http.server 3000

# Open in browser:
# http://localhost:3000
```

Or using any static HTTP server:
```bash
npx serve csc-quest
```

---

## 5. AntiSlopUI Audit Summary

| Check | Status | Verification Detail |
|---|---|---|
| Non-purple brand hue | **PASS** | Deep teal `#0F766E` domain hue from AntiSlopUI spec |
| No gradient text | **PASS** | Solid high-contrast text throughout |
| Distinctive typography | **PASS** | Cabinet Grotesk display face + clean system body fallback |
| Contrast ratios | **PASS** | Body text: `#1c1917` on `#f4f1eb` (15.2:1 contrast ratio) |
| Responsive design | **PASS** | Mobile-first bottom bar + responsive tablet/desktop sidebar |
| Motion limits | **PASS** | Sub-200ms transitions with full `prefers-reduced-motion` support |
| Icon consistency | **PASS** | Unified bespoke SVG icons; zero emoji icons |
| Data integrity | **PASS** | All 43 questions directly verified against `csc-eng-grammar.pdf` |
