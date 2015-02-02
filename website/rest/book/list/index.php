<?php
// DNAjs

// Resources
include('../books.php');

// Response
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
echo json_encode($books);
?>
