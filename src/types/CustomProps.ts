import ComponentVariants from './ComponentVariants';
import CssClasses from './CssClasses';
import { Locales, LocaleName, Locale } from './locale';

interface VariantProp {
  type: ObjectConstructor;
  default: () => ComponentVariants | undefined;
}

interface ClassesProp {
  type: [StringConstructor, ArrayConstructor, ObjectConstructor];
  default: () => CssClasses | undefined;
}
interface BooleanProp {
  type: BooleanConstructor;
  default?: boolean;
}

interface LocalesProp {
  type: ObjectConstructor,
  default: () => Locales | undefined
}

interface LocaleProp {
  type: ObjectConstructor,
  default: () => Locale | undefined
}

interface LangProp {
  type: StringConstructor,
  default: LocaleName | undefined
}

type CustomProps = {
  variants?: VariantProp
  fixedClasses?: ClassesProp
  classes?: ClassesProp
  wrapped?: BooleanProp;
  locales?: LocalesProp;
  lang?: LangProp;
  locale?: LocaleProp;
} | undefined

export default CustomProps;
