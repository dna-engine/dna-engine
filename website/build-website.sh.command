#!/bin/sh
####################
# dna.js Website   #
# http://dnajs.org #
####################

# To make this file runnable:
#    $ chmod +x *.sh.command

port=12658
releasedOrigin=https://raw.githubusercontent.com/dnajs/dna.js/current
projectHome=$(cd $(dirname $0)/..; pwd)

info() {
   cd $projectHome
   pwd
   echo
   which npm
   npm --version
   npm install
   echo
   which gulp
   gulp --version
   echo
   }

buildHtmlFiles() {
   cd $projectHome
   find . -name ".DS_Store" -delete
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

publish() {
   cd $projectHome/website/httpdocs
   publishWebRoot=$(grep ^DocumentRoot /private/etc/apache2/httpd.conf | awk -F\" '{ print $2 }')
   publishFolder=$publishWebRoot/centerkey.com/www.dnajs.org
   copyWebFiles() {
      echo "Publishing:"
      echo $publishFolder
      cp -R * $publishFolder
      mkdir -p $publishFolder/../www.dnajs.com/
      mv placeholder.html $publishFolder/../www.dnajs.com/index.html
      echo
      }
   [ -w $publishFolder ] && copyWebFiles
   }

setupWebServer() {
   cd $projectHome/website
   process=$(pgrep -lf "SimpleHTTPServer $port")
   launch() {
      echo "Launching SimpleHTTPServer:"
      pwd
      python -m SimpleHTTPServer $port &> /dev/null &
      echo
      }
   [[ -z "$process" ]] && launch
   echo "Web Server:"
   pgrep -lf SimpleHTTPServer
   echo
   }

launchBrowser() {
   url=http://localhost:$port/httpdocs
   echo "Opening:"
   echo $url
   sleep 2
   open $url
   echo
   }

echo
echo "dnajs.org website"
echo "~~~~~~~~~~~~~~~~~"
info
buildHtmlFiles
downloadProjectCode
publish
setupWebServer
launchBrowser
