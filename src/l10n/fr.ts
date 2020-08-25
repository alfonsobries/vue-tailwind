/* French locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const French: CustomLocale = {
  firstDayOfWeek: 1,

  weekdays: {
    shorthand: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
    longhand: [
      'dimanche',
      'lundi',
      'mardi',
      'mercredi',
      'jeudi',
      'vendredi',
      'samedi',
    ],
  },

  months: {
    shorthand: [
      'janv',
      'févr',
      'mars',
      'avr',
      'mai',
      'juin',
      'juil',
      'août',
      'sept',
      'oct',
      'nov',
      'déc',
    ],
    longhand: [
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ],
  },

  ordinal: (nth) => {
    if (nth > 1) return '';

    return 'er';
  },
  rangeSeparator: ' au ',
  weekAbbreviation: 'Sem',
  time24hr: true,
};

export default French;
