#!/bin/sh
#####################
# dna.js Website    #
# https://dnajs.org #
#####################

# To make this file runnable:
#     $ chmod +x *.sh.command

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
   echo "Downloading:"
   cd $projectHome/website-target
   curl --remote-name --silent $releasedOrigin/dna.css
   curl --remote-name --silent $releasedOrigin/dna.js
   curl --remote-name --silent $releasedOrigin/dna.min.js
   ls -1 dna*
   mkdir spec
   cd spec
   curl --silent $releasedOrigin/spec/visual.html | sed s/href=website[/]static[/]/href=/ > visual.html
   sed s/src=dna.js/src=dna.min.js/ visual.html > visual-min.html
   ls -1 visual*.html
   echo
   }

publishWebFiles() {
   cd $projectHome
   publishWebRoot=$(grep ^DocumentRoot /private/etc/apache2/httpd.conf | awk -F\" '{ print $2 }')
   publishSite=$publishWebRoot/centerkey.com
   publishFolder=$publishSite/www.dnajs.org
   publish() {
      echo "Publishing:"
      mkdir -p $publishFolder
      cp -R website-target/* $publishFolder
      mkdir -p $publishFolder/../www.dnajs.com
      mv $publishFolder/placeholder.html $publishFolder/../www.dnajs.com/index.html
      echo
      }
   test -w $publishSite && publish
   }

launchBrowser() {
   url=http://localhost:$port/website-target
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
publishWebFiles
launchBrowser
