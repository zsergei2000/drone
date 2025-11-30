<?php
// list_frames_net.php
// Файл-обгортка для перенаправлення через розширення браузера.

header('Content-Type: application/json; charset=utf-8');

echo json_encode([
    'ok' => false,
    'message' => 'NET-wrapper not redirected by extension'
]);
