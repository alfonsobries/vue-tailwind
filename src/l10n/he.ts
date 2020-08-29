/* Hebrew locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Hebrew: CustomLocale = {
  weekdays: {
    shorthand: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'],
    longhand: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
  },

  months: {
    shorthand: [
      'ינו׳',
      'פבר׳',
      'מרץ',
      'אפר׳',
      'מאי',
      'יוני',
      'יולי',
      'אוג׳',
      'ספט׳',
      'אוק׳',
      'נוב׳',
      'דצמ׳',
    ],
    longhand: [
      'ינואר',
      'פברואר',
      'מרץ',
      'אפריל',
      'מאי',
      'יוני',
      'יולי',
      'אוגוסט',
      'ספטמבר',
      'אוקטובר',
      'נובמבר',
      'דצמבר',
    ],
  },
  rangeSeparator: ' אל ',
  time24hr: true,
};

export default Hebrew;
