// gap_api.js
// Серверні дії FastAPI: image, labelme, dataset, train, predict

// ===== Серверні дії =====

// 1) Відправити зображення
if (btnSendImage) {
    btnSendImage.onclick = async () => {
        if (!imageFile) {
            alert("Спочатку завантажте зображення.");
            return;
        }
        try {
            setStatus("надсилання зображення...");
            const fd = new FormData();
            fd.append("file", imageFile);
            fd.append("imageName", imageName);

            const r = await fetch(`${API_BASE}/image`, { method: "POST", body: fd });
            const j = await r.json();
            if (!r.ok) throw new Error(JSON.stringify(j));

            setStatus("зображення відправлено");
        } catch (e) {
            setStatus("помилка надсилання зображення");
            alert("Помилка: " + e.message);
        }
    };
}

// 2) Відправити LabelMe JSON
if (btnSendLabelme) {
    btnSendLabelme.onclick = async () => {
        if (!img) {
            alert("Спочатку завантажте зображення.");
            return;
        }
        if (annotations.length === 0) {
            alert("Немає анотацій для відправки.");
            return;
        }
        try {
            setStatus("надсилання розмітки...");
            const payload = {
                imageName,
                labelme: makeLabelmeJson(),
                meta: {}
            };

            const r = await fetch(`${API_BASE}/labelme`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const j = await r.json();
            if (!r.ok) throw new Error(JSON.stringify(j));

            setStatus("розмітку відправлено");
        } catch (e) {
            setStatus("помилка надсилання розмітки");
            alert("Помилка: " + e.message);
        }
    };
}

// 3) Створити датасет
if (btnMakeDataset) {
    btnMakeDataset.onclick = async () => {
        if (!img) {
            alert("Спочатку завантажте зображення.");
            return;
        }
        try {
            setStatus("генерація датасету...");

            const payload = {
                imageName,
                tile: parseInt(dsTile.value || "1024", 10),
                stride: parseInt(dsStride.value || "640", 10),
                augs: parseInt(dsAugs.value || "5", 10)
            };

            const r = await fetch(`${API_BASE}/make-dataset`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const j = await r.json();
            if (!r.ok) throw new Error(JSON.stringify(j));

            lastDatasetId = j.datasetId;
            if (datasetInfo) {
                datasetInfo.textContent = `datasetId: ${lastDatasetId}`;
            }
            setStatus("датасет створено");
        } catch (e) {
            setStatus("помилка датасету");
            alert("Помилка: " + e.message);
        }
    };
}

// 4) Навчити модель
if (btnTrain) {
    btnTrain.onclick = async () => {
        if (!lastDatasetId) {
            alert("Спочатку створіть датасет.");
            return;
        }
        try {
            setStatus("тренування... (CPU може довго)");

            const payload = {
                datasetId: lastDatasetId,
                model: trModel.value || "yolov8n-seg.pt",
                imgsz: parseInt(trImgsz.value || "1024", 10),
                epochs: parseInt(trEpochs.value || "25", 10),
                batch: parseInt(trBatch.value || "8", 10)
            };

            const r = await fetch(`${API_BASE}/train`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const j = await r.json();
            if (!r.ok) throw new Error(JSON.stringify(j));

            lastTrainRunId = j.trainRunId;
            lastBestWeightsPath = j.weightsBest || null;

            if (trainInfo) {
                trainInfo.textContent = `trainRunId: ${lastTrainRunId}`;
            }
            if (weightsInfo) {
                weightsInfo.textContent = `best.pt: ${lastBestWeightsPath || "—"}`;
            }

            setStatus("тренування завершено");
        } catch (e) {
            setStatus("помилка тренування");
            alert("Помилка: " + e.message);
        }
    };
}

// 5) Автопредикт
if (btnPredict) {
    btnPredict.onclick = async () => {
        if (!img) {
            alert("Спочатку завантажте зображення.");
            return;
        }
        try {
            setStatus("автопредикт...");

            const payload = {
                imageName,
                conf: parseFloat(prConf.value || "0.25"),
                maxDet: parseInt(prMaxDet.value || "300", 10)
            };

            if (lastBestWeightsPath) {
                payload.weightsPath = lastBestWeightsPath;
            }

            const r = await fetch(`${API_BASE}/predict`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const j = await r.json();
            if (!r.ok) throw new Error(JSON.stringify(j));

            const masks = Array.isArray(j.masks) ? j.masks : [];
            if (masks.length === 0) {
                setStatus("автопредикт: нічого не знайдено");
                return;
            }

            masks.forEach(m => {
                const poly = m.polygon || m.points || [];
                if (!Array.isArray(poly) || poly.length < 3) return;
                annotations.push({
                    id: "pred_" + Date.now() + "_" + Math.random().toString(16).slice(2),
                    points: poly.map(pt => ({ x: pt[0], y: pt[1] })),
                    visible: true,
                    source: "predict"
                });
            });

            updateAnnotationsUI();
            redraw();
            syncJson();
            setStatus(`автопредикт: знайдено ${masks.length}`);
        } catch (e) {
            setStatus("помилка автопредикту");
            alert("Помилка: " + e.message);
        }
    };
}
