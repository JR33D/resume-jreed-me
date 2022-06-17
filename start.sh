#!/bin/bash
concurrently "serve -s /app/client/build" "node /app/server/index.js"