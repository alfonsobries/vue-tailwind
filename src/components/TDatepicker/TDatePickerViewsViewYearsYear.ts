import Vue, { CreateElement, VNode } from 'vue';
import CssClass from '@/types/CssClass';
import {
  formatDate,
} from '@/utils/dates';

const TDatePickerViewsViewYearsYear = Vue.extend({
  name: 'TDatePickerViewsViewYearsYear',

  props: {
    year: {
      type: Date,
      required: true,
    },
    locale: {
      type: String,
      required: true,
    },
    activeDate: {
      type: Date,
      required: true,
    },
    value: {
      type: [Date, Array],
      default: null,
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
      localActiveDate: new Date(this.activeDate.valueOf()),
    };
  },

  computed: {
    isSelected(): boolean {
      const d1 = this.getYear();
      const d2 = this.value as Date | Date[];

      if (d2 instanceof Date) {
        return d1.getFullYear() === d2.getFullYear();
      }

      if (Array.isArray(d2)) {
        return d2.some((d) => d.getFullYear() === d1.getFullYear());
      }

      return false;
    },
    isActive(): boolean {
      const d1 = this.getYear();
      const d2 = this.activeDate as unknown as Date;
      return d2 && d1.getFullYear() === d2.getFullYear();
    },
    yearFormatted(): string {
      return formatDate(this.getYear(), 'Y');
    },
  },

  watch: {
    activeDate(activeDate: Date) {
      this.localActiveDate = new Date(activeDate.valueOf());
    },
  },

  methods: {
    getClass(): CssClass {
      if (this.isSelected) {
        return this.getElementCssClass('selectedYear');
      }

      if (this.isActive && this.showActiveDate) {
        return this.getElementCssClass('activeYear');
      }

      return this.getElementCssClass('year');
    },
    getYear(): Date {
      return this.year as unknown as Date;
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
      this.yearFormatted,
    );
  },
});

export default TDatePickerViewsViewYearsYear;
