import Vue, { CreateElement, VNode } from 'vue';
import CssClass from '@/types/CssClass';
import {
  createDateFormatter, DateConditions, dayIsPartOfTheConditions, DateParser, dateIsOutOfRange, isSameDay,
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
      type: [Date, Array],
      default: null,
    },
    activeDate: {
      type: Date,
      required: true,
    },
    activeMonth: {
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
      localActiveMonth: new Date(this.activeMonth.valueOf()),
      dateFormatter: createDateFormatter({ l10n: english }),
    };
  },

  computed: {
    isSelected(): boolean {
      const d1 = this.getDay();
      const d2 = this.value;

      if (d2 instanceof Date) {
        return isSameDay(d1, d2);
      }

      if (Array.isArray(d2)) {
        return d2.some((d) => isSameDay(d, d1));
      }

      return false;
    },
    isActive(): boolean {
      const d1 = this.getDay();
      const d2 = this.localActiveDate;
      return isSameDay(d1, d2);
    },
    isDisabled(): boolean {
      const day = this.getDay();
      const disabledDates: DateConditions = this.disabledDates as DateConditions;
      const dateParser: DateParser = this.dateParser as DateParser;

      return dateIsOutOfRange(day, this.minDate, this.maxDate, dateParser, this.dateFormat)
        || dayIsPartOfTheConditions(day, disabledDates, dateParser, this.dateFormat);
    },
    isForAnotherMonth(): boolean {
      const d1 = this.localActiveMonth as unknown as Date;
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
    activeMonth(activeMonth: Date) {
      this.localActiveMonth = new Date(activeMonth.valueOf());
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

      if (this.isForAnotherMonth) {
        if (this.showDaysForOtherMonth) {
          return this.getElementCssClass('otherMonthDay');
        }

        return 'invisible pointer-events-none';
      }

      if (this.isActive && this.showActiveDate) {
        return this.getElementCssClass('activeDay');
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
