/* Slovenian locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Slovenian: CustomLocale = {
  weekdays: {
    shorthand: ['Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob'],
    longhand: [
      'Nedelja',
      'Ponedeljek',
      'Torek',
      'Sreda',
      'Četrtek',
      'Petek',
      'Sobota',
    ],
  },

  months: {
    shorthand: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Maj',
      'Jun',
      'Jul',
      'Avg',
      'Sep',
      'Okt',
      'Nov',
      'Dec',
    ],
    longhand: [
      'Januar',
      'Februar',
      'Marec',
      'April',
      'Maj',
      'Junij',
      'Julij',
      'Avgust',
      'September',
      'Oktober',
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

export default Slovenian;
