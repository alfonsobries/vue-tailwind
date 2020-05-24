import ComponentVariants from './ComponentVariants';
import CssClasses from './CssClasses';

type ComponentSettings = {
  variants?: ComponentVariants;
  classes?: CssClasses;
  wrapped?: boolean;
} | undefined

export default ComponentSettings;
