/**
 * Pasado — IndexedDB Persistence Layer
 * Stores: user progress, session history, flashcard SRS data, settings
 */

const DB_NAME = "pasado";
const DB_VERSION = 1;

let _db = null;

function openDB() {
  if (_db) return Promise.resolve(_db);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (e) => {
      const db = e.target.result;

      // User settings and progress summary
      if (!db.objectStoreNames.contains("settings")) {
        db.createObjectStore("settings", { keyPath: "key" });
      }

      // Individual question answer history
      if (!db.objectStoreNames.contains("answers")) {
        const store = db.createObjectStore("answers", {
          keyPath: "id",
          autoIncrement: true
        });
        store.createIndex("questionId", "questionId", { unique: false });
        store.createIndex("sessionId",  "sessionId",  { unique: false });
        store.createIndex("answeredAt", "answeredAt", { unique: false });
      }

      // Session records
      if (!db.objectStoreNames.contains("sessions")) {
        db.createObjectStore("sessions", { keyPath: "id" });
      }

      // Flashcard SRS state per card
      if (!db.objectStoreNames.contains("cardState")) {
        db.createObjectStore("cardState", { keyPath: "cardId" });
      }

      // Question SRS state (for missed question scheduling)
      if (!db.objectStoreNames.contains("questionState")) {
        db.createObjectStore("questionState", { keyPath: "questionId" });
      }
    };

    req.onsuccess  = (e) => { _db = e.target.result; resolve(_db); };
    req.onerror    = (e) => reject(e.target.error);
  });
}

function tx(storeName, mode = "readonly") {
  return _db.transaction(storeName, mode).objectStore(storeName);
}

function get(store, key) {
  return new Promise((res, rej) => {
    const req = store.get(key);
    req.onsuccess = () => res(req.result);
    req.onerror   = () => rej(req.error);
  });
}

function put(store, value) {
  return new Promise((res, rej) => {
    const req = store.put(value);
    req.onsuccess = () => res(req.result);
    req.onerror   = () => rej(req.error);
  });
}

function getAll(store, index, query) {
  return new Promise((res, rej) => {
    const source = index ? store.index(index) : store;
    const req = query ? source.getAll(query) : source.getAll();
    req.onsuccess = () => res(req.result);
    req.onerror   = () => rej(req.error);
  });
}

/* ── SETTINGS ──────────────────────────────────────────────── */
export async function getSetting(key, defaultVal = null) {
  await openDB();
  const row = await get(tx("settings"), key);
  return row ? row.value : defaultVal;
}

export async function setSetting(key, value) {
  await openDB();
  await put(tx("settings", "readwrite"), { key, value });
}

export async function getAllSettings() {
  await openDB();
  const rows = await getAll(tx("settings"));
  return Object.fromEntries(rows.map(r => [r.key, r.value]));
}

/* ── SESSIONS ──────────────────────────────────────────────── */
export async function saveSession(session) {
  await openDB();
  await put(tx("sessions", "readwrite"), session);
}

export async function getSession(id) {
  await openDB();
  return get(tx("sessions"), id);
}

export async function getAllSessions() {
  await openDB();
  return getAll(tx("sessions"));
}

export async function getLastSession() {
  const sessions = await getAllSessions();
  if (!sessions.length) return null;
  sessions.sort((a, b) => new Date(b.endTime) - new Date(a.endTime));
  return sessions[0];
}

/* ── ANSWERS ───────────────────────────────────────────────── */
export async function saveAnswer(answerRecord) {
  await openDB();
  await put(tx("answers", "readwrite"), answerRecord);
}

export async function getAnswersByQuestion(questionId) {
  await openDB();
  return getAll(tx("answers"), "questionId", questionId);
}

export async function getAllAnswers() {
  await openDB();
  return getAll(tx("answers"));
}

/* ── QUESTION STATE (SRS) ──────────────────────────────────── */
export async function getQuestionState(questionId) {
  await openDB();
  return get(tx("questionState"), questionId);
}

export async function setQuestionState(state) {
  await openDB();
  await put(tx("questionState", "readwrite"), state);
}

export async function getAllQuestionStates() {
  await openDB();
  return getAll(tx("questionState"));
}

/* ── CARD STATE (SRS) ──────────────────────────────────────── */
export async function getCardState(cardId) {
  await openDB();
  return get(tx("cardState"), cardId);
}

export async function setCardState(state) {
  await openDB();
  await put(tx("cardState", "readwrite"), state);
}

export async function getAllCardStates() {
  await openDB();
  return getAll(tx("cardState"));
}

/* ── AGGREGATE STATS ───────────────────────────────────────── */
export async function getStats() {
  await openDB();
  const [answers, sessions, questionStates, cardStates] = await Promise.all([
    getAllAnswers(),
    getAllSessions(),
    getAllQuestionStates(),
    getAllCardStates()
  ]);

  const total = answers.length;
  const correct = answers.filter(a => a.isCorrect).length;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  const mastered = questionStates.filter(s => s.status === "mastered").length;
  const needsWork = questionStates.filter(s => s.status === "learning" || s.status === "new").length;

  const cardsMastered = cardStates.filter(s => s.status === "mastered").length;

  // Study streak
  const studiedDays = new Set(
    sessions
      .filter(s => s.endTime)
      .map(s => new Date(s.endTime).toDateString())
  );
  const streak = computeStreak(studiedDays);

  return {
    totalAnswered: total,
    totalCorrect: correct,
    accuracy,
    sessionsCompleted: sessions.filter(s => s.endTime).length,
    mastered,
    needsWork,
    cardsMastered,
    streak
  };
}

function computeStreak(studiedDays) {
  if (!studiedDays.size) return 0;
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (studiedDays.has(d.toDateString())) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

/* ── DUE REVIEW ITEMS ──────────────────────────────────────── */
export async function getDueQuestions() {
  await openDB();
  const states = await getAllQuestionStates();
  const now = Date.now();
  return states.filter(s =>
    s.status !== "mastered" &&
    (!s.nextReview || s.nextReview <= now)
  ).map(s => s.questionId);
}

export async function getDueCards() {
  await openDB();
  const states = await getAllCardStates();
  const now = Date.now();
  return states.filter(s =>
    s.status !== "mastered" &&
    (!s.nextReview || s.nextReview <= now)
  ).map(s => s.cardId);
}

/* ── EXPORT / IMPORT ───────────────────────────────────────── */
export async function exportData() {
  await openDB();
  const [settings, sessions, answers, questionStates, cardStates] = await Promise.all([
    getAll(tx("settings")),
    getAll(tx("sessions")),
    getAll(tx("answers")),
    getAll(tx("questionState")),
    getAll(tx("cardState"))
  ]);
  return JSON.stringify({
    version: 1,
    exportedAt: new Date().toISOString(),
    settings, sessions, answers, questionStates, cardStates
  }, null, 2);
}

export async function importData(jsonString) {
  const data = JSON.parse(jsonString);
  if (data.version !== 1) throw new Error("Unsupported backup version");
  await openDB();

  async function restoreStore(storeName, items) {
    const store = tx(storeName, "readwrite");
    for (const item of items) await put(store, item);
  }

  await restoreStore("settings",      data.settings      || []);
  await restoreStore("sessions",      data.sessions      || []);
  await restoreStore("answers",       data.answers       || []);
  await restoreStore("questionState", data.questionStates || []);
  await restoreStore("cardState",     data.cardStates    || []);
}

export { openDB };
