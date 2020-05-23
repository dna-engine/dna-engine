#!/bin/bash
##########
# dna.js #
##########

setupTools() {
   cd $projectHome
   echo
   echo $banner
   echo $(echo $banner | sed s/./=/g)
   pwd
   echo
   echo "Node.js:"
   which node || { echo "Need to install Node.js: https://nodejs.org"; exit; }
   node --version
   npm install --no-fund
   npm update
   npm outdated
   echo
   }

setupWebServer() {
   cd $projectHome
   port=$(grep web-server package.json | sed 's/[^0-9]*\([0-9]*\).*/\1/')  #extract port number from script
   echo "Web Server (indexzero/http-server on node):"
   npm run web-server
   sleep 2  #ensure pid is ready to read
   echo "To stop web server:"
   echo "   $ lsof -P -i :$port"
   echo "   $ kill $(lsof -Pt -i :$port)"
   echo
   }

setupTools
setupWebServer
