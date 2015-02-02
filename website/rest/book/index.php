<?php
// DNAjs

// Request
$id = basename($_SERVER["REQUEST_URI"]);

// Resource
include('books.php');
if ($id > 0 && $id <= count($books))
   $resource = $books[$id - 1];
else
   $resource = array("error" => true, "message" => "Resource not found");

// Response
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
echo json_encode($resource);
?>
