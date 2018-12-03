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
   echo "Tasks:"
   pwd
   find . -name ".DS_Store" -delete
   npm run web
   echo
   }

downloadVisualSpec() {
   echo "Visual Specification:"
   cd $projectHome/website-target
   released=$(git tag | tail -1)
   visualSpec=https://raw.githubusercontent.com/dnajs/dna.js/$released/spec/visual.html
   cdnBase=https://cdn.jsdelivr.net/npm/dna.js@$released/dist/dna
   mkdir spec
   cd spec
   curl $visualSpec | sed "s|[.][.]/dna|$cdnBase|" > visual.html
   sed "s|/dna.js>|/dna.min.js>|" visual.html > visual-min.html
   ls -1 visual*.html
   echo
   }

publishWebFiles() {
   cd $projectHome
   publishWebRoot=$(grep ^DocumentRoot /private/etc/apache2/httpd.conf | awk -F'"' '{ print $2 }')
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
downloadVisualSpec
publishWebFiles
launchBrowser
