<?php
// dna.js
$origin = isset($_SERVER["HTTP_ORIGIN"]) ? $_SERVER["HTTP_ORIGIN"] : "*";
header("Access-Control-Allow-Origin: " . $origin);
header("Content-Type: application/json");
?>
