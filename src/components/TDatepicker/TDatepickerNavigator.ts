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
        class: this.getElementCssClass(''),
      },
      [
        createElement(
          TDatepickerNavigatorYearMonthSelector,
          {
            props: {
              value: this.localValue,
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
