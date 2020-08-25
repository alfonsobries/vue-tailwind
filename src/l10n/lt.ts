/* Lithuanian locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Lithuanian: CustomLocale = {
  weekdays: {
    shorthand: ['S', 'Pr', 'A', 'T', 'K', 'Pn', 'Š'],
    longhand: [
      'Sekmadienis',
      'Pirmadienis',
      'Antradienis',
      'Trečiadienis',
      'Ketvirtadienis',
      'Penktadienis',
      'Šeštadienis',
    ],
  },

  months: {
    shorthand: [
      'Sau',
      'Vas',
      'Kov',
      'Bal',
      'Geg',
      'Bir',
      'Lie',
      'Rgp',
      'Rgs',
      'Spl',
      'Lap',
      'Grd',
    ],
    longhand: [
      'Sausis',
      'Vasaris',
      'Kovas',
      'Balandis',
      'Gegužė',
      'Birželis',
      'Liepa',
      'Rugpjūtis',
      'Rugsėjis',
      'Spalis',
      'Lapkritis',
      'Gruodis',
    ],
  },

  firstDayOfWeek: 1,

  ordinal() {
    return '-a';
  },
  rangeSeparator: ' iki ',
  weekAbbreviation: 'Sav',
  time24hr: true,
};

export default Lithuanian;
