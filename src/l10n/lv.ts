/* Latvian locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Latvian: CustomLocale = {
  firstDayOfWeek: 1,

  weekdays: {
    shorthand: ['Sv', 'Pr', 'Ot', 'Tr', 'Ce', 'Pk', 'Se'],
    longhand: [
      'Svētdiena',
      'Pirmdiena',
      'Otrdiena',
      'Trešdiena',
      'Ceturtdiena',
      'Piektdiena',
      'Sestdiena',
    ],
  },

  months: {
    shorthand: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mai',
      'Jūn',
      'Jūl',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dec',
    ],
    longhand: [
      'Janvāris',
      'Februāris',
      'Marts',
      'Aprīlis',
      'Maijs',
      'Jūnijs',
      'Jūlijs',
      'Augusts',
      'Septembris',
      'Oktobris',
      'Novembris',
      'Decembris',
    ],
  },

  rangeSeparator: ' līdz ',
  time24hr: true,
};

export default Latvian;
