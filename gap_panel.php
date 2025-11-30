<?php
// gap_panel.php
// Плаваюча панель керування (Tailwind, drag & drop)
?>
<aside
    id="controlPanel"
    class="fixed z-30 hidden rounded-xl border border-slate-200 bg-white/95 px-3 py-3 shadow-lg backdrop-blur lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto"
    style="left: 1.5rem; top: 6rem;"
>
    <div class="space-y-3 text-sm">

        <!-- Шапка панелі + Drag handle -->
        <div
            id="controlPanelHandle"
            class="mb-1 flex items-center justify-between gap-2 cursor-move select-none"
        >
            <div class="flex items-center gap-2">
                <!-- Кнопка-ручка -->
                <button
                    type="button"
                    class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-[13px] leading-none text-slate-500 shadow-sm"
                >
                    ⋮⋮
                </button>

                <!-- Кнопка закриття панелі -->
                <button
                    id="btnControlPanelClose"
                    type="button"
                    class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-[13px] leading-none text-slate-500 shadow-sm hover:bg-slate-200"
                >
                    ✕
                </button>
            </div>

            <span class="hidden text-[10px] text-slate-400 lg:inline">
                Drag &amp; move
            </span>
        </div>

        <!-- Експорт / Імпорт JSON -->
        <section class="rounded-lg border border-slate-200 bg-white px-3 py-2.5">
            <h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Експорт JSON (LabelMe)
            </h2>
            <textarea
                id="jsonOutput"
                rows="8"
                readonly
                class="block w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[11px] font-mono leading-snug text-slate-800"
            ></textarea>

            <div class="mt-2 grid gap-1.5">
                <button
                    id="btnDownloadJson"
                    type="button"
                    class="inline-flex items-center justify-center rounded-md bg-brand-500 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-600"
                >
                    Завантажити JSON
                </button>
                <button
                    id="btnCopyJson"
                    type="button"
                    class="inline-flex items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                >
                    Копіювати JSON
                </button>
                <label
                    class="inline-flex cursor-pointer items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
                >
                    Імпортувати JSON
                    <input id="jsonInput" type="file" accept=".json,application/json" hidden/>
                </label>
            </div>
        </section>

        <!-- Сервер FastAPI -->
        <section class="rounded-lg border border-slate-200 bg-white px-3 py-2.5">
            <h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Сервер (FastAPI)
            </h2>

            <!-- Тільки статус сервера -->
            <div
                id="serverStatus"
                class="mt-3 text-[11px] text-slate-500"
            >
                Статус: очікування
            </div>

        </section>

    </div>
</aside>
