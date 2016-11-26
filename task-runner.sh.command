#!/bin/sh
#############################
# Task Runner               #
# dna.js Semantic Templates #
#############################

# To make this file runnable:
#    $ chmod +x *.sh.command

package=https://raw.githubusercontent.com/dnajs/dna.js/master/package.json
projectHome=$(cd $(dirname $0); pwd)

runTasks() {
   cd $projectHome
   echo "Tasks:"
   pwd
   echo "To get latest modules --> $ npm update"
   gulp
   echo
   }

releaseInstructions() {
   cd $projectHome
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
         echo "This version has already been released, now update npmjs.org:."
         echo "   $ npm publish"
         echo "Then increment version number in:"
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
   echo "   gulp release"
   echo "   website/build-website.sh.command"
   echo "   *** Check in local changes with the comment:"
   echo "      Release $versionLocal"
   echo
   if [ -n "$(git status --short)" ]; then
      echo "   *** After local changes checked in, tag release:"
      fi
   echo "   cd $(pwd)"
   echo "   git tag -af $versionRemote -m \"Stable release\""
   echo "   git tag -af current -m \"Current stable release\""
   echo "   git remote -v"
   echo "   git push origin --tags --force"
   echo
   echo "   *** Finally, update:"
   echo "   https://github.com/dnajs/dna.js/wiki/Release-Notes"
   echo
   }

getVersions() {
   cd $projectHome
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
   }

runTestCases() {
   cd $projectHome
   sed s/src=dna.js/src=dna.min.js/ test-cases.html > test-cases-min.html
   url=http://localhost:$port/test-cases.html
   echo "Test cases:"
   echo $url
   echo
   sleep 2
   open $url
   }

echo
echo "dna.js Task Runner"
echo "~~~~~~~~~~~~~~~~~~"
source $projectHome/setup.sh
runTasks
getVersions
releaseInstructions
runTestCases
