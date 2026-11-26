import { icon } from "../components/icons.js";
import { ALL_QUESTIONS, MODULES, VOCABULARY_FLASHCARDS } from "../data/content.js";
import { getStats, getAllSessions, getAllQuestionStates } from "../db.js";

export async function renderProgress(container, navigate) {
  const stats = await getStats();
  const sessions = await getAllSessions();
  const qStates = await getAllQuestionStates();

  const totalQuestions = ALL_QUESTIONS.length;
  const attemptedCount = qStates.length;
  const coveragePercent = Math.round((attemptedCount / totalQuestions) * 100);

  // Recent 5 sessions
  const recentSessions = [...sessions]
    .filter(s => s.endTime)
    .sort((a, b) => new Date(b.endTime) - new Date(a.endTime))
    .slice(0, 5);

  container.innerHTML = `
    <header class="view-header">
      <h1 class="view-header-title">Preparation Progress</h1>
    </header>

    <main class="view-body animate-in">
      <section class="progress-grid">
        <div class="progress-stat">
          <div class="progress-stat-number">${stats.totalAnswered}</div>
          <div class="progress-stat-label">Total Answers</div>
        </div>
        <div class="progress-stat">
          <div class="progress-stat-number">${stats.accuracy}%</div>
          <div class="progress-stat-label">Overall Accuracy</div>
        </div>
        <div class="progress-stat">
          <div class="progress-stat-number">${stats.streak}</div>
          <div class="progress-stat-label">Day Study Streak</div>
        </div>
        <div class="progress-stat">
          <div class="progress-stat-number">${stats.sessionsCompleted}</div>
          <div class="progress-stat-label">Sessions Completed</div>
        </div>
      </section>

      <!-- Content Bank Coverage -->
      <section class="session-card">
        <div class="session-card-label">Question Bank Coverage</div>
        <h2 class="session-card-title">${attemptedCount} of ${totalQuestions} Questions Encountered</h2>
        <div class="module-progress-bar" role="progressbar" aria-valuenow="${coveragePercent}" aria-valuemin="0" aria-valuemax="100">
          <div class="module-progress-fill" style="width: ${coveragePercent}%;"></div>
        </div>
        <p class="text-xs text-muted mt-2">${coveragePercent}% of official sample reviewer bank attempted so far</p>
      </section>

      <!-- Recent Sessions -->
      <section style="margin-top: 24px;">
        <h2 class="section-label">Recent Study Sessions</h2>
        ${recentSessions.length > 0 ? `
          <div class="module-list">
            ${recentSessions.map(s => {
              const d = new Date(s.endTime);
              const dateStr = d.toLocaleDateString("en-PH", { month: "short", day: "numeric" });
              const correct = s.results.filter(r => r.isCorrect).length;
              const pct = Math.round((correct / s.totalQuestions) * 100);
              return `
                <div class="module-row" style="cursor: default;">
                  <div class="module-row-info">
                    <div class="module-row-title">${dateStr} • ${s.totalQuestions} Questions</div>
                    <div class="module-row-count">${correct}/${s.totalQuestions} correct (${pct}%)</div>
                  </div>
                  <span class="review-item-badge ${pct >= 70 ? "badge-familiar" : "badge-learning"}">${pct}%</span>
                </div>
              `;
            }).join("")}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-title">No completed sessions yet</div>
            <div class="empty-state-body">Complete your first 5-question review to begin recording your study journey.</div>
          </div>
        `}
      </section>
    </main>
  `;
}
