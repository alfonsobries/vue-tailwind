import Vue, { CreateElement, VNode } from 'vue';

import TDatePickerViewsViewYearsYear from './TDatePickerViewsViewYearsYear';
import { getYearsRange } from './TDatepickerNavigator';

const TDatePickerViewsViewYears = Vue.extend({
  name: 'TDatePickerViewsViewYears',

  props: {
    value: {
      type: Date,
      required: true,
    },
    activeDate: {
      type: Date,
      required: true,
    },
    locale: {
      type: String,
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
    yearsPerView: {
      type: Number,
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
    years(): Date[] {
      const [initialYear] = getYearsRange(this.localActiveDate, this.yearsPerView);
      return Array
        .from({ length: this.yearsPerView }, (_x, i) => i)
        .map((year) => this.getYear(initialYear + year));
    },
  },

  watch: {
    activeDate(activeDate: Date) {
      this.localActiveDate = new Date(activeDate.valueOf());
    },
  },


  methods: {
    getYear(year: number) {
      let newDate = new Date(this.localActiveDate.valueOf());
      newDate.setFullYear(year);

      // Means the current day has less days so the extra month is
      // in the following month
      if (newDate.getDate() !== this.localActiveDate.getDate()) {
        // Assign the last day of previous month
        newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);
      }

      return newDate;
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'div',
      {
        class: 'grid gap-1 grid-cols-4 ',
      },
      this.years.map((year: Date) => createElement(
        TDatePickerViewsViewYearsYear,
        {
          props: {
            year,
            locale: this.locale,
            activeDate: this.localActiveDate,
            value: this.value,
            getElementCssClass: this.getElementCssClass,
            dateFormatter: this.dateFormatter,
            showActiveDate: this.showActiveDate,
          },
          on: {
            click: () => this.$emit('input', year),
          },
        },
      )),
    );
  },
});

export default TDatePickerViewsViewYears;
