/* Serbian Cyrillic locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const SerbianCyrillic: CustomLocale = {
  weekdays: {
    shorthand: ['Нед', 'Пон', 'Уто', 'Сре', 'Чет', 'Пет', 'Суб'],
    longhand: [
      'Недеља',
      'Понедељак',
      'Уторак',
      'Среда',
      'Четвртак',
      'Петак',
      'Субота',
    ],
  },

  months: {
    shorthand: [
      'Јан',
      'Феб',
      'Мар',
      'Апр',
      'Мај',
      'Јун',
      'Јул',
      'Авг',
      'Сеп',
      'Окт',
      'Нов',
      'Дец',
    ],
    longhand: [
      'Јануар',
      'Фебруар',
      'Март',
      'Април',
      'Мај',
      'Јун',
      'Јул',
      'Август',
      'Септембар',
      'Октобар',
      'Новембар',
      'Децембар',
    ],
  },

  firstDayOfWeek: 1,
  weekAbbreviation: 'Нед.',
  rangeSeparator: ' до ',
};

export default SerbianCyrillic;
