<?php
// dna.js

// Resources
include('../book-data.php');

// Response
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
echo json_encode($books);
?>
