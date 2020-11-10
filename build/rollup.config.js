import path from 'path';
import vue from 'rollup-plugin-vue';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import autoExternal from 'rollup-plugin-auto-external';

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
    autoExternal({
      builtins: false,
      dependencies: true,
      packagePath: path.resolve('./package.json'),
      peerDependencies: false,
    }),
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
      },
    },
    external,
    plugins: [
      autoExternal({
        builtins: false,
        dependencies: true,
        packagePath: path.resolve('./package.json'),
        peerDependencies: false,
      }),
      typescript({
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src/',

      }),
      vue(),
    ],
  };
}).flat();

// Transpile/polyfill with reasonable browser support
export default config.concat(componentsConfig);
