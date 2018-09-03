#!/bin/bash
###############
# Task Runner #
# dna.js      #
###############

# To make this file runnable:
#     $ chmod +x *.sh.command

banner="dna.js Task Runner"
projectHome=$(cd $(dirname $0); pwd)

releaseInstructions() {
   cd $projectHome
   repository=$(grep repository package.json | awk -F'"' '{print $4}' | sed s/github://)
   package=https://raw.githubusercontent.com/$repository/master/package.json
   version=$(grep '"version"' package.json | awk -F'"' '{print $4}')
   pushed=$(curl --silent $package | grep '"version":' | awk -F'"' '{print $4}')
   released=$(git tag | tail -1)
   echo "Local changes:"
   git status --short
   echo
   echo "Recent releases:"
   git tag | tail -5
   echo
   echo "Release progress:"
   echo "   $version (local) --> $pushed (pushed) --> $released (released)"
   echo
   echo "Next release action:"
   nextActionUpdate() {
      echo "   === Increment version ==="
      echo "   Edit pacakge.json to bump version $version to next version number"
      echo "   $projectHome/package.json"
      }
   nextActionCommit() {
      echo "   === Commit and push ==="
      echo "   Check in changed source files for v$version with the message:"
      echo "   Set version for next release"
      }
   nextActionTag() {
      echo "   === Release checkin ==="
      echo "   Check in remaining changed files with the message:"
      echo "   Release v$version"
      echo "   === Tag and publish ==="
      echo "   cd $projectHome"
      echo "   git tag --annotate --message 'Release' $version"
      echo "   git remote --verbose"
      echo "   git push origin --tags"
      echo "   npm publish"
      }
   checkStatus() {
      test $version ">" $pushed && nextActionCommit || nextActionUpdate
      }
   test $pushed ">" $released && nextActionTag || checkStatus
   echo
   }

runTasks() {
   cd $projectHome
   echo "Tasks:"
   npm test
   echo
   }

launchVisualSpecs() {
   cd $projectHome
   sed s/src=dna.js/src=dna.min.js/ spec/visual.html > spec/visual-min.html
   url=http://localhost:$port/spec/visual.html
   echo "Visual specifications:"
   echo $url
   echo
   sleep 2
   open $url
   }

source $projectHome/setup.sh
releaseInstructions
runTasks
launchVisualSpecs
