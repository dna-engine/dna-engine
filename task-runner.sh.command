#!/bin/sh
############################
#  Task Runner             #
#  dna.js Template Cloner  #
############################

# To make this file runnable:
#    $ chmod +x task-runner.sh.command

echo
echo "dna.js Task Runner"
echo "=================="
cd $(dirname "$0")
pwd
echo
if [ -z $(which npm) ]; then
   echo "*** npm not found ***\nInstall Node.js to get npm\n"
   open "http://nodejs.org/download/"
   fi
if [ -z $(which grunt) ]; then
   echo "*** grunt not found ***\nTo install Grunt:\n   $ sudo npm install -g grunt-cli\n"
   fi
npm install
echo "Grunt:"
which grunt
ls -l Gruntfile.js
echo
grunt
echo
echo "Files:"
ls -l dna*.js
echo "dna.min.js -> $(ls -lsh dna.min.js | awk '{print $6}')"
git status --short
echo
package=https://raw.githubusercontent.com/dnajs/dna.js/current/package.json
version=v$(curl $package | grep '"version":' | awk -F'"' '{print $4}')
echo
echo "Local code version:"
local=v$(grep '"version"' package.json | awk -F'"' '{print $4}')
echo $local
echo
echo "Tagged releases:"
git tag
released=$(git tag | tail -1)
echo
echo "Checked in version:"
echo $version
echo
status="NOT YET RELEASED"
if [ "$version" == "$released" ]; then
	status="RELEASED"
	fi
echo "Status: $status"
echo
echo "Steps to prepare for next release"
echo "   1) Increment version number in:"
echo "         $(pwd)/package.json"
echo "   2) Rerun:"
echo "         $(pwd)/task-runner.sh.command"
echo "   3) Check changes into git with the comment:"
echo "         Version number updated for next release"
echo
echo "To release this version:"
echo "   cd $(pwd)"
echo "   git tag -af $version -m \"Beta release\""
echo "   git tag -af current -m \"Current stable release\""
echo "   git remote -v"
echo "   git push origin --tags --force"
echo "TBD: README.md, bower, jquery, release notes, and web site"
echo
open test-cases.html
echo "=================="
