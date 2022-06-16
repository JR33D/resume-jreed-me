#!/bin/bash
concurrently "serve -s client/build" "node server/index.js" "nginx -g daemonoff"