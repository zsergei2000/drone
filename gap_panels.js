// gap_panels.js
// Drag & drop для controlPanel, trainPanel и helpPanel

// Ключі для збереження позицій панелей у localStorage
const TRAIN_PANEL_POS_KEY = "gap_trainPanelPosition";
const CONTROL_PANEL_POS_KEY = "gap_controlPanelPosition";

// ===== Drag & drop controlPanel =====
function panelStartDrag(e) {
    if (!controlPanel) return;
    isDraggingPanel = true;

    const point = e.touches ? e.touches[0] : e;
    dragStartX = point.clientX;
    dragStartY = point.clientY;

    const rect = controlPanel.getBoundingClientRect();
    panelStartLeft = rect.left;
    panelStartTop = rect.top;

    controlPanel.style.position = "fixed";
    controlPanel.style.transition = "none";

    window.addEventListener("mousemove", panelOnDragMove);
    window.addEventListener("mouseup", panelStopDrag);
    window.addEventListener("touchmove", panelOnDragMove, { passive: false });
    window.addEventListener("touchend", panelStopDrag);
    window.addEventListener("touchcancel", panelStopDrag);

    e.preventDefault();
}

function panelOnDragMove(e) {
    if (!isDraggingPanel || !controlPanel) return;

    const point = e.touches ? e.touches[0] : e;
    const clientX = point.clientX;
    const clientY = point.clientY;

    const dx = clientX - dragStartX;
    const dy = clientY - dragStartY;

    let newLeft = panelStartLeft + dx;
    let newTop = panelStartTop + dy;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = controlPanel.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const margin = 8;

    if (newLeft < margin) newLeft = margin;
    if (newTop < margin) newTop = margin;
    if (newLeft + width > vw - margin) newLeft = vw - width - margin;
    if (newTop + height > vh - margin) newTop = vh - height - margin;

    controlPanel.style.left = newLeft + "px";
    controlPanel.style.top = newTop + "px";

    e.preventDefault();
}

// Збереження позиції controlPanel у localStorage після завершення перетягування
function saveControlPanelPosition() {
    if (!controlPanel) return;
    try {
        const rect = controlPanel.getBoundingClientRect();
        const pos = {
            left: rect.left,
            top: rect.top
        };
        localStorage.setItem(CONTROL_PANEL_POS_KEY, JSON.stringify(pos));
    } catch (e) {
        // мовчазно ігноруємо помилки localStorage
    }
}

function panelStopDrag() {
    if (!isDraggingPanel) return;
    isDraggingPanel = false;

    window.removeEventListener("mousemove", panelOnDragMove);
    window.removeEventListener("mouseup", panelStopDrag);
    window.removeEventListener("touchmove", panelOnDragMove);
    window.removeEventListener("touchend", panelStopDrag);
    window.removeEventListener("touchcancel", panelStopDrag);

    // Після завершення drag зберігаємо поточну позицію
    saveControlPanelPosition();
}

if (controlPanelHandle && controlPanel) {
    controlPanelHandle.addEventListener("mousedown", panelStartDrag);
    controlPanelHandle.addEventListener("touchstart", panelStartDrag, { passive: false });
}

// Відновлення позиції controlPanel з localStorage при завантаженні сторінки
function restoreControlPanelPosition() {
    if (!controlPanel) return;
    try {
        const raw = localStorage.getItem(CONTROL_PANEL_POS_KEY);
        if (!raw) return;

        const pos = JSON.parse(raw);
        if (typeof pos.left !== "number" || typeof pos.top !== "number") return;

        controlPanel.style.left = pos.left + "px";
        controlPanel.style.top = pos.top + "px";
        // Щоб top мав пріоритет над bottom з inline-стилю
        controlPanel.style.bottom = "auto";
    } catch (e) {
        // якщо щось не так з localStorage — просто ігноруємо
    }
}

if (controlPanel) {
    restoreControlPanelPosition();
}

// ===== Drag & drop trainPanel (нова панель з кнопками датасету/тренування/предикта) =====
function trainPanelStartDrag(e) {
    if (!trainPanel) return;
    isDraggingTrainPanel = true;

    const point = e.touches ? e.touches[0] : e;
    trainDragStartX = point.clientX;
    trainDragStartY = point.clientY;

    const rect = trainPanel.getBoundingClientRect();
    trainPanelStartLeft = rect.left;
    trainPanelStartTop = rect.top;

    trainPanel.style.position = "fixed";
    trainPanel.style.transition = "none";

    window.addEventListener("mousemove", trainPanelOnDragMove);
    window.addEventListener("mouseup", trainPanelStopDrag);
    window.addEventListener("touchmove", trainPanelOnDragMove, { passive: false });
    window.addEventListener("touchend", trainPanelStopDrag);
    window.addEventListener("touchcancel", trainPanelStopDrag);

    e.preventDefault();
}

