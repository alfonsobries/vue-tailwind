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
      return new Date(year, 0, 1);
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
            value: this.value,
            getElementCssClass: this.getElementCssClass,
            dateFormatter: this.dateFormatter,
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
