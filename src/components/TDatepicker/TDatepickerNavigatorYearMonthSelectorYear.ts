import Vue, { CreateElement, VNode } from 'vue';

const TDatepickerNavigatorYearMonthSelectorYear = Vue.extend({
  name: 'TDatepickerNavigatorYearMonthSelectorYear',

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
    inputHandler(e: Event) {
      const target = (e.target as HTMLInputElement);


      let numericValue = parseInt(target.value, 10);

      // eslint-disable-next-line no-restricted-globals
      if (isNaN(numericValue)) {
        numericValue = this.localValue.getFullYear();
      }

      if (target.value !== numericValue.toString()) {
        target.value = numericValue.toString();
      }

      const newDate = new Date(this.localValue.valueOf());
      newDate.setFullYear(numericValue);
      this.$emit('input', newDate);
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'input',
      {
        attrs: {
          inputmode: 'numeric',
          type: 'number',
          step: 1,
          maxlength: '4',
          size: '4',
          class: 'p-0 pl-2 text-gray-600 w-16 focus:text-gray-200 focus:text-gray-700 rounded-sm border',
          value: this.localValue.getFullYear(),
        },
        on: {
          blur: (e: FocusEvent) => {
            this.inputHandler(e);
          },
          input: (e: InputEvent) => {
            // When the data is not undefined means it was update trough
            // the keyboard, in those case we only change in blur
            if (typeof e.data !== 'undefined') {
              return;
            }

            this.inputHandler(e);
          },
        },
      },
      'zzzz',
    );
  },

});

export default TDatepickerNavigatorYearMonthSelectorYear;
