import Vue, { CreateElement, VNode } from 'vue';
import TDatepickerNavigatorYearMonthSelector from './TDatepickerNavigatorYearMonthSelector';

const TDatepickerNavigator = Vue.extend({
  name: 'TDatepickerNavigator',

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
        class: this.getElementCssClass(''),
      },
      [
        createElement(
          TDatepickerNavigatorYearMonthSelector,
          {
            props: {
              value: this.value,
              dateFormatter: this.dateFormatter,
              getElementCssClass: this.getElementCssClass,
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

export default TDatepickerNavigator;
