import ComponentVariants from './ComponentVariants';
import CssClasses from './CssClasses';
import { Locales, LocaleName, Locale } from './locale';

type ComponentSettings = {
  variants?: ComponentVariants;
  classes?: CssClasses;
  fixedClasses?: CssClasses;
  wrapped?: boolean;
  locales?: Locales
  locale?: Locale
  lang?: LocaleName
} | undefined

export default ComponentSettings;
