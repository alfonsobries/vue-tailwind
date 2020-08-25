/* Belarusian locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Belarusian: CustomLocale = {
  weekdays: {
    shorthand: ['Нд', 'Пн', 'Аў', 'Ср', 'Чц', 'Пт', 'Сб'],
    longhand: [
      'Нядзеля',
      'Панядзелак',
      'Аўторак',
      'Серада',
      'Чацвер',
      'Пятніца',
      'Субота',
    ],
  },
  months: {
    shorthand: [
      'Сту',
      'Лют',
      'Сак',
      'Кра',
      'Тра',
      'Чэр',
      'Ліп',
      'Жні',
      'Вер',
      'Кас',
      'Ліс',
      'Сне',
    ],
    longhand: [
      'Студзень',
      'Люты',
      'Сакавік',
      'Красавік',
      'Травень',
      'Чэрвень',
      'Ліпень',
      'Жнівень',
      'Верасень',
      'Кастрычнік',
      'Лістапад',
      'Снежань',
    ],
  },
  firstDayOfWeek: 1,
  ordinal() {
    return '';
  },
  rangeSeparator: ' — ',
  weekAbbreviation: 'Тыд.',
  amPM: ['ДП', 'ПП'],
  yearAriaLabel: 'Год',
  time24hr: true,
};

export default Belarusian;
