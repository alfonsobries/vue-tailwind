import { VTComponent, CustomProp } from './types/ComponentSettings';
import CustomProps from './types/CustomProps';

const configure = (component: VTComponent, props: CustomProp): VTComponent => {
  const componentProps = component?.options?.props;

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
