import vue from 'rollup-plugin-vue';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import multiInput from 'rollup-plugin-multi-input';

const globals = {
  'body-scroll-lock': 'bodyScrollLock',
  'lodash.clonedeep': 'cloneDeep',
  'lodash.get': 'get',
  'lodash.intersection': 'intersection',
  'lodash.isequal': 'isEqual',
  'lodash.kebabcase': 'kebabCase',
  'lodash.map': 'map',
  'lodash.mapvalues': 'mapValues',
  'lodash.merge': 'merge',
  'lodash.pick': 'pick',
  'lodash.range': 'range',
  vue: 'Vue',
};

const config = [
  {
    input: 'src/index.ts', // Path relative to package.json
    output: {
      sourcemap: true,
      dir: 'dist',
      entryFileNames: 'vue-tailwind.js',
      format: 'umd',
      name: 'VueTailwind',
      exports: 'named',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      del({ targets: 'dist/*' }),
      typescript({
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
      }),
      vue(),
    ],
  },
  {
    input: 'src/full.ts',
    output: {
      sourcemap: true,
      dir: 'dist',
      entryFileNames: 'full.js',
      format: 'umd',
      name: 'VueTailwind',
      exports: 'named',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      typescript({
        rootDir: 'src',
      }),
      vue(),
    ],
  },
  {
    input: 'src/components.ts',
    output: {
      sourcemap: true,
      dir: 'dist',
      entryFileNames: 'components.js',
      format: 'umd',
      name: 'VueTailwind',
      exports: 'named',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      typescript({
        rootDir: 'src',
      }),
      vue(),
    ],
  },
];

const components = {
  't-input': 'TInput',
  't-button': 'TButton',
  't-checkbox': 'TCheckbox',
  't-radio': 'TRadio',
  't-select': 'TSelect',
  't-textarea': 'TTextarea',
  't-rich-select': 'TRichSelect',
  't-input-group': 'TInputGroup',
  't-card': 'TCard',
  't-alert': 'TAlert',
  't-modal': 'TModal',
  't-dropdown': 'TDropdown',
  't-pagination': 'TPagination',
  't-tag': 'TTag',
  't-radio-group': 'TRadioGroup',
  't-checkbox-group': 'TCheckboxGroup',
  't-table': 'TTable',
  't-datepicker': 'TDatepicker',
  't-toggle': 'TToggle',
  't-dialog': 'TDialog',
};

const componentsConfig = Object.keys(components).map((component) => {
  const componentName = components[component];

  return {
    input: `src/${component}.ts`, // Path relative to package.json
    output: {
      sourcemap: true,
      dir: 'dist',
      entryFileNames: `${component}.js`,
      format: 'umd',
      name: componentName,
      exports: 'named',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
      }),
      vue(),
    ],
  };
}).flat();

const helpers = [
  {
    input: 'src/configure.ts', // Path relative to package.json
    output: {
      sourcemap: true,
      dir: 'dist',
      entryFileNames: 'configure.js',
      format: 'umd',
      name: 'configure',
      exports: 'named',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
      }),
    ],
  },
  {
    input: 'src/l10n/*.ts',
    output: {
      sourcemap: true,
      format: 'esm',
      dir: 'dist',
    },
    plugins: [
      multiInput(),
      typescript(),
    ],
  },
];

// Transpile/polyfill with reasonable browser support
export default config.concat(componentsConfig, helpers);
