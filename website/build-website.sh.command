#!/bin/bash
##########################
# dna-engine Website     #
# https://dna-engine.org #
##########################

# To make this file runnable:
#     $ chmod +x *.sh.command

banner="dna-engine.org Website"
projectHome=$(cd $(dirname $0)/..; pwd)
apacheCfg=/usr/local/etc/httpd
apacheLog=/usr/local/var/log/httpd/error_log
webDocRoot=$(grep ^DocumentRoot $apacheCfg/httpd.conf | awk -F'"' '{ print $2 }')

setupTools() {
   # Check for Node.js installation and download project dependencies
   cd $projectHome
   echo
   echo $banner
   echo $(echo $banner | sed s/./=/g)
   pwd
   test -d .git || { echo "Project must be in a git repository."; exit; }
   git restore dist/* &>/dev/null
   git pull --ff-only
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
   npm run build-website
   echo
   }

publishWebFiles() {
   cd $projectHome
   publishSite=$webDocRoot/centerkey.com
   publishFolder=$publishSite/www.dna-engine.org
   publish() {
      echo "Publishing:"
      echo $publishSite
      mkdir -p $publishFolder
      cp -R website-target/* $publishFolder
      mkdir -p $publishFolder/../www.dna-engine.net
      mkdir -p $publishFolder/../www.dnaengine.org
      cp $publishFolder/project.html $publishFolder/../www.dna-engine.net/index.html
      cp $publishFolder/project.html $publishFolder/../www.dnaengine.org/index.html
      ls -o $publishSite | grep dna
      echo
      }
   test -w $publishSite && publish
   }

setupTools
buildHtmlFiles
publishWebFiles
npx browser-sync website-target --watch
