import { icon } from "../components/icons.js";
import { MODULES, QUESTION_COUNTS, ALL_QUESTIONS } from "../data/content.js";
import { getStats, getSetting, getDueQuestions, getDueCards } from "../db.js";

export async function renderToday(container, navigate) {
  const stats = await getStats();
  const examDateStr = await getSetting("examDate", "2027-03-14");
  const dueQ = await getDueQuestions();
  const dueC = await getDueCards();

  const examDate = new Date(examDateStr);
  const today = new Date();
  const diffTime = examDate.getTime() - today.getTime();
  const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const totalDue = dueQ.length + dueC.length;

  const dateFormatted = today.toLocaleDateString("en-PH", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });

  container.innerHTML = `
    <header class="view-header">
      <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
        <img src="src/public/logo/csc-circle.png" alt="Civil Service Commission Logo" class="header-logo-img" width="28" height="28" />
        <h1 class="view-header-title">Pasado</h1>
      </div>
      <button class="btn-icon" id="btn-today-settings" aria-label="Open study settings">
        ${icon("settings", "nav-icon")}
      </button>
    </header>

    <main class="view-body animate-in">
      <!-- Exam Scope & Target Year Banner -->
      <div class="scope-header-badge" role="status">
        <span class="scope-pill-active">Professional Level</span>
        <span>•</span>
        <span class="scope-pill-year">2027 Examination</span>
        <span>•</span>
        <span class="text-muted">CSE-PPT</span>
      </div>

      <div class="today-greeting">Ready to review today?</div>
      <div class="today-date">${dateFormatted}</div>

      <!-- Exam countdown -->
      <section class="countdown-block" aria-labelledby="countdown-heading">
        <div class="countdown-number" aria-hidden="true">${diffDays}</div>
        <div>
          <h2 id="countdown-heading" class="text-lg font-bold">Days until 2027 Examination</h2>
          <p class="countdown-label">${diffDays} days left to build solid recall and confidence.</p>
          <div class="countdown-exam">Target: CSE-PPT Professional • March 14, 2027</div>
        </div>
      </section>

      <!-- Recommended Session -->
      <section class="session-card" aria-labelledby="rec-session-title">
        <div class="session-card-label">Recommended for Today</div>
        <h2 id="rec-session-title" class="session-card-title">English Vocabulary & Grammar Sprint</h2>
        <p class="session-card-meta">
          ${totalDue > 0 ? `${totalDue} due review items prioritized • ` : ""}5 focused questions • ~3 minutes
        </p>
        <button class="btn btn-primary btn-lg btn-full" id="btn-start-daily">
          Start Reviewing
          ${icon("arrowRight", "nav-icon")}
        </button>
      </section>

      <!-- Quick Stats -->
      <section class="stats-row" aria-label="Learning consistency">
        <div class="stat-chip">
          <span class="stat-chip-dot ${stats.streak > 0 ? "" : "muted"}"></span>
          <span>${stats.streak} day streak</span>
        </div>
        <div class="stat-chip">
          <span class="stat-chip-dot ${stats.totalAnswered > 0 ? "" : "muted"}"></span>
          <span>${stats.totalAnswered} questions attempted</span>
        </div>
        ${stats.totalAnswered > 0 ? `
          <div class="stat-chip">
            <span class="stat-chip-dot"></span>
            <span>${stats.accuracy}% accuracy</span>
          </div>
        ` : ""}
      </section>

      <!-- Module Selection -->
      <section aria-labelledby="modules-label">
        <h2 id="modules-label" class="section-label">Study Modules</h2>
        <div class="module-list">
          ${MODULES.map(m => `
            <button class="module-row" data-module-id="${m.id}" aria-label="Study ${m.title}">
              <div class="module-row-info">
                <div class="module-row-title">${m.title}</div>
                <div class="module-row-count">${QUESTION_COUNTS[m.id]} questions from reviewer PDF</div>
              </div>
              <div class="module-row-arrow" aria-hidden="true">
                ${icon("arrowRight", "nav-icon")}
              </div>
            </button>
          `).join("")}
          <button class="module-row" id="btn-flashcards-row" aria-label="Open Vocabulary Flashcards">
            <div class="module-row-info">
              <div class="module-row-title">Vocabulary Flashcards</div>
              <div class="module-row-count">${QUESTION_COUNTS.flashcards} cards with definitions, synonyms & examples</div>
            </div>
            <div class="module-row-arrow" aria-hidden="true">
              ${icon("arrowRight", "nav-icon")}
            </div>
          </button>
        </div>
      </section>

      <!-- Subprofessional Upcoming Notice -->
      <section class="subprof-card" aria-label="Upcoming Exam Coverage">
        <div style="font-size: 1.5rem; color: var(--stone-500); line-height: 1;">
          ${icon("book", "nav-icon")}
        </div>
        <div>
          <div class="subprof-card-title">
            <span>Subprofessional Level Reviewer</span>
            <span class="badge-coming-soon">Coming Soon</span>
          </div>
          <p class="subprof-card-desc">
            Clerical ability (spelling, filing, alphabetizing, arithmetic) will be introduced in an upcoming update without mixing with Professional-level items.
          </p>
        </div>
      </section>
    </main>
  `;

  // Attach events
  container.querySelector("#btn-today-settings")?.addEventListener("click", () => navigate("settings"));
  container.querySelector("#btn-start-daily")?.addEventListener("click", () => {
    navigate("quiz", { count: 5, moduleId: "all" });
  });

  container.querySelectorAll(".module-row[data-module-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      const moduleId = btn.getAttribute("data-module-id");
      navigate("practice-picker", { moduleId });
    });
  });

  container.querySelector("#btn-flashcards-row")?.addEventListener("click", () => {
    navigate("flashcards");
  });
}
