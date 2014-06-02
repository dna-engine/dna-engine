<?php
// dna.js

// Request
$id = basename($_SERVER["REQUEST_URI"]);

// Resource
$books = array(
   array("title" => "Go JavaScript", "author" => "Jake"),
   array("title" => "Styling CSS3",  "author" => "Abby"),
   array("title" => "Howdy HTML5",   "author" => "Ed")
   );
if ($id > 0 && $id <= count($books))
   $resource = $books[$id - 1];
else
   $resource = array("error" => true, "message" => "Resource not found");

// Response
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
echo json_encode($resource);
?>
