#!/bin/bash
##########
# dna.js #
##########

setupTools() {
   cd $projectHome
   echo
   echo $banner
   echo $(echo $banner | sed -e "s/./=/g")
   pwd
   echo
   echo "Node.js:"
   which node || { echo "Need to install Node.js: https://nodejs.org"; exit; }
   node --version
   npm install
   npm update
   npm outdated
   echo
   }

setupWebServer() {
   cd $projectHome
   port=$(grep web-server package.json | sed -e "s/[^0-9]//g")
   # Requires package.json script: "web-server": "http-server -p 8080 &"
   echo "Web Server (indexzero/http-server on node):"
   test -z $(pgrep -f $projectHome) && npm run web-server
   pgrep -fl http-server
   echo "To stop web server:"
   echo "   $ pgrep -fl http-server"
   echo "   $ pkill -f $projectHome"
   echo
   }

setupTools
setupWebServer  #port: dna -> d9a -> 0xD9A -> 3482
