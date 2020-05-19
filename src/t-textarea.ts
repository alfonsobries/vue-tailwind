import _Vue, { PluginFunction, VueConstructor } from 'vue';
import CssClasses from '@/types/CssClasses';
// Import vue component
import component from '@/components/TTextarea.vue';

const componentName = 'TTextarea';


// Define typescript interfaces for autoinstaller
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}
interface InstallableComponent extends VueConstructor<_Vue> {
  install: InstallFunction;
}

type Args = { classes?: CssClasses } | undefined

// install function executed by Vue.use()
const install: InstallFunction = function installComponent(Vue: typeof _Vue, args: Args = {}) {
  if (install.installed) return;
  install.installed = true;
  const componentClasses: CssClasses = args.classes && typeof args.classes === 'object' ? args.classes : undefined;

  const componentWithCustomClasses = (component as VueConstructor).extend({
    props: {
      classes: {
        type: Object,
        default: () => componentClasses,
      },
    },
  });

  Vue.component(componentName, componentWithCustomClasses);
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

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(component as any as InstallableComponent).install = install;

// Export component by default
export default component;
