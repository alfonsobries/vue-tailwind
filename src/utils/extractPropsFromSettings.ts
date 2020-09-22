/* eslint-disable max-len */
import { PropOptions, VueConstructor } from 'vue';
import LibrarySettings from '../types/LibrarySettings';
import CustomProps from '../types/CustomProps';
import ComponentSettings from '../types/ComponentSettings';
import ComponentName from '../types/ComponentName';

export interface ImportedComponent extends VueConstructor {
  options?: {
    props?: {
      [key: string]: PropOptions
    }
  }
}

const extractPropsFromComponentSettings = function extractPropsFromComponentSettings(customPropsValues: ComponentSettings, component: ImportedComponent): CustomProps {
  if (!customPropsValues) {
    return undefined;
  }

  const componentProps = component?.options?.props;
  const customProps: CustomProps = {};

  Object.keys(customPropsValues).forEach((propName: string) => {
    const defaultProp = componentProps ? componentProps[propName] : undefined;
    const newDefaultValue = customPropsValues[propName];
    customProps[propName] = {
      type: defaultProp?.type,
      default: ['object', 'function'].includes(typeof newDefaultValue)
        ? () => newDefaultValue
        : newDefaultValue,
    };
  });

  if (Object.keys(customProps).length) {
    return customProps;
  }

  return undefined;
};

const extractPropsFromLibrarySettings = function extractPropsFromSettings(options: LibrarySettings | undefined, componentName: ComponentName, component: ImportedComponent): CustomProps {
  if (options && options[componentName]) {
    return extractPropsFromComponentSettings(options[componentName], component);
  }

  return undefined;
};


export { extractPropsFromLibrarySettings, extractPropsFromComponentSettings };
