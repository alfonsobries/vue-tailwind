import Vue, { CreateElement, VNode } from 'vue';
import TDatepickerNavigatorYearMonthSelectorYear from './TDatepickerNavigatorYearMonthSelectorYear';
import TDatepickerNavigatorYearMonthSelectorMonth from './TDatepickerNavigatorYearMonthSelectorMonth';

const TDatepickerNavigatorYearMonthSelector = Vue.extend({
  name: 'TDatepickerNavigatorYearMonthSelector',

  props: {
    getElementCssClass: {
      type: Function,
      required: true,
    },
    value: {
      type: Date,
      default: null,
    },
  },

  data() {
    return {
      localValue: new Date(this.value.valueOf()),
    };
  },

  watch: {
    value(value: Date) {
      this.localValue = new Date(value.valueOf());
    },
  },

  methods: {
    inputHandler(newDate: Date): void {
      this.$emit('input', newDate);
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'div',
      {
        class: 'flex',
      },
      [
        createElement(
          TDatepickerNavigatorYearMonthSelectorMonth,
          {
            props: {
              getElementCssClass: this.getElementCssClass,
              value: this.localValue,
            },
            on: {
              input: this.inputHandler,
            },
          },
        ),
        createElement(
          TDatepickerNavigatorYearMonthSelectorYear,
          {
            props: {
              getElementCssClass: this.getElementCssClass,
              value: this.localValue,
            },
            on: {
              input: this.inputHandler,
            },
          },
        ),
      ],
    );
  },

});

export default TDatepickerNavigatorYearMonthSelector;
