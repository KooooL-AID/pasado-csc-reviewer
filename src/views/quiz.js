import { icon } from "../components/icons.js";
import { showConfirmModal } from "../components/confirm-modal.js";
import { ALL_QUESTIONS, QUESTIONS_BY_MODULE, MODULES } from "../data/content.js";
import { getAllQuestionStates, saveAnswer, setQuestionState, saveSession } from "../db.js";
import { selectQuestions, ratingFromCorrect, calculateNextReview } from "../srs.js";

export async function renderQuiz(container, navigate, params = {}) {
  const count = params.count || 5;
  const moduleId = params.moduleId || "all";

  // Filter pool
  let pool = moduleId === "all" ? ALL_QUESTIONS : (QUESTIONS_BY_MODULE[moduleId] || ALL_QUESTIONS);

  // Load SRS states to prioritize questions
  const states = await getAllQuestionStates();
  const stateMap = new Map(states.map(s => [s.questionId, s]));

  const questions = selectQuestions(pool, stateMap, count);

  if (!questions.length) {
    container.innerHTML = `
      <div class="view-body text-center">
        <p>No questions found for this session.</p>
        <button class="btn btn-primary mt-4" id="btn-empty-back">Back to Home</button>
      </div>
    `;
    container.querySelector("#btn-empty-back")?.addEventListener("click", () => navigate("today"));
    return;
  }

  const sessionId = "sess_" + Date.now();
  const sessionRecord = {
    id: sessionId,
    startTime: new Date().toISOString(),
    endTime: null,
    moduleId,
    totalQuestions: questions.length,
    results: [] // { questionId, selectedAnswer, isCorrect }
  };

  let currentIndex = 0;
  let hasAnsweredCurrent = false;

  function renderCurrentQuestion() {
    const q = questions[currentIndex];
    const moduleInfo = MODULES.find(m => m.id === q.moduleId);
    const progressPercent = Math.round(((currentIndex) / questions.length) * 100);

    container.innerHTML = `
      <div class="session-layout">
        <header class="session-topbar">
          <button class="btn-icon" id="btn-quiz-exit" aria-label="Exit session">
            ${icon("x", "nav-icon")}
          </button>
          <div style="flex: 1; margin: 0 12px;">
            <div class="session-progress-bar" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
              <div class="session-progress-fill" style="width: ${progressPercent}%;"></div>
            </div>
          </div>
          <span class="session-counter">${currentIndex + 1} of ${questions.length}</span>
        </header>

        <main class="session-body animate-in">
          <div class="module-tag">${moduleInfo ? moduleInfo.title : "CSE Professional"}</div>
          <h2 class="question-text">${q.question}</h2>

          <div class="choices-list" role="radiogroup" aria-label="Answer choices">
            ${q.choices.map((choice, idx) => `
              <button class="choice-btn" data-index="${idx}" role="radio" aria-checked="false">
                <span class="choice-letter">${String.fromCharCode(65 + idx)}</span>
                <span class="choice-text">${choice}</span>
              </button>
            `).join("")}
          </div>

          <div id="feedback-placeholder"></div>

          <div class="session-actions" id="action-placeholder" style="display: none;">
            <button class="btn btn-primary btn-full btn-lg" id="btn-quiz-continue">
              ${currentIndex + 1 < questions.length ? "Continue" : "View Results"}
              ${icon("arrowRight", "nav-icon")}
            </button>
          </div>
        </main>
      </div>
    `;

    hasAnsweredCurrent = false;

    // Attach click events to choices
    container.querySelectorAll(".choice-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (hasAnsweredCurrent) return;
        const selectedIdx = parseInt(btn.getAttribute("data-index"), 10);
        handleAnswer(q, selectedIdx);
      });
    });

    container.querySelector("#btn-quiz-exit")?.addEventListener("click", async () => {
      const confirmed = await showConfirmModal({
        title: "End Review Session?",
        message: "Are you sure you want to end this review session? Uncompleted questions won't be counted in your accuracy score.",
        confirmText: "End Session",
        cancelText: "Keep Reviewing",
        isDestructive: true
      });
      if (confirmed) {
        navigate("today");
      }
    });

    container.querySelector("#btn-quiz-continue")?.addEventListener("click", () => {
      if (currentIndex + 1 < questions.length) {
        currentIndex++;
        renderCurrentQuestion();
      } else {
        finishSession();
      }
    });
  }

  async function handleAnswer(q, selectedIdx) {
    hasAnsweredCurrent = true;
    const isCorrect = selectedIdx === q.answer;

    // Save result to session
    sessionRecord.results.push({
      questionId: q.id,
      selectedAnswer: selectedIdx,
      isCorrect
    });

    // Save individual answer log to IndexedDB
    await saveAnswer({
      questionId: q.id,
      sessionId,
      selectedAnswer: selectedIdx,
      isCorrect,
      answeredAt: new Date().toISOString()
    });

    // Update SRS schedule for question
    const currentState = stateMap.get(q.id) || null;
    const rating = ratingFromCorrect(isCorrect);
    const nextState = calculateNextReview(currentState, rating);
    await setQuestionState({ questionId: q.id, ...nextState });
    stateMap.set(q.id, { questionId: q.id, ...nextState });

    // UI Updates
    const choiceButtons = container.querySelectorAll(".choice-btn");
    choiceButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.answer) {
        btn.classList.add("correct");
        btn.setAttribute("aria-checked", "true");
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add("wrong");
        btn.setAttribute("aria-checked", "true");
      } else {
        btn.classList.add("neutral-reveal");
      }
    });

    // Reveal Feedback box
    const feedbackBox = container.querySelector("#feedback-placeholder");
    if (feedbackBox) {
      feedbackBox.innerHTML = `
        <div class="answer-feedback ${isCorrect ? "feedback-correct" : "feedback-wrong"}">
          <div class="feedback-verdict">
            ${isCorrect ? "Correct!" : "Not quite right"}
          </div>
          <div class="feedback-explanation">
            ${q.explanation}
          </div>
        </div>
      `;
    }

    const actionBox = container.querySelector("#action-placeholder");
    if (actionBox) actionBox.style.display = "block";
  }

  async function finishSession() {
    sessionRecord.endTime = new Date().toISOString();
    await saveSession(sessionRecord);
    navigate("results", { sessionId });
  }

  renderCurrentQuestion();
}
