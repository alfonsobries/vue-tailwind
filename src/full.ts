import Vue, { PluginFunction } from 'vue';
import configure from './configure';
import * as components from './components';
import ComponentName from './types/ComponentName';
import { CustomProp, VTComponent } from './types/ComponentSettings';

interface InstallFunction extends PluginFunction<AllComponentsSettings> {
  installed?: boolean;
}

const entries = Object.entries(components) as [ComponentName, VTComponent][];

type AllComponentsSettings = {
  [name in ComponentName]: CustomProp
}

// install function executed by Vue.use()
// eslint-disable-next-line max-len
const install: InstallFunction = function installVueTailwind(vueInstance: typeof Vue, settings?: AllComponentsSettings) {
  if (install.installed) return;

  install.installed = true;

  // eslint-disable-next-line no-param-reassign
  vueInstance.prototype.$vueTailwind = true;

  entries.forEach(([componentName, component]) => {
    const props: CustomProp | undefined = settings ? settings[componentName] : undefined;
    vueInstance.component(componentName, configure(component, props));
  });
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

// Default export is library as a whole, registered via Vue.use()
export default plugin;
