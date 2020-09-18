import Vue, { CreateElement, VNode } from 'vue';
import CssClass from '../../types/CssClass';
import {
  DateConditions, dayIsPartOfTheConditions, DateParser, dateIsOutOfRange, isSameDay, addDays,
} from '../../utils/dates';

const TDatepickerViewsViewCalendarDaysDay = Vue.extend({
  name: 'TDatepickerViewsViewCalendarDaysDay',

  props: {
    day: {
      type: Date,
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
    parse: {
      type: Function,
      required: true,
    },
    format: {
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
    userFormat: {
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
    range: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
      localActiveMonth: new Date(this.activeMonth.valueOf()),
    };
  },

  computed: {
    isSelected(): boolean {
      const d1 = this.getDay();
      const d2 = this.value as Date | Date[];

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
    isToday(): boolean {
      const d1 = this.getDay();
      const d2 = new Date();
      return isSameDay(d1, d2);
    },
    isDisabled(): boolean {
      const day = this.getDay();
      const disabledDates: DateConditions = this.disabledDates as DateConditions;
      const dateParser: DateParser = this.parse as DateParser;

      return dateIsOutOfRange(day, this.minDate, this.maxDate, dateParser, this.dateFormat)
        || dayIsPartOfTheConditions(day, disabledDates, dateParser, this.dateFormat);
    },
    isHighlighted(): boolean {
      const day = this.getDay();
      const highlightDates: DateConditions = this.highlightDates as DateConditions;
      const dateParser: DateParser = this.parse as DateParser;

      return dayIsPartOfTheConditions(day, highlightDates, dateParser, this.dateFormat);
    },
    isForAnotherMonth(): boolean {
      const d1 = this.localActiveMonth as unknown as Date;
      const d2 = this.getDay();
      return d1.getFullYear() !== d2.getFullYear()
        || d1.getMonth() !== d2.getMonth();
    },
    isInRange(): boolean {
      if (!this.range || !Array.isArray(this.value)) {
        return false;
      }
      const [from, to] = this.value as Date[];
      if (from && to) {
        return !dateIsOutOfRange(this.getDay(), addDays(from, 1), addDays(to, -1));
      }

      return false;
    },
    isFirstDayOfRange(): boolean {
      if (!this.range || !Array.isArray(this.value)) {
        return false;
      }
      const [from] = this.value as Date[];
      return from && isSameDay(from, this.getDay());
    },
    isLastDayOfRange(): boolean {
      if (!this.range || !Array.isArray(this.value)) {
        return false;
      }
      const [, to] = this.value as Date[];
      return to && isSameDay(to, this.getDay());
    },
    dayFormatted(): string {
      return this.formatNative(this.getDay(), 'j');
    },
    ariaLabel(): string {
      return this.format(this.getDay(), this.userFormat);
    },
    dateFormatted(): string {
      return this.format(this.getDay(), 'Y-m-d');
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
      if (this.isForAnotherMonth) {
        return this.getElementCssClass('otherMonthDay');
      }

      if (this.isFirstDayOfRange) {
        return this.getElementCssClass('inRangeFirstDay');
      }

      if (this.isLastDayOfRange) {
        return this.getElementCssClass('inRangeLastDay');
      }

      if (this.isInRange) {
        return this.getElementCssClass('inRangeDay');
      }

      if (this.isSelected) {
        return this.getElementCssClass('selectedDay');
      }

      if (this.isActive && this.showActiveDate) {
        return this.getElementCssClass('activeDay');
      }

      if (this.isHighlighted) {
        return this.getElementCssClass('highlightedDay');
      }

      if (this.isToday) {
        return this.getElementCssClass('today');
      }

      return this.getElementCssClass('day');
    },
    getDay(): Date {
      return this.day as unknown as Date;
    },

  },
  render(createElement: CreateElement): VNode {
    if (this.isForAnotherMonth && !this.showDaysForOtherMonth) {
      return createElement(
        'span',
        {
          class: this.getElementCssClass('emptyDay'),
        },
        '',
      );
    }

    const daySlot = this.$scopedSlots.day
      ? this.$scopedSlots.day({
        dayFormatted: this.dayFormatted,
        isForAnotherMonth: this.isForAnotherMonth,
        isFirstDayOfRange: this.isFirstDayOfRange,
        isLastDayOfRange: this.isLastDayOfRange,
        isInRange: this.isInRange,
        isSelected: this.isSelected,
        isActive: this.isActive,
        isHighlighted: this.isHighlighted,
        isToday: this.isToday,
        day: this.getDay(),
        activeDate: this.activeDate,
        value: this.value,
      }) : this.dayFormatted;

    return createElement(
      'button',
      {
        class: this.getClass(),
        attrs: {
          'aria-label': this.ariaLabel,
          'aria-current': this.isToday ? 'date' : undefined,
          'data-date': this.dateFormatted,
          type: 'button',
          tabindex: -1,
          disabled: this.isDisabled ? true : undefined,
        },
        on: {
          click: (e: MouseEvent) => this.$emit('click', e),
        },
      },
      daySlot,
    );
  },
});

export default TDatepickerViewsViewCalendarDaysDay;
