<?php
// dna.js

$id = basename($_SERVER["REQUEST_URI"]);

/*
class Book {
   public $title;
   public $author;
   }
$books = array();

$book = new book();
$book->title =  "The DOM";
$book->author = "Suzy";
$books[] = $book;

$book = new book();
$book->title =  "Howdy HTML5";
$book->author = "Ed";
$books[] = $book;
*/

$books = array(
   array("title" => "Go JavaScript", "author" => "Jake"),
   array("title" => "Styling CSS3",  "author" => "Abby"),
   array("title" => "Howdy HTML5",   "author" => "Ed")
   );

if ($id > 0 && $id <= count($books))
   $resource = $books[$id - 1];
else
   $resource = array("error" => true, "msg" => "Resource not found");

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
echo json_encode($resource);
?>
