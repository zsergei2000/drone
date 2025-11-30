<?php
// train_panel_dataset.php
// Блок "Датасет" (згортання)
?>
<section class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 space-y-2 text-[11px] text-slate-600">
    <div class="flex items-center justify-between gap-2">
        <button
            id="datasetToggle"
            type="button"
            class="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
        >
            <span class="text-[10px]">▾</span>
            <span class="font-semibold text-slate-700">Датасет</span>
        </button>

        <button
            id="btnMakeDataset"
            type="button"
            class="inline-flex items-center justify-center rounded-md bg-brand-500 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-brand-600"
        >
            4. Створити
        </button>
    </div>

    <div id="datasetBody" class="mt-1">
        <div class="space-y-1.5">
            <label class="flex items-center gap-2">
                <span>tile</span>
                <input
                    id="dsTile"
                    type="number"
                    value="1024"
                    min="256"
                    step="64"
                    class="w-24 rounded-md border border-slate-200 px-1 py-0.5 text-[11px] text-slate-800"
                />
            </label>

            <label class="flex items-center gap-2">
                <span>stride</span>
                <input
                    id="dsStride"
                    type="number"
                    value="640"
                    min="128"
                    step="64"
                    class="w-24 rounded-md border border-slate-200 px-1 py-0.5 text-[11px] text-slate-800"
                />
            </label>

            <label class="flex items-center gap-2">
                <span>augs</span>
                <input
                    id="dsAugs"
                    type="number"
                    value="5"
                    min="0"
                    step="1"
                    class="w-24 rounded-md border border-slate-200 px-1 py-0.5 text-[11px] text-slate-800"
                />
            </label>
        </div>

        <span
            id="datasetInfo"
            class="mt-2 block font-mono text-[11px] text-slate-500"
        >
            datasetId: —
        </span>
    </div>
</section>
