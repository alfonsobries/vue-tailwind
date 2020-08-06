import Vue, { CreateElement, VNode } from 'vue';
import TInput from '@/inputs/TInput';

const TDatepickerInput = Vue.extend({
  name: 'TDatepickerInput',

  props: {
    show: {
      type: Function,
      required: true,
    },
    hideIfFocusOutside: {
      type: Function,
      required: true,
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      TInput,
      {
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
