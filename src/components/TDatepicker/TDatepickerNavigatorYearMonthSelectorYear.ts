import Vue, { CreateElement, VNode } from 'vue';

const TDatepickerNavigatorYearMonthSelectorYear = Vue.extend({
  name: 'TDatepickerNavigatorYearMonthSelectorYear',

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

  render(createElement: CreateElement): VNode {
    return createElement(
      'input',
      {
        attrs: {
          inputmode: 'numeric',
          type: 'text',
          maxlength: '4',
          size: '4',
          class: 'border w-full h-full',
          value: this.localValue.getFullYear(),
        },
        on: {
          blur: (e: FocusEvent) => {
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
      },
      'zzzz',
    );
  },

});

export default TDatepickerNavigatorYearMonthSelectorYear;