function trainPanelOnDragMove(e) {
    if (!isDraggingTrainPanel || !trainPanel) return;

    const point = e.touches ? e.touches[0] : e;
    const clientX = point.clientX;
    const clientY = point.clientY;

    const dx = clientX - trainDragStartX;
    const dy = clientY - trainDragStartY;

    let newLeft = trainPanelStartLeft + dx;
    let newTop = trainPanelStartTop + dy;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = trainPanel.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const margin = 8;

    if (newLeft < margin) newLeft = margin;
    if (newTop < margin) newTop = margin;
    if (newLeft + width > vw - margin) newLeft = vw - width - margin;
    if (newTop + height > vh - margin) newTop = vh - height - margin;

    trainPanel.style.left = newLeft + "px";
    trainPanel.style.top = newTop + "px";

    e.preventDefault();
}

// Збереження позиції trainPanel у localStorage після завершення перетягування
function saveTrainPanelPosition() {
    if (!trainPanel) return;
    try {
        const rect = trainPanel.getBoundingClientRect();
        const pos = {
            left: rect.left,
            top: rect.top
        };
        localStorage.setItem(TRAIN_PANEL_POS_KEY, JSON.stringify(pos));
    } catch (e) {
        // мовчазно ігноруємо помилки localStorage
    }
}

function trainPanelStopDrag() {
    if (!isDraggingTrainPanel) return;
    isDraggingTrainPanel = false;

    window.removeEventListener("mousemove", trainPanelOnDragMove);
    window.removeEventListener("mouseup", trainPanelStopDrag);
    window.removeEventListener("touchmove", trainPanelOnDragMove);
    window.removeEventListener("touchend", trainPanelStopDrag);
    window.removeEventListener("touchcancel", trainPanelStopDrag);

    // Після завершення drag зберігаємо поточну позицію
    saveTrainPanelPosition();
}

if (trainPanelHandle && trainPanel) {
    trainPanelHandle.addEventListener("mousedown", trainPanelStartDrag);
    trainPanelHandle.addEventListener("touchstart", trainPanelStartDrag, { passive: false });
}

// Відновлення позиції trainPanel з localStorage при завантаженні сторінки
function restoreTrainPanelPosition() {
    if (!trainPanel) return;
    try {
        const raw = localStorage.getItem(TRAIN_PANEL_POS_KEY);
        if (!raw) return;

        const pos = JSON.parse(raw);
        if (typeof pos.left !== "number" || typeof pos.top !== "number") return;

        // Встановлюємо збережені координати
        trainPanel.style.left = pos.left + "px";
        trainPanel.style.top = pos.top + "px";
        // Щоб top мав пріоритет над bottom з inline-стилю
        trainPanel.style.bottom = "auto";
    } catch (e) {
        // якщо щось не так з localStorage — просто ігноруємо
    }
}

if (trainPanel) {
    restoreTrainPanelPosition();
}

// ===== Drag & drop helpPanel =====
function helpPanelStartDrag(e) {
    if (!helpPanel) return;
    isDraggingHelpPanel = true;

    const point = e.touches ? e.touches[0] : e;
    helpDragStartX = point.clientX;
    helpDragStartY = point.clientY;

    const rect = helpPanel.getBoundingClientRect();
    helpPanelStartLeft = rect.left;
    helpPanelStartTop = rect.top;

    helpPanel.style.position = "fixed";
    helpPanel.style.transition = "none";

    window.addEventListener("mousemove", helpPanelOnDragMove);
    window.addEventListener("mouseup", helpPanelStopDrag);
    window.addEventListener("touchmove", helpPanelOnDragMove, { passive: false });
    window.addEventListener("touchend", helpPanelStopDrag);
    window.addEventListener("touchcancel", helpPanelStopDrag);

    e.preventDefault();
}

function helpPanelOnDragMove(e) {
    if (!isDraggingHelpPanel || !helpPanel) return;

    const point = e.touches ? e.touches[0] : e;
    const clientX = point.clientX;
    const clientY = point.clientY;

    const dx = clientX - helpDragStartX;
    const dy = clientY - helpDragStartY;

    let newLeft = helpPanelStartLeft + dx;
    let newTop = helpPanelStartTop + dy;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = helpPanel.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const margin = 8;

    if (newLeft < margin) newLeft = margin;
    if (newTop < margin) newTop = margin;
    if (newLeft + width > vw - margin) newLeft = vw - width - margin;
    if (newTop + height > vh - margin) newTop = vh - height - margin;

    helpPanel.style.left = newLeft + "px";
    helpPanel.style.top = newTop + "px";

    e.preventDefault();
}

function helpPanelStopDrag() {
    if (!isDraggingHelpPanel) return;
    isDraggingHelpPanel = false;

    window.removeEventListener("mousemove", helpPanelOnDragMove);
    window.removeEventListener("mouseup", helpPanelStopDrag);
    window.removeEventListener("touchmove", helpPanelOnDragMove);
    window.removeEventListener("touchend", helpPanelStopDrag);
    window.removeEventListener("touchcancel", helpPanelStopDrag);
}

if (helpPanelHandle && helpPanel) {
    helpPanelHandle.addEventListener("mousedown", helpPanelStartDrag);
    helpPanelHandle.addEventListener("touchstart", helpPanelStartDrag, { passive: false });
}
