import ComponentTheme from './ComponentTheme';
import CssClasses from './CssClasses';

type ComponentSettings = {
  theme?: ComponentTheme;
  classes?: CssClasses;
  wrapped?: boolean;
} | undefined

export default ComponentSettings;
