#!/bin/sh
############################
#  Minify                  #
#  dna.js Template Cloner  #
############################

# To make this file runnable:
#    $ chmod +x minify.sh.command

minifier="http://closure-compiler.appspot.com/compile"

echo
echo "Mini-Me Clone"
echo "============="
cd `dirname "$0"`
pwd
v=$(curl --silent https://raw.github.com/dnajs/dna.js/master/dna.js | head -1 | awk '{print $6;}')
echo "//dna.js ~~ $v ~~ dnajs.org/license.html" > dna.min.js
echo $minifier
curl --data compilation_level=SIMPLE_OPTIMIZATIONS --data output_format=text \
   --data output_info=compiled_code --data-urlencode "js_code@dna.js" \
   $minifier >> dna.min.js
echo
echo "Files:"
ls -l *.js
git status --short
echo
echo "Current versions (dna.js/dna.min.js):"
curl --silent https://raw.github.com/dnajs/dna.js/current/dna.js | head  -1
curl --silent https://raw.github.com/dnajs/dna.js/current/dna.min.js | head  -1
echo
echo "New replacement versions (dna.js/dna.min.js):"
curl --silent https://raw.github.com/dnajs/dna.js/master/dna.js | head  -1
echo "$(cat dna.min.js | head  -1)  (LOCAL)"
echo
open test-cases.html
echo "If all tests pass, check in dna.min.js and update tags."
echo "=========="
