/* Uzbek locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Uzbek: CustomLocale = {
  weekdays: {
    shorthand: ['Якш', 'Душ', 'Сеш', 'Чор', 'Пай', 'Жум', 'Шан'],
    longhand: [
      'Якшанба',
      'Душанба',
      'Сешанба',
      'Чоршанба',
      'Пайшанба',
      'Жума',
      'Шанба',
    ],
  },
  months: {
    shorthand: [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Июн',
      'Июл',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек',
    ],
    longhand: [
      'Январ',
      'Феврал',
      'Март',
      'Апрел',
      'Май',
      'Июн',
      'Июл',
      'Август',
      'Сентябр',
      'Октябр',
      'Ноябр',
      'Декабр',
    ],
  },
  firstDayOfWeek: 1,
  ordinal() {
    return '';
  },
  rangeSeparator: ' — ',
  weekAbbreviation: 'Ҳафта',
  amPM: ['AM', 'PM'],
  yearAriaLabel: 'Йил',
  time24hr: true,
};

export default Uzbek;
