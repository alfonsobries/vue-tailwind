import _Vue, { VueConstructor } from 'vue';
import { InstallFunction } from './src';

declare module 'vue/types/vue' {
  interface Vue {
    $modal: _Vue;
    $dialog: _Vue;
    $alert: (params?: string) => void;
  }
}

declare const VueTailwind: { install: InstallFunction };

export default VueTailwind;

export const VueTailwindSample: VueConstructor<_Vue>;

export * from './src/index';
