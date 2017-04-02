#!/bin/sh
####################
# dna.js Website   #
# http://dnajs.org #
####################

# To make this file runnable:
#    $ chmod +x *.sh.command

projectHome=$(cd $(dirname $0)/..; pwd)

buildHtmlFiles() {
   cd $projectHome
   find . -name ".DS_Store" -delete
   versionReleased=$(git tag | tail -1)
   versionHtml=$(grep --max-count 1 version package.json | awk -F'"' '{print $4}')
   echo "Versions:"
   echo "   $versionReleased (released)"
   echo "   v$versionHtml (local)"
   echo
   echo "Tasks:"
   pwd
   npm run web
   echo
   }

downloadProjectCode() {
   cd $projectHome/website/httpdocs
   curl --remote-name --silent $releasedOrigin/dna.css
   curl --remote-name --silent $releasedOrigin/dna.js
   curl --remote-name --silent $releasedOrigin/dna.min.js
   curl --silent $releasedOrigin/spec.html | sed s/href=website[/]static[/]/href=/ > spec.html
   sed s/src=dna.js/src=dna.min.js/ spec.html > spec-min.html
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
   test -w $publishFolder && copyWebFiles
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
