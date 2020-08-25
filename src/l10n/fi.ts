/* Finnish locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Finnish: CustomLocale = {
  firstDayOfWeek: 1,

  weekdays: {
    shorthand: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
    longhand: [
      'Sunnuntai',
      'Maanantai',
      'Tiistai',
      'Keskiviikko',
      'Torstai',
      'Perjantai',
      'Lauantai',
    ],
  },

  months: {
    shorthand: [
      'Tammi',
      'Helmi',
      'Maalis',
      'Huhti',
      'Touko',
      'Kesä',
      'Heinä',
      'Elo',
      'Syys',
      'Loka',
      'Marras',
      'Joulu',
    ],
    longhand: [
      'Tammikuu',
      'Helmikuu',
      'Maaliskuu',
      'Huhtikuu',
      'Toukokuu',
      'Kesäkuu',
      'Heinäkuu',
      'Elokuu',
      'Syyskuu',
      'Lokakuu',
      'Marraskuu',
      'Joulukuu',
    ],
  },

  ordinal: () => '.',
  time24hr: true,
};

export default Finnish;
