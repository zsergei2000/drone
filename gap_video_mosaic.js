// gap_video_mosaic.js
// Отримання списку кадрів з 192-серверу через NET-file + побудова мозаїки.
// 1764456000

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("gapVideoMosaicGrid");
    const statusEl = document.getElementById("gapVideoMosaicStatus");

    if (!grid) {
        console.error("gapVideoMosaicGrid not found");
        return;
    }

    const LIST_URL = "/bug/main/dron/list_frames_net.php"; // [1764454000] FIX — правильний NET-wrapper на хості

    // [1764456000] ADD — створення плитки мозаїки з обробником кліку
    function createMosaicImage(frame) {
        if (!frame || !frame.url) {
            return null;
        }

        const img = document.createElement("img");
        img.src = frame.url;
        img.className = "w-full h-auto rounded border border-slate-200 cursor-pointer";

        img.addEventListener("click", () => {
            // Перемикаємося на першу сторінку (imageView)
            const imageView = document.getElementById("imageView");
            const videoView = document.getElementById("videoView");
            if (imageView && videoView) {
                videoView.classList.add("hidden");
                imageView.classList.remove("hidden");
            }

            // Завантажуємо зображення в canvas так само, як через "Відкрити фото"
            if (typeof window.gapLoadImageFromUrl === "function") {
                const name = frame.file || frame.path || frame.url;
                window.gapLoadImageFromUrl(frame.url, name);
                if (statusEl) {
                    statusEl.textContent = "Кадр з мозаїки завантажено в розмітку.";
                }
            } else {
                if (statusEl) {
                    statusEl.textContent = "Помилка: gapLoadImageFromUrl недоступна.";
                }
            }
        });

        return img;
    }

    async function loadFrames() {
        try {
            if (statusEl) {
                statusEl.textContent = "Завантаження списку кадрів…";
            }

            const response = await fetch(LIST_URL, {
                method: "GET",
                credentials: "include"
            });

            const json = await response.json();

            if (!json.ok || !Array.isArray(json.frames)) {
                if (statusEl) {
                    statusEl.textContent = "Не вдалося отримати кадри.";
                }
                console.error("Invalid JSON:", json);
                return;
            }

            grid.innerHTML = "";

            json.frames.forEach(f => {
                const img = createMosaicImage(f);
                if (img) {
                    grid.appendChild(img);
                }
            });

            if (statusEl) {
                statusEl.textContent = `Завантажено кадрів: ${json.frames.length}`;
            }
        } catch (e) {
            console.error(e);
            if (statusEl) {
                statusEl.textContent = "Помилка завантаження.";
            }
        }
    }

    // [1764454000] ADD — тестова кнопка "мозаїка → 192"
    const mosaicTestBtn = document.getElementById("gapVideoMosaicTestBtn");
    const videoFrame = document.getElementById("videoFrame");

    if (mosaicTestBtn) {
        mosaicTestBtn.addEventListener("click", () => {
            if (!videoFrame || !videoFrame.contentWindow) {
                if (statusEl) {
                    statusEl.textContent = "Помилка: iframe відео недоступний.";
                }
                console.warn("[1764454000] videoFrame iframe not available");
                return;
            }

            try {
                videoFrame.contentWindow.postMessage(
                    {
                        SOURCE: "gap_host",
                        COMMAND: "HOST_TEST",
                        text: "Тестове повідомлення з мозаїки (MOZAIKA)"
                    },
                    "*"
                );
                if (statusEl) {
                    statusEl.textContent = "Надіслано тест мозаїки на 192 (HOST_TEST).";
                }
            } catch (e) {
                console.error(e);
                if (statusEl) {
                    statusEl.textContent = "Помилка надсилання тесту мозаїки.";
                }
            }
        });
    }

    // [1764455000] ADD — прийом FRAMES_LIST з 192 та оновлення мозаїки
    window.addEventListener("message", (event) => {
        const data = event.data;
        if (!data || typeof data !== "object") {
            return;
        }
        if (data.SOURCE !== "gap_process") {
            return;
        }

        if (data.COMMAND === "FRAMES_LIST") {
            const payload = data.payload;

            if (!payload || payload.ok !== true || !Array.isArray(payload.frames)) {
                if (statusEl) {
                    statusEl.textContent = "Помилка: некоректні дані мозаїки з 192.";
                }
                console.error("[1764455000] Некоректний payload FRAMES_LIST:", payload);
                return;
            }

            grid.innerHTML = "";

            payload.frames.forEach((f) => {
                const img = createMosaicImage(f);
                if (img) {
                    grid.appendChild(img);
                }
            });

            if (statusEl) {
                statusEl.textContent = `192 → FRAMES_LIST: отримано кадрів ${payload.frames.length}`;
            }
        }
    });

    loadFrames();
});
