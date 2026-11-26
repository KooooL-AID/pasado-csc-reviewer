/**
 * Pasado — Main Application Shell & Router
 */

import { icon } from "./components/icons.js";
import { openDB } from "./db.js";
import { renderToday } from "./views/today.js";
import { renderPracticePicker } from "./views/practice-picker.js";
import { renderQuiz } from "./views/quiz.js";
import { renderResults } from "./views/results.js";
import { renderFlashcards } from "./views/flashcards.js";
import { renderReview } from "./views/review.js";
import { renderProgress } from "./views/progress.js";
import { renderSettings } from "./views/settings.js";

class App {
  constructor() {
    this.appEl = document.getElementById("app");
    this.currentView = "today";
    this.viewParams = {};
    this.init();
  }

  async init() {
    try {
      await openDB();
    } catch (err) {
      console.warn("IndexedDB initialization note:", err);
    }

    this.renderShell();
    this.navigate("today");
  }

  renderShell() {
    this.appEl.innerHTML = `
      <div class="app-layout">
        <nav class="app-nav" id="main-nav" aria-label="Main Navigation">
          <a href="#today" class="nav-logo" id="logo-link" aria-label="Pasado Home">
            <img src="src/public/logo/csc-circle.png" alt="Civil Service Commission Logo" class="nav-logo-img" width="34" height="34" />
            <span class="nav-logo-text">Pasado</span>
          </a>

          <button class="nav-item active" data-view="today" aria-label="Today's study plan">
            ${icon("notebook", "nav-icon")}
            <span>Today</span>
          </button>

          <button class="nav-item" data-view="practice-picker" aria-label="Practice sessions">
            ${icon("practice", "nav-icon")}
            <span>Practice</span>
          </button>

          <button class="nav-item" data-view="flashcards" aria-label="Vocabulary flashcards">
            ${icon("flashcards", "nav-icon")}
            <span>Cards</span>
          </button>

          <button class="nav-item" data-view="review" aria-label="Mistakes and review">
            ${icon("review", "nav-icon")}
            <span>Review</span>
          </button>

          <button class="nav-item" data-view="progress" aria-label="Preparation progress">
            ${icon("progress", "nav-icon")}
            <span>Progress</span>
          </button>
        </nav>

        <div class="app-content" id="view-container"></div>
      </div>
    `;

    // Navigation event handlers
    const navItems = this.appEl.querySelectorAll(".nav-item[data-view]");
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        const view = item.getAttribute("data-view");
        this.navigate(view);
      });
    });

    this.appEl.querySelector("#logo-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      this.navigate("today");
    });
  }

  navigate(viewName, params = {}) {
    this.currentView = viewName;
    this.viewParams = params;

    // Update bottom nav active state
    const navItems = this.appEl.querySelectorAll(".nav-item[data-view]");
    navItems.forEach(item => {
      const v = item.getAttribute("data-view");
      if (v === viewName || (viewName === "quiz" && v === "practice-picker")) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Hide bottom nav during active quiz sessions for distraction-free focus
    const nav = this.appEl.querySelector("#main-nav");
    if (nav) {
      if (viewName === "quiz" || viewName === "flashcards") {
        nav.style.display = "none";
      } else {
        nav.style.display = "";
      }
    }

    const container = this.appEl.querySelector("#view-container");
    if (!container) return;

    window.scrollTo({ top: 0, behavior: "instant" });

    switch (viewName) {
      case "today":
        renderToday(container, this.navigate.bind(this));
        break;
      case "practice-picker":
        renderPracticePicker(container, this.navigate.bind(this), params);
        break;
      case "quiz":
        renderQuiz(container, this.navigate.bind(this), params);
        break;
      case "results":
        renderResults(container, this.navigate.bind(this), params);
        break;
      case "flashcards":
        renderFlashcards(container, this.navigate.bind(this));
        break;
      case "review":
        renderReview(container, this.navigate.bind(this));
        break;
      case "progress":
        renderProgress(container, this.navigate.bind(this));
        break;
      case "settings":
        renderSettings(container, this.navigate.bind(this));
        break;
      default:
        renderToday(container, this.navigate.bind(this));
    }
  }
}

// Start app once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
