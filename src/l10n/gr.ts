/* Greek locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Greek: CustomLocale = {
  weekdays: {
    shorthand: ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πέ', 'Πα', 'Σά'],
    longhand: [
      'Κυριακή',
      'Δευτέρα',
      'Τρίτη',
      'Τετάρτη',
      'Πέμπτη',
      'Παρασκευή',
      'Σάββατο',
    ],
  },

  months: {
    shorthand: [
      'Ιαν',
      'Φεβ',
      'Μάρ',
      'Απρ',
      'Μάι',
      'Ιού',
      'Ιού',
      'Αύγ',
      'Σεπ',
      'Οκτ',
      'Νοέ',
      'Δεκ',
    ],
    longhand: [
      'Ιανουάριος',
      'Φεβρουάριος',
      'Μάρτιος',
      'Απρίλιος',
      'Μάιος',
      'Ιούνιος',
      'Ιούλιος',
      'Αύγουστος',
      'Σεπτέμβριος',
      'Οκτώβριος',
      'Νοέμβριος',
      'Δεκέμβριος',
    ],
  },

  firstDayOfWeek: 1,

  ordinal() {
    return '';
  },

  weekAbbreviation: 'Εβδ',
  rangeSeparator: ' έως ',

  amPM: ['ΠΜ', 'ΜΜ'],
};

export default Greek;
