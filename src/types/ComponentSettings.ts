import ComponentVariants from './ComponentVariants';
import CssClasses from './CssClasses';
import { CustomLocale } from './locale';

type ComponentSettings = {
  variants?: ComponentVariants;
  classes?: CssClasses;
  fixedClasses?: CssClasses;
  wrapped?: boolean;
  locales?: CustomLocale[];
} | undefined

export default ComponentSettings;
