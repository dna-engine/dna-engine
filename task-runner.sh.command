#!/bin/sh
############################
#  Task Runner             #
#  dna.js Template Cloner  #
############################

# To make this file runnable:
#    $ chmod +x minify.sh.command

echo
echo "Mini-Me Clone"
echo "============="
cd $(dirname "$0")
echo "Project folder:"
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
echo "Releases:"
git tag
echo
echo "Current stable release (dna.js/dna.min.js):"
curl --silent https://raw.github.com/dnajs/dna.js/current/dna.js | head  -1
curl --silent https://raw.github.com/dnajs/dna.js/current/dna.min.js | head  -1
echo
echo "Upcoming release (dna.js/dna.min.js):"
curl --silent https://raw.github.com/dnajs/dna.js/master/dna.js | head  -1
echo "$(cat dna.min.js | head  -1)  [LOCAL]"
echo "============="
