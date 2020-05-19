import Vue, { PluginFunction, VueConstructor } from 'vue';


interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

declare const VueTailwind: { install: InstallFunction };
export default VueTailwind;

export const VueTailwindSample: VueConstructor<Vue>;
