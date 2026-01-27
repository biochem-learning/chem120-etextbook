#!/usr/bin/env sh\

# To deploy the website: run npm run deploy or bash deploy.sh
set -e

npm run build

cd dist

git init
git add -A
git commit -m "New Deployment"
git push -f git@github.com:biochem-learning/chem120-etextbook.git main:gh-pages

cd -