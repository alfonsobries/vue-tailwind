import { PluginObject } from 'vue';
import Classes from './types/Classes';

type Theme = {
  [k: string]: Classes;
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    vueTailwindTheme: Theme;
  }
}

type Args = { theme?: Theme } | undefined


const VueTailwind: PluginObject<Args> = {
  installed: false,
  install(Vue, args: Args = {}) {
    if (this.installed) {
      return;
    }

    this.installed = true;

    // eslint-disable-next-line no-param-reassign
    Vue.vueTailwindTheme = args.theme && typeof args.theme === 'object' ? args.theme : {};
  },
};

export default VueTailwind;
