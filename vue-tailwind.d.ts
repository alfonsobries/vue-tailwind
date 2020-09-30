import _Vue, { VueConstructor } from 'vue';
import { DialogOptions } from './src/utils/configureDialogGlobals';
import { InstallFunction } from './src';

declare module 'vue/types/vue' {
  interface Vue {
    $modal: _Vue;
    $dialog: _Vue;
    $alert: (titleOrDialogOptions: DialogOptions, text?: string, icon?: string) => typeof Promise;
    $confirm: (titleOrDialogOptions: DialogOptions, text?: string, icon?: string) => typeof Promise;
    $prompt: (titleOrDialogOptions: DialogOptions, text?: string, icon?: string) => typeof Promise;
  }
}


declare const VueTailwind: { install: InstallFunction };

export default VueTailwind;

export const VueTailwindSample: VueConstructor<_Vue>;

export * from './src/index';
