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
echo "//dna.js ~~ `git tag | tail -1` ~~ dnajs.org/license.html" > dna.min.js
echo $minifier
curl --data compilation_level=SIMPLE_OPTIMIZATIONS --data output_format=text \
   --data output_info=compiled_code --data-urlencode "js_code@dna.js" \
   $minifier >> dna.min.js
echo
echo "Files:"
ls -l *.js
git status --short
echo
echo "Current version (dna.js):"
curl --silent https://raw.github.com/dnajs/dna.js/current/dna.js | head  -1
echo
echo "Minified version (dna.min.js):"
cat dna.min.js | head  -1
echo
open test-cases.html
echo "=========="
