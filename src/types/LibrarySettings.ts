import ComponentSettings from './ComponentSettings';
import ComponentName from './ComponentName';

type LibrarySettings = {
  [key in ComponentName]: ComponentSettings;
} | undefined;

export default LibrarySettings;
