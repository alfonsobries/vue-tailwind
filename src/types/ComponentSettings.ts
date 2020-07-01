import ComponentVariants from './ComponentVariants';
import CssClasses from './CssClasses';

type ComponentSettings = {
  variants?: ComponentVariants;
  classes?: CssClasses;
  fixedClasses?: CssClasses;
  wrapped?: boolean;
} | undefined

export default ComponentSettings;
