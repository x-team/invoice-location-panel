#!/bin/bash
export $( cat .env|xargs)

./node_modules/.bin/webpack-dev-server \
  --hot \
  --debug \
  --inline \
  --colors \
  --verbose \
  --devtool inline-source-map \
  --display-chunks \
  --progress \
  --history-api-fallback \
  --display-error-details \
  --output-pathinfo \
  --port 8082
