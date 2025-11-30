<?php
// train_panel_train.php
// Блок "Навчання" (згортання)
?>
<section class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 space-y-2 text-[11px] text-slate-600">
    <div class="flex items-center justify-between gap-2">
        <button
            id="trainToggle"
            type="button"
            class="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
        >
            <span class="text-[10px]">▾</span>
            <span class="font-semibold text-slate-700">Навчання</span>
        </button>

        <button
            id="btnTrain"
            type="button"
            class="inline-flex items-center justify-center rounded-md bg-brand-500 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-brand-600"
        >
            5. Навчити
        </button>
    </div>

    <div id="trainBody" class="mt-1">
        <div class="space-y-1.5">
            <label class="flex items-center gap-2">
                <span>model</span>
                <input
                    id="trModel"
                    type="text"
                    value="yolov8n-seg.pt"
                    class="w-40 rounded-md border border-slate-200 px-1 py-0.5 text-[11px] text-slate-800"
                />
            </label>

            <label class="flex items-center gap-2">
                <span>imgsz</span>
                <input
                    id="trImgsz"
                    type="number"
                    value="1024"
                    min="256"
                    step="64"
                    class="w-24 rounded-md border border-slate-200 px-1 py-0.5 text-[11px] text-slate-800"
                />
            </label>

            <label class="flex items-center gap-2">
                <span>epochs</span>
                <input
                    id="trEpochs"
                    type="number"
                    value="25"
                    min="1"
                    step="1"
                    class="w-24 rounded-md border border-slate-200 px-1 py-0.5 text-[11px] text-slate-800"
                />
            </label>

            <label class="flex items-center gap-2">
                <span>batch</span>
                <input
                    id="trBatch"
                    type="number"
                    value="8"
                    min="1"
                    step="1"
                    class="w-24 rounded-md border border-slate-200 px-1 py-0.5 text-[11px] text-slate-800"
                />
            </label>
        </div>

        <span
            id="trainInfo"
            class="mt-2 block font-mono text-[11px] text-slate-500"
        >
            trainRunId: —
        </span>

        <span
            id="weightsInfo"
            class="block font-mono text-[11px] text-slate-500"
        >
            best.pt: —
        </span>
    </div>
</section>
