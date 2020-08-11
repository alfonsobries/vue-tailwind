import { CreateElement, VNode } from 'vue';
import { english } from '@/l10n/default';
import TDropdown from '@/components/TDropdown';
import {
  createDateFormatter, createDateParser, DateParser, DateValue,
} from '@/utils/dates';
import HtmlInput from '@/base/HtmlInput';
import TDatepickerTrigger from './TDatepicker/TDatepickerTriggerInput';
import TDatePickerViews from './TDatepicker/TDatePickerViews';
import { CalendarView } from './TDatepicker/TDatepickerNavigator';

const TDatepicker = HtmlInput.extend({
  name: 'TDatepicker',
  props: {
    value: {
      type: [Date, String, Number, Array],
      default: null,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    weekStart: {
      type: Number,
      default: 0,
    },
    monthsPerView: {
      type: Number,
      default: 1,
      validator(value) {
        return value >= 1;
      },
    },
    locale: {
      type: String,
      default: 'en',
    },
    dateFormat: {
      type: String,
      default: 'Y-m-d',
    },
    userFormat: {
      type: String,
      default: 'F j, Y',
    },
    dateFormatter: {
      type: Function,
      default: createDateFormatter({ l10n: english }),
    },
    dateParser: {
      type: Function,
      default: createDateParser({ l10n: english }),
    },
    initialView: {
      type: String,
      default: CalendarView.Day,
      validator(value: CalendarView) {
        return [CalendarView.Day, CalendarView.Month, CalendarView.Year].includes(value);
      },
    },
    fixedClasses: {
      type: Object,
      default: () => ({
        day: 'text-sm rounded-full w-8 h-8 hover:bg-blue-100',
        selectedDay: 'text-sm rounded-full bg-gray-200 w-8 h-8 bg-blue-500 text-white',
        disabledDay: 'text-sm rounded-full w-8 h-8 opacity-25 cursor-not-allowed',
        otherMonthDay: 'text-sm rounded-full w-8 h-8 hover:bg-blue-100 text-gray-400',
        weekDayWrapper: 'grid gap-1 grid-cols-7',
        weekDay: 'uppercase text-xs text-gray-600 w-8 h-8 flex items-center justify-center',
      }),
    },
  },

  data() {
    const dateParser = this.dateParser as DateParser;
    const localValue = dateParser(this.value as DateValue, this.dateFormat);
    // Used to show the selected month/year
    const activeDate: Date = localValue || new Date();

    return {
      localValue,
      activeDate,
    };
  },

  watch: {
    localValue(localValue: DateValue) {
      this.$emit('input', new Date(localValue.valueOf()));
      // eslint-disable-next-line no-restricted-globals
      if (localValue instanceof Date && !isNaN(localValue.getTime())) {
        this.activeDate = new Date(localValue.valueOf());
      }
    },
  },

  methods: {
    inputHandler(newDate: Date): void {
      this.localValue = new Date(newDate.valueOf());
    },
    activDateInputHandler(newDate: Date): void {
      this.activeDate = new Date(newDate.valueOf());
    },
  },

  render(createElement: CreateElement): VNode {
    const subElements: VNode[] = [];

    subElements.push(createElement(
      TDatePickerViews,
      {
        props: {
          value: this.localValue,
          activeDate: this.activeDate,
          weekStart: this.weekStart,
          monthsPerView: this.monthsPerView,
          locale: this.locale,
          getElementCssClass: this.getElementCssClass,
          dateFormatter: this.dateFormatter,
          initialView: this.initialView,
        },
        on: {
          input: (day: Date) => {
            this.localValue = day;
          },
        },
      },
    ));


    return createElement(
      TDropdown,
      {
        props: {
          show: true,
          classes: {
            button: 'p-3',
            wrapper: 'inline-flex flex-col',
            dropdownWrapper: 'relative z-10',
            dropdown: 'origin-top-left absolute rounded-md shadow-lg bg-white',
            enterClass: '',
            enterActiveClass: 'transition ease-out duration-100 transform opacity-0 scale-95',
            enterToClass: 'transform opacity-100 scale-100',
            leaveClass: 'transition ease-in transform opacity-100 scale-100',
            leaveActiveClass: '',
            leaveToClass: 'transform opacity-0 scale-95 duration-75',
          },
        },
        scopedSlots: {
          trigger: (props) => createElement(
            TDatepickerTrigger,
            {
              props: {
                id: this.id,
                name: this.name,
                disabled: this.disabled,
                autofocus: this.autofocus,
                required: this.required,
                placeholder: this.placeholder,
                value: this.localValue,
                dateFormatter: this.dateFormatter,
                userFormat: this.userFormat,
                dateFormat: this.dateFormat,
                show: props.show,
                hideIfFocusOutside: props.hideIfFocusOutside,
              },
            },
          ),
        },
      },
      subElements,
    );
  },
});

export default TDatepicker;
