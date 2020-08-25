/* Khmer locals for vue-tailwind */
import { CustomLocale } from '../types/locale';

export const Khmer: CustomLocale = {
  weekdays: {
    shorthand: ['អាទិត្យ', 'ចន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស.', 'សុក្រ', 'សៅរ៍'],
    longhand: [
      'អាទិត្យ',
      'ចន្ទ',
      'អង្គារ',
      'ពុធ',
      'ព្រហស្បតិ៍',
      'សុក្រ',
      'សៅរ៍',
    ],
  },
  months: {
    shorthand: [
      'មករា',
      'កុម្ភះ',
      'មីនា',
      'មេសា',
      'ឧសភា',
      'មិថុនា',
      'កក្កដា',
      'សីហា',
      'កញ្ញា',
      'តុលា',
      'វិច្ឆិកា',
      'ធ្នូ',
    ],
    longhand: [
      'មករា',
      'កុម្ភះ',
      'មីនា',
      'មេសា',
      'ឧសភា',
      'មិថុនា',
      'កក្កដា',
      'សីហា',
      'កញ្ញា',
      'តុលា',
      'វិច្ឆិកា',
      'ធ្នូ',
    ],
  },
  ordinal: () => '',
  firstDayOfWeek: 1,
  rangeSeparator: ' ដល់ ',
  weekAbbreviation: 'សប្តាហ៍',
  yearAriaLabel: 'ឆ្នាំ',
  time24hr: true,
};

export default Khmer;
