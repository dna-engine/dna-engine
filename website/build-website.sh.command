#!/bin/bash
#####################
# dna.js Website    #
# https://dnajs.org #
#####################

# To make this file runnable:
#     $ chmod +x *.sh.command

banner="dnajs.org Website"
projectHome=$(cd $(dirname $0)/..; pwd)

buildHtmlFiles() {
   cd $projectHome
   find . -name ".DS_Store" -delete
   versionReleased=$(git describe)
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
   released=$(git describe)
   releasedOrigin=https://raw.githubusercontent.com/dnajs/dna.js/$released
   echo $releasedOrigin
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
      echo $publishSite
      mkdir -p $publishFolder
      cp -R website-target/* $publishFolder
      mkdir -p $publishFolder/../www.dnajs.com
      mv $publishFolder/placeholder.html $publishFolder/../www.dnajs.com/index.html
      ls -o $publishSite | grep dna
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

source $projectHome/setup.sh
buildHtmlFiles
downloadProjectCode
publishWebFiles
launchBrowser
