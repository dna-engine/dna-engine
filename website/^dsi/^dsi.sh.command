#!/bin/sh

######################
#  dna.js Website    #
#  http://dnajs.org  #
######################

releasedFolder=https://raw.githubusercontent.com/dnajs/dna.js/current
webServerFolder=~/Dropbox/Documents/Sites/centerkey.com/www.dnajs.org
webServerUrl=http://localhost/centerkey.com/www.dnajs.org/

echo
echo "dnajs.org"
echo "~~~~~~~~~"
cd $(dirname $0)
pwd

# Set release version
versionReleased=$(git tag | tail -1)
versionHtml=$(grep "var=.release." ~begin.fhtml | awk -F'["]' '{print $4}')
echo "Release Version: $versionReleased"
echo "HTML Version:    $versionHtml"

# Build HTML files (run DSI templating)
[ ! -f dsi.jar ] && curl -O http://www.centerkey.com/dsi/download/dsi.jar
java -jar dsi.jar
echo

# Put web files into "httpdocs" folder
targetFolder=../httpdocs
rm -rf $targetFolder
mkdir $targetFolder
target=$(cd $targetFolder; pwd)
echo "Target:"
echo $target
mv -v *.html "$target"
cd ..
cp -v bookstore.html style.css app.js feedback.php favicon.ico "$target"
cp -R graphics rest "$target"
echo

# Download dna.js code
cd "$target"
curl --remote-name --silent $releasedFolder/dna.css
curl --remote-name --silent $releasedFolder/dna.js
curl --remote-name --silent $releasedFolder/dna.min.js
curl --remote-name --silent $releasedFolder/test-cases.html

# List files
echo "Website:"
pwd
ls -l
url="$target/index.html"
if [ -d $webServerFolder ]; then
   echo $webServerFolder
   cp -R * $webServerFolder
   url=$webServerUrl
   fi
echo "Opening -> $url"
open $url
echo
echo "~~~~~~~~~"
