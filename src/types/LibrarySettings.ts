import ComponentSettings from './ComponentSettings';

type LibrarySettings = {
  [key: string]: ComponentSettings;
} | undefined;

export default LibrarySettings;
