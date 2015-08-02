#!/bin/sh

######################
#  dna.js Website    #
#  http://dnajs.org  #
######################

releasedOrigin=https://raw.githubusercontent.com/dnajs/dna.js/current
webServerFolder=~/Dropbox/Documents/Sites/centerkey.com/www.dnajs.org
webServerUrl=http://localhost/centerkey.com/www.dnajs.org/

echo
echo "dnajs.org"
echo "~~~~~~~~~"
websiteFolder=$(dirname $0)

# Set release version and build HTML files (run DSI templating)
cd $websiteFolder/dsi
pwd
versionReleased=$(git tag | tail -1)
versionHtml=$(grep "var=.release." ~begin.fhtml | awk -F'["]' '{print $4}')
echo "Release Version: $versionReleased"
echo "HTML Version:    v$versionHtml"
[ ! -f dsi.jar ] && curl --remote-name http://centerkey.com/dsi/download/dsi.jar
java -jar dsi.jar
echo

# Put web files into "httpdocs" folder
cd $websiteFolder
echo "Target:"
rm -rf $websiteFolder/httpdocs
mkdir  $websiteFolder/httpdocs
mv -v dsi/*.html            $websiteFolder/httpdocs
cp -v *.html *.css *.js     $websiteFolder/httpdocs
cp -v graphics/bookmark.ico $websiteFolder/httpdocs/favicon.ico
cp -R graphics rest         $websiteFolder/httpdocs
echo

# Download dna.js code
cd $websiteFolder/httpdocs
curl --remote-name --silent $releasedOrigin/dna.css
curl --remote-name --silent $releasedOrigin/dna.js
curl --remote-name --silent $releasedOrigin/dna.min.js
curl --remote-name --silent $releasedOrigin/test-cases.html

# List files
echo "Website:"
pwd
url="$target/index.html"
updateWebServer() {
   echo $webServerFolder
   cp -R * $webServerFolder
   cp ../../dna.js  $webServerFolder/dna.snapshot.js
   cp ../../dna.css $webServerFolder/dna.snapshot.css
   url=$webServerUrl
   }
[ -d $webServerFolder ] && updateWebServer
echo "Opening -> $url"
open $url
echo
echo "~~~~~~~~~"
