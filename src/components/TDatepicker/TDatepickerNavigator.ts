import Vue, { CreateElement, VNode } from 'vue';
import {
  addMonths, addYears, dateIsOutOfRange,
  DateParser,
} from '@/utils/dates';

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
    prevButtonIsDisabled(): boolean {
      const dateParser = this.parse as DateParser;
      const prevDate = this.getPrevDate();
      return !prevDate || dateIsOutOfRange(prevDate, this.minDate, this.maxDate, dateParser, this.dateFormat);
    },
    nextButtonIsDisabled(): boolean {
      const nextDate = this.getNextDate();
      const dateParser = this.parse as DateParser;
      return !nextDate || dateIsOutOfRange(nextDate, this.minDate, this.maxDate, dateParser, this.dateFormat);
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
      const nextDate = this.getNextDate();
      if (nextDate) {
        this.inputHandler(nextDate);
      }
    },
    prev(): void {
      const prevDate = this.getPrevDate();
      if (prevDate) {
        this.inputHandler(prevDate);
      }
    },
    getPrevMonth(): Date {
      return addMonths(this.localValue, -1);
    },
    getNextMonth(): Date {
      return addMonths(this.localValue, 1);
    },
    getPrevYear(): Date {
      return addYears(this.localValue, -1);
    },
    getNextYear(): Date {
      return addYears(this.localValue, 1);
    },
    getPrevYearGroup(): Date {
      return addYears(this.localValue, -this.yearsPerView);
    },
    getNextYearGroup(): Date {
      return addYears(this.localValue, this.yearsPerView);
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
              class: 'text-gray-600 ml-1',
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
            class: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 rounded-full flex items-center px-2 py-1 -ml-1',
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
            class: 'flex items-center py-1',
          },
        },
        [
          createElement(
            'span',
            {
              class: 'text-gray-700 font-semibold',
            },
            this.formatNative(this.localValue, 'F'),
          ),
          createElement(
            'span',
            {
              class: 'text-gray-600 ml-1',
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
              type: 'button',
              class: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 rounded-full ml-auto p-1 ml-2',
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
                class: 'h-6 w-6 text-gray-500 inline-flex',
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
              type: 'button',
              class: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 rounded-full p-1 -mr-1',
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
                class: 'h-6 w-6 text-gray-500 inline-flex',
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
