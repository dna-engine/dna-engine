#!/bin/sh

####################
# dna.js Website   #
# http://dnajs.org #
####################

releasedOrigin=https://raw.githubusercontent.com/dnajs/dna.js/current
webServerRoot=$(grep ^DocumentRoot /private/etc/apache2/httpd.conf | awk -F\" '{ print $2 }')
webServerPath="centerkey.com/www.dnajs.org"
webServerFolder=$webServerRoot/$webServerPath
projectHome=$(cd $(dirname $0)/..; pwd)

buildHtmlFiles() {
   cd $projectHome
   versionReleased=$(git tag | tail -1)
   versionHtml=$(grep --max-count 1 version package.json | awk -F'"' '{print $4}')
   echo "Release Version: $versionReleased"
   echo "HTML Version:    v$versionHtml"
   echo
   gulp web
   echo
   }

downloadProjectCode() {
   cd $projectHome/website/httpdocs
   curl --remote-name --silent $releasedOrigin/dna.css
   curl --remote-name --silent $releasedOrigin/dna.js
   curl --remote-name --silent $releasedOrigin/dna.min.js
   curl --remote-name --silent $releasedOrigin/test-cases.html
   sed s/src=dna.js/src=dna.min.js/ test-cases.html > test-cases-min.html
   }

listFiles() {
   cd $projectHome/website/httpdocs
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
   [ -w $webServerFolder ] && updateWebServer
   open $url
   echo
   }

echo
echo "dnajs.org"
echo "~~~~~~~~~"
buildHtmlFiles
downloadProjectCode
listFiles
