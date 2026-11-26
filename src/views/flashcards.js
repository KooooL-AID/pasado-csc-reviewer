import { icon } from "../components/icons.js";
import { showConfirmModal } from "../components/confirm-modal.js";
import { VOCABULARY_FLASHCARDS } from "../data/content.js";
import { getCardState, setCardState, getSetting, setSetting } from "../db.js";
import { calculateNextReview, RATING } from "../srs.js";

export async function renderFlashcards(container, navigate) {
  let currentIndex = 0;
  let isRevealed = false;
  let bookmarks = await getSetting("bookmarked_cards", []);

  const cards = VOCABULARY_FLASHCARDS;

  function renderCard() {
    const card = cards[currentIndex];
    const isBookmarked = bookmarks.includes(card.id);

    container.innerHTML = `
      <div class="session-layout">
        <header class="session-topbar">
          <button class="btn-icon" id="btn-fc-exit" aria-label="Exit flashcards">
            ${icon("x", "nav-icon")}
          </button>
          <span style="font-size: 0.875rem; font-weight: 600;">Vocabulary Flashcards</span>
          <button class="btn-icon" id="btn-fc-bookmark" aria-label="${isBookmarked ? "Remove bookmark" : "Bookmark this word"}">
            ${isBookmarked ? icon("bookmarkFilled", "nav-icon") : icon("bookmark", "nav-icon")}
          </button>
        </header>

        <main class="session-body animate-in">
          <div class="flashcard-stage">
            <div class="flashcard" id="active-flashcard">
              <div class="flashcard-front">
                <div class="flashcard-word">${card.word}</div>
                <div class="flashcard-pos">${card.partOfSpeech}</div>
              </div>

              ${!isRevealed ? `
                <div class="flashcard-back-hidden">
                  <button class="btn btn-secondary btn-lg" id="btn-reveal-card">
                    Tap to Reveal Meaning
                  </button>
                </div>
              ` : `
                <div class="flashcard-back animate-in">
                  <div class="flashcard-definition">${card.definition}</div>

                  ${card.synonyms.length > 0 ? `
                    <div class="flashcard-section">
                      <div class="flashcard-section-label">Synonyms</div>
                      <div class="word-chips">
                        ${card.synonyms.map(s => `<span class="word-chip synonym">${s}</span>`).join("")}
                      </div>
                    </div>
                  ` : ""}

                  ${card.antonyms.length > 0 ? `
                    <div class="flashcard-section">
                      <div class="flashcard-section-label">Antonyms</div>
                      <div class="word-chips">
                        ${card.antonyms.map(a => `<span class="word-chip antonym">${a}</span>`).join("")}
                      </div>
                    </div>
                  ` : ""}

                  ${card.exampleSentence ? `
                    <div class="flashcard-example">
                      "${card.exampleSentence}"
                    </div>
                  ` : ""}
                </div>
              `}
            </div>

            <!-- SRS Rating Controls (shown once card is revealed) -->
            ${isRevealed ? `
              <div class="rating-buttons animate-in">
                <button class="rating-btn again" data-rating="${RATING.AGAIN}">
                  <span class="rating-label">Review Again</span>
                  <span class="text-xs text-muted">1 day</span>
                </button>
                <button class="rating-btn learning" data-rating="${RATING.HARD}">
                  <span class="rating-label">Still Learning</span>
                  <span class="text-xs text-muted">2 days</span>
                </button>
                <button class="rating-btn gotit" data-rating="${RATING.GOOD}">
                  <span class="rating-label">Got It</span>
                  <span class="text-xs text-muted">4 days</span>
                </button>
              </div>
            ` : ""}

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 4px;">
              <button class="btn btn-ghost btn-sm" id="btn-prev-card" ${currentIndex === 0 ? "disabled" : ""}>
                ${icon("arrowLeft", "nav-icon")} Previous
              </button>
              <span class="text-xs text-muted font-medium">${currentIndex + 1} of ${cards.length}</span>
              <button class="btn btn-ghost btn-sm" id="btn-next-card" ${currentIndex === cards.length - 1 ? "disabled" : ""}>
                Next ${icon("arrowRight", "nav-icon")}
              </button>
            </div>
          </div>
        </main>
      </div>
    `;

    // Events
    container.querySelector("#btn-fc-exit")?.addEventListener("click", async () => {
      const confirmed = await showConfirmModal({
        title: "Exit Flashcard Study?",
        message: "Are you sure you want to end this review session?",
        confirmText: "Exit to Home",
        cancelText: "Keep Studying",
        isDestructive: false
      });
      if (confirmed) {
        navigate("today");
      }
    });
    
    container.querySelector("#btn-fc-bookmark")?.addEventListener("click", async () => {
      if (bookmarks.includes(card.id)) {
        bookmarks = bookmarks.filter(id => id !== card.id);
      } else {
        bookmarks.push(card.id);
      }
      await setSetting("bookmarked_cards", bookmarks);
      renderCard();
    });

    container.querySelector("#btn-reveal-card")?.addEventListener("click", () => {
      isRevealed = true;
      renderCard();
    });

    container.querySelector("#btn-prev-card")?.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        isRevealed = false;
        renderCard();
      }
    });

    container.querySelector("#btn-next-card")?.addEventListener("click", () => {
      if (currentIndex < cards.length - 1) {
        currentIndex++;
        isRevealed = false;
        renderCard();
      }
    });

    container.querySelectorAll(".rating-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const rating = parseInt(btn.getAttribute("data-rating"), 10);
        const currentState = await getCardState(card.id);
        const nextState = calculateNextReview(currentState, rating);
        await setCardState({ cardId: card.id, ...nextState });

        // Advance to next card or complete
        if (currentIndex < cards.length - 1) {
          currentIndex++;
          isRevealed = false;
          renderCard();
        } else {
          navigate("today");
        }
      });
    });
  }

  renderCard();
}
