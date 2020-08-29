/* Farsi (Persian) locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Persian: CustomLocale = {
  weekdays: {
    shorthand: ['یک', 'دو', 'سه', 'چهار', 'پنج', 'جمعه', 'شنبه'],
    longhand: [
      'یک‌شنبه',
      'دوشنبه',
      'سه‌شنبه',
      'چهارشنبه',
      'پنچ‌شنبه',
      'جمعه',
      'شنبه',
    ],
  },

  months: {
    shorthand: [
      'ژانویه',
      'فوریه',
      'مارس',
      'آوریل',
      'مه',
      'ژوئن',
      'ژوئیه',
      'اوت',
      'سپتامبر',
      'اکتبر',
      'نوامبر',
      'دسامبر',
    ],
    longhand: [
      'ژانویه',
      'فوریه',
      'مارس',
      'آوریل',
      'مه',
      'ژوئن',
      'ژوئیه',
      'اوت',
      'سپتامبر',
      'اکتبر',
      'نوامبر',
      'دسامبر',
    ],
  },
  firstDayOfWeek: 6,
  ordinal: () => '',
};

export default Persian;
