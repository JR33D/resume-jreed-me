#!/bin/bash
yarn global add concurrently
yarn global add serve
concurrently "serve -s client/build" "node server/index.js" "nginx -g daemonoff"