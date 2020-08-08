import Vue, { CreateElement, VNode } from 'vue';
import TDatepickerNavigatorYearMonthSelectorYear from './TDatepickerNavigatorYearMonthSelectorYear';
import TDatepickerNavigatorYearMonthSelectorMonth from './TDatepickerNavigatorYearMonthSelectorMonth';

const TDatepickerNavigatorYearMonthSelector = Vue.extend({
  name: 'TDatepickerNavigatorYearMonthSelector',

  props: {
    dateFormatter: {
      type: Function,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    value: {
      type: Date,
      required: true,
    },
  },

  data() {
    const localValue: Date = this.value as unknown as Date;
    return {
      localValue,
    };
  },

  watch: {
    value(value) {
      this.localValue = value;
    },
    localValue(localValue) {
      this.$emit('input', localValue);
    },
  },

  methods: {
    inputHandler(newDate: Date): void {
      this.localValue = newDate;
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'div',
      {
        class: 'grid grid-cols-2',
      },
      [
        createElement(
          TDatepickerNavigatorYearMonthSelectorMonth,
          {
            props: {
              dateFormatter: this.dateFormatter,
              getElementCssClass: this.getElementCssClass,
              value: this.value,
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
              dateFormatter: this.dateFormatter,
              getElementCssClass: this.getElementCssClass,
              value: this.value,
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
