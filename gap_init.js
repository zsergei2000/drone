// gap_init.js
// Інструкція, JSON-панель, Меню, collapsible

if (helpPanel && btnHelpClosePanel) {
    if (btnHelp) btnHelp.onclick = () => helpPanel.classList.remove("hidden");
    if (btnHelpTop) btnHelpTop.onclick = () => helpPanel.classList.remove("hidden");
    btnHelpClosePanel.onclick = (e) => {
        e.stopPropagation();
        helpPanel.classList.add("hidden");
    };
}

const btnJsonPanel = document.getElementById("btnJsonPanel");
const btnControlPanelClose = document.getElementById("btnControlPanelClose");

if (btnJsonPanel && controlPanel) {
    btnJsonPanel.onclick = () => controlPanel.classList.remove("hidden");
}
if (btnControlPanelClose && controlPanel) {
    btnControlPanelClose.onclick = (e) => {
        e.stopPropagation();
        controlPanel.classList.add("hidden");
    };
}

if (togglePanelBtn && controlPanel) {
    togglePanelBtn.onclick = () => controlPanel.classList.toggle("hidden");
}

const btnTrainPanelMenu = document.getElementById("btnTrainPanelMenu");
const btnTrainPanelClose = document.getElementById("btnTrainPanelClose");

if (btnTrainPanelMenu && trainPanel) {
    btnTrainPanelMenu.onclick = () => trainPanel.classList.remove("hidden");
}
if (btnTrainPanelClose && trainPanel) {
    btnTrainPanelClose.onclick = (e) => {
        e.stopPropagation();
        trainPanel.classList.add("hidden");
    };
}

function initCollapsible(toggleId, bodyId) {
    const toggleEl = document.getElementById(toggleId);
    const bodyEl = document.getElementById(bodyId);
    if (!toggleEl || !bodyEl) return;

    bodyEl.style.overflow = "hidden";
    bodyEl.style.maxHeight = "0px";
    bodyEl.style.opacity = "0";
    bodyEl.style.transition = "max-height 0.2s ease-out, opacity 0.2s ease-out";

    let expanded = false;

    toggleEl.addEventListener("click", () => {
        expanded = !expanded;

        if (expanded) {
            bodyEl.style.maxHeight = bodyEl.scrollHeight + "px";
            bodyEl.style.opacity = "1";
        } else {
            bodyEl.style.maxHeight = "0px";
            bodyEl.style.opacity = "0";
        }
    });
}

initCollapsible("datasetToggle", "datasetBody");
initCollapsible("trainToggle", "trainBody");
initCollapsible("predictToggle", "predictBody");

syncJson();
updateAnnotationsUI();
resetServerState();
setStatus("очікування");

// ============================================================================
// [1739223600] ADD — ГАРАНТИРОВАТЬ, ЧТО ПРИ ЗАГРУЗКЕ САЙТА СЕТКА ВИДНА
// ============================================================================
(function ensureGridVisibleOnLoad() {
    const iv = document.getElementById("imageView");
    const vv = document.getElementById("videoView");
    const mv = document.getElementById("mosaicView");

    if (iv) iv.classList.remove("hidden");     // показать сетку
    if (vv) vv.classList.add("hidden");        // при загрузке видео скрыто
    if (mv) mv.classList.add("hidden");        // мозаика скрыта
})();
