import CssClasses from '@/types/CssClasses';
import LibrarySettings from '@/types/LibrarySettings';
import CustomProps from '@/types/CustomProps';
import ComponentSettings from '@/types/ComponentSettings';

// eslint-disable-next-line max-len
const extractPropsFromComponentSettings = function extractPropsFromComponentSettings(args: ComponentSettings): CustomProps {
  const componentTheme: CssClasses = args && args.theme ? args.theme : {};
  const componentClasses: CssClasses = args && args.classes ? args.classes : {};

  const customProps: CustomProps = {};

  if (componentTheme) {
    customProps.theme = {
      type: Object,
      default: () => componentTheme,
    };
  }

  if (componentClasses) {
    customProps.classes = {
      type: [String, Array, Object],
      default: () => componentClasses,
    };
  }

  if (Object.keys(customProps).length) {
    return customProps;
  }

  return undefined;
};

// eslint-disable-next-line max-len
const extractPropsFromLibrarySettings = function extractPropsFromSettings(args: LibrarySettings, componentName: string): CustomProps {
  if (args && args[componentName]) {
    console.log(componentName);
    return extractPropsFromComponentSettings(args[componentName]);
  }

  return undefined;
};


export { extractPropsFromLibrarySettings, extractPropsFromComponentSettings };
