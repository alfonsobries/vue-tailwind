import Vue, { CreateElement, VNode } from 'vue';
import TInput from '@/inputs/TInput';
import { DateValue } from '@/utils/dates';

const TDatepickerInput = Vue.extend({
  name: 'TDatepickerInput',

  props: {
    value: {
      type: [Date, String, Number, Array],
      required: true,
    },
    show: {
      type: Function,
      required: true,
    },
    hideIfFocusOutside: {
      type: Function,
      required: true,
    },
    dateFormatter: {
      type: Function,
      required: true,
    },
    dateFormat: {
      type: String,
      required: true,
    },
  },

  render(createElement: CreateElement): VNode {
    const value = this.value as DateValue;
    return createElement(
      TInput,
      {
        props: {
          value: this.dateFormatter(value, this.dateFormat),
        },
        on: {
          focus: () => {
            this.show();
          },
          blur: (e: FocusEvent) => {
            this.hideIfFocusOutside(e);
          },
        },
      },
    );
  },
});

export default TDatepickerInput;
