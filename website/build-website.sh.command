#!/bin/sh

####################
# dna.js Website   #
# http://dnajs.org #
####################

releasedOrigin=https://raw.githubusercontent.com/dnajs/dna.js/current
webServerRoot=$(grep ^DocumentRoot /private/etc/apache2/httpd.conf | awk -F\" '{ print $2 }')
webServerPath="centerkey.com/www.dnajs.org"
webServerFolder=$webServerRoot/$webServerPath
websiteFolder=$(cd $(dirname $0); pwd)

buildHtmlFiles() {
   # Set release version and build HTML files (run DSI templating)
   cd $websiteFolder/dsi
   versionReleased=$(git tag | tail -1)
   versionHtml=$(grep "var=.release." ~begin.fhtml | awk -F'["]' '{print $4}')
   echo "Release Version: $versionReleased"
   echo "HTML Version:    v$versionHtml"
   [ ! -f dsi.jar ] && curl --remote-name http://centerkey.com/dsi/download/dsi.jar
   java -jar dsi.jar
   echo
   }

copyToWebFolder() {
   # Put web files into "httpdocs" folder
   cd $websiteFolder
   echo "Target:"
   rm -rf $websiteFolder/httpdocs
   mkdir  $websiteFolder/httpdocs
   mv -v dsi/*.html              $websiteFolder/httpdocs
   cp -v *.html *.css *.js *.txt $websiteFolder/httpdocs
   cp -R graphics rest           $websiteFolder/httpdocs
   echo
   }

downloadProjectCode() {
   cd $websiteFolder/httpdocs
   curl --remote-name --silent $releasedOrigin/dna.css
   curl --remote-name --silent $releasedOrigin/dna.js
   curl --remote-name --silent $releasedOrigin/dna.min.js
   curl --remote-name --silent $releasedOrigin/test-cases.html
   sed s/src=dna.js/src=dna.min.js/ test-cases.html > test-cases-min.html
   }

listFiles() {
   cd $websiteFolder/httpdocs
   echo "Website:"
   pwd
   url=index.html
   updateWebServer() {
      echo $webServerFolder
      cp -R * $webServerFolder
      mv $webServerFolder/placeholder.html $webServerFolder/../www.dnajs.com/index.html
      cp ../../dna.js  $webServerFolder/dna.snapshot.js
      cp ../../dna.css $webServerFolder/dna.snapshot.css
      url=http://localhost/$webServerPath
      }
   [ -d $webServerFolder ] && updateWebServer
   echo "Opening --> $url"
   open $url
   }

echo
echo "dnajs.org"
echo "~~~~~~~~~"
buildHtmlFiles
copyToWebFolder
downloadProjectCode
listFiles
