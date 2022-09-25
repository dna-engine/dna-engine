#!/bin/bash
#####################
# dna.js Website    #
# https://dnajs.org #
#####################

# To make this file runnable:
#     $ chmod +x *.sh.command

banner="dnajs.org Website"
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
publishWebFiles
npx browser-sync website-target --watch
