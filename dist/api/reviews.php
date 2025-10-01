<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$place_id = $_GET['place_id'] ?? null;
$api_key = $_GET['key'] ?? null;

if (!$place_id || !$api_key) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing place_id or API key']);
    exit;
}

// Google Places Details API endpoint
$url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" . urlencode($place_id) . "&fields=reviews,rating,user_ratings_total&key=" . urlencode($api_key);

// Make the request to Google Places API
$response = file_get_contents($url);

if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch reviews from Google']);
    exit;
}

// Return the response as-is
echo $response;
?>