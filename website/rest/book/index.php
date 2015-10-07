<?php
// dna.js

// Request
$id = basename($_SERVER["REQUEST_URI"]);

// Resource
include('includes/book-data.php');
if ($id > 0 && $id <= count($books))
   $resource = $books[$id - 1];
else
   $resource = array("error" => true, "message" => "Resource not found");

// Response
include('includes/headers.php');
echo json_encode($resource);
?>
