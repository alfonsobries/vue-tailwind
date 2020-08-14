import Vue, { CreateElement, VNode } from 'vue';
import CssClass from '@/types/CssClass';

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
    dateFormatter: {
      type: Function,
      required: true,
    },
    showDaysForOtherMonth: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
    };
  },

  computed: {
    isSelected(): boolean {
      const d1 = this.day as unknown as Date;
      const d2 = this.value as unknown as Date;
      return d2 && d1.getFullYear() === d2.getFullYear()
        && d1.getMonth() === d2.getMonth()
        && d1.getDate() === d2.getDate();
    },
    isActive(): boolean {
      const d1 = this.day as unknown as Date;
      const d2 = this.localActiveDate as unknown as Date;
      return d2 && d1.getFullYear() === d2.getFullYear()
        && d1.getMonth() === d2.getMonth()
        && d1.getDate() === d2.getDate();
    },
    // @TODO
    isDisabled(): boolean {
      return false;
    },
    isForAnotherMonth(): boolean {
      const d1 = this.localActiveDate as unknown as Date;
      const d2 = this.day as unknown as Date;
      return d1.getFullYear() !== d2.getFullYear()
        || d1.getMonth() !== d2.getMonth();
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

      if (this.isActive) {
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
    getDay(): string {
      return this.dateFormatter(this.day, 'j');
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
        },
        on: {
          click: (e: MouseEvent) => this.$emit('click', e),
        },
      },
      this.getDay(),
    );
  },
});

export default TDatePickerViewsViewCalendarDaysDay;
