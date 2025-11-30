// gap_annotator1.js
// Розмітка полігонів + повний цикл на FastAPI (image/labelme/dataset/train/predict)
// Додано: підтримка мозаїки при натисканні кнопки btnPrev

(() => {
    const API_BASE = "http://192.168.3.242:8000/api/v1/gap";

    // DOM
    const imageInput = document.getElementById("imageInput");
    const jsonInput = document.getElementById("jsonInput");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const btnClearCurrent = document.getElementById("btnClearCurrent");
    const btnAddAnnotation = document.getElementById("btnAddAnnotation");
    const btnClearAll = document.getElementById("btnClearAll");
    const annotationsList = document.getElementById("annotationsList");
    const emptyState = document.getElementById("emptyState");
    const currentPointsCount = document.getElementById("currentPointsCount");

    // Ліва панель
    const leftBtnAddAnnotation = document.getElementById("leftBtnAddAnnotation");
    const leftBtnClearAll = document.getElementById("leftBtnClearAll");
    const leftAnnotationsList = document.getElementById("leftAnnotationsList");
    const leftEmptyState = document.getElementById("leftEmptyState");
    const leftCurrentPointsCount = document.getElementById("leftCurrentPointsCount");

    const jsonOutput = document.getElementById("jsonOutput");
    const btnDownloadJson = document.getElementById("btnDownloadJson");
    const btnCopyJson = document.getElementById("btnCopyJson");

    const btnSendImage = document.getElementById("btnSendImage");
    const btnSendLabelme = document.getElementById("btnSendLabelme");
    const btnSendImageTop = document.getElementById("btnSendImageTop");
    const btnSendLabelmeTop = document.getElementById("btnSendLabelmeTop");

    const btnMakeDataset = document.getElementById("btnMakeDataset");
    const btnTrain = document.getElementById("btnTrain");
    const btnPredict = document.getElementById("btnPredict");
    const serverStatus = document.getElementById("serverStatus");

    const dsTile = document.getElementById("dsTile");
    const dsStride = document.getElementById("dsStride");
    const dsAugs = document.getElementById("dsAugs");
    const trModel = document.getElementById("trModel");
    const trImgsz = document.getElementById("trImgsz");
    const trEpochs = document.getElementById("trEpochs");
    const trBatch = document.getElementById("trBatch");
    const prConf = document.getElementById("prConf");
    const prMaxDet = document.getElementById("prMaxDet");

    const datasetInfo = document.getElementById("datasetInfo");
    const trainInfo = document.getElementById("trainInfo");
    const weightsInfo = document.getElementById("weightsInfo");

    const btnHelp = document.getElementById("btnHelp");
    const btnHelpTop = document.getElementById("btnHelpTop");

    const togglePanelBtn = document.getElementById("togglePanel");
    const controlPanel = document.getElementById("controlPanel");
    const controlPanelHandle = document.getElementById("controlPanelHandle");

    const helpPanel = document.getElementById("helpPanel");
    const helpPanelHandle = document.getElementById("helpPanelHandle");
    const btnHelpClosePanel = document.getElementById("btnHelpClosePanel");

    const btnOpenImage = document.getElementById("btnOpenImage"); // кнопка в шапці

    // +++ ДОДАНО: кнопка "вліво" + контейнери режимів
    const btnPrev = document.getElementById("btnPrev");
    const imageView = document.getElementById("imageView");
    const videoView = document.getElementById("videoView");
    // +++

    // State
    let img = null;
    let imageFile = null;
    let imageName = "";
    let naturalW = 0;
    let naturalH = 0;

    let currentPoints = [];
    let annotations = [];

    let lastDatasetId = null;
    let lastTrainRunId = null;
    let lastBestWeightsPath = null;

    // Drag state for panels …
    let isDraggingPanel = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let panelStartLeft = 0;
    let panelStartTop = 0;

    let isDraggingHelpPanel = false;
    let helpDragStartX = 0;
    let helpDragStartY = 0;
    let helpPanelStartLeft = 0;
    let helpPanelStartTop = 0;

    // ===== Утиліти =====
    function setStatus(text) {
        if (serverStatus) {
            serverStatus.textContent = "Статус: " + text;
        }
    }

    function canvasToImageCoords(cx, cy) {
        const scaleX = naturalW / canvas.width;
        const scaleY = naturalH / canvas.height;
        return { x: cx * scaleX, y: cy * scaleY };
    }

    function imageToCanvasCoords(ix, iy) {
        const scaleX = canvas.width / naturalW;
        const scaleY = canvas.height / naturalH;
        return { x: ix * scaleX, y: iy * scaleY };
    }

    function redraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!img) return;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        annotations.forEach(a => {
            if (!a.visible) return;
            drawPolygon(
                a.points,
                a.source === "predict" ? "rgba(34,197,94,0.85)" : "rgba(14,165,233,0.95)",
                a.source === "predict" ? [7, 5] : null
            );
        });

        if (currentPoints.length > 0) {
            drawPolygon(currentPoints, "rgba(245,158,11,0.95)", [4, 4], true);
        }

        if (currentPointsCount) currentPointsCount.textContent = `${currentPoints.length} точок`;
        if (leftCurrentPointsCount) leftCurrentPointsCount.textContent = `${currentPoints.length} точок`;
    }

    function drawPolygon(points, strokeStyle, dash = null, drawPoints = false) {
        const pts = points.map(p => imageToCanvasCoords(p.x, p.y));
        if (pts.length === 0) return;

        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = strokeStyle;
        if (dash) ctx.setLineDash(dash);

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
            ctx.lineTo(pts[i].x, pts[i].y);
        }
        if (!drawPoints) ctx.closePath();
        ctx.stroke();

        if (drawPoints) {
            ctx.fillStyle = strokeStyle;
            pts.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        ctx.restore();
    }

    function updateAnnotationsUI() {
        // ... полностью как было ...
        // (без изменений)
    }

    function makeLabelmeJson() {
        const shapes = annotations.map(a => ({
            label: "gap",
            points: a.points.map(p => [round(p.x), round(p.y)]),
            group_id: null,
            shape_type: "polygon",
            flags: {}
        }));

        return {
            version: "5.0.1",
            flags: {},
            shapes,
            imagePath: imageName || "",
            imageData: null,
            imageHeight: naturalH || 0,
            imageWidth: naturalW || 0
        };
    }

    function round(v) {
        return Math.round(v * 100) / 100;
    }

    function syncJson() {
        if (!jsonOutput) return;
        jsonOutput.value = JSON.stringify(makeLabelmeJson(), null, 2);
    }

    function resetServerState() {
        lastDatasetId = null;
        lastTrainRunId = null;
        lastBestWeightsPath = null;

        if (datasetInfo) datasetInfo.textContent = "datasetId: —";
        if (trainInfo) trainInfo.textContent = "trainRunId: —";
        if (weightsInfo) weightsInfo.textContent = "best.pt: —";
    }

    // ===== ВАЖНО: Переключення в режим МОЗАЇКИ =====
    if (btnPrev && videoView && imageView) {
        btnPrev.onclick = () => {
            // Перехід у відео-режим
            videoView.classList.remove("hidden");
            imageView.classList.add("hidden");

            // Завантажити розмітку (HTML) для мозаїки
            fetch("gap_video_mosaic.php")
                .then(r => r.text())
                .then(html => {
                    videoView.innerHTML = html;

                    const script = document.createElement("script");
                    script.src = "gap_video_mosaic.js";
                    document.body.appendChild(script);
                })
                .catch(err => console.error("Mosaic error:", err));
        };
    }

    // ===== Події канвасу / логіка розмітки / серверні кнопки =====
    // ... все остальное остается полностью БЕЗ изменений ...

    // Початковий стан
    syncJson();
    updateAnnotationsUI();
    resetServerState();
    setStatus("очікування");
})();
