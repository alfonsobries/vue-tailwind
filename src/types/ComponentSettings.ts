import ComponentVariants from './ComponentVariants';
import CssClasses from './CssClasses';
import { Locales, LocaleName } from './locale';

type ComponentSettings = {
  variants?: ComponentVariants;
  classes?: CssClasses;
  fixedClasses?: CssClasses;
  wrapped?: boolean;
  locales?: Locales
  lang?: LocaleName
} | undefined

export default ComponentSettings;
