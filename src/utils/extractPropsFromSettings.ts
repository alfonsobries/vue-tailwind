import CssClasses from '@/types/CssClasses';
import LibrarySettings from '@/types/LibrarySettings';
import CustomProps from '@/types/CustomProps';
import ComponentSettings from '@/types/ComponentSettings';

// eslint-disable-next-line max-len
const extractPropsFromComponentSettings = function extractPropsFromComponentSettings(args: ComponentSettings): CustomProps {
  const compnentVariants: CssClasses = args && args.variants ? args.variants : undefined;
  const componentClasses: CssClasses = args && args.classes ? args.classes : undefined;
  const componentFixedClasses: CssClasses = args && args.fixedClasses ? args.fixedClasses : undefined;
  const wrapped: boolean | undefined = args && args.wrapped ? args.wrapped : undefined;

  const customProps: CustomProps = {};

  if (componentFixedClasses !== undefined) {
    customProps.fixedClasses = {
      type: [String, Array, Object],
      default: () => componentFixedClasses,
    };
  }

  if (componentClasses !== undefined) {
    customProps.variants = {
      type: Object,
      default: () => compnentVariants,
    };
  }

  if (componentClasses !== undefined) {
    customProps.classes = {
      type: [String, Array, Object],
      default: () => componentClasses,
    };
  }

  if (typeof wrapped !== undefined) {
    customProps.wrapped = {
      type: Boolean,
      default: wrapped,
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
    return extractPropsFromComponentSettings(args[componentName]);
  }

  return undefined;
};


export { extractPropsFromLibrarySettings, extractPropsFromComponentSettings };
