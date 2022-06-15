#!/bin/bash
yarn global add serve
serve -s client/build
node server/index.js
# nginx -g daemonoff