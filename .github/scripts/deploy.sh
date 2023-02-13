#!/usr/bin/env sh
# From https://vitejs.dev/guide/static-deploy.html

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:PainOchoco/Orbital.git main:gh-pages

cd -