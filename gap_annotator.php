<?php
// gap_annotator.php
// 1764454000
// Інструмент розмітки GAP + повний цикл на FastAPI (image/labelme/dataset/train/predict)
?><!doctype html>
<html lang="uk">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>Розмітка GAP (полігони)</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {50:'#f0f9ff',100:'#e0f2fe',500:'#0ea5e9',600:'#0284c7'}
                    }
                }
            }
        };
    </script>
</head>
<body class="min-h-screen bg-slate-100 text-slate-900">
<div class="flex flex-col h-screen">

    <header class="px-4 py-2 bg-white border-b border-slate-200 shadow-sm">
        <div class="flex items-center justify-between gap-4">

            <div class="flex items-center gap-3 flex-1 overflow-x-auto whitespace-nowrap">
                <div class="h-8 w-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-bold">GAP</div>

                <span class="text-sm font-semibold mr-4">Розмітка GAP (полігони)</span>

                <section class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 flex items-center gap-2 text-xs text-slate-700">
                    <span class="font-medium">Файли / кадри</span>
                    <div class="flex gap-1">
                        <button id="btnPrev" type="button"
                                class="px-2 py-0.5 text-[11px] rounded border border-slate-300 bg-white hover:bg-slate-50">◀</button>
                        <button id="btnNext" type="button"
                                class="px-2 py-0.5 text-[11px] rounded border border-slate-300 bg-white hover:bg-slate-50">▶</button>
                    </div>
                </section>
            </div>

            <div class="flex items-center gap-2 text-xs shrink-0">
                <span id="hostTestMessageFrom192" class="max-w-[260px] truncate text-slate-600"></span>

                <button id="btnHostTestTo192"
                        class="px-3 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-50"
                        type="button">Тест → 192</button>

                <button id="btnJsonPanel"
                        class="px-3 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-50">JSON</button>

                <button id="btnTrainPanelMenu"
                        class="px-3 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-50">Меню</button>

                <button id="btnHelpTop"
                        class="px-3 py-1 rounded-md border border-slate-300 bg-white hover:bg-slate-50">Інструкція</button>
            </div>
        </div>
    </header>

    <input id="imageInput" type="file" accept="image/*" class="hidden"/>

    <main class="flex flex-1 overflow-hidden">
        <section class="flex-1 flex items-center justify-center">

            <!-- IMAGE VIEW -->
            <div id="imageView"
                 class="relative w-full h-[80vh] mx-[5mm] my-3 bg-white border border-slate-200 rounded-lg shadow-md overflow-hidden">

                <!-- [1764454000] GRID: inline background-image замість Tailwind arbitrary -->
                <div
                    class="pointer-events-none absolute inset-0 z-10"
                    style="
                        background-image:
                            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
                        background-size: 24px 24px;
                    "
                ></div>

                <!-- CANVAS под сеткой -->
                <div class="relative w-full h-full flex items-center justify-center">
                    <canvas id="canvas" class="max-w-full max-h-full"></canvas>
                </div>
            </div>

            <!-- VIDEO VIEW -->
            <div id="videoView"
                 class="hidden relative w-full h-[80vh] mx-[5mm] my-3
                        bg-white border border-dashed border-slate-300 rounded-lg shadow-md flex flex-col">

                <div class="text-center px-6 pt-4 pb-2">
                    <h2 class="text-lg font-semibold text-slate-800 mb-2">Обробка відео</h2>
                    <p class="text-sm text-slate-600">Блок роботи з відео</p>
                </div>

                <div class="flex-1 px-4 pb-4">
                    <iframe id="videoFrame"
                            src="http://192.168.3.242:23232/drons/process.php"
                            class="w-full h-full rounded-lg border border-slate-200"
                            loading="lazy"></iframe>
                </div>

                <!-- [1764454000] MOD — блок мозаїки винесений у модуль gap_video_mosaic.php -->
                <div id="mosaicView"
                     class="hidden w-full px-4 pb-4 border-t border-slate-300 bg-white">
                    <?php include __DIR__ . '/gap_video_mosaic.php'; ?>
                </div>
                <!-- [1764454000] END MOD -->

            </div>

        </section>
    </main>

    <?php include __DIR__ . '/gap_panel.php'; ?>
    <?php include __DIR__ . '/gap_help_panel.php'; ?>
    <?php include __DIR__ . '/gap_train_panel.php'; ?>

</div>

<?php $gapVersion = time(); ?>
<script src="gap_core.js?v=<?= $gapVersion ?>"></script>
<script src="gap_panels.js?v=<?= $gapVersion ?>"></script>
<script src="gap_header_buttons.js?v=<?= $gapVersion ?>"></script>
<script src="gap_canvas_events.js?v=<?= $gapVersion ?>"></script>
<script src="gap_io.js?v=<?= $gapVersion ?>"></script>
<script src="gap_api.js?v=<?= $gapVersion ?>"></script>
<!-- [1764454000] ADD — модуль мозаїки -->
<script src="gap_video_mosaic.js?v=<?= $gapVersion ?>"></script>
<script src="gap_init.js?v=<?= $gapVersion ?>"></script>

</body>
</html>
