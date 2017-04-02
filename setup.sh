#!/bin/sh
##########
# dna.js #
##########

package=https://raw.githubusercontent.com/dnajs/dna.js/master/package.json
releasedOrigin=https://raw.githubusercontent.com/dnajs/dna.js/current
port=3482  #d9a

info() {
   cd $projectHome
   pwd
   echo
   echo "Node.js:"
   which node || { echo "Need to install Node.js: https://nodejs.org"; exit; }
   node --version
   test -d node_modules || npm install
   npm update
   npm outdated
   echo
   }

setupWebServer() {
   cd $projectHome
   echo "Web server (localhost:$port):"
   process=$(pgrep -lf "SimpleHTTPServer $port")
   launch() {
      echo "Launching SimpleHTTPServer..."
      screen -dm python -m SimpleHTTPServer $port
      }
   test -z "$process" && launch
   pwd
   pgrep -lf "^python -m SimpleHTTPServer"
   echo
   }

info
setupWebServer
