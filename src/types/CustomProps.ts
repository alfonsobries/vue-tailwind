import ComponentVariants from './ComponentVariants';
import CssClasses from './CssClasses';

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

type CustomProps = {
  variants?: VariantProp
  fixedClasses?: ClassesProp
  classes?: ClassesProp
  wrapped?: BooleanProp;
} | undefined

export default CustomProps;
