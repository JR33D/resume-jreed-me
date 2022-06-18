#!/bin/bash
concurrently "serve -s /app/client/" "node /app/server/server.js"