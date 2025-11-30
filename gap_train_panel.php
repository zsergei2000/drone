<?php
// gap_train_panel.php
// Плаваюча панель для зображення / анотацій / датасету / навчання / автопредикта (drag & drop)
?>
<aside
    id="trainPanel"
    class="fixed z-30 hidden rounded-xl border border-slate-200 bg-white/95 px-3 py-3 shadow-lg backdrop-blur lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto"
    style="left: 1.5rem; bottom: 2rem;"
>
    <div class="space-y-3 text-sm">
        <?php include __DIR__ . '/train_panel_header.php'; ?>
        <?php include __DIR__ . '/train_panel_image.php'; ?>
        <?php include __DIR__ . '/train_panel_send_image.php'; ?>
        <?php include __DIR__ . '/train_panel_send_labelme.php'; ?>
        <?php include __DIR__ . '/train_panel_annotations.php'; ?>
        <?php include __DIR__ . '/train_panel_dataset.php'; ?>
        <?php include __DIR__ . '/train_panel_train.php'; ?>
        <?php include __DIR__ . '/train_panel_predict.php'; ?>
    </div>
</aside>
