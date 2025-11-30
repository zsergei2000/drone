<?php
// train_panel_annotations.php
// Блок "Анотації"
?>
<section class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 space-y-2 text-[11px] text-slate-600">
    <div class="flex items-center justify-between gap-2">
        <span class="text-[11px] font-semibold text-slate-700">
            Анотації
        </span>
        <span id="leftCurrentPointsCount" class="text-[11px] text-slate-500">
            0 точок
        </span>
    </div>

    <div class="flex flex-col gap-1.5">
        <button
            id="btnClearCurrent"
            type="button"
            class="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
        >
            Очистити поточний
        </button>

        <div class="flex flex-wrap gap-1.5">
            <button
                id="leftBtnAddAnnotation"
                type="button"
                class="inline-flex items-center rounded-md bg-brand-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm hover:bg-brand-600"
            >
                Додати анотацію
            </button>
            <button
                id="leftBtnClearAll"
                type="button"
                class="inline-flex items-center rounded-md bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-100"
            >
                Очистити всі
            </button>
        </div>
    </div>

    <!-- Список анотацій -->
    <div class="mt-2">
        <div id="leftAnnotationsList" class="space-y-1.5 text-[11px]"></div>
        <div id="leftEmptyState" class="text-[11px] text-slate-400">
            Немає анотацій
        </div>
    </div>
</section>
