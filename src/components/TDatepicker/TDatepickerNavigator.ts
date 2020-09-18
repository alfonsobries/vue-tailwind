import Vue, { CreateElement, VNode } from 'vue';
import {
  addMonths, addYears, dateIsOutOfRange,
  DateParser,
  addDays,
  lastDayOfMonth,
} from '../../utils/dates';

export const getYearsRange = (date: Date, yearsPerView: number): [number, number] => {
  const currentYear = date.getFullYear();
  const from = currentYear - Math.floor(currentYear % yearsPerView);
  const to = from + yearsPerView - 1;
  return [from, to];
};

export enum CalendarView {
  Day = 'day',
  Month = 'month',
  Year = 'year',
}

const TDatepickerNavigator = Vue.extend({
  name: 'TDatepickerNavigator',

  props: {
    getElementCssClass: {
      type: Function,
      required: true,
    },
    value: {
      type: Date,
      default: null,
    },
    showSelector: {
      type: Boolean,
      default: true,
    },
    currentView: {
      type: String,
      default: CalendarView.Day,
      validator(value: CalendarView) {
        return [CalendarView.Day, CalendarView.Month, CalendarView.Year].includes(value);
      },
    },
    parse: {
      type: Function,
      required: true,
    },
    formatNative: {
      type: Function,
      required: true,
    },
    dateFormat: {
      type: String,
      required: true,
    },
    yearsPerView: {
      type: Number,
      required: true,
    },
    maxDate: {
      type: [Date, String],
      default: undefined,
    },
    minDate: {
      type: [Date, String],
      default: undefined,
    },
    locale: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localValue: new Date(this.value.valueOf()),
    };
  },

  computed: {
    isDayView() {
      return this.currentView === CalendarView.Day;
    },
    isYearView() {
      return this.currentView === CalendarView.Year;
    },
    isMonthView() {
      return this.currentView === CalendarView.Month;
    },
    nextDate(): Date | undefined {
      return this.getNextDate();
    },
    prevDate(): Date | undefined {
      return this.getPrevDate();
    },
    prevButtonIsDisabled(): boolean {
      return !this.prevDate;
    },
    nextButtonIsDisabled(): boolean {
      return !this.nextDate;
    },
    nextButtonAriaLabel(): string {
      if (this.isDayView) {
        return `Next ${this.locale.yearAriaLabel}`;
      }
      return `Next ${this.locale.yearAriaLabel}`;
    },
    prevButtonAriaLabel(): string {
      if (this.isDayView) {
        return `Prev ${this.locale.yearAriaLabel}`;
      }
      return `Prev ${this.locale.yearAriaLabel}`;
    },
  },

  watch: {
    value(value: Date) {
      this.localValue = new Date(value.valueOf());
    },
  },

  methods: {
    getNextDate(): Date | undefined {
      let nextDate: Date | undefined;
      if (this.currentView === CalendarView.Day) {
        nextDate = this.getNextMonth();
      } else if (this.currentView === CalendarView.Month) {
        nextDate = this.getNextYear();
      } else if (this.currentView === CalendarView.Year) {
        nextDate = this.getNextYearGroup();
      }
      return nextDate;
    },
    getPrevDate(): Date | undefined {
      let prevDate: Date | undefined;
      if (this.currentView === CalendarView.Day) {
        prevDate = this.getPrevMonth();
      } else if (this.currentView === CalendarView.Month) {
        prevDate = this.getPrevYear();
      } else if (this.currentView === CalendarView.Year) {
        prevDate = this.getPrevYearGroup();
      }
      return prevDate;
    },
    inputHandler(newDate: Date): void {
      this.$emit('input', newDate);
    },
    clickHandler() {
      if (this.currentView === CalendarView.Day) {
        this.$emit('updateView', CalendarView.Month);
      } else if (this.currentView === CalendarView.Month) {
        this.$emit('updateView', CalendarView.Year);
      } else if (this.currentView === CalendarView.Year) {
        this.$emit('updateView', CalendarView.Day);
      }
    },
    next(): void {
      if (this.nextDate) {
        this.inputHandler(this.nextDate);
      }
    },
    prev(): void {
      if (this.prevDate) {
        this.inputHandler(this.prevDate);
      }
    },
    getPrevMonth(): Date | undefined {
      const prevMonth = addMonths(this.localValue, -1);
      const dateParser = this.parse as DateParser;

      if (!dateIsOutOfRange(prevMonth, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
        return prevMonth;
      }

      let day = prevMonth.getDate();
      let dateToTry = prevMonth;
      let validDate;

      day = prevMonth.getDate();
      const lastDay = lastDayOfMonth(prevMonth).getDate();
      do {
        dateToTry = addDays(dateToTry, 1);
        day += 1;
        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
          validDate = dateToTry;
        }
      } while (day <= lastDay && !validDate);


      if (!validDate) {
        day = prevMonth.getDate();
        do {
          dateToTry = addDays(dateToTry, -1);
          day -= 1;
          if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
            validDate = dateToTry;
          }
        } while (day >= 1 && !validDate);
      }

      return validDate;
    },
    getNextMonth(): Date | undefined {
      const nextMonth = addMonths(this.localValue, 1);
      const dateParser = this.parse as DateParser;

      if (!dateIsOutOfRange(nextMonth, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
        return nextMonth;
      }

      let day = nextMonth.getDate();
      let dateToTry = nextMonth;
      let validDate;

      do {
        dateToTry = addDays(dateToTry, -1);
        day -= 1;
        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
          validDate = dateToTry;
        }
      } while (day >= 1 && !validDate);

      if (!validDate) {
        day = nextMonth.getDate();
        const lastDay = lastDayOfMonth(nextMonth).getDate();
        do {
          dateToTry = addDays(dateToTry, 1);
          day += 1;
          if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
            validDate = dateToTry;
          }
        } while (day <= lastDay && !validDate);
      }

      return validDate;
    },
    getPrevYear(): Date | undefined {
      const prevYear = addYears(this.localValue, -1);
      const dateParser = this.parse as DateParser;

      if (!dateIsOutOfRange(prevYear, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
        return prevYear;
      }

      let validDate;
      let dateToTry = prevYear;
      const year = prevYear.getFullYear();

      do {
        dateToTry = addDays(dateToTry, 1);
        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
          validDate = dateToTry;
        }
      } while (dateToTry.getFullYear() === year && !validDate);


      if (!validDate) {
        do {
          dateToTry = addDays(dateToTry, -1);
          if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
            validDate = dateToTry;
          }
        } while (dateToTry.getFullYear() === year && !validDate);
      }

      return validDate;
    },
    getNextYear(): Date | undefined {
      const nextYear = addYears(this.localValue, 1);
      const dateParser = this.parse as DateParser;

      if (!dateIsOutOfRange(nextYear, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
        return nextYear;
      }

      let validDate;
      let dateToTry = nextYear;
      const year = nextYear.getFullYear();

      do {
        dateToTry = addDays(dateToTry, -1);
        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
          validDate = dateToTry;
        }
      } while (dateToTry.getFullYear() === year && !validDate);


      if (!validDate) {
        do {
          dateToTry = addDays(dateToTry, 1);
          if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
            validDate = dateToTry;
          }
        } while (dateToTry.getFullYear() === year && !validDate);
      }

      return validDate;
    },
    getPrevYearGroup(): Date | undefined {
      const prevYear = addYears(this.localValue, -this.yearsPerView);
      const dateParser = this.parse as DateParser;

      if (!dateIsOutOfRange(prevYear, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
        return prevYear;
      }

      let validDate;
      let dateToTry = prevYear;
      const year = prevYear.getFullYear();

      do {
        dateToTry = addDays(dateToTry, this.yearsPerView);
        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
          validDate = dateToTry;
        }
      } while (dateToTry.getFullYear() === year && !validDate);


      if (!validDate) {
        do {
          dateToTry = addDays(dateToTry, -this.yearsPerView);
          if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
            validDate = dateToTry;
          }
        } while (dateToTry.getFullYear() === year && !validDate);
      }

      return validDate;
    },
    getNextYearGroup(): Date | undefined {
      const nextYear = addYears(this.localValue, this.yearsPerView);
      const dateParser = this.parse as DateParser;

      if (!dateIsOutOfRange(nextYear, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
        return nextYear;
      }

      let validDate;
      let dateToTry = nextYear;
      const year = nextYear.getFullYear();

      do {
        dateToTry = addDays(dateToTry, -this.yearsPerView);
        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
          validDate = dateToTry;
        }
      } while (dateToTry.getFullYear() === year && !validDate);


      if (!validDate) {
        do {
          dateToTry = addDays(dateToTry, this.yearsPerView);
          if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
            validDate = dateToTry;
          }
        } while (dateToTry.getFullYear() === year && !validDate);
      }

      return validDate;
    },
  },

  render(createElement: CreateElement): VNode {
    const subElements: VNode[] = [];

    if (this.showSelector) {
      const buttonElements: VNode[] = [];

      if (this.currentView === CalendarView.Day) {
        buttonElements.push(
          createElement(
            'span',
            {
              class: this.getElementCssClass('navigatorViewButtonMonthName'),
            },
            this.formatNative(this.localValue, 'F'),
          ),
        );
      }

      if (this.currentView === CalendarView.Month || this.currentView === CalendarView.Day) {
        buttonElements.push(
          createElement(
            'span',
            {
              class: this.getElementCssClass('navigatorViewButtonYear'),
            },
            this.formatNative(this.localValue, 'Y'),
          ),
        );
      }

      if (this.currentView !== CalendarView.Year) {
        buttonElements.push(
          createElement(
            'svg',
            {
              attrs: {
                fill: 'currentColor',
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 20 20',
              },
              class: this.getElementCssClass('navigatorViewButtonIcon'),
            },
            [
              createElement('polygon', {
                attrs: {
                  points: '12.9497475 10.7071068 13.6568542 10 8 4.34314575 6.58578644 5.75735931 10.8284271 10 6.58578644 14.2426407 8 15.6568542 12.9497475 10.7071068',
                },
              }),
            ],
          ),
        );
      } else {
        buttonElements.push(
          createElement(
            'svg',
            {
              attrs: {
                fill: 'currentColor',
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 20 20',
              },
              class: this.getElementCssClass('navigatorViewButtonBackIcon'),
            },
            [
              createElement('polygon', {
                attrs: {
                  points: '7.05025253 9.29289322 6.34314575 10 12 15.6568542 13.4142136 14.2426407 9.17157288 10 13.4142136 5.75735931 12 4.34314575',
                },
              }),
            ],
          ),
        );
        buttonElements.push(
          createElement(
            'span',
            {
              class: this.getElementCssClass('navigatorViewButtonYearRange'),
            },
            getYearsRange(this.localValue, this.yearsPerView).join(' - '),
          ),
        );
      }

      subElements.push(createElement(
        'button',
        {
          attrs: {
            type: 'button',
            class: this.getElementCssClass('navigatorViewButton'),
            tabindex: -1,
          },
          on: {
            click: this.clickHandler,
          },
        },
        buttonElements,
      ));
    } else {
      subElements.push(createElement(
        'span',
        {
          attrs: {
            class: this.getElementCssClass('navigatorLabel'),
          },
        },
        [
          createElement(
            'span',
            {
              class: this.getElementCssClass('navigatorLabelMonth'),
            },
            this.formatNative(this.localValue, 'F'),
          ),
          createElement(
            'span',
            {
              class: this.getElementCssClass('navigatorLabelYear'),
            },
            this.formatNative(this.localValue, 'Y'),
          ),
        ],
      ));
    }

    if (this.showSelector) {
      subElements.push(
        createElement(
          'button',
          {
            ref: 'prev',
            attrs: {
              'aria-label': this.prevButtonAriaLabel,
              type: 'button',
              class: this.getElementCssClass('navigatorPrevButton'),
              tabindex: -1,
              disabled: this.prevButtonIsDisabled ? true : undefined,
            },
            on: {
              click: this.prev,
            },
          },
          [
            createElement(
              'svg',
              {
                attrs: {
                  fill: 'none',
                  viewBox: '0 0 24 24',
                  stroke: 'currentColor',
                },
                class: this.getElementCssClass('navigatorPrevButtonIcon'),
              },
              [
                createElement('path', {
                  attrs: {
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-width': 2,
                    d: 'M15 19l-7-7 7-7',
                  },
                }),
              ],
            ),
          ],
        ),
      );

      subElements.push(
        createElement(
          'button',
          {
            ref: 'next',
            attrs: {
              'aria-label': this.nextButtonAriaLabel,
              type: 'button',
              class: this.getElementCssClass('navigatorNextButton'),
              tabindex: -1,
              disabled: this.nextButtonIsDisabled ? true : undefined,
            },
            on: {
              click: this.next,
            },
          },
          [
            createElement(
              'svg',
              {
                attrs: {
                  fill: 'none',
                  viewBox: '0 0 24 24',
                  stroke: 'currentColor',
                },
                class: this.getElementCssClass('navigatorNextButtonIcon'),
              },
              [
                createElement('path', {
                  attrs: {
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                    'stroke-width': 2,
                    d: 'M9 5l7 7-7 7',
                  },
                }),
              ],
            ),
          ],
        ),
      );
    }

    return createElement(
      'div',
      {
        class: this.getElementCssClass('navigator'),
      },
      subElements,
    );
  },
});

export default TDatepickerNavigator;
