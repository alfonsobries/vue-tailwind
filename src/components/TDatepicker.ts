import { CreateElement, VNode } from 'vue';
import TDropdown from '@/components/TDropdown';
import {
  formatDate, parseDate, DateFormatter, DateValue, compareDates, addDays, addMonths, addYears,
  DateConditions, dayIsPartOfTheConditions, DateParser, dateIsOutOfRange, isSameDay,
} from '@/utils/dates';
import HtmlInput from '@/base/HtmlInput';
import Key from '@/types/Key';
import isEqual from 'lodash/isEqual';
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
    inputName: {
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
    locales: {
      type: Array,
      default: () => [],
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
      default: formatDate,
    },
    dateParser: {
      type: Function,
      default: parseDate,
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
    conjuntion: {
      type: String,
      default: ',',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    range: {
      type: Boolean,
      default: false,
    },
    fixedClasses: {
      type: Object,
      default: () => ({
        dayWrapper: 'w-full h-8 flex flex-shrink-0 items-center',
        day: 'text-sm rounded-full w-8 h-8 mx-auto hover:bg-blue-100',
        activeDay: 'text-sm rounded-full bg-blue-100 w-8 h-8 mx-auto',
        selectedDay: 'text-sm rounded-full w-8 h-8 mx-auto bg-blue-500 text-white',
        disabledDay: 'text-sm rounded-full w-8 h-8 mx-auto opacity-25 cursor-not-allowed',
        otherMonthDay: 'text-sm rounded-full w-8 h-8 mx-auto hover:bg-blue-100 text-gray-400',
        inRangeDay: 'text-sm bg-blue-200 w-full h-8',
        inRangeFirstDay: 'text-sm bg-blue-500 text-white w-full h-8 rounded-l-full',
        inRangeLastDay: 'text-sm bg-blue-500 text-white w-full h-8 rounded-r-full',
        month: 'text-sm rounded w-full h-12 mx-auto hover:bg-blue-100',
        selectedMonth: 'text-sm rounded w-full h-12 mx-auto bg-blue-500  text-white',
        activeMonth: 'text-sm rounded w-full h-12 mx-auto bg-blue-100',
        year: 'text-sm rounded w-full h-12 mx-auto hover:bg-blue-100',
        selectedYear: 'text-sm rounded w-full h-12 mx-auto bg-blue-500  text-white',
        activeYear: 'text-sm rounded w-full h-12 mx-auto bg-blue-100',
        weekDayWrapper: 'grid grid-cols-7',
        weekDay: 'uppercase text-xs text-gray-600 w-8 h-8 flex items-center justify-center',
      }),
    },
  },

  data() {
    const dateParser = this.dateParser as DateParser;

    let localValue: Date | null | Date[] = this.multiple || this.range ? [] : null;

    if (Array.isArray(this.value)) {
      localValue = (this.value as (Date | string | number)[])
        .map((value) => dateParser(value, this.dateFormat) || null)
        .filter((value) => !!value) as Date[];
    } else {
      localValue = dateParser(this.value, this.dateFormat) || localValue;
    }

    const dateformatter = this.dateFormatter as DateFormatter;

    const formatedDate = Array.isArray(localValue)
      ? localValue.map((d) => dateformatter(d, this.dateFormat))
      : dateformatter(localValue, this.dateFormat);

    const userFormatedDate = Array.isArray(localValue)
      ? localValue.map((d) => dateformatter(d, this.userFormat))
      : dateformatter(localValue, this.userFormat);

    let activeDate: Date = new Date();

    if (Array.isArray(localValue) && localValue.length) {
      [activeDate] = localValue;
    } else if (localValue instanceof Date) {
      activeDate = localValue;
    } else {
      activeDate = dateParser(this.initialDate as DateValue, this.dateFormat) || activeDate;
    }

    // Used to show the selected month/year
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
    latestDate(): Date | null {
      if (Array.isArray(this.localValue)) {
        if (this.localValue.length) {
          return this.localValue[this.localValue.length - 1] || null;
        }

        return null;
      }

      return this.localValue;
    },
    currentValueIsInTheView(): boolean {
      // eslint-disable-next-line no-restricted-globals
      if (this.latestDate) {
        const [start, end] = this.visibleRange;
        return compareDates(end, this.latestDate) >= 0 && compareDates(this.latestDate, start) >= 0;
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
    localValue(localValue: Date | null | Date[]) {
      const dateformatter = this.dateFormatter as DateFormatter;

      const formatedDate = Array.isArray(localValue)
        ? localValue.map((d) => dateformatter(d, this.dateFormat))
        : dateformatter(localValue, this.dateFormat);

      const userFormatedDate = Array.isArray(localValue)
        ? localValue.map((d) => dateformatter(d, this.userFormat))
        : dateformatter(localValue, this.userFormat);

      this.formatedDate = formatedDate;
      this.userFormatedDate = userFormatedDate;

      if (this.monthsPerView === 1 || !this.currentValueIsInTheView) {
        if (Array.isArray(localValue) && localValue.length) {
          [this.activeDate] = localValue;
        } else {
          this.activeDate = localValue instanceof Date ? localValue : new Date();
        }
      }
    },
    value(value: DateValue) {
      const dateParser = this.dateParser as DateParser;

      if (Array.isArray(value)) {
        const localValue = (value as (Date | string | number)[])
          .map((v) => dateParser(v, this.dateFormat) || null)
          .filter((v) => !!v) as Date[];

        if (!isEqual(localValue, this.localValue)) {
          this.localValue = localValue;
        }
      } else {
        this.localValue = dateParser(value, this.dateFormat)
          || (this.multiple || this.range ? [] : null);
      }
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

      if (this.range) {
        let range: Date[] = [];

        // Reset the range when
        // 1. Is not an array
        // 2. The range already have both values
        // 3. The range has the first value and the second value is before
        if (!this.localValue
            || !Array.isArray(this.localValue)
            || (
              Array.isArray(this.localValue)
              && (this.localValue.length === 0 || this.localValue.length === 2)
            )
            || (
              Array.isArray(this.localValue)
              && this.localValue.length === 1
              && this.localValue[0]
              && this.localValue[0].getTime() > date.getTime()
            )
        ) {
          range = [date];
        } else if (this.localValue.length === 1) {
          range = [this.localValue[0], date];
        }

        this.localValue = range;

        // Range is complete
        if (this.localValue.length === 2 && this.closeOnSelect) {
          this.doHide();
        }
      } else if (Array.isArray(this.localValue)) {
        const index = this.localValue.findIndex((d) => isSameDay(d, date));
        if (index >= 0) {
          this.localValue.splice(index, 1);
        } else {
          this.localValue.push(date);
        }
      } else {
        this.focus();
        this.localValue = date;
      }

      if (this.closeOnSelect && !Array.isArray(this.localValue)) {
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

      if (Array.isArray(this.localValue) && this.localValue.length) {
        [this.activeDate] = this.localValue;
      } else {
        this.activeDate = this.localValue instanceof Date ? this.localValue : new Date();
      }
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
                  name: this.inputName,
                  disabled: this.disabled,
                  autofocus: this.autofocus,
                  required: this.required,
                  placeholder: this.placeholder,
                  userFormatedDate: this.userFormatedDate,
                  show: props.show,
                  hideIfFocusOutside: props.hideIfFocusOutside,
                  conjuntion: this.conjuntion,
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
            ...this.multiple
              ? (Array.isArray(this.formatedDate) ? this.formatedDate : [this.formatedDate])
                .map((date: string) => createElement(
                  'input',
                  {
                    attrs: {
                      type: 'hidden',
                      value: date,
                      name: this.name,
                      disabled: this.disabled,
                      readonly: this.readonly,
                      required: this.required,
                    },
                  },
                ))
              : [
                createElement(
                  'input',
                  {
                    attrs: {
                      type: 'hidden',
                      value: Array.isArray(this.formatedDate) ? this.formatedDate.join(this.conjuntion) : this.formatedDate,
                      name: this.name,
                      disabled: this.disabled,
                      readonly: this.readonly,
                      required: this.required,
                    },
                  },
                ),
              ],
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
              dateParser: this.dateParser,
              dateFormat: this.dateFormat,
              initialView: this.initialView,
              currentView: this.currentView,
              yearsPerView: this.yearsPerView,
              showActiveDate: this.showActiveDate,
              disabledDates: this.disabledDates,
              minDate: this.minDate,
              maxDate: this.maxDate,
              range: this.range,
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
