/* Swedish locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Swedish: CustomLocale = {
  firstDayOfWeek: 1,
  weekAbbreviation: 'v',

  weekdays: {
    shorthand: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
    longhand: [
      'Söndag',
      'Måndag',
      'Tisdag',
      'Onsdag',
      'Torsdag',
      'Fredag',
      'Lördag',
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
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dec',
    ],
    longhand: [
      'Januari',
      'Februari',
      'Mars',
      'April',
      'Maj',
      'Juni',
      'Juli',
      'Augusti',
      'September',
      'Oktober',
      'November',
      'December',
    ],
  },
  time24hr: true,

  ordinal: () => '.',
};

export default Swedish;
