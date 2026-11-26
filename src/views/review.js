import { icon } from "../components/icons.js";
import { ALL_QUESTIONS, VOCABULARY_FLASHCARDS } from "../data/content.js";
import { getAllQuestionStates, getAllCardStates, getSetting } from "../db.js";

export async function renderReview(container, navigate) {
  const [qStates, cardStates, bookmarks] = await Promise.all([
    getAllQuestionStates(),
    getAllCardStates(),
    getSetting("bookmarked_cards", [])
  ]);

  const qMap = new Map(qStates.map(s => [s.questionId, s]));
  const cMap = new Map(cardStates.map(s => [s.cardId, s]));

  // Missed/learning questions
  const missedQuestions = ALL_QUESTIONS.filter(q => {
    const s = qMap.get(q.id);
    return s && (s.status === "new" || s.status === "learning" || s.repetitions === 0);
  });

  // Bookmarked cards
  const bookmarkedCards = VOCABULARY_FLASHCARDS.filter(c => bookmarks.includes(c.id));

  // Cards needing review
  const learningCards = VOCABULARY_FLASHCARDS.filter(c => {
    const s = cMap.get(c.id);
    return s && (s.status === "learning" || s.repetitions === 0);
  });

  container.innerHTML = `
    <header class="view-header">
      <h1 class="view-header-title">Review & Mistakes</h1>
    </header>

    <main class="view-body animate-in">
      ${missedQuestions.length > 0 ? `
        <section class="review-section">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
            <h2 class="review-section-title" style="margin-bottom: 0;">Tricky Questions (${missedQuestions.length})</h2>
            <button class="btn btn-primary btn-sm" id="btn-retry-all-mistakes">Retry Missed</button>
          </div>
          <div>
            ${missedQuestions.map(q => {
              const state = qMap.get(q.id);
              const badgeClass = state?.status === "learning" ? "badge-learning" : "badge-new";
              return `
                <div class="review-item" data-question-id="${q.id}">
                  <div style="flex: 1;">
                    <div class="review-item-word">${q.question.replace(/<[^>]*>/g, '')}</div>
                    <div class="review-item-hint">Answer: ${q.choices[q.answer]}</div>
                  </div>
                  <span class="review-item-badge ${badgeClass}">${state?.status || "needs practice"}</span>
                </div>
              `;
            }).join("")}
          </div>
        </section>
      ` : `
        <section class="review-section">
          <h2 class="review-section-title">Tricky Questions</h2>
          <div class="empty-state">
            <div class="empty-state-icon" aria-hidden="true">${icon("check", "nav-icon")}</div>
            <div class="empty-state-title">No missed questions waiting</div>
            <div class="empty-state-body">Questions you get wrong in practice sessions will appear here for focused spaced repetition.</div>
          </div>
        </section>
      `}

      <div class="divider"></div>

      <!-- Bookmarked / Difficult Words -->
      <section class="review-section">
        <h2 class="review-section-title">Bookmarked Vocabulary (${bookmarkedCards.length})</h2>
        ${bookmarkedCards.length > 0 ? `
          <div>
            ${bookmarkedCards.map(c => `
              <div class="review-item" data-card-id="${c.id}">
                <div style="flex: 1;">
                  <div class="review-item-word">${c.word} <span class="text-xs text-muted">(${c.partOfSpeech})</span></div>
                  <div class="review-item-hint">${c.definition}</div>
                </div>
                <span class="review-item-badge badge-familiar">Bookmarked</span>
              </div>
            `).join("")}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon" aria-hidden="true">${icon("bookmark", "nav-icon")}</div>
            <div class="empty-state-title">No bookmarked words yet</div>
            <div class="empty-state-body">Tap the bookmark icon while studying flashcards to save difficult words for quick access.</div>
          </div>
        `}
      </section>
    </main>
  `;

  container.querySelector("#btn-retry-all-mistakes")?.addEventListener("click", () => {
    navigate("quiz", { count: missedQuestions.length, moduleId: "all" });
  });

  container.querySelectorAll(".review-item[data-question-id]").forEach(item => {
    item.addEventListener("click", () => {
      navigate("quiz", { count: 5, moduleId: "all" });
    });
  });

  container.querySelectorAll(".review-item[data-card-id]").forEach(item => {
    item.addEventListener("click", () => {
      navigate("flashcards");
    });
  });
}
