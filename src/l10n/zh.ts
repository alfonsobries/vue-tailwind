/* Mandarin locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Mandarin: CustomLocale = {
  weekdays: {
    shorthand: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    longhand: [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
    ],
  },

  months: {
    shorthand: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
    longhand: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
  },

  rangeSeparator: ' 至 ',
  weekAbbreviation: '周',
};

export default Mandarin;
