/* Hungarian locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Hungarian: CustomLocale = {
  firstDayOfWeek: 1,

  weekdays: {
    shorthand: ['V', 'H', 'K', 'Sz', 'Cs', 'P', 'Szo'],
    longhand: [
      'Vasárnap',
      'Hétfő',
      'Kedd',
      'Szerda',
      'Csütörtök',
      'Péntek',
      'Szombat',
    ],
  },

  months: {
    shorthand: [
      'Jan',
      'Feb',
      'Már',
      'Ápr',
      'Máj',
      'Jún',
      'Júl',
      'Aug',
      'Szep',
      'Okt',
      'Nov',
      'Dec',
    ],
    longhand: [
      'Január',
      'Február',
      'Március',
      'Április',
      'Május',
      'Június',
      'Július',
      'Augusztus',
      'Szeptember',
      'Október',
      'November',
      'December',
    ],
  },

  ordinal() {
    return '.';
  },

  weekAbbreviation: 'Hét',
  rangeSeparator: ' - ',
  time24hr: true,
};

export default Hungarian;
