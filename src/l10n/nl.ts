/* Dutch locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Dutch: CustomLocale = {
  weekdays: {
    shorthand: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
    longhand: [
      'zondag',
      'maandag',
      'dinsdag',
      'woensdag',
      'donderdag',
      'vrijdag',
      'zaterdag',
    ],
  },

  months: {
    shorthand: [
      'jan',
      'feb',
      'mrt',
      'apr',
      'mei',
      'jun',
      'jul',
      'aug',
      'sept',
      'okt',
      'nov',
      'dec',
    ],
    longhand: [
      'januari',
      'februari',
      'maart',
      'april',
      'mei',
      'juni',
      'juli',
      'augustus',
      'september',
      'oktober',
      'november',
      'december',
    ],
  },

  firstDayOfWeek: 1,
  weekAbbreviation: 'wk',
  rangeSeparator: ' t/m ',
  time24hr: true,

  ordinal: (nth) => {
    if (nth === 1 || nth === 8 || nth >= 20) return 'ste';

    return 'de';
  },
};

export default Dutch;
