<!doctype html>
<html lang=en>
<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<!-- Folder Listing                                              -->
<!-- v1.3.8 (April 8, 2025)                                      -->
<!-- A good looking replacement for Directory Listings:          -->
<!--     Rename this file to "index.php" and copy it into a web  -->
<!--     server directory to enable browsing on that directory.  -->
<!-- Requirement:                                                -->
<!--     Apache HTTP Server Project with php_module enabled      -->
<!--     (see: [PKG-INSTALL-HOME]/etc/httpd/httpd.conf)          -->
<!-- Example page:                                               -->
<!--     https://centerkey.com/files                             -->
<!-- WTFPL                                                       -->
<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<?php
   $gitHubUrl = "https://gist.github.com/dpilafian/930e1677d0c08eed3c39f04d32d7bf19";
   $gitHubRaw = "https://gist.githubusercontent.com/dpilafian/930e1677d0c08eed3c39f04d32d7bf19/raw";
   $cdnBase =   "https://cdn.jsdelivr.net/npm";
?>
<head>
   <meta charset=utf-8>
   <meta name=viewport                   content="width=device-width, initial-scale=1">
   <meta name=robots                     content="index, follow">
   <meta name=description                content="Folder listing for <?=basename(__DIR__)?>">
   <meta name=apple-mobile-web-app-title content="<?=basename(__DIR__)?>">
   <title>Folder: <?=basename(__DIR__)?></title>
   <link rel=icon             href=<?=$gitHubRaw?>/icon.png>
   <link rel=apple-touch-icon href=<?=$gitHubRaw?>/icon.png>
   <link rel=mask-icon        href=<?=$cdnBase?>/@fortawesome/fontawesome-free@6.7/svgs/solid/folder.svg color=darkgoldenrod>
   <link rel=preconnect       href=https://fonts.googleapis.com>
   <link rel=preconnect       href=https://fonts.gstatic.com crossorigin>
   <link rel=stylesheet       href=<?=$cdnBase?>/@fortawesome/fontawesome-free@6.7/css/all.min.css>
   <link rel=stylesheet       href=<?=$cdnBase?>/dna-engine@3.2/dist/dna-engine.css>
   <link rel=stylesheet       href=<?=$cdnBase?>/web-ignition@2.3/dist/reset.min.css>
   <style>
      body { color: dimgary; background-color: white; margin: 0px 20px; }
      body >main { min-height: auto; }
      body >main h1 { color: cadetblue; }
      body >main h1+h2 { text-shadow: none; }
      body >main a { color: darkgray; border-color: cadetblue; }
      body >main a:hover { background-color: cadetblue; outline-color: cadetblue; }
      body >main ul.simple-text { margin: 0px 0px 30px 15px; }
      body >main ul.simple-text li { display: flex; align-items: center; margin-bottom: 10px; }
      body >main ul.simple-text li i.font-icon { width: 1.8em; text-align: center; color: darkslateblue; }
      body >main ul.simple-text li i.font-icon[data-icon=circle-up] { color: dimgray; }
      body >main ul.simple-text li i.font-icon[data-icon=folder] { color: darkgoldenrod; }
      body >main ul.simple-text li i.font-icon[data-icon=square-up-right] { color: brown; }
      body >main p a { margin-right: 8px; }
      @media (max-width: 667px) {  /* selects iPhone 6/6s/7/8/SE2/SE3 landscape and anything narrower */
         body { margin: 0px; }
         body >main h1 { font-size: 1.7em; }
         body >main ul.simple-text { margin-left: 0px; }
         }
      @media (prefers-color-scheme: dark) {  /* dark mode */
         body { color: silver; background-color: var(--colorCharcoal); }
         body >main h1 { color: lightseagreen; }
         body >main a { color: gainsboro; }
         body >main ul.simple-text li i.font-icon { color: mediumslateblue; }
         body >main ul.simple-text li i.font-icon[data-icon=circle-up] { color: silver; }
         body >main ul.simple-text li i.font-icon[data-icon=folder] { color: goldenrod; }
         body >main ul.simple-text li i.font-icon[data-icon=square-up-right] { color: crimson; }
         }
   </style>
   <script defer src=<?=$cdnBase?>/dna-engine@3.2/dist/dna-engine.min.js></script>
   <script defer src=<?=$cdnBase?>/web-ignition@2.3/dist/lib-x.min.js></script>
   <script data-on-load=displayPath>
      const displayPath = () => {
         // Show the URL of the current folder.
         const subheader = globalThis.document.querySelector('main >h2');
         const homeIcon =  globalThis.document.querySelector('.home-link');
         subheader.textContent = globalThis.location.origin + globalThis.location.pathname;
         homeIcon.href =         globalThis.location.origin;
         };
   </script>
   <?php
      if (!function_exists("str_ends_with")) {  //polyfill for PHP 8.0.0 str_ends_with()
         function str_ends_with($haystack, $needle) {
            return substr($haystack, -strlen($needle)) === $needle;
            }
         }
      function showFile($file) {
         // Don't display hidden files, php files, link files, or folders.
         $extension =  pathinfo($file, PATHINFO_EXTENSION);
         $extOk =      !in_array($extension, array("php"));
         $isLink =     str_ends_with($file, ".link.md");
         $ignoreFile = $file === "error_log";
         return !is_dir($file) && $file[0] !== "." && !$ignoreFile && $extOk && !$isLink;
         }
      function fileIcon($fileExtension) {
         $fileTypes = array(
            "avif" => "file-image",
            "gif" =>  "file-image",
            "htm" =>  "file-code",
            "html" => "file-code",
            "jpeg" => "file-image",
            "jpg" =>  "file-image",
            "md" =>   "file-pen",
            "mp3" =>  "file-audio",
            "pdf" =>  "file-pdf",
            "png" =>  "file-image",
            "svg" =>  "file-image",
            "txt" =>  "file-lines",
            "webp" => "file-image",
            "xml" =>  "file-code",
            "zip" =>  "file-zipper",
            );
         return array_key_exists($fileExtension, $fileTypes) ? $fileTypes[$fileExtension] : "file";
         };
      function toHtml($file) {
         // Create the <li> string to render a line representing a file or folder.
         $isFolder = is_dir($file);
         $icon =     $isFolder ? "folder" : fileIcon(pathinfo($file, PATHINFO_EXTENSION));
         $title =    $file;
         if (!$isFolder && str_ends_with($file, ".link.md")) {
            // Looks for the ".link.md" extension and reads the markdown syntax for a
            // hyperlink.  For example, the file "example-website.link.md" could have
            // one line of text like "[Click me](https://example.org)".
            $icon =        "square-up-right";
            $md =          preg_split("/[\[\]()]/", htmlspecialchars(file_get_contents($file)));
            $file =        $md[3];
            $url =         parse_url($file);
            $relLinkHost = $_SERVER["HTTP_HOST"] ?: $_SERVER["SERVER_NAME"];
            $host =        isset($url["host"]) ? $url["host"] : $relLinkHost;
            $title =       $md[1] . " [" . $host . "]";
            }
         return "<li><a href='$file'><i data-icon=$icon></i></a> <a href='$file'>$title</a></li>";
         }
   ?>
</head>
<body>

<main>
   <h1>Folder Listing</h1>
   <h2>[URL]</h2>
   <ul class=simple-text>
      <li><a href=..><i data-icon=circle-up></i></a> <a href=..>Parent folder</a></li>
      <?=implode(PHP_EOL, array_map("toHtml", glob("*", GLOB_ONLYDIR)))?>
      <?=implode(PHP_EOL, array_map("toHtml", glob("*.link.md")))?>
      <?=implode(PHP_EOL, array_map("toHtml", array_filter(glob("*"), "showFile")))?>
   </ul>
   <p>
      <a href=# class=home-link><i data-icon=home></i></a>
      <a href=<?=$gitHubUrl?>><i data-brand=github-alt></i></a>
   </p>
</main>

</body>
</html>
