import { CreateElement, VNode } from 'vue';
import { english } from '@/l10n/default';
import TDropdown from '@/components/TDropdown';
import {
  createDateFormatter, createDateParser, DateParser, DateValue,
} from '@/utils/dates';
import HtmlInput from '@/base/HtmlInput';
import TDatepickerTrigger from './TDatepicker/TDatepickerTriggerInput';
import TDatepickerNavigator from './TDatepicker/TDatepickerNavigator';
import TDatePickerMonth from './TDatepicker/TDatePickerMonth';

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
    return createElement(
      TDropdown,
      {
        props: {
          show: true,
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
      [
        createElement(
          TDatepickerNavigator,
          {
            props: {
              value: this.activeDate,
              dateFormatter: this.dateFormatter,
              getElementCssClass: this.getElementCssClass,
            },
            on: {
              input: this.activDateInputHandler,
            },
          },
        ),
        createElement(
          TDatePickerMonth,
          {
            props: {
              value: this.localValue,
              activeDate: this.activeDate,
              weekStart: this.weekStart,
              locale: this.locale,
              getElementCssClass: this.getElementCssClass,
              dateFormatter: this.dateFormatter,
            },
            on: {
              input: (day: Date) => {
                this.localValue = day;
              },
            },
          },
        ),
      ],
    );
  },
});

export default TDatepicker;
