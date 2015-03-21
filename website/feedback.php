<?php
///////////////////////////////////////////////////////////////////
// PERFECT                                                       //
// -------                                                       //
// PHP E-mail Receive Form Electronic Content Text               //
// File: feedback.php                                            //
//                                                               //
// Description: Processes a web form to read the user input and  //
//    then send the data to a predefined recipient.  You are     //
//    free to use and modify this script as you like.            //
// Instructions:  Go to "http://www.centerkey.com/php".          //
//                                                               //
// Center Key Software  *  www.centerkey.com  *  Dem T. Pilafian //
///////////////////////////////////////////////////////////////////

// Configuration Settings
$SendFrom =    builderFull("dna.js Feedback", "feedback", "dnajs", "org");
$SendTo =      builder("dem", "dnajs", "org");
$SubjectLine = "dna.js Feedback Submission";
$ThanksURL =   "thanks.html";  //confirmation page
$MsgBody =     "http://dnajs.org\n";

function builder($user, $pre, $post) {
   return $user . "@" . $pre . "." . $post;
   }
function builderFull($name, $user, $pre, $post) {
   return $name . " <" . builder($user, $pre, $post) . ">";
   }

// Build Message Body from Web Form Input
foreach ($_POST as $Field=>$Value)
   $MsgBody .= "$Field: $Value\n";
$MsgBody .= "\n" . @gethostbyaddr($_SERVER["REMOTE_ADDR"]) . "\n" .
   $_SERVER["HTTP_USER_AGENT"];
$MsgBody = htmlspecialchars($MsgBody, ENT_NOQUOTES);  //make safe

// Send E-Mail and Direct Browser to Confirmation Page
$Spam = count($_POST) == 0 || stristr($MsgBody, "cc: ") ||
   stristr($MsgBody, "href=") || stristr($MsgBody, "[url");
if (!$Spam)
   mail($SendTo, $SubjectLine, $MsgBody, "From: $SendFrom");
header("Location: $ThanksURL");
?>
