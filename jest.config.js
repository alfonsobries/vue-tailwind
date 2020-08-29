module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  roots: [
    '<rootDir>',
  ],
  modulePaths: [
    '<rootDir>',
  ],
  moduleDirectories: [
    'node_modules',
  ],
};
