#!/bin/sh

#######################
#  dnajs.org website  #
#######################

releasedFolder=https://raw.githubusercontent.com/dnajs/dna.js/current
echo
echo "dnajs.org"
echo "~~~~~~~~~"
cd $(dirname $0)
pwd

# Set release version
getHtmlVersion() {
   versionHtml=$(grep "var=.release." ~begin.fhtml | awk -F'[ "]' '{print $8}')
   }
versionReleased=$(git tag | tail -1)
getHtmlVersion
echo "Release Version: $versionReleased"
echo "HTML Version:    $versionHtml"
#if [ "$versionReleased" != "$versionHtml" ]; then
#   file=$(sed "s/$versionHtml/$versionReleased/" ~begin.fhtml)
#   echo "$file" > ~begin.fhtml
#   getHtmlVersion
#   echo "*** HTML version updated to: $versionHtml"
#   fi

# Run DSI
[ ! -f dsi.jar ] && curl -O http://www.centerkey.com/dsi/download/dsi.jar
java -jar dsi.jar
echo

# Put files into web server folder
target="../../../dnajs.org"
[ $(whoami) == "dem" ] && target="../../../../Sites/centerkey.com/www.dnajs.org"
mkdir -p "$target"
target=$(cd "$target"; pwd)
echo "Target: $target"
mv -v *.html "$target"
cd ..
pwd
cp -v bookstore.html style.css app.js feedback.php favicon.ico "$target"
cp -R graphics rest "$target"
echo

# Download code
cd "$target"
curl --remote-name --silent $releasedFolder/dna.js
curl --remote-name --silent $releasedFolder/dna.min.js
curl --remote-name --silent $releasedFolder/test-cases.html

# List files
echo "Website:"
pwd
ls -l
open "http://localhost/~$(whoami)$(echo $target | sed 's/.*Sites//')"
echo "~~~~~~~~~"
