import Vue, { VueConstructor } from 'vue';
import { DialogResponse } from './src/components/TDialog';
import { DialogOptions } from './src/utils/configureDialogGlobals';
import { InstallFunction } from './src';

declare module 'vue/types/vue' {
  interface Vue {
    $modal: Vue & {
      show: (name: string, params?: { [k: string]: string }) => void;
      hide: (name: string) => void;
    };
    $dialog: Vue & {
      show: (name: string) => Promise<DialogResponse>;
      hide: (name: string) => void;
      alert: (titleOrDialogOptions: DialogOptions, text?: string, icon?: string) => Promise<DialogResponse>;
      confirm: (titleOrDialogOptions: DialogOptions, text?: string, icon?: string) => Promise<DialogResponse>;
      prompt: (titleOrDialogOptions: DialogOptions, text?: string, icon?: string) => Promise<DialogResponse>;
    },
    $alert: (titleOrDialogOptions: DialogOptions, text?: string, icon?: string) => Promise<DialogResponse>;
    $confirm: (titleOrDialogOptions: DialogOptions, text?: string, icon?: string) => Promise<DialogResponse>;
    $prompt: (titleOrDialogOptions: DialogOptions, text?: string, icon?: string) => Promise<DialogResponse>;
  }
}

declare const VueTailwind: { install: InstallFunction };

export default VueTailwind;

export const VueTailwindSample: VueConstructor<Vue>;

export * from './src/index';
