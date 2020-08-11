import Vue, { CreateElement, VNode } from 'vue';

export enum CalendarView {
  Day = 'day',
  Month = 'month',
  Year = 'year',
}

const TDatepickerNavigator = Vue.extend({
  name: 'TDatepickerNavigator',

  props: {
    dateFormatter: {
      type: Function,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    value: {
      type: Date,
      required: true,
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
    yearsPerView: {
      type: Number,
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
  },

  watch: {
    value(value: Date) {
      this.localValue = new Date(value.valueOf());
    },
  },

  methods: {
    inputHandler(newDate: Date): void {
      this.$emit('input', newDate);
    },
    clickHandler() {
      if (this.currentView === CalendarView.Day) {
        this.$emit('setView', CalendarView.Month);
      } else if (this.currentView === CalendarView.Month) {
        this.$emit('setView', CalendarView.Year);
      } else if (this.currentView === CalendarView.Year) {
        this.$emit('setView', CalendarView.Day);
      }
    },
    next(): void {
      if (this.currentView === CalendarView.Day) {
        this.nextMonth();
      } else if (this.currentView === CalendarView.Month) {
        this.nextYear();
      } else if (this.currentView === CalendarView.Year) {
        this.nextYearGroup();
      }
    },
    prev(): void {
      if (this.currentView === CalendarView.Day) {
        this.prevMonth();
      } else if (this.currentView === CalendarView.Month) {
        this.prevYear();
      } else if (this.currentView === CalendarView.Year) {
        this.prevYearGroup();
      }
    },
    prevMonth(): void {
      const newDate = new Date(this.localValue.valueOf());
      newDate.setMonth(newDate.getMonth() - 1);
      this.inputHandler(newDate);
    },
    nextMonth(): void {
      const newDate = new Date(this.localValue.valueOf());
      newDate.setMonth(newDate.getMonth() + 1);
      this.inputHandler(newDate);
    },
    prevYear(): void {
      const newDate = new Date(this.localValue.valueOf());
      newDate.setFullYear(newDate.getFullYear() - 1);
      this.inputHandler(newDate);
    },
    nextYear(): void {
      const newDate = new Date(this.localValue.valueOf());
      newDate.setFullYear(newDate.getFullYear() + 1);
      this.inputHandler(newDate);
    },
    prevYearGroup(): void {
      const newDate = new Date(this.localValue.valueOf());
      newDate.setFullYear(newDate.getFullYear() - this.yearsPerView);
      this.inputHandler(newDate);
    },
    nextYearGroup(): void {
      const newDate = new Date(this.localValue.valueOf());
      newDate.setFullYear(newDate.getFullYear() + this.yearsPerView);
      this.inputHandler(newDate);
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
              class: 'text-gray-700 font-semibold',
            },
            this.dateFormatter(this.localValue, 'F'),
          ),
        );
      }

      if (this.currentView === CalendarView.Month || this.currentView === CalendarView.Day) {
        buttonElements.push(
          createElement(
            'span',
            {
              class: 'text-gray-600 ml-1',
            },
            this.dateFormatter(this.localValue, 'Y'),
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
              class: 'fill-current flex-shrink-0 h-5 w-5 text-gray-500',
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
              class: 'fill-current flex-shrink-0 h-5 w-5 text-gray-500',
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
      }

      subElements.push(createElement(
        'button',
        {
          attrs: {
            type: 'button',
            class: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 rounded-full flex items-center px-2 py-1 -ml-1',
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
            this.dateFormatter(this.localValue, 'F'),
          ),
          createElement(
            'span',
            {
              class: 'text-gray-600 ml-1',
            },
            this.dateFormatter(this.localValue, 'Y'),
          ),
        ],
      ));
    }

    if (this.showSelector) {
      subElements.push(
        createElement(
          'button',
          {
            attrs: {
              type: 'button',
              class: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 rounded-full ml-auto p-1 ml-2',
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
    }

    if (this.showSelector) {
      subElements.push(
        createElement(
          'button',
          {
            attrs: {
              type: 'button',
              class: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 rounded-full p-1 -mr-1',
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
        class: 'flex items-center justify-between mb-2',
      },
      subElements,
    );
  },
});

export default TDatepickerNavigator;
