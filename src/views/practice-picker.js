import { icon } from "../components/icons.js";
import { MODULES, QUESTION_COUNTS } from "../data/content.js";

export function renderPracticePicker(container, navigate, params = {}) {
  let activeCategory = params.category || "all";
  let activeModuleId = params.moduleId || "all";

  function render() {
    const filteredModules = activeCategory === "all"
      ? MODULES
      : MODULES.filter(m => m.subject === activeCategory);

    const activeModule = MODULES.find(m => m.id === activeModuleId);

    container.innerHTML = `
      <header class="view-header">
        <button class="btn-icon" id="btn-practice-back" aria-label="Back to home">
          ${icon("arrowLeft", "nav-icon")}
        </button>
        <div style="flex: 1;">
          <h1 class="view-header-title">${activeModule ? activeModule.title : "Practice Sessions"}</h1>
          <div class="text-xs text-muted">2027 Professional Exam Prep</div>
        </div>
      </header>

      <main class="view-body animate-in">
        <!-- Scope Badge -->
        <div class="scope-header-badge" style="margin-bottom: 16px;">
          <span class="scope-pill-active">Professional Level</span>
          <span>•</span>
          <span class="scope-pill-year">2027 Coverage</span>
        </div>

        <!-- Subject Category Tabs -->
        <div class="category-filter-bar" role="tablist" aria-label="Examination Subject Categories">
          <button class="category-tab ${activeCategory === "all" ? "active" : ""}" data-category="all" role="tab" aria-selected="${activeCategory === "all"}">
            All Subjects
          </button>
          <button class="category-tab ${activeCategory === "verbal" ? "active" : ""}" data-category="verbal" role="tab" aria-selected="${activeCategory === "verbal"}">
            Verbal Ability
          </button>
          <button class="category-tab ${activeCategory === "analytical" ? "active" : ""}" data-category="analytical" role="tab" aria-selected="${activeCategory === "analytical"}">
            Analytical Ability
          </button>
          <button class="category-tab ${activeCategory === "numerical" ? "active" : ""}" data-category="numerical" role="tab" aria-selected="${activeCategory === "numerical"}">
            Numerical Ability (Soon)
          </button>
          <button class="category-tab ${activeCategory === "general-info" ? "active" : ""}" data-category="general-info" role="tab" aria-selected="${activeCategory === "general-info"}">
            General Information (Soon)
          </button>
        </div>

        ${activeCategory === "numerical" || activeCategory === "general-info" ? `
          <div class="surface" style="padding: 24px; text-align: center; margin-bottom: 24px;">
            <div class="font-semibold text-sm">Subject Material Under Curation</div>
            <p class="text-xs text-muted mt-2">
              Verified 2027 CSC Professional questions for this subject are being added to the database. Try Verbal or Analytical Ability practice below!
            </p>
          </div>
        ` : `
          <!-- Session Length Grid -->
          <section class="practice-section">
            <h2 class="practice-section-title">Select Session Length</h2>
            <div class="session-options">
              <button class="session-option" data-count="5">
                <span class="session-option-count">5</span>
                <span class="session-option-label">Quick Review</span>
                <span class="session-option-desc">~3 mins • Great for a fast check-in</span>
              </button>

              <button class="session-option" data-count="10">
                <span class="session-option-count">10</span>
                <span class="session-option-label">Daily Practice</span>
                <span class="session-option-desc">~6 mins • Optimal daily routine</span>
              </button>

              <button class="session-option" data-count="20">
                <span class="session-option-count">20</span>
                <span class="session-option-label">Focus Session</span>
                <span class="session-option-desc">~12 mins • Thorough module dive</span>
              </button>

              <button class="session-option" data-count="all">
                <span class="session-option-count">All</span>
                <span class="session-option-label">Comprehensive</span>
                <span class="session-option-desc">Full verified question bank</span>
              </button>
            </div>
          </section>
        `}

        <div class="divider"></div>

        <!-- Modules in selected category -->
        <section class="practice-section">
          <h2 class="practice-section-title">Modules in this Category</h2>
          <div class="module-list">
            ${filteredModules.map(m => `
              <button class="module-row" data-start-module="${m.id}">
                <div class="module-row-info">
                  <div class="module-row-title">${m.title}</div>
                  <div class="module-row-count">${QUESTION_COUNTS[m.id]} questions • Professional Level</div>
                </div>
                <div class="module-row-arrow" aria-hidden="true">
                  ${icon("arrowRight", "nav-icon")}
                </div>
              </button>
            `).join("")}

            <button class="module-row" id="btn-launch-flashcards">
              <div class="module-row-info">
                <div class="module-row-title">Vocabulary Flashcards</div>
                <div class="module-row-count">${QUESTION_COUNTS.flashcards} words • Definitions & Examples</div>
              </div>
              <div class="module-row-arrow" aria-hidden="true">
                ${icon("arrowRight", "nav-icon")}
              </div>
            </button>
          </div>
        </section>

        <!-- Subprofessional Notice -->
        <section class="subprof-card">
          <div style="font-size: 1.5rem; color: var(--stone-500); line-height: 1;">
            ${icon("book", "nav-icon")}
          </div>
          <div>
            <div class="subprof-card-title">
              <span>Subprofessional Examination</span>
              <span class="badge-coming-soon">Coming Soon</span>
            </div>
            <p class="subprof-card-desc">
              Clerical ability modules (alphabetizing, filing, office spelling) are in development for Subprofessional examinees.
            </p>
          </div>
        </section>
      </main>
    `;

    // Event handlers
    container.querySelector("#btn-practice-back")?.addEventListener("click", () => navigate("today"));
    container.querySelector("#btn-launch-flashcards")?.addEventListener("click", () => navigate("flashcards"));

    container.querySelectorAll(".category-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        activeCategory = tab.getAttribute("data-category");
        activeModuleId = "all";
        render();
      });
    });

    container.querySelectorAll(".session-option").forEach(btn => {
      btn.addEventListener("click", () => {
        const countVal = btn.getAttribute("data-count");
        const count = countVal === "all" ? 999 : parseInt(countVal, 10);
        navigate("quiz", { count, moduleId: activeModuleId, category: activeCategory });
      });
    });

    container.querySelectorAll("[data-start-module]").forEach(btn => {
      btn.addEventListener("click", () => {
        const modId = btn.getAttribute("data-start-module");
        navigate("quiz", { count: 10, moduleId: modId });
      });
    });
  }

  render();
}
