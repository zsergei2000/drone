// gap_header_buttons.js
// Кнопки в шапке и левой панели + переключение режимов (зображення / відео / мозаїка)

// DOM-элементы
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const imageView = document.getElementById("imageView");
const videoView = document.getElementById("videoView");
const videoFrame = document.getElementById("videoFrame");

// [1739220000] ADD — подключаем блок мозайки
const mosaicView = document.getElementById("mosaicView");

// ===== Кнопка "Відкрити зображення" =====
if (typeof btnOpenImage !== "undefined" && btnOpenImage && imageInput) {
    btnOpenImage.addEventListener("click", () => {
        imageInput.click();
    });
}

// ===== Кнопка "Очистити всі" =====
if (typeof leftBtnClearAll !== "undefined" && leftBtnClearAll) {
    leftBtnClearAll.onclick = () => {
        annotations = [];
        currentPoints = [];
        updateAnnotationsUI();
        redraw();
        syncJson();
    };
}

// ===== Переключение режимов =====

// ВЛЕВО (◀) — показать ВИДЕО и МОЗАИКУ
if (btnPrev && imageView && videoView && mosaicView) {
    btnPrev.onclick = () => {

        // скрыть канвас
        imageView.classList.add("hidden");

        // показать videoView
        videoView.classList.remove("hidden");

        // [1739220000] ADD — показать mosaicView вместе с видео
        mosaicView.classList.remove("hidden");

        // запрос iframe на обновление списка кадров (как было раньше)
        if (videoFrame && videoFrame.contentWindow) {
            try {
                videoFrame.contentWindow.postMessage(
                    {
                        SOURCE: "gap_host",
                        COMMAND: "REQUEST_VIDEO_FRAMES"
                    },
                    "*"
                );
            } catch (e) {}
        }
    };
}

// ВПРАВО (▶) — вернуть в режим зображення
if (btnNext && imageView && videoView && mosaicView) {
    btnNext.onclick = () => {

        // скрыть мозаику
        // [1739220000] ADD — скрываем mosaicView
        mosaicView.classList.add("hidden");

        // скрыть видео
        videoView.classList.add("hidden");

        // показать канвас
        imageView.classList.remove("hidden");
    };
}
