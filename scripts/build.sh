#!/usr/bin/env bash

echo "Building Entry point"
./node_modules/.bin/vue-cli-service build --target lib ./src/index.ts

echo 'Building TInput...'
./node_modules/.bin/vue-cli-service build --target lib --name TInput --filename components/TInput --no-clean src/components/TInput.vue

echo 'Building TTextarea...'
./node_modules/.bin/vue-cli-service build --target lib --name TInput --filename components/TTextarea --no-clean src/components/TTextarea.vue

echo 'Building TSelect...'
./node_modules/.bin/vue-cli-service build --target lib --name TInput --filename components/TSelect --no-clean src/components/TSelect.vue

echo 'Done building assets.'