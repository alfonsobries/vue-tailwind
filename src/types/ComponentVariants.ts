import CssClasses from './CssClasses';
import ComponentName from './ComponentName';

type ComponentVariants = {
  [key in ComponentName]: CssClasses;
}

export default ComponentVariants;
