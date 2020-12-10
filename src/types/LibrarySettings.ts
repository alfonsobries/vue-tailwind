import ComponentSettings, { VTComponent } from './ComponentSettings';

type LibrarySettings = {
  [key: string]: ComponentSettings | VTComponent;
} | undefined;

export default LibrarySettings;
