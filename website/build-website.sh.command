#!/bin/sh
####################
# dna.js Website   #
# http://dnajs.org #
####################

# To make this file runnable:
#    $ chmod +x *.sh.command

releasedOrigin=https://raw.githubusercontent.com/dnajs/dna.js/current
projectHome=$(cd $(dirname $0)/..; pwd)

buildHtmlFiles() {
   cd $projectHome
   find . -name ".DS_Store" -delete
   versionReleased=$(git tag | tail -1)
   versionHtml=$(grep --max-count 1 version package.json | awk -F'"' '{print $4}')
   echo "Versions:"
   echo "Release: $versionReleased"
   echo "HTML:    v$versionHtml"
   echo
   echo "Tasks:"
   pwd
   echo "To get latest modules --> $ npm update"
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

launchBrowser() {
   url=http://localhost:$port/website/httpdocs
   echo "Website:"
   echo $url
   echo
   sleep 2
   open $url
   }

echo
echo "dnajs.org website"
echo "~~~~~~~~~~~~~~~~~"
source $projectHome/setup.sh
buildHtmlFiles
downloadProjectCode
publish
launchBrowser
