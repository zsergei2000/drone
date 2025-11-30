<?php
// gap_help_panel.php
// Плаваюча панель Інструкції (drag & drop), дизайн як у controlPanel
?>
<aside
    id="helpPanel"
    class="fixed z-30 hidden rounded-xl border border-slate-200 bg-white/95 px-3 py-3 shadow-lg backdrop-blur lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto"
    style="right: 1.5rem; top: 6rem;"
>
    <div class="space-y-3 text-sm">

        <!-- Шапка панелі + Drag handle -->
        <div
            id="helpPanelHandle"
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
                    id="btnHelpClosePanel"
                    type="button"
                    class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-[13px] leading-none text-slate-500 shadow-sm hover:bg-slate-200"
                >
                    ✕
                </button>

                <div class="flex flex-col">
                    <span class="text-[11px] font-semibold text-slate-700">
                        Інструкція
                    </span>
                    <span class="hidden text-[10px] text-slate-400 sm:inline">
                        Перетягніть за шапку або кнопку
                    </span>
                </div>
            </div>
        </div>

        <!-- Текст інструкції -->
        <section class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
            <h2 class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Як працювати з розміткою GAP
            </h2>
            <div class="space-y-1.5 text-[11px] text-slate-600 leading-snug">
                <p>1. Завантажте зображення через «Відкрити зображення».</p>
                <p>2. ЛКМ по зображенню додає вершини полігону, ПКМ видаляє останню вершину.</p>
                <p>3. Подвійний клік завершує поточний полігон.</p>
                <p>4. Кнопка «Додати анотацію» зберігає поточний полігон у список анотацій.</p>
                <p>5. «Очистити всі» видаляє всі анотації для поточного зображення.</p>
                <p>6. «Відправити зображення» надсилає файл на бекенд FastAPI.</p>
                <p>7. «Відправити розмітку» надсилає LabelMe JSON для того ж зображення.</p>
                <p>8. Далі можна створити датасет, навчити модель та виконувати автопредикт через плаваючу панель.</p>
            </div>
        </section>

    </div>
</aside>
