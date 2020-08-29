/* Japanese locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Japanese: CustomLocale = {
  weekdays: {
    shorthand: ['日', '月', '火', '水', '木', '金', '土'],
    longhand: [
      '日曜日',
      '月曜日',
      '火曜日',
      '水曜日',
      '木曜日',
      '金曜日',
      '土曜日',
    ],
  },

  months: {
    shorthand: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    longhand: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
  },
  time24hr: true,
  rangeSeparator: ' から ',
  firstDayOfWeek: 1,
};

export default Japanese;
