#!/bin/sh
##########
# dna.js #
##########

port=12658  #convert "~:" -> 126 58

needNpm() {
   echo "**********************************"
   echo "Need to install Node.js to get npm"
   echo "**********************************"
   open "http://nodejs.org/"
   exit
   }

needGulp() {
   echo "***************************************"
   echo "Need to install Gulp:                  "
   echo "   $ sudo npm install --global gulp-cli"
   echo "***************************************"
   exit
   }

info() {
   cd $projectHome
   echo "npm:"
   which npm || needNpm
   npm --version
   echo
   echo "Gulp:"
   which gulp || needGulp
   gulp --version
   echo
   }

setupWebServer() {
   cd $projectHome
   find . -name ".DS_Store" -delete
   process=$(pgrep -lf "SimpleHTTPServer $port")
   launch() {
      echo "Launching SimpleHTTPServer:"
      pwd
      python -m SimpleHTTPServer $port &> /dev/null &
      echo
      }
   [[ -z "$process" ]] && launch
   echo "Web server:"
   pgrep -lf SimpleHTTPServer
   echo
   }

echo
info
setupWebServer
