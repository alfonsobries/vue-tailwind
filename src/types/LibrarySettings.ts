import ComponentSettings from './ComponentSettings';

type LibrarySettings = {
  [k: string]: ComponentSettings;
} | undefined;

export default LibrarySettings;
