import Vue, { CreateElement, VNode } from 'vue';
import CssClass from '../../types/CssClass';
import { isSameMonth } from '../../utils/dates';

const TDatepickerViewsViewMonthsMonth = Vue.extend({
  name: 'TDatepickerViewsViewMonthsMonth',

  props: {
    month: {
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
    getElementCssClass: {
      type: Function,
      required: true,
    },
    formatNative: {
      type: Function,
      required: true,
    },
    showActiveDate: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    isSelected(): boolean {
      const d1 = this.getMonth();
      const d2 = this.value as Date | Date[];

      if (d2 instanceof Date) {
        return isSameMonth(d1, d2);
      }

      if (Array.isArray(d2)) {
        return d2.some((d) => isSameMonth(d, d1));
      }

      return false;
    },
    isActive(): boolean {
      const d1 = this.getMonth();
      const d2 = this.activeDate as unknown as Date;
      return isSameMonth(d1, d2);
    },
    monthFormatted(): string {
      return this.formatNative(this.getMonth(), 'M');
    },
  },

  methods: {
    getClass(): CssClass {
      if (this.isSelected) {
        return this.getElementCssClass('selectedMonth');
      }

      if (this.isActive && this.showActiveDate) {
        return this.getElementCssClass('activeMonth');
      }

      return this.getElementCssClass('month');
    },
    getMonth(): Date {
      return this.month as unknown as Date;
    },
  },

  render(createElement: CreateElement): VNode {
    const monthSlot = this.$scopedSlots.month
      ? this.$scopedSlots.month({
        monthFormatted: this.monthFormatted,
        isSelected: this.isSelected,
        isActive: this.isActive,
        month: this.getMonth(),
        activeDate: this.activeDate,
        value: this.value,
      }) : this.monthFormatted;

    return createElement(
      'button',
      {
        class: this.getClass(),
        attrs: {
          'aria-label': this.formatNative(this.getMonth(), 'F, Y'),
          'data-date': this.formatNative(this.getMonth(), 'Y-m'),
          type: 'button',
          tabindex: -1,
        },
        on: {
          click: (e: MouseEvent) => this.$emit('click', e),
        },
      },
      monthSlot,
    );
  },
});

export default TDatepickerViewsViewMonthsMonth;
