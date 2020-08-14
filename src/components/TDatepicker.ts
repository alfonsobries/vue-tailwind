import { CreateElement, VNode } from 'vue';
import { english } from '@/l10n/default';
import TDropdown from '@/components/TDropdown';
import {
  createDateFormatter, createDateParser, DateParser, DateFormatter, DateValue, compareDates,
} from '@/utils/dates';
import HtmlInput from '@/base/HtmlInput';
import Key from '@/types/Key';
import TDatepickerTrigger from './TDatepicker/TDatepickerTriggerInput';
import TDatePickerViews from './TDatepicker/TDatePickerViews';
import { CalendarView } from './TDatepicker/TDatepickerNavigator';

interface Dropdown extends Vue {
  doToggle(): void
  doHide(): void
  doShow(): void
  escapeHandler(e: KeyboardEvent): void
}

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
    closeOnSelect: {
      type: Boolean,
      default: true,
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
    yearsPerView: {
      type: Number,
      default: 12,
    },
    fixedClasses: {
      type: Object,
      default: () => ({
        day: 'text-sm rounded-full w-8 h-8 hover:bg-blue-100',
        activeDay: 'text-sm rounded-full bg-gray-200 w-8 h-8',
        selectedDay: 'text-sm rounded-full w-8 h-8 bg-blue-500 text-white',
        disabledDay: 'text-sm rounded-full w-8 h-8 opacity-25 cursor-not-allowed',
        otherMonthDay: 'text-sm rounded-full w-8 h-8 hover:bg-blue-100 text-gray-400',
        month: 'text-sm rounded w-full h-12 mx-auto hover:bg-blue-100',
        selectedMonth: 'text-sm rounded w-full h-12 mx-auto bg-blue-500 text-white',
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
      shown: false,
      showActiveDate: false,
    };
  },

  computed: {
    visibleRange(): [Date, Date] {
      const start = new Date(this.activeDate.valueOf());
      const end = new Date(this.activeDate.valueOf());
      start.setDate(1);
      end.setMonth(end.getMonth() + this.monthsPerView, 0);

      return [start, end];
    },
    currentValueIsInTheView(): boolean {
      // eslint-disable-next-line no-restricted-globals
      if (this.localValue instanceof Date && !isNaN(this.localValue.getTime())) {
        const [start, end] = this.visibleRange;
        return compareDates(end, this.localValue) >= 0 && compareDates(this.localValue, start) >= 0;
      }

      return true;
    },
  },

  watch: {
    localValue(localValue: DateValue) {
      const dateformatter = this.dateFormatter as DateFormatter;
      this.$emit('input', dateformatter(localValue as Date, this.dateFormat));


      if (this.monthsPerView === 1 || !this.currentValueIsInTheView) {
        this.activeDate = new Date(localValue.valueOf());
      }
    },
    value(value: DateValue) {
      const dateParser = this.dateParser as DateParser;
      this.localValue = dateParser(value, this.dateFormat);
    },
  },

  methods: {
    focus(options?: FocusOptions | undefined) : void | never {
      const wrapper = this.$el as HTMLDivElement;
      const input: HTMLInputElement | null = wrapper.querySelector('input[type=text]');
      if (!input) {
        throw new Error('Input not found');
      }

      input.focus(options);
    },
    hide(): void {
      this.getDropdown().doHide();
    },
    show(): void {
      this.getDropdown().doShow();
    },
    toggle(): void {
      this.getDropdown().doToggle();
    },
    arrowKeyHandler(e: KeyboardEvent): void {
      e.preventDefault();

      this.showActiveDate = true;

      if (!this.shown) {
        this.show();
        return;
      }

      let days = 0;

      if (e.keyCode === Key.DOWN) {
        days = 7;
      } else if (e.keyCode === Key.LEFT) {
        days = -1;
      } else if (e.keyCode === Key.UP) {
        days = -7;
      } else if (e.keyCode === Key.RIGHT) {
        days = 1;
      }

      const newActiveDate = new Date(this.activeDate.valueOf());
      newActiveDate.setDate(this.activeDate.getDate() + days);
      this.activeDate = newActiveDate;
    },
    inputHandler(newDate: Date): void {
      this.localValue = new Date(newDate.valueOf());
      this.focus();
      this.resetActiveDate();

      if (this.closeOnSelect) {
        this.hide();
      }
    },
    inputActiveDateHandler(newDate: Date): void {
      this.activeDate = new Date(newDate.valueOf());
      this.focus();
    },

    enterHandler(e: KeyboardEvent): void {
      e.preventDefault();

      if (this.showActiveDate) {
        this.inputHandler(new Date(this.activeDate.valueOf()));
      }
    },
    escapeHandler(e: KeyboardEvent): void {
      e.preventDefault();

      this.getDropdown().escapeHandler(e);
    },
    spaceHandler(e: KeyboardEvent): void {
      e.preventDefault();

      this.toggle();
    },

    getDropdown(): Dropdown {
      return this.$refs.dropdown as Dropdown;
    },
    resetActiveDate() {
      this.showActiveDate = false;
      this.activeDate = this.localValue ? new Date(this.localValue.valueOf()) : new Date();
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      TDropdown,
      {
        ref: 'dropdown',
        props: {
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
        on: {
          hidden: () => {
            this.shown = false;
            this.resetActiveDate();
          },
          shown: () => {
            this.shown = true;
          },
        },
        scopedSlots: {
          trigger: (props) => createElement(
            TDatepickerTrigger,
            {
              ref: 'trigger',
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
                closeOnSelect: this.closeOnSelect,
                toggle: props.toggle,
                show: props.show,
                hideIfFocusOutside: props.hideIfFocusOutside,
              },
              on: {
                keydown: (e: KeyboardEvent) => {
                  if ([Key.LEFT, Key.UP, Key.RIGHT, Key.DOWN].includes(e.keyCode)) {
                    this.arrowKeyHandler(e);
                  } else if (e.keyCode === Key.ENTER) {
                    this.enterHandler(e);
                  } else if (e.keyCode === Key.ESC) {
                    this.escapeHandler(e);
                  } else if (e.keyCode === Key.SPACE) {
                    this.spaceHandler(e);
                  }

                  this.$emit('keydown', e);
                },
              },
            },
          ),
        },
      },
      [
        createElement(
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
              yearsPerView: this.yearsPerView,
              showActiveDate: this.showActiveDate,
              focus: this.focus,
            },
            on: {
              input: this.inputHandler,
              inputActiveDate: this.inputActiveDateHandler,
            },
          },
        ),
      ],
    );
  },
});

export default TDatepicker;
