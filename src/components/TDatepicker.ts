import { CreateElement, VNode } from 'vue';
import isEqual from 'lodash/isEqual';
import TDropdown from './TDropdown';
import {
  buildDateParser, buildDateFormatter, DateFormatter, DateValue, compareDates, addDays, addMonths, addYears,
  DateConditions, dayIsPartOfTheConditions, DateParser, dateIsOutOfRange, isSameDay, extractLocaleFromProps,
} from '../utils/dates';
import HtmlInput from '../base/HtmlInput';
import Key from '../types/Key';
import { English } from '../l10n/default';
import { CalendarView } from './TDatepicker/TDatepickerNavigator';
import TDatepickerTrigger from './TDatepicker/TDatepickerTrigger';
import TDatepickerViews from './TDatepicker/TDatepickerViews';

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
    lang: {
      type: String,
      default: 'en',
    },
    locale: {
      type: Object,
      default: () => English,
    },
    locales: {
      type: Object,
      default: () => ({}),
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
      default: undefined,
    },
    dateParser: {
      type: Function,
      default: undefined,
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    showDaysForOtherMonth: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    inline: {
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
    highlightDates: {
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
    conjunction: {
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
    clearable: {
      type: Boolean,
      default: true,
    },
    classes: {
      type: Object,
      default: () => ({
        // Dropdown related classes
        wrapper: 'inline-flex flex-col',
        dropdownWrapper: 'relative z-10',
        dropdown: 'origin-top-left absolute rounded-md shadow-lg',
        enterClass: '',
        enterActiveClass: 'transition ease-out duration-100 transform opacity-0 scale-95',
        enterToClass: 'transform opacity-100 scale-100',
        leaveClass: 'transition ease-in transform opacity-100 scale-100',
        leaveActiveClass: '',
        leaveToClass: 'transform opacity-0 scale-95 duration-75',

        // Wrapper for inline calendar
        inlineWrapper: '',

        // Text input related classes
        inputWrapper: '',
        input: 'form-input w-full',
        clearButton: 'hover:bg-gray-200 text-gray-500 rounded',
        clearButtonIcon: '',

        // Picker views
        viewGroup: 'bg-white border',
        view: '',

        // Navigator
        navigator: 'pt-2 px-2',
        navigatorViewButton: 'transition ease-in-out duration-100 inline-flex cursor-pointer rounded-full px-2 py-1 -ml-1 hover:bg-gray-200',
        navigatorViewButtonIcon: 'fill-current text-gray-500',
        navigatorViewButtonBackIcon: 'fill-current text-gray-500',
        navigatorViewButtonMonth: 'text-gray-700 font-semibold',
        navigatorViewButtonYear: 'text-gray-600 ml-1',
        navigatorViewButtonYearRange: 'text-gray-600 ml-1',
        navigatorLabel: 'py-1',
        navigatorLabelMonth: 'text-gray-700 font-semibold',
        navigatorLabelYear: 'text-gray-600 ml-1',
        navigatorPrevButton: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 rounded-full p-1 ml-2 ml-auto disabled:opacity-25 disabled:cursor-not-allowed',
        navigatorNextButton: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 rounded-full p-1 -mr-1 disabled:opacity-25 disabled:cursor-not-allowed',
        navigatorPrevButtonIcon: 'text-gray-500',
        navigatorNextButtonIcon: 'text-gray-500',

        // Calendar View
        calendarWrapper: 'p-2',
        calendarHeaderWrapper: '',
        calendarHeaderWeekDay: 'uppercase text-xs text-gray-600 w-8 h-8 flex items-center justify-center',
        calendarDaysWrapper: '',
        calendarDaysDayWrapper: 'w-full h-8 flex flex-shrink-0 items-center',

        // Day item
        otherMonthDay: 'text-sm rounded-full w-8 h-8 mx-auto hover:bg-blue-100 text-gray-400 disabled:opacity-25 disabled:cursor-not-allowed',
        emptyDay: '',
        inRangeFirstDay: 'text-sm bg-blue-500 text-white w-full h-8 rounded-l-full',
        inRangeLastDay: 'text-sm bg-blue-500 text-white w-full h-8 rounded-r-full',
        inRangeDay: 'text-sm bg-blue-200 w-full h-8 disabled:opacity-25 disabled:cursor-not-allowed',
        selectedDay: 'text-sm rounded-full w-8 h-8 mx-auto bg-blue-500 text-white disabled:opacity-25 disabled:cursor-not-allowed',
        activeDay: 'text-sm rounded-full bg-blue-100 w-8 h-8 mx-auto disabled:opacity-25 disabled:cursor-not-allowed',
        highlightedDay: 'text-sm rounded-full bg-blue-200 w-8 h-8 mx-auto disabled:opacity-25 disabled:cursor-not-allowed',
        day: 'text-sm rounded-full w-8 h-8 mx-auto hover:bg-blue-100 disabled:opacity-25 disabled:cursor-not-allowed',
        today: 'text-sm rounded-full w-8 h-8 mx-auto hover:bg-blue-100 disabled:opacity-25 disabled:cursor-not-allowed border border-blue-500',

        // Months View
        monthWrapper: 'p-2',
        selectedMonth: 'text-sm rounded w-full h-12 mx-auto bg-blue-500 text-white',
        activeMonth: 'text-sm rounded w-full h-12 mx-auto bg-blue-100',
        month: 'text-sm rounded w-full h-12 mx-auto hover:bg-blue-100',

        // Years View
        yearWrapper: 'p-2',
        year: 'text-sm rounded w-full h-12 mx-auto hover:bg-blue-100',
        selectedYear: 'text-sm rounded w-full h-12 mx-auto bg-blue-500 text-white',
        activeYear: 'text-sm rounded w-full h-12 mx-auto bg-blue-100',
      }),
    },
    fixedClasses: {
      type: Object,
      default: () => ({
        navigator: 'flex',
        navigatorViewButton: 'flex items-center',
        navigatorViewButtonIcon: 'flex-shrink-0 h-5 w-5',
        navigatorViewButtonBackIcon: 'flex-shrink-0 h-5 w-5',
        navigatorLabel: 'flex items-center py-1',
        navigatorPrevButtonIcon: 'h-6 w-6 inline-flex',
        navigatorNextButtonIcon: 'h-6 w-6 inline-flex',

        inputWrapper: 'relative',
        viewGroup: 'inline-flex flex-wrap',
        view: 'w-64',
        calendarDaysWrapper: 'grid grid-cols-7',
        calendarHeaderWrapper: 'grid grid-cols-7',
        monthWrapper: 'grid grid-cols-4',
        yearWrapper: 'grid grid-cols-4',

        clearButton: 'flex flex-shrink-0 items-center justify-center absolute right-0 top-0 m-2 h-6 w-6',
        clearButtonIcon: 'fill-current h-3 w-3',
      }),
    },
  },

  data() {
    const currentLocale = extractLocaleFromProps(this.lang, this.locales, this.locale);
    const dateFormatter = this.dateFormatter as DateFormatter | undefined;
    const parse: DateParser = buildDateParser(currentLocale, this.dateParser as DateParser);
    const format: DateFormatter = buildDateFormatter(currentLocale, dateFormatter);
    // Keep a native formatter for the different views
    const formatNative: DateFormatter = !dateFormatter ? format : buildDateFormatter(currentLocale);

    let localValue: Date | null | Date[] = this.multiple || this.range ? [] : null;

    if (Array.isArray(this.value)) {
      localValue = (this.value as (Date | string | number)[])
        .map((value) => parse(value, this.dateFormat) || null)
        .filter((value) => !!value) as Date[];
    } else {
      localValue = parse(this.value, this.dateFormat) || localValue;
    }

    const formatedDate = Array.isArray(localValue)
      ? localValue.map((d) => format(d, this.dateFormat))
      : format(localValue, this.dateFormat);

    const userFormatedDate = Array.isArray(localValue)
      ? localValue.map((d) => format(d, this.userFormat))
      : format(localValue, this.userFormat);

    let activeDate: Date = new Date();

    if (Array.isArray(localValue) && localValue.length) {
      [activeDate] = localValue;
    } else if (localValue instanceof Date) {
      activeDate = localValue;
    } else {
      activeDate = parse(this.initialDate as DateValue, this.dateFormat) || activeDate;
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
      parse,
      format,
      formatNative,
      currentLocale,
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
    shown(shown) {
      this.$emit('update:show', shown);
    },
    activeDate(activeDate) {
      this.$emit('activeChange', activeDate);
    },
    formatedDate(formatedDate) {
      this.$emit('input', formatedDate);
      this.$emit('change', formatedDate);
    },
    userFormatedDate(userFormatedDate) {
      this.$emit('userDateChanged', userFormatedDate);
    },
    localValue(localValue: Date | null | Date[]) {
      if (this.monthsPerView === 1 || !this.currentValueIsInTheView) {
        if (Array.isArray(localValue) && localValue.length) {
          this.activeDate = localValue[localValue.length - 1];
        } else {
          this.activeDate = localValue instanceof Date ? localValue : new Date();
        }
      }

      this.refreshFormattedDate();
    },
    value(value: DateValue) {
      if (Array.isArray(value)) {
        const localValue = (value as (Date | string | number)[])
          .map((v) => this.parse(v, this.dateFormat) || null)
          .filter((v) => !!v) as Date[];

        if (!isEqual(localValue, this.localValue)) {
          this.localValue = localValue;
        }
      } else {
        this.localValue = this.parse(value, this.dateFormat)
          || (this.multiple || this.range ? [] : null);
      }
    },
    dateParser() {
      this.refreshParser();
    },
    dateFormatter() {
      this.refreshFormatter();
    },
    lang() {
      this.refreshCurrentLocale();
    },
    locale() {
      this.refreshCurrentLocale();
    },
    locales: {
      handler() {
        this.refreshCurrentLocale();
      },
      deep: true,
    },
  },

  methods: {
    refreshFormattedDate(): void {
      const formatedDate = Array.isArray(this.localValue)
        ? this.localValue.map((d) => this.format(d, this.dateFormat))
        : this.format(this.localValue, this.dateFormat);

      const userFormatedDate = Array.isArray(this.localValue)
        ? this.localValue.map((d) => this.format(d, this.userFormat))
        : this.format(this.localValue, this.userFormat);

      this.formatedDate = formatedDate;
      this.userFormatedDate = userFormatedDate;
    },
    refreshCurrentLocale(): void {
      this.currentLocale = extractLocaleFromProps(this.lang, this.locales, this.locale);
      this.refreshParser();
      this.refreshFormatter();
      this.refreshFormattedDate();
    },
    refreshParser(): void {
      const parse: DateParser = buildDateParser(this.currentLocale, this.dateParser as DateParser);
      this.parse = parse;
    },
    refreshFormatter(): void {
      const dateFormatter = this.dateFormatter as DateFormatter | undefined;
      const format: DateFormatter = buildDateFormatter(this.currentLocale, dateFormatter);
      // Keep a native formatter for the different views
      const formatNative: DateFormatter = !dateFormatter ? format : buildDateFormatter(this.currentLocale);

      this.format = format;
      this.formatNative = formatNative;
    },
    focus(options?: FocusOptions | undefined) : void | never {
      const wrapper = this.$el as HTMLDivElement;
      const input: HTMLInputElement | null = wrapper.querySelector('input[type=text]');
      if (!input) {
        throw new Error('Input not found');
      }

      input.focus(options);
    },
    doHide(): void {
      const dropdown = this.getDropdown();
      if (dropdown) {
        dropdown.doHide();
      }
    },
    doShow(): void {
      const dropdown = this.getDropdown();
      if (dropdown) {
        dropdown.doShow();
      }
    },
    toggle(): void {
      const dropdown = this.getDropdown();
      if (dropdown) {
        dropdown.doToggle();
      }
    },
    arrowKeyHandler(e: KeyboardEvent): void {
      e.preventDefault();

      this.showActiveDate = true;

      if (!this.inline && !this.shown) {
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

      if (newActiveDate && !dateIsOutOfRange(newActiveDate, this.minDate, this.maxDate, this.parse, this.dateFormat)) {
        this.activeDate = newActiveDate;
      }
    },
    inputHandler(newDate: Date): void {
      const date = new Date(newDate.valueOf());
      const disabledDates: DateConditions = this.disabledDates as DateConditions;

      if (
        dayIsPartOfTheConditions(date, disabledDates, this.parse, this.dateFormat)
          || dateIsOutOfRange(date, this.minDate, this.maxDate, this.parse, this.dateFormat)
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
        if (!this.inline && this.localValue.length === 2 && this.closeOnSelect) {
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

      if (!this.inline && this.closeOnSelect && !Array.isArray(this.localValue)) {
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

      if (!this.inline && !this.shown) {
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

      const dropdown = this.getDropdown();
      if (dropdown) {
        dropdown.escapeHandler(e);
      }
    },
    spaceHandler(e: KeyboardEvent): void {
      e.preventDefault();

      this.toggle();
    },
    getDropdown(): Dropdown | undefined {
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
    clearHandler() {
      if (this.multiple || this.range) {
        this.localValue = [];
      } else {
        this.localValue = null;
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
    const views = createElement(
      TDatepickerViews,
      {
        ref: 'views',
        props: {
          value: this.localValue,
          activeDate: this.activeDate,
          weekStart: this.weekStart,
          monthsPerView: this.monthsPerView,
          lang: this.lang,
          locale: this.currentLocale,
          getElementCssClass: this.getElementCssClass,
          parse: this.parse,
          format: this.format,
          formatNative: this.formatNative,
          dateFormat: this.dateFormat,
          userFormat: this.userFormat,
          initialView: this.initialView,
          currentView: this.currentView,
          yearsPerView: this.yearsPerView,
          showActiveDate: this.showActiveDate,
          disabledDates: this.disabledDates,
          highlightDates: this.highlightDates,
          minDate: this.minDate,
          maxDate: this.maxDate,
          range: this.range,
          showDaysForOtherMonth: this.showDaysForOtherMonth,
        },
        scopedSlots: this.$scopedSlots,
        on: {
          input: this.inputHandler,
          inputActiveDate: this.inputActiveDateHandler,
          updateView: this.setView,
          resetView: this.resetView,
        },
      },
    );

    const triggerSettings = {
      ref: 'trigger',
      props: {
        id: this.id,
        name: this.name,
        inputName: this.inputName,
        disabled: this.disabled,
        readonly: this.readonly,
        autofocus: this.autofocus,
        required: this.required,
        placeholder: this.placeholder,
        tabindex: this.tabindex,
        userFormatedDate: this.userFormatedDate,
        formatedDate: this.formatedDate,
        conjunction: this.conjunction,
        multiple: this.multiple,
        range: this.range,
        clearable: this.clearable,
        locale: this.currentLocale,
        value: this.localValue,
        activeDate: this.activeDate,
        getElementCssClass: this.getElementCssClass,
      },
      scopedSlots: this.$scopedSlots,
      on: {
        clear: this.clearHandler,
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
    };
    if (this.inline) {
      return createElement('div',
        {
          class: this.getElementCssClass('inlineWrapper'),
        },
        [
          createElement(
            TDatepickerTrigger,
            triggerSettings,
          ),
          views,
        ]);
    }

    return createElement(
      TDropdown,
      {
        ref: 'dropdown',
        props: {
          fixedClasses: undefined,
          classes: {
            wrapper: this.getElementCssClass('wrapper'),
            dropdownWrapper: this.getElementCssClass('dropdownWrapper'),
            dropdown: this.getElementCssClass('dropdown'),
            enterClass: this.getElementCssClass('enterClass'),
            enterActiveClass: this.getElementCssClass('enterActiveClass'),
            enterToClass: this.getElementCssClass('enterToClass'),
            leaveClass: this.getElementCssClass('leaveClass'),
            leaveActiveClass: this.getElementCssClass('leaveActiveClass'),
            leaveToClass: this.getElementCssClass('leaveToClass'),
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
          trigger: (props) => {
            triggerSettings.props = {
              ...triggerSettings.props,
              ...{
                hideIfFocusOutside: props.hideIfFocusOutside,
                show: props.show,
              },
            };
            return [
              createElement(
                TDatepickerTrigger,
                triggerSettings,
              ),
            ];
          },
        },
      },
      [
        views,
      ],
    );
  },
});

export default TDatepicker;
