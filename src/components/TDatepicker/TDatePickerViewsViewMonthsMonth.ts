import Vue, { CreateElement, VNode } from 'vue';
import CssClass from '@/types/CssClass';
import {
  createDateFormatter,
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
      const d2 = this.value as unknown as Date;
      return d2 && d1.getFullYear() === d2.getFullYear()
        && d1.getMonth() === d2.getMonth();
    },
    isActive(): boolean {
      const d1 = this.getMonth();
      const d2 = this.activeDate as unknown as Date;
      return d2 && d1.getFullYear() === d2.getFullYear()
        && d1.getMonth() === d2.getMonth();
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
