<?php
// train_panel_predict.php
// Блок "Автопредикт" (згортання)
?>
<section class="rounded-lg border border-slate-200 bg-white px-3 py-2.5 space-y-2 text-[11px] text-slate-600">
    <div class="flex items-center justify-between gap-2">
        <button
            id="predictToggle"
            type="button"
            class="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
        >
            <span class="text-[10px]">▾</span>
            <span class="font-semibold text-slate-700">Автопредикт</span>
        </button>

        <button
            id="btnPredict"
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-100"
        >
            Автопредикт
        </button>
    </div>

    <div id="predictBody" class="mt-1">
        <div class="space-y-1.5">
            <label class="flex items-center gap-2">
                <span>conf</span>
                <input
                    id="prConf"
                    type="number"
                    value="0.25"
                    min="0"
                    max="1"
                    step="0.01"
                    class="w-24 rounded-md border border-slate-200 px-1 py-0.5 text-[11px] text-slate-800"
                />
            </label>

            <label class="flex items-center gap-2">
                <span>maxDet</span>
                <input
                    id="prMaxDet"
                    type="number"
                    value="300"
                    min="1"
                    step="1"
                    class="w-24 rounded-md border border-slate-200 px-1 py-0.5 text-[11px] text-slate-800"
                />
            </label>
        </div>
    </div>
</section>
