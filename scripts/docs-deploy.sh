#!/usr/bin/env sh	

# abort on errors	
set -e	

# build	
npm run docs:build	

# navigate into the build output directory	
cd docs

# if you are deploying to a custom domain	
# echo 'www.example.com' > CNAME	

git init	
git add -A	
git commit -m 'deploy'	
 
git push -f git@github.com:kazupon/vue-i18n.git master:gh-pages	

cd - 
