/* Esperanto locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Esperanto: CustomLocale = {
  firstDayOfWeek: 1,

  rangeSeparator: ' ĝis ',
  weekAbbreviation: 'Sem',

  weekdays: {
    shorthand: ['Dim', 'Lun', 'Mar', 'Mer', 'Ĵaŭ', 'Ven', 'Sab'],
    longhand: [
      'dimanĉo',
      'lundo',
      'mardo',
      'merkredo',
      'ĵaŭdo',
      'vendredo',
      'sabato',
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
      'Aŭg',
      'Sep',
      'Okt',
      'Nov',
      'Dec',
    ],
    longhand: [
      'januaro',
      'februaro',
      'marto',
      'aprilo',
      'majo',
      'junio',
      'julio',
      'aŭgusto',
      'septembro',
      'oktobro',
      'novembro',
      'decembro',
    ],
  },

  ordinal: () => '-a',
  time24hr: true,
};

export default Esperanto;
