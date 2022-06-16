#!/bin/bash
apt install -y nodejs npm
npm install -g yarn

yarn global add concurrently serve
concurrently "serve -s client/build" "node server/index.js" "nginx -g daemonoff"