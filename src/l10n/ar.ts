/* Arabic locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Arabic: CustomLocale = {
  weekdays: {
    shorthand: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
    longhand: [
      'الأحد',
      'الاثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
      'السبت',
    ],
  },

  months: {
    shorthand: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    longhand: [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ],
  },

  rangeSeparator: ' - ',
};

export default Arabic;
