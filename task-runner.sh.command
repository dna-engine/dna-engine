#!/bin/sh
############################
#  Task Runner             #
#  dna.js Template Cloner  #
############################

# To make this file runnable:
#    $ chmod +x task-runner.sh.command

package=https://raw.githubusercontent.com/dnajs/dna.js/master/package.json
echo
echo "dna.js Task Runner"
echo "=================="
cd $(dirname $0)
pwd
echo
if [ -z $(which npm) ]; then
   open "http://nodejs.org/download/"
   echo "*********************"
   echo "*** npm not found ***"
   echo "Install Node.js to get npm"
   echo "*********************"
   exit
   fi
if [ -z $(which grunt) ]; then
   echo "***********************"
   echo "*** grunt not found ***"
   echo "To install Grunt:"
   echo "   $ sudo npm install -g grunt-cli"
   echo "***********************"
   exit
   fi
echo "Node:"
node --version
npm install
echo
echo "Grunt:"
which grunt
ls -l Gruntfile.js
echo
grunt
echo
echo "Files:"
ls -l dna*.js
echo "dna.min.js -> $(ls -lsh dna.min.js | awk '{print $6}')"
echo
echo "Local changes:"
git status --short
versionLocal=v$(grep '"version"' package.json | awk -F'"' '{print $4}')
versionRemote=v$(curl --silent $package | grep '"version":' | awk -F'"' '{print $4}')
versionReleased=$(git tag | tail -1)
echo
echo "Versions:"
echo "$versionLocal (local)"
echo "$versionRemote (checked in)"
echo "$versionReleased (released)"
echo
if [ "$versionLocal" != "$versionRemote" ]
   then
      status="LOCAL VERSION NOT CHECKED IN"
      echo "***********************"
      echo "*** Action Required ***"
      echo "Check in local version number with commit comment:"
      echo "   Version number updated for next release"
      echo "then rerun:"
      echo "   $(pwd)/task-runner.sh.command"
      echo "***********************"
      echo
   elif [ "$versionRemote" == "$versionReleased" ]; then
      status="RELEASED"
      echo "***********************"
      echo "*** Action Required ***"
      echo "This version has already been released -- increment version number in:"
      echo "   $(pwd)/package.json"
      echo "then rerun:"
      echo "   $(pwd)/task-runner.sh.command"
      echo "***********************"
      echo
   else
      status="NOT RELEASED (in development)"
   fi
echo "Status: $status"
echo
echo "To release this version:"
echo "   cd $(pwd)"
echo "   grunt release"
echo "   website/^dsi/^dsi.sh.command"
echo "   *** Check in local changes with the comment:"
echo "      Release $versionLocal"
echo
if [ -n "$(git status --short)" ]; then
   echo "   *** Check in local changes ***"
   fi
echo "   cd $(pwd)"
echo "   git tag -a $versionRemote -m \"Beta release\""
echo "   git tag -af current -m \"Current stable release\""
echo "   git remote -v"
echo "   git push origin --tags --force"
echo
echo "   *** Finally, update:"
echo "   https://github.com/dnajs/dna.js/wiki/Release-Notes"
echo
open test-cases.html
echo "=================="
