#!/usr/bin/env bash

echo "Building Entry point"
./node_modules/.bin/vue-cli-service build --target lib ./src/index.ts --filename index --modern

echo "Building Components"
./node_modules/.bin/vue-cli-service build --target lib --no-clean ./src/inputs/TInput.ts --filename t-input --modern
mv ./dist/t-input.umd.min.js ./dist/t-input.js
mv ./dist/t-input.umd.min.js.map ./dist/t-input.js.map

# echo 'Building TInput...'
# ./node_modules/.bin/vue-cli-service build --target wc --name t-input --filename inputs/TInput --no-clean ./src/inputs/TInput.ts  --formats umd

# echo 'Building TInput...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TInput --filename components/TInput --no-clean ./src/t-input.ts

# echo 'Building TTextarea...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TTextarea --filename components/TTextarea --no-clean ./src/t-textarea.ts

# echo 'Building TSelect...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TSelect --filename components/TSelect --no-clean ./src/t-select.ts

# echo 'Building TRadio...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TRadio --filename components/TRadio --no-clean ./src/t-radio.ts

# echo 'Building TCheckbox...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TCheckbox --filename components/TCheckbox --no-clean ./src/t-checkbox.ts

# echo 'Building TButton...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TButton --filename components/TButton --no-clean ./src/t-button.ts

# echo 'Building TInputGroup...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TInputGroup --filename components/TInputGroup --no-clean ./src/t-input-group.ts

# echo 'Building TAlert...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TAlert --filename components/TAlert --no-clean ./src/t-alert.ts

# echo 'Building TCard...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TCard --filename components/TCard --no-clean ./src/t-card.ts

# echo 'Building TModal...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TModal --filename components/TModal --no-clean ./src/t-modal.ts

# echo 'Building TDropdown...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TDropdown --filename components/TDropdown --no-clean ./src/t-dropdown.ts

# echo 'Building TPagination...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TPagination --filename components/TPagination --no-clean ./src/t-pagination.ts

# echo 'Building TRichSelect...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TRichSelect --filename components/TRichSelect --no-clean ./src/t-rich-select.ts

# echo 'Building TTag...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TTag --filename components/TTag --no-clean ./src/t-tag.ts

# echo 'Building TRadioGroup...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TRadioGroup --filename components/TRadioGroup --no-clean ./src/t-radio-group.ts

# echo 'Building TCheckboxGroup...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TCheckboxGroup --filename components/TCheckboxGroup --no-clean ./src/t-checkbox-group.ts

# echo 'Building TTable...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TTable --filename components/TTable --no-clean ./src/t-table.ts

# echo 'Building TToggle...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TToggle --filename components/TToggle --no-clean ./src/t-toggle.ts

# echo 'Building TDatepicker...'
# ./node_modules/.bin/vue-cli-service build --target lib --name TDatepicker --filename components/TDatepicker --no-clean ./src/t-datepicker.ts

echo 'Building Locale...'
./node_modules/.bin/tsc --build tsconfig.locale.json

echo 'Done building assets.'