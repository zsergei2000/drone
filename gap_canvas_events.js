// gap_canvas_events.js
// Події канвасу та кнопки розмітки

// ===== Події канвасу =====
canvas.addEventListener("click", (e) => {
    if (!img) return;

    const rect = canvas.getBoundingClientRect();

    // Переводимо координати з DOM-простору в систему координат канваса
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const cx = (e.clientX - rect.left) * scaleX;
    const cy = (e.clientY - rect.top) * scaleY;

    currentPoints.push(canvasToImageCoords(cx, cy));
    redraw();
    syncJson();
});

canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (currentPoints.length > 0) {
        currentPoints.pop();
        redraw();
        syncJson();
    }
});

canvas.addEventListener("dblclick", (e) => {
    e.preventDefault();
    redraw();
    syncJson();
});

// ===== Кнопки розмітки =====
if (btnClearCurrent) {
    btnClearCurrent.onclick = () => {
        currentPoints = [];
        redraw();
        syncJson();
    };
}

if (btnAddAnnotation) {
    btnAddAnnotation.onclick = () => {
        if (currentPoints.length < 3) return;
        annotations.push({
            id: "a_" + Date.now() + "_" + Math.random().toString(16).slice(2),
            points: currentPoints.slice(),
            visible: true,
            source: "manual"
        });
        currentPoints = [];
        updateAnnotationsUI();
        redraw();
        syncJson();
    };
}

// Кнопка "Додати анотацію" в лівій панелі
if (leftBtnAddAnnotation) {
    leftBtnAddAnnotation.onclick = () => {
        if (currentPoints.length < 3) return;
        annotations.push({
            id: "a_" + Date.now() + "_" + Math.random().toString(16).slice(2),
            points: currentPoints.slice(),
            visible: true,
            source: "manual"
        });
        currentPoints = [];
        updateAnnotationsUI();
        redraw();
        syncJson();
    };
}

if (btnClearAll) {
    btnClearAll.onclick = () => {
        annotations = [];
        currentPoints = [];
        updateAnnotationsUI();
        redraw();
        syncJson();
    };
}
