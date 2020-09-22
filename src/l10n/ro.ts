/* Romanian locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Romanian: CustomLocale = {
  weekdays: {
    shorthand: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
    longhand: [
      'Duminică',
      'Luni',
      'Marți',
      'Miercuri',
      'Joi',
      'Vineri',
      'Sâmbătă',
    ],
  },

  months: {
    shorthand: [
      'Ian',
      'Feb',
      'Mar',
      'Apr',
      'Mai',
      'Iun',
      'Iul',
      'Aug',
      'Sep',
      'Oct',
      'Noi',
      'Dec',
    ],
    longhand: [
      'Ianuarie',
      'Februarie',
      'Martie',
      'Aprilie',
      'Mai',
      'Iunie',
      'Iulie',
      'August',
      'Septembrie',
      'Octombrie',
      'Noiembrie',
      'Decembrie',
    ],
  },

  firstDayOfWeek: 1,
  time24hr: true,

  ordinal: () => '',
};

export default Romanian;
