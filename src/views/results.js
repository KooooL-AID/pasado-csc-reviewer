import { icon } from "../components/icons.js";
import { ALL_QUESTIONS } from "../data/content.js";
import { getSession } from "../db.js";

export async function renderResults(container, navigate, params = {}) {
  const sessionId = params.sessionId;
  const session = sessionId ? await getSession(sessionId) : null;

  if (!session || !session.results) {
    container.innerHTML = `
      <div class="view-body text-center">
        <h2>Session Not Found</h2>
        <p class="text-muted mt-2">Could not retrieve the results for this session.</p>
        <button class="btn btn-primary mt-4" id="btn-back-home">Back to Home</button>
      </div>
    `;
    container.querySelector("#btn-back-home")?.addEventListener("click", () => navigate("today"));
    return;
  }

  const results = session.results;
  const total = results.length;
  const correct = results.filter(r => r.isCorrect).length;
  const accuracy = Math.round((correct / total) * 100);

  const missedItems = results
    .filter(r => !r.isCorrect)
    .map(r => ALL_QUESTIONS.find(q => q.id === r.questionId))
    .filter(Boolean);

  const correctItems = results
    .filter(r => r.isCorrect)
    .map(r => ALL_QUESTIONS.find(q => q.id === r.questionId))
    .filter(Boolean);

  let toneClass = "good";
  let verdictMessage = "Solid session! Keep this consistent momentum going.";
  if (accuracy < 60) {
    toneClass = "poor";
    verdictMessage = "Mistakes are how we learn. Review the missed items below.";
  } else if (accuracy < 80) {
    toneClass = "ok";
    verdictMessage = "Good work. A quick review of the tricky ones will lock these in.";
  }

  container.innerHTML = `
    <header class="view-header">
      <h1 class="view-header-title">Session Complete</h1>
    </header>

    <main class="animate-in">
      <section class="results-hero">
        <div class="results-icon ${toneClass}" aria-hidden="true">
          ${toneClass === "good" ? icon("check", "nav-icon") : icon("practice", "nav-icon")}
        </div>
        <div class="results-score">${correct}/${total}</div>
        <div class="results-label">${accuracy}% accuracy • ${verdictMessage}</div>

        <div class="results-bar-wrap" role="progressbar" aria-valuenow="${accuracy}" aria-valuemin="0" aria-valuemax="100">
          <div class="results-bar-fill" style="width: ${accuracy}%;"></div>
        </div>
      </section>

      <section class="results-breakdown">
        ${missedItems.length > 0 ? `
          <div class="breakdown-section">
            <h2 class="breakdown-heading wrong">
              ${icon("x", "nav-icon")}
              <span>Items to Review (${missedItems.length})</span>
            </h2>
            ${missedItems.map(q => `
              <div class="breakdown-item">
                <span class="breakdown-dot wrong"></span>
                <div>
                  <div class="font-medium">${q.question.replace(/<[^>]*>/g, '')}</div>
                  <div class="text-xs text-muted mt-1">Answer: ${q.choices[q.answer]}</div>
                </div>
              </div>
            `).join("")}
          </div>
        ` : ""}

        ${correctItems.length > 0 ? `
          <div class="breakdown-section">
            <h2 class="breakdown-heading correct">
              ${icon("check", "nav-icon")}
              <span>Answered Correctly (${correctItems.length})</span>
            </h2>
            ${correctItems.map(q => `
              <div class="breakdown-item">
                <span class="breakdown-dot correct"></span>
                <div>
                  <div class="font-medium">${q.question.replace(/<[^>]*>/g, '')}</div>
                </div>
              </div>
            `).join("")}
          </div>
        ` : ""}
      </section>

      <section class="results-actions">
        ${missedItems.length > 0 ? `
          <button class="btn btn-secondary btn-full btn-lg" id="btn-review-mistakes">
            Review Missed Items
          </button>
        ` : ""}
        <button class="btn btn-primary btn-full btn-lg" id="btn-practice-again">
          Practice Again
        </button>
        <button class="btn btn-ghost btn-full" id="btn-return-today">
          Back to Today
        </button>
      </section>
    </main>
  `;

  container.querySelector("#btn-review-mistakes")?.addEventListener("click", () => {
    navigate("review");
  });

  container.querySelector("#btn-practice-again")?.addEventListener("click", () => {
    navigate("quiz", { count: total, moduleId: session.moduleId });
  });

  container.querySelector("#btn-return-today")?.addEventListener("click", () => {
    navigate("today");
  });
}
