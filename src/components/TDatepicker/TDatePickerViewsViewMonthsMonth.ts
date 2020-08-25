import Vue, { CreateElement, VNode } from 'vue';
import CssClass from '@/types/CssClass';
import {
  createDateFormatter, isSameMonth,
} from '@/utils/dates';
import { english } from '@/l10n/default';

const TDatePickerViewsViewMonthsMonth = Vue.extend({
  name: 'TDatePickerViewsViewMonthsMonth',

  props: {
    month: {
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
    getElementCssClass: {
      type: Function,
      required: true,
    },
    showActiveDate: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      dateFormatter: createDateFormatter({ l10n: english }),
    };
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
      return this.dateFormatter(this.getMonth(), 'M');
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
      this.monthFormatted,
    );
  },
});

export default TDatePickerViewsViewMonthsMonth;
