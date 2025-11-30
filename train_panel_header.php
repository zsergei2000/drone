<?php
// train_panel_header.php
// Шапка панелі + Drag handle + кнопка закриття
?>
<div
    id="trainPanelHandle"
    class="mb-1 flex items-center justify-between gap-2 cursor-move select-none"
>
    <div class="flex items-center gap-2">
        <!-- Кнопка-ручка (drag) -->
        <button
            type="button"
            class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-[13px] leading-none text-slate-500 shadow-sm"
        >
            ⋮⋮
        </button>

        <div class="flex flex-col">
            <span class="text-[11px] font-semibold text-slate-700">
                Image / Annotations / Dataset / Train / Predict
            </span>
            <span class="hidden text-[10px] text-slate-400 sm:inline">
                Перетягніть за шапку або кнопку
            </span>
        </div>
    </div>

    <!-- Кнопка закриття панелі -->
    <button
        id="btnTrainPanelClose"
        type="button"
        class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-[12px] leading-none text-slate-500 hover:bg-slate-50 shadow-sm"
    >
        ✕
    </button>
</div>
