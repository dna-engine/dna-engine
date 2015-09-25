#!/bin/sh
############################
#  Task Runner             #
#  dna.js Template Cloner  #
############################

# To make this file runnable:
#    $ chmod +x task-runner.sh.command

package=https://raw.githubusercontent.com/dnajs/dna.js/master/package.json

needNode() {
   echo "**********************************"
   echo "Need to install Node.js to get npm"
   echo "**********************************"
   open "http://nodejs.org/download/"
   exit
   }

needGrunt() {
   echo "**********************************"
   echo "Need to install Grunt:            "
   echo "   $ sudo npm install -g grunt-cli"
   echo "**********************************"
   exit
   }

echo
echo "dna.js Task Runner"
echo "================="
cd $(dirname $0)
pwd
echo
which npm || needNode
which grunt || needGrunt
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
      echo "(you may need to wait and rerun again so GitHub has time to update):"
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
echo "   website/build-website.sh.command"
echo "   *** Check in local changes with the comment:"
echo "      Release $versionLocal"
echo
if [ -n "$(git status --short)" ]; then
   echo "   *** After local changes checked in, tag release:"
   fi
echo "   cd $(pwd)"
echo "   git tag -af $versionRemote -m \"Beta release\""
echo "   git tag -af current -m \"Current stable release\""
echo "   git remote -v"
echo "   git push origin --tags --force"
echo
echo "   *** Finally, update:"
echo "   https://github.com/dnajs/dna.js/wiki/Release-Notes"
echo
open test-cases.html
echo "=================="
echo "To test in Chrome, quit browser and run:"
echo "open '/Applications/Google Chrome.app' --args --allow-file-access-from-files $(pwd)/test-cases.html"
echo
