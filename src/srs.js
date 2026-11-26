/**
 * Pasado — Spaced Repetition System (SM-2 simplified)
 * Transparent, testable scheduling. Missed days don't erase progress.
 */

/* Rating values */
export const RATING = {
  AGAIN:    0, // wrong / "review again"
  HARD:     1, // "still learning"
  GOOD:     2, // "got it"
  EASY:     3  // first-try perfect
};

const MIN_EASE = 1.3;
const DEFAULT_EASE = 2.5;

/**
 * Returns updated SRS state after a user rates an item.
 * @param {object|null} current - existing state, or null for new items
 * @param {number}      rating  - RATING.AGAIN | HARD | GOOD | EASY
 * @returns {object} new state
 */
export function calculateNextReview(current, rating) {
  const now = Date.now();

  // Defaults for new items
  let { interval = 0, easeFactor = DEFAULT_EASE, repetitions = 0 } = current || {};

  if (rating === RATING.AGAIN) {
    // Reset: show again soon
    interval = 1;
    repetitions = 0;
    easeFactor = Math.max(MIN_EASE, easeFactor - 0.2);
  } else if (rating === RATING.HARD) {
    // Slow progress
    interval = Math.max(1, Math.round(interval * 1.2));
    easeFactor = Math.max(MIN_EASE, easeFactor - 0.15);
    repetitions += 1;
  } else if (rating === RATING.GOOD) {
    // Standard SM-2 progression
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 3;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  } else if (rating === RATING.EASY) {
    // Fast track
    if (repetitions === 0) interval = 3;
    else interval = Math.round(interval * easeFactor * 1.3);
    easeFactor = Math.min(3.0, easeFactor + 0.15);
    repetitions += 1;
  }

  // Cap interval at 90 days for now
  interval = Math.min(interval, 90);

  const nextReview = now + interval * 24 * 60 * 60 * 1000;

  const status =
    repetitions === 0            ? "new"
    : repetitions <= 2           ? "learning"
    : interval < 7               ? "familiar"
    : /* interval >= 7 */          "mastered";

  return { interval, easeFactor, repetitions, nextReview, status, lastReviewed: now };
}

/**
 * Quick correctness → rating conversion for quiz answers.
 * Correct on first try = GOOD; incorrect = AGAIN.
 */
export function ratingFromCorrect(isCorrect) {
  return isCorrect ? RATING.GOOD : RATING.AGAIN;
}

/**
 * Sorts questions so due and unfamiliar items come first.
 * @param {Array} questions
 * @param {Map}   stateMap - questionId → state
 */
export function prioritizeQuestions(questions, stateMap) {
  const now = Date.now();

  return [...questions].sort((a, b) => {
    const sa = stateMap.get(a.id) || {};
    const sb = stateMap.get(b.id) || {};

    const aDue = !sa.nextReview || sa.nextReview <= now;
    const bDue = !sb.nextReview || sb.nextReview <= now;

    // Due items first
    if (aDue && !bDue) return -1;
    if (!aDue && bDue) return  1;

    // Among due: failed/new items first
    const aReps = sa.repetitions || 0;
    const bReps = sb.repetitions || 0;
    if (aReps !== bReps) return aReps - bReps;

    // Otherwise random
    return Math.random() - 0.5;
  });
}

/**
 * Select `count` questions from `pool`, biased toward due and unfamiliar items.
 */
export function selectQuestions(pool, stateMap, count) {
  const prioritized = prioritizeQuestions(pool, stateMap);
  return prioritized.slice(0, Math.min(count, prioritized.length));
}

/** Shuffle an array (Fisher-Yates) */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
