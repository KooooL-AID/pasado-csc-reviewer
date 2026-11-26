import { icon } from "../components/icons.js";
import { getSetting, setSetting, exportData, importData } from "../db.js";

export async function renderSettings(container, navigate) {
  const examDate = await getSetting("examDate", "2027-03-14");
  const dailyGoal = await getSetting("dailyGoal", 10);

  container.innerHTML = `
    <header class="view-header">
      <button class="btn-icon" id="btn-settings-back" aria-label="Back">
        ${icon("arrowLeft", "nav-icon")}
      </button>
      <h1 class="view-header-title">Settings & Data</h1>
    </header>

    <main class="view-body animate-in">
      <section style="margin-bottom: 24px;">
        <h2 class="section-label">Examination Target</h2>
        <div class="settings-row">
          <div>
            <div class="settings-row-label">Examination Level</div>
            <div class="settings-row-hint">Active reviewer question bank</div>
          </div>
          <select id="select-exam-level" class="settings-input" style="font-weight: 500;" aria-label="Examination level">
            <option value="professional" selected>CSE Professional Level (2027)</option>
            <option value="subprofessional" disabled>CSE Subprofessional (Coming Soon)</option>
          </select>
        </div>

        <div class="settings-row">
          <div>
            <div class="settings-row-label">Target Examination Date</div>
            <div class="settings-row-hint">Configures your 2027 daily preparation countdown</div>
          </div>
          <input type="date" id="input-exam-date" class="settings-input" value="${examDate}" aria-label="Examination date" />
        </div>

        <div class="settings-row">
          <div>
            <div class="settings-row-label">Daily Goal (Questions)</div>
            <div class="settings-row-hint">Number of questions to aim for each day</div>
          </div>
          <input type="number" id="input-daily-goal" class="settings-input" value="${dailyGoal}" min="5" max="50" style="width: 70px;" aria-label="Daily question goal" />
        </div>
      </section>

      <section style="margin-bottom: 24px;">
        <h2 class="section-label">Local Data & Backup</h2>
        <div class="settings-row">
          <div>
            <div class="settings-row-label">Export Study Progress</div>
            <div class="settings-row-hint">Save a JSON backup of your answers, SRS state, and streak</div>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-export-backup">Export</button>
        </div>

        <div class="settings-row">
          <div>
            <div class="settings-row-label">Restore from Backup</div>
            <div class="settings-row-hint">Import a previously saved Pasado progress file</div>
          </div>
          <label class="btn btn-secondary btn-sm" style="cursor: pointer;">
            Import
            <input type="file" id="input-import-backup" accept=".json" style="display: none;" />
          </label>
        </div>
      </section>

      <section style="margin-bottom: 24px;">
        <h2 class="section-label">About Pasado</h2>
        <div class="surface" style="padding: 16px;">
          <div class="font-semibold text-sm">Pasado Version 0.1.0 (2027 Edition)</div>
          <p class="text-xs text-muted mt-2">
            Targeted for the <strong>2027 Philippine Civil Service Examination – Professional Level (CSE-PPT)</strong>.
          </p>
          <p class="text-xs text-muted mt-2">
            Includes English Grammar & Usage, Vocabulary Synonyms, and Word Analogies. Subprofessional clerical modules (filing, alphabetizing, spelling) are slated for a future update.
          </p>
          <div class="text-xs text-muted mt-2" style="font-weight: 500;">
            100% Offline • No subscriptions • Private local storage
          </div>
        </div>
      </section>
    </main>
  `;

  container.querySelector("#btn-settings-back")?.addEventListener("click", () => navigate("today"));

  container.querySelector("#input-exam-date")?.addEventListener("change", async (e) => {
    await setSetting("examDate", e.target.value);
  });

  container.querySelector("#input-daily-goal")?.addEventListener("change", async (e) => {
    await setSetting("dailyGoal", parseInt(e.target.value, 10));
  });

  container.querySelector("#btn-export-backup")?.addEventListener("click", async () => {
    const dataStr = await exportData();
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pasado-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  container.querySelector("#input-import-backup")?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        await importData(evt.target.result);
        alert("Progress restored successfully!");
        navigate("today");
      } catch (err) {
        alert("Failed to import backup: " + err.message);
      }
    };
    reader.readAsText(file);
  });
}
