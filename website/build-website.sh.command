#!/bin/bash
#####################
# dna.js Website    #
# https://dnajs.org #
#####################

# To make this file runnable:
#     $ chmod +x *.sh.command

banner="dnajs.org Website"
projectHome=$(cd $(dirname $0)/..; pwd)

setupTools() {
   # Check for Node.js installation and download project dependencies
   cd $projectHome
   echo
   echo $banner
   echo $(echo $banner | sed s/./=/g)
   pwd
   test -d .git && git pull --ff-only
   echo
   echo "Node.js:"
   which node || { echo "Need to install Node.js: https://nodejs.org"; exit; }
   node --version
   npm install --no-fund
   npm update
   npm outdated
   echo
   }

buildHtmlFiles() {
   cd $projectHome
   echo "Tasks:"
   pwd
   npm run website
   cp -v website-target/project.html docs/index.html
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
      mv $publishFolder/project.html $publishFolder/../www.dnajs.com/index.html
      ls -o $publishSite | grep dna
      echo
      }
   test -w $publishSite && publish
   }

setupTools
buildHtmlFiles
downloadVisualSpec
publishWebFiles
