import _Vue, { PluginFunction, VueConstructor } from 'vue';
import CssClasses from '@/types/CssClasses';

// Import vue components
import * as components from './components/index';

// Define typescript interfaces for autoinstaller
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

type Args = { theme?: Theme } | undefined

type Theme = {
  [k: string]: CssClasses;
}


// install function executed by Vue.use()
const install: InstallFunction = function installVueTailwind(Vue: typeof _Vue, args: Args = {}) {
  if (install.installed) return;
  install.installed = true;
  // eslint-disable-next-line no-param-reassign
  const theme = args.theme && typeof args.theme === 'object' ? args.theme : {};

  Object.entries(components).forEach(([componentName, component]) => {
    const componentClasses: CssClasses = theme[componentName] || undefined;
    if (componentClasses) {
      const componentWithCustomClasses = (component as VueConstructor).extend({
        props: {
          classes: {
            type: Object,
            default: () => componentClasses,
          },
        },
      });

      Vue.component(componentName, componentWithCustomClasses);
    } else {
      Vue.component(componentName, component);
    }
  });
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
if (process.env.ES_BUILD === 'false') {
  let GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    GlobalVue = (global as any).Vue;
  }
  if (GlobalVue) {
    (GlobalVue as typeof _Vue).use(plugin);
  }
}

// Default export is library as a whole, registered via Vue.use()
export default plugin;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './components/index';
