/* Slovak locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Slovak: CustomLocale = {
  weekdays: {
    shorthand: ['Ned', 'Pon', 'Ut', 'Str', 'Štv', 'Pia', 'Sob'],
    longhand: [
      'Nedeľa',
      'Pondelok',
      'Utorok',
      'Streda',
      'Štvrtok',
      'Piatok',
      'Sobota',
    ],
  },

  months: {
    shorthand: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Máj',
      'Jún',
      'Júl',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dec',
    ],
    longhand: [
      'Január',
      'Február',
      'Marec',
      'Apríl',
      'Máj',
      'Jún',
      'Júl',
      'August',
      'September',
      'Október',
      'November',
      'December',
    ],
  },

  firstDayOfWeek: 1,
  rangeSeparator: ' do ',
  time24hr: true,
  ordinal() {
    return '.';
  },
};

export default Slovak;
