import Vue, { CreateElement, VNode } from 'vue';
import CssClass from '@/types/CssClass';

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
    getElementCssClass: {
      type: Function,
      required: true,
    },
    dateFormatter: {
      type: Function,
      required: true,
    },
  },

  computed: {
    isSelected(): boolean {
      const d1 = this.month as unknown as Date;
      const d2 = this.value as unknown as Date;
      return d2 && d1.getFullYear() === d2.getFullYear()
        && d1.getMonth() === d2.getMonth();
    },
  },

  methods: {
    getClass(): CssClass {
      if (this.isSelected) {
        return this.getElementCssClass('selectedMonth');
      }

      return this.getElementCssClass('month');
    },
    getMonth(): string {
      return this.dateFormatter(this.month, 'M');
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'button',
      {
        class: this.getClass(),
        on: {
          click: (e: MouseEvent) => this.$emit('click', e),
        },
      },
      this.getMonth(),
    );
  },
});

export default TDatePickerViewsViewMonthsMonth;
