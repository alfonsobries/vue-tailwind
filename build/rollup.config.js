import vue from 'rollup-plugin-vue';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';

const external = [
  'body-scroll-lock',
  'lodash.clonedeep',
  'lodash.get',
  'lodash.intersection',
  'lodash.isequal',
  'lodash.kebabcase',
  'lodash.map',
  'lodash.mapvalues',
  'lodash.merge',
  'lodash.pick',
  'lodash.range',
  'vue',
];

const config = [{
  input: 'src/index.ts', // Path relative to package.json
  output: {
    sourcemap: true,
    dir: 'dist',
    entryFileNames: 'vue-tailwind.js',
    format: 'umd',
    name: 'VueTailwind',
    exports: 'named',
    globals: {
      vue: 'Vue',
      'lodash.get': 'get',
    },
  },
  external,
  plugins: [
    del({ targets: 'dist/*' }),
    typescript({
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src/',
    }),
    vue(),
  ],
}];

const components = {
  't-input': 'TInput',
  't-button': 'TButton',
  't-checkbox': 'TCheckbox',
  't-radio': 'TRadio',
  't-select': 'TSelect',
  't-textarea': 'TTextarea',
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
      globals: {
        vue: 'Vue',
        'lodash.get': 'get',
        'lodash.isEqual': 'isEqual',
        'lodash.map': 'map',
      },
    },
    external,
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src/',
      }),
      vue(),
    ],
  };
}).flat();

const helpers = [{
  input: 'src/configure.ts', // Path relative to package.json
  output: {
    sourcemap: true,
    dir: 'dist',
    entryFileNames: 'configure.js',
    format: 'umd',
    name: 'configure',
    exports: 'named',
  },
  plugins: [
    typescript({
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src/',
    }),
  ],
}];

// Transpile/polyfill with reasonable browser support
export default config.concat(componentsConfig, helpers);
