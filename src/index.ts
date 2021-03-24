import Vue, { PluginFunction } from 'vue';
import ComponentSettings from './types/ComponentSettings';
import LibrarySettings from './types/LibrarySettings';
import configure from './configure';

export { default as BaseComponent } from './base/Component';

export interface InstallFunction extends PluginFunction<LibrarySettings> {
  installed?: boolean;
}

// install function executed by Vue.use()
// eslint-disable-next-line max-len
const install: InstallFunction = function installVueTailwind(vueInstance: typeof Vue, settings: LibrarySettings) {
  if (install.installed) return;

  install.installed = true;

  // eslint-disable-next-line no-param-reassign
  vueInstance.prototype.$vueTailwind = true;

  if (!settings) {
    return;
  }

  Object.keys(settings).forEach((componentName) => {
    const componentSettings = settings[componentName];

    if (typeof componentSettings === 'function' && typeof componentSettings.extend !== undefined) {
      const component = componentSettings;
      vueInstance.component(componentName, configure(component));
      return;
    }

    const { component, props } = componentSettings as ComponentSettings;

    vueInstance.component(componentName, configure(component, props));
  });
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

// Default export is library as a whole, registered via Vue.use()
export default plugin;
