#!/usr/bin/env bash

echo "Building Entry point"
./node_modules/.bin/vue-cli-service build --target lib ./src/index.ts

echo 'Building TInput...'
./node_modules/.bin/vue-cli-service build --target lib --name TInput --filename components/TInput --no-clean ./src/t-input.ts

echo 'Building TTextarea...'
./node_modules/.bin/vue-cli-service build --target lib --name TTextarea --filename components/TTextarea --no-clean ./src/t-textarea.ts

echo 'Building TSelect...'
./node_modules/.bin/vue-cli-service build --target lib --name TSelect --filename components/TSelect --no-clean ./src/t-select.ts

echo 'Building TRadio...'
./node_modules/.bin/vue-cli-service build --target lib --name TRadio --filename components/TRadio --no-clean ./src/t-radio.ts

echo 'Building TCheckbox...'
./node_modules/.bin/vue-cli-service build --target lib --name TCheckbox --filename components/TCheckbox --no-clean ./src/t-checkbox.ts

echo 'Done building assets.'