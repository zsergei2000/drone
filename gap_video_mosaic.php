<?php
// gap_video_mosaic.php
// 1764510368
// Блок мозаїки кадрів. Дані отримуються через JS.
?>
<section class="rounded-lg border border-slate-200 bg-white px-4 py-3 mt-2">
    <div class="flex items-center justify-between gap-2">
        <h3 class="text-xs font-semibold uppercase tracking-wide text-slate-600">
            КАДРИ (МОЗАЇКА, 192-СЕРВЕР)
        </h3>
        <div class="flex items-center gap-2">
            <span
                id="gapVideoMosaicStatus"
                class="text-[11px] text-slate-500"
            >
                Очікування даних…
            </span>
            <!-- [1764454000] ADD — тестова кнопка з мозаїки на 192 -->
            <button
                id="gapVideoMosaicTestBtn"
                type="button"
                class="px-2 py-1 text-[11px] rounded border border-slate-300 bg-white hover:bg-slate-50"
            >
                Тест мозаїка → 192
            </button>
        </div>
    </div>

    <!-- [1764510368] ADD — прокрутка для мозаїки з обмеженням на 2 рядки -->
    <div
        id="gapVideoMosaicGrid"
        class="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 overflow-y-auto pr-1"
        style="max-height: 0;"
    >
        <!-- JS підставить <img> -->
    </div>
</section>
