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
echo "\nFiles:"
ls -l dna*.js
open test-cases.html
git status --short
echo
echo "Tagged releases:"
git tag
echo
echo "Current version (project.json):"
version=$(grep '"version"' package.json | awk -F'"' '{print $4}')
echo $version
echo
echo "To release (publish) this version (beta):"
echo "   cd $(pwd)"
echo "   git tag -af v$version -m \"Beta release\""
echo "   git tag -af current -m \"Current stable release\""
echo "   git remote -v"
echo "   git push origin --tags --force"
echo "=================="
