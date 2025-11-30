// gap_io.js
// Завантаження зображення, імпорт/експорт JSON, копіювання
// 1764456000

// [1764456000] ADD — завантаження зображення за URL (для мозаїки)
window.gapLoadImageFromUrl = function (url, name) {
    if (!url) return;

    const image = new Image();
    image.onload = () => {
        img = image;
        imageFile = null;
        imageName = name || url;

        naturalW = img.naturalWidth;
        naturalH = img.naturalHeight;

        const wrap = canvas.parentElement;
        const maxW = wrap.clientWidth - 8;
        const scale = maxW / naturalW;

        canvas.width = Math.round(naturalW * scale);
        canvas.height = Math.round(naturalH * scale);

        // КЛЮЧЕВО: внутрішній розмір = CSS-розмір.
        // Так rect.width/height (у canvas_events) збігаються з canvas.width/height (у gap_core).
        canvas.style.width = canvas.width + "px";
        canvas.style.height = canvas.height + "px";

        currentPoints = [];
        annotations = [];
        resetServerState();
        updateAnnotationsUI();
        redraw();
        syncJson();
        setStatus("зображення завантажено");
    };
    image.onerror = () => {
        setStatus("Не вдалося завантажити зображення з мозаїки");
    };
    image.src = url;
};

// ===== Завантаження зображення =====
if (imageInput) {
    imageInput.addEventListener("change", () => {
        const file = imageInput.files?.[0];
        if (!file) return;

        imageFile = file;
        imageName = file.name;

        const reader = new FileReader();
        reader.onload = () => {
            img = new Image();
            img.onload = () => {
                naturalW = img.naturalWidth;
                naturalH = img.naturalHeight;

                const wrap = canvas.parentElement;
                const maxW = wrap.clientWidth - 8;
                const scale = maxW / naturalW;

                canvas.width = Math.round(naturalW * scale);
                canvas.height = Math.round(naturalH * scale);

                // КЛЮЧЕВО: внутрішній розмір = CSS-розмір.
                // Так rect.width/height (у canvas_events) збігаються з canvas.width/height (у gap_core).
                canvas.style.width = canvas.width + "px";
                canvas.style.height = canvas.height + "px";

                currentPoints = [];
                annotations = [];
                resetServerState();
                updateAnnotationsUI();
                redraw();
                syncJson();
                setStatus("зображення завантажено");
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

// ===== Імпорт JSON =====
if (jsonInput) {
    jsonInput.addEventListener("change", () => {
        const file = jsonInput.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const data = JSON.parse(reader.result);
                if (!data.shapes || !Array.isArray(data.shapes)) {
                    throw new Error("Невірний формат");
                }

                annotations = data.shapes
                    .filter(s => s.shape_type === "polygon")
                    .map(s => ({
                        id: "imp_" + Date.now() + "_" + Math.random().toString(16).slice(2),
                        points: s.points.map(pt => ({ x: pt[0], y: pt[1] })),
                        visible: true,
                        source: "manual"
                    }));
                currentPoints = [];

                updateAnnotationsUI();
                redraw();
                syncJson();
                setStatus("JSON імпортовано");
            } catch (err) {
                alert("Помилка імпорту JSON: " + err.message);
            }
        };
        reader.readAsText(file);
    });
}

// ===== Експорт JSON =====
if (btnCopyJson && jsonOutput) {
    btnCopyJson.onclick = async () => {
        try {
            await navigator.clipboard.writeText(jsonOutput.value);
            setStatus("JSON скопійовано");
        } catch (e) {
            alert("Не вдалося скопіювати JSON: " + e.message);
        }
    };
}

if (btnDownloadJson && jsonOutput) {
    btnDownloadJson.onclick = () => {
        const blob = new Blob([jsonOutput.value], { type: "application/json" });
        const a = document.createElement("a");
        const name = (imageName ? imageName.replace(/\.[^.]+$/, "") : "gap") + ".json";
        a.href = URL.createObjectURL(blob);
        a.download = name;
        a.click();
        URL.revokeObjectURL(a.href);
        setStatus("JSON збережено");
    };
}
