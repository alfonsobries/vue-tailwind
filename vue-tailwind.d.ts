import _Vue, { PluginFunction, VueConstructor } from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $modal: _Vue;
  }
}

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

declare const VueTailwind: { install: InstallFunction };
export default VueTailwind;

export const VueTailwindSample: VueConstructor<_Vue>;
