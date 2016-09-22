#!/bin/bash
export $( cat .env|xargs)

while getopts 'w' FLAG
do
  case $FLAG in
    w) export WATCH_TESTS=true ;;
  esac
done

./node_modules/.bin/karma start ./tests/karma.conf.js
