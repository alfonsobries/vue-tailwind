import Vue, { PluginFunction } from 'vue';
import ComponentSettings from './types/ComponentSettings';
import LibrarySettings from './types/LibrarySettings';
import configure from './configure';
// import ComponentName from './types/ComponentName';
// import { extractPropsFromComponentSettings, ImportedComponent } from './utils/extractPropsFromSettings';
// import * as components from './components';
// import ComponentSettings from './types/ComponentSettings';
// import CustomProps from './types/CustomProps';
// import configureDialogGlobals from './utils/configureDialogGlobals';


// const entries = Object.entries(components) as [ComponentName, ImportedComponent][];

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
      vueInstance.component(componentName, componentSettings);
      return;
    }

    const { component, props } = componentSettings as ComponentSettings;

    vueInstance.component(componentName, configure(component, props));
  });

  // if (options) { Object.keys(options); }

  // entries.forEach(([componentName, component]) => {
  //   const customPropsValues: ComponentSettings = options && options[componentName] ? options[componentName] : {};

  //   const customProps: CustomProps = extractPropsFromComponentSettings(customPropsValues, component);

  //   if (customProps) {
  //     const componentWithCustomVariants = component.extend({
  //       props: customProps,
  //     });

  //     Vue.component(componentName, componentWithCustomVariants);
  //   } else {
  //     Vue.component(componentName, component);
  //   }

  //   if (componentName === 'TModal') {
  //     // eslint-disable-next-line no-param-reassign
  //     Vue.prototype.$modal = new Vue({
  //       methods: {
  //         show(name: string, params = undefined) {
  //           this.$emit(`show-${name}`, params);
  //         },
  //         hide(name: string) {
  //           this.$emit(`hide-${name}`);
  //         },
  //       },
  //     });
  //   } else if (componentName === 'TDialog') {
  //     configureDialogGlobals(Vue);
  //   }
  // });
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

// // To auto-install on non-es builds, when vue is found
// // eslint-disable-next-line no-redeclare
// /* global window, global */
// if (process.env.ES_BUILD === 'false') {
//   let GlobalVue = null;
//   if (typeof window !== 'undefined') {
//     GlobalVue = window.Vue;
//   } else if (typeof global !== 'undefined') {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     GlobalVue = (global as any).Vue;
//   }
//   if (GlobalVue) {
//     (GlobalVue as typeof Vue).use(plugin);
//   }
// }

// Default export is library as a whole, registered via Vue.use()
export default plugin;

// // To allow individual component use, export components
// // each can be registered via Vue.component()
// export * from './components';
