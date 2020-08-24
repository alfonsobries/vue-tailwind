import Vue, { CreateElement, VNode } from 'vue';
import CssClass from '@/types/CssClass';
import {
  createDateFormatter, DateConditions, dayIsPartOfTheConditions, DateParser, dateIsOutOfRange,
} from '@/utils/dates';
import { english } from '@/l10n/default';

const TDatePickerViewsViewCalendarDaysDay = Vue.extend({
  name: 'TDatePickerViewsViewCalendarDaysDay',

  props: {
    day: {
      type: Date,
      required: true,
    },
    locale: {
      type: String,
      required: true,
    },
    value: {
      type: Date,
      default: null,
    },
    activeDate: {
      type: Date,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    dateParser: {
      type: Function,
      required: true,
    },
    dateFormat: {
      type: String,
      required: true,
    },
    showDaysForOtherMonth: {
      type: Boolean,
      required: true,
    },
    showActiveDate: {
      type: Boolean,
      required: true,
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
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
      dateFormatter: createDateFormatter({ l10n: english }),
    };
  },

  computed: {
    isSelected(): boolean {
      const d1 = this.getDay();
      const d2 = this.value as unknown as Date;
      return d2 && d1.getFullYear() === d2.getFullYear()
        && d1.getMonth() === d2.getMonth()
        && d1.getDate() === d2.getDate();
    },
    isActive(): boolean {
      const d1 = this.getDay();
      const d2 = this.localActiveDate as unknown as Date;
      return d2 && d1.getFullYear() === d2.getFullYear()
        && d1.getMonth() === d2.getMonth()
        && d1.getDate() === d2.getDate();
    },
    isDisabled(): boolean {
      const day = this.getDay();
      const disabledDates: DateConditions = this.disabledDates as DateConditions;
      const dateParser: DateParser = this.dateParser as DateParser;

      return dateIsOutOfRange(day, this.minDate, this.maxDate, dateParser, this.dateFormat)
        || dayIsPartOfTheConditions(day, disabledDates, dateParser, this.dateFormat);
    },
    isForAnotherMonth(): boolean {
      const d1 = this.localActiveDate as unknown as Date;
      const d2 = this.getDay();
      return d1.getFullYear() !== d2.getFullYear()
        || d1.getMonth() !== d2.getMonth();
    },
    dayFormatted(): string {
      return this.dateFormatter(this.getDay(), 'j');
    },
  },

  watch: {
    activeDate(activeDate: Date) {
      this.localActiveDate = new Date(activeDate.valueOf());
    },
  },

  methods: {
    getClass(): CssClass {
      if (this.isDisabled) {
        return this.getElementCssClass('disabledDay');
      }

      if (this.isSelected) {
        return this.getElementCssClass('selectedDay');
      }

      if (this.isActive && this.showActiveDate) {
        return this.getElementCssClass('activeDay');
      }

      if (this.isForAnotherMonth) {
        if (this.showDaysForOtherMonth) {
          return this.getElementCssClass('otherMonthDay');
        }

        return 'invisible pointer-events-none';
      }

      return this.getElementCssClass('day');
    },
    getDay(): Date {
      return this.day as unknown as Date;
    },

  },
  render(createElement: CreateElement): VNode {
    return createElement(
      'button',
      {
        class: this.getClass(),
        attrs: {
          type: 'button',
          tabindex: -1,
          disabled: this.isDisabled ? true : undefined,
        },
        on: {
          click: (e: MouseEvent) => this.$emit('click', e),
        },
      },
      this.dayFormatted,
    );
  },
});

export default TDatePickerViewsViewCalendarDaysDay;
