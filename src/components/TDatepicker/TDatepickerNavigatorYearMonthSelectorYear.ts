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

            this.localValue = new Date(this.localValue.setFullYear(numericValue));
          },
        },
      },
      'zzzz',
    );
  },

});

export default TDatepickerNavigatorYearMonthSelectorYear;
