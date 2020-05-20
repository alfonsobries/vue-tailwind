import ComponentTheme from './ComponentTheme';
import CssClasses from './CssClasses';

type ComponentSettings = {
  theme?: ComponentTheme;
  classes?: CssClasses;
} | undefined

export default ComponentSettings;
