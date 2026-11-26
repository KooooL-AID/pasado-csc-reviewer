/**
 * Pasado — Accessible Confirmation Modal Component
 * Uses native HTML5 <dialog> element complying with AntiSlopUI P0 gate:
 * - Proper keyboard focus management
 * - Closes on Escape
 * - Traps focus natively
 * - Accessible ARIA labels
 */

export function showConfirmModal({
  title = "End Review Session?",
  message = "Are you sure you want to end this review session? Your current session progress will not be saved.",
  confirmText = "End Session",
  cancelText = "Continue Reviewing",
  isDestructive = true
} = {}) {
  return new Promise((resolve) => {
    // Remove any existing modal
    const existing = document.getElementById("confirm-dialog");
    if (existing) existing.remove();

    const dialog = document.createElement("dialog");
    dialog.id = "confirm-dialog";
    dialog.className = "confirm-dialog";
    dialog.setAttribute("aria-labelledby", "confirm-dialog-title");
    dialog.setAttribute("aria-describedby", "confirm-dialog-message");

    dialog.innerHTML = `
      <div class="confirm-dialog-content">
        <h2 id="confirm-dialog-title" class="confirm-dialog-title">${title}</h2>
        <p id="confirm-dialog-message" class="confirm-dialog-message">${message}</p>
        <div class="confirm-dialog-actions">
          <button type="button" class="btn btn-secondary" id="confirm-dialog-cancel">
            ${cancelText}
          </button>
          <button type="button" class="btn ${isDestructive ? "btn-danger" : "btn-primary"}" id="confirm-dialog-confirm">
            ${confirmText}
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);

    const btnCancel = dialog.querySelector("#confirm-dialog-cancel");
    const btnConfirm = dialog.querySelector("#confirm-dialog-confirm");

    function cleanup(result) {
      dialog.close();
      dialog.remove();
      resolve(result);
    }

    btnCancel.addEventListener("click", () => cleanup(false));
    btnConfirm.addEventListener("click", () => cleanup(true));

    // Handle native cancel event (pressing Escape)
    dialog.addEventListener("cancel", (e) => {
      e.preventDefault();
      cleanup(false);
    });

    // Handle clicking outside the dialog content (backdrop click)
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        cleanup(false);
      }
    });

    dialog.showModal();
    // Default focus to cancel button so destructive action isn't accidentally pressed
    btnCancel.focus();
  });
}
