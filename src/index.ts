import _Vue, { PluginFunction, VueConstructor } from 'vue';
import LibrarySettings from '@/types/LibrarySettings';
import CustomProps from '@/types/CustomProps';
import { extractPropsFromLibrarySettings } from '@/utils/extractPropsFromSettings';

// Import vue components
import * as components from './inputs/index';

// Define typescript interfaces for autoinstaller
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

// install function executed by Vue.use()
// eslint-disable-next-line max-len
const install: InstallFunction = function installVueTailwind(Vue: typeof _Vue, args: LibrarySettings = {}) {
  if (install.installed) return;
  install.installed = true;

  Object.entries(components).forEach(([componentName, component]) => {
    const customProps: CustomProps = extractPropsFromLibrarySettings(args, componentName);

    if (customProps) {
      const componentWithCustomTheme = (component as VueConstructor).extend({
        props: customProps,
      });

      Vue.component(componentName, componentWithCustomTheme);
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
export * from './inputs/index';
