import Vue, { CreateElement, VNode } from 'vue';
import CssClass from '@/types/CssClass';

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
    showActiveDate: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      localActiveDate: new Date(this.value.valueOf()),
    };
  },

  computed: {
    isSelected(): boolean {
      const d1 = this.year as unknown as Date;
      const d2 = this.value as unknown as Date;
      return d2 && d1.getFullYear() === d2.getFullYear();
    },
    isActive(): boolean {
      const d1 = this.year as unknown as Date;
      const d2 = this.activeDate as unknown as Date;
      return d2 && d1.getFullYear() === d2.getFullYear();
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
    getYear(): string {
      return this.dateFormatter(this.year, 'Y');
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
      this.getYear(),
    );
  },
});

export default TDatePickerViewsViewYearsYear;
