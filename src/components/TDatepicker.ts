import { CreateElement, VNode } from 'vue';
import { english } from '@/l10n/default';
import TDropdown from '@/components/TDropdown';
import {
  createDateFormatter, createDateParser, DateFormatter, DateValue, compareDates, addDays, addMonths, addYears,
  DateConditions, dayIsPartOfTheConditions, DateParser, dateIsOutOfRange,
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
    dateParser: {
      type: Function,
      default: createDateParser({ l10n: english }),
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: false,
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
    disabledDates: {
      type: [Date, Array, Function, String],
      default: undefined,
    },
    maxDate: {
      type: [Date, String],
      default: undefined,
    },
    minDate: {
      type: [Date, String],
      default: undefined,
    },
    initialDate: {
      type: [Date, String],
      default: undefined,
    },
    fixedClasses: {
      type: Object,
      default: () => ({
        day: 'text-sm rounded-full w-8 h-8 hover:bg-blue-100',
        activeDay: 'text-sm rounded-full bg-blue-100 w-8 h-8',
        selectedDay: 'text-sm rounded-full w-8 h-8 bg-blue-500 text-white',
        disabledDay: 'text-sm rounded-full w-8 h-8 opacity-25 cursor-not-allowed',
        otherMonthDay: 'text-sm rounded-full w-8 h-8 hover:bg-blue-100 text-gray-400',
        month: 'text-sm rounded w-full h-12 mx-auto hover:bg-blue-100',
        selectedMonth: 'text-sm rounded w-full h-12 mx-auto bg-blue-500  text-white',
        activeMonth: 'text-sm rounded w-full h-12 mx-auto bg-blue-100',
        year: 'text-sm rounded w-full h-12 mx-auto hover:bg-blue-100',
        selectedYear: 'text-sm rounded w-full h-12 mx-auto bg-blue-500  text-white',
        activeYear: 'text-sm rounded w-full h-12 mx-auto bg-blue-100',
        weekDayWrapper: 'grid gap-1 grid-cols-7',
        weekDay: 'uppercase text-xs text-gray-600 w-8 h-8 flex items-center justify-center',
      }),
    },
  },

  data() {
    const dateParser = this.dateParser as DateParser;
    const localValue = dateParser(this.value as DateValue, this.dateFormat);

    const dateformatter = this.dateFormatter as DateFormatter;
    const formatedDate = dateformatter(localValue as Date, this.dateFormat);
    const userFormatedDate = dateformatter(localValue as Date, this.userFormat);

    // Used to show the selected month/year
    const activeDate: Date = localValue || dateParser(this.initialDate as DateValue, this.dateFormat) || new Date();
    const currentView: CalendarView = this.initialView as CalendarView;

    return {
      localValue,
      formatedDate,
      userFormatedDate,
      activeDate,
      shown: this.show,
      showActiveDate: false,
      currentView,
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
    showm(shown) {
      this.$emit('update:show', shown);
    },
    formatedDate(formatedDate) {
      this.$emit('input', formatedDate);
      this.$emit('change', formatedDate);
    },
    localValue(localValue: DateValue) {
      const dateformatter = this.dateFormatter as DateFormatter;

      this.formatedDate = dateformatter(localValue as Date, this.dateFormat);
      this.userFormatedDate = dateformatter(localValue as Date, this.userFormat);

      if (this.monthsPerView === 1 || !this.currentValueIsInTheView) {
        this.activeDate = localValue ? new Date(localValue.valueOf()) : new Date();
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
    doHide(): void {
      this.getDropdown().doHide();
    },
    doShow(): void {
      this.getDropdown().doShow();
    },
    toggle(): void {
      this.getDropdown().doToggle();
    },
    arrowKeyHandler(e: KeyboardEvent): void {
      e.preventDefault();

      this.showActiveDate = true;

      if (!this.shown) {
        this.doShow();
        return;
      }

      let newActiveDate: Date | undefined;

      if (this.currentView === CalendarView.Day) {
        if (e.keyCode === Key.DOWN) {
          newActiveDate = addDays(this.activeDate, 7);
        } else if (e.keyCode === Key.LEFT) {
          newActiveDate = addDays(this.activeDate, -1);
        } else if (e.keyCode === Key.UP) {
          newActiveDate = addDays(this.activeDate, -7);
        } else if (e.keyCode === Key.RIGHT) {
          newActiveDate = addDays(this.activeDate, 1);
        }
      } else if (this.currentView === CalendarView.Month) {
        if (e.keyCode === Key.DOWN) {
          newActiveDate = addMonths(this.activeDate, 4);
        } else if (e.keyCode === Key.LEFT) {
          newActiveDate = addMonths(this.activeDate, -1);
        } else if (e.keyCode === Key.UP) {
          newActiveDate = addMonths(this.activeDate, -4);
        } else if (e.keyCode === Key.RIGHT) {
          newActiveDate = addMonths(this.activeDate, 1);
        }
      } else if (this.currentView === CalendarView.Year) {
        if (e.keyCode === Key.DOWN) {
          newActiveDate = addYears(this.activeDate, 4);
        } else if (e.keyCode === Key.LEFT) {
          newActiveDate = addYears(this.activeDate, -1);
        } else if (e.keyCode === Key.UP) {
          newActiveDate = addYears(this.activeDate, -4);
        } else if (e.keyCode === Key.RIGHT) {
          newActiveDate = addYears(this.activeDate, 1);
        }
      }

      const dateParser: DateParser = this.dateParser as DateParser;
      if (newActiveDate && !dateIsOutOfRange(newActiveDate, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
        this.activeDate = newActiveDate;
      }
    },
    inputHandler(newDate: Date): void {
      const date = new Date(newDate.valueOf());
      const disabledDates: DateConditions = this.disabledDates as DateConditions;
      const dateParser: DateParser = this.dateParser as DateParser;
      if (
        dayIsPartOfTheConditions(date, disabledDates, dateParser, this.dateFormat)
          || dateIsOutOfRange(date, this.minDate, this.maxDate, dateParser, this.dateFormat)
      ) {
        return;
      }

      this.localValue = date;
      this.focus();

      if (this.closeOnSelect) {
        this.doHide();
      }
    },
    inputActiveDateHandler(newDate: Date): void {
      this.activeDate = new Date(newDate.valueOf());
      this.focus();
    },
    setView(newView: CalendarView): void {
      this.currentView = newView;
      this.focus();
    },
    resetView(): void {
      if (this.currentView === CalendarView.Month) {
        this.setView(CalendarView.Day);
      } else if (this.currentView === CalendarView.Year) {
        this.setView(CalendarView.Month);
      } else {
        this.setView(CalendarView.Day);
      }
    },
    enterHandler(e: KeyboardEvent): void {
      e.preventDefault();

      if (!this.shown) {
        this.doShow();
      } else if (this.showActiveDate) {
        if (this.currentView === CalendarView.Day) {
          this.inputHandler(new Date(this.activeDate.valueOf()));
        } else {
          this.resetView();
        }
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
    resetInitialState() {
      this.shown = false;
      this.currentView = this.initialView as CalendarView;
      this.showActiveDate = false;
      this.activeDate = this.localValue ? new Date(this.localValue.valueOf()) : new Date();
    },
    focusHandler(e: FocusEvent) {
      this.$emit('focus', e);
    },
    blurHandler(e: FocusEvent) {
      this.$emit('blur', e);
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
          show: this.show,
        },
        on: {
          hidden: () => {
            this.$emit('hidden');
            this.resetInitialState();
          },
          shown: () => {
            this.$emit('shown');
            this.shown = true;
          },
        },
        scopedSlots: {
          trigger: (props) => [
            createElement(
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
                  userFormatedDate: this.userFormatedDate,
                  show: props.show,
                  hideIfFocusOutside: props.hideIfFocusOutside,
                },
                on: {
                  focus: this.focusHandler,
                  blur: this.blurHandler,
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
            createElement(
              'input',
              {
                attrs: {
                  type: 'hidden',
                  value: this.formatedDate,
                  name: this.name,
                  disabled: this.disabled,
                  readonly: this.readonly,
                  required: this.required,
                },
              },
            ),
          ],
        },
      },
      [
        createElement(
          TDatePickerViews,
          {
            ref: 'views',
            props: {
              value: this.localValue,
              activeDate: this.activeDate,
              weekStart: this.weekStart,
              monthsPerView: this.monthsPerView,
              locale: this.locale,
              getElementCssClass: this.getElementCssClass,
              dateFormatter: this.dateFormatter,
              dateParser: this.dateParser,
              dateFormat: this.dateFormat,
              initialView: this.initialView,
              currentView: this.currentView,
              yearsPerView: this.yearsPerView,
              showActiveDate: this.showActiveDate,
              disabledDates: this.disabledDates,
              minDate: this.minDate,
              maxDate: this.maxDate,
            },
            on: {
              input: this.inputHandler,
              inputActiveDate: this.inputActiveDateHandler,
              updateView: this.setView,
              resetView: this.resetView,
            },
          },
        ),
      ],
    );
  },
});

export default TDatepicker;
