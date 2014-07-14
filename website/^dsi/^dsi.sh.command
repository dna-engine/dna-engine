#!/bin/sh

############
#  dna.js  #
############

echo
echo "dnajs.org"
echo "~~~~~~~~~"
cd $(dirname $0)
pwd
[ ! -f dsi.jar ] && curl -O http://www.centerkey.com/dsi/download/dsi.jar
java -jar dsi.jar
echo
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
cd "$target"
echo "\nDownloading:"
pwd
echo "dna.js"
curl -O https://raw.githubusercontent.com/dnajs/dna.js/current/dna.js
echo "dna.min.js"
curl -O https://raw.githubusercontent.com/dnajs/dna.js/current/dna.min.js
echo "test-cases.html"
curl -O https://raw.githubusercontent.com/dnajs/dna.js/current/test-cases.html
echo "\nWebsite:"
pwd
ls -l
echo "~~~~~~~~~"
echo
