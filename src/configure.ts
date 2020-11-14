import Vue from 'vue';
import { VTComponent, CustomProp } from './types/ComponentSettings';
import CustomProps from './types/CustomProps';
import configureDialogGlobals from './utils/configureDialogGlobals';

const configure = (component: VTComponent, props?: CustomProp): VTComponent => {
  const componentProps = component?.options?.props;
  const componentName = component?.options?.name;

  if (componentName === 'TModal') {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$modal = new Vue({
      methods: {
        show(name: string, params = undefined) {
          this.$emit(`show-${name}`, params);
        },
        hide(name: string) {
          this.$emit(`hide-${name}`);
        },
      },
    });
  } else if (componentName === 'TDialog') {
    configureDialogGlobals(Vue, props);
  }

  if (!props || !componentProps) {
    return component;
  }

  const customProps: CustomProps = {};

  Object.keys(props).forEach((customPropName: string) => {
    const defaultProp = componentProps[customPropName];

    if (!defaultProp) {
      return;
    }
    const newDefaultValue = props[customPropName];

    customProps[customPropName] = {
      type: defaultProp?.type,
      default: ['object', 'function'].includes(typeof newDefaultValue)
        ? () => newDefaultValue
        : newDefaultValue,
    };
  });

  return component.extend({
    props: customProps,
  });
};

export default configure;
