import Vue, { CreateElement, VNode } from 'vue';

const TDatepickerNavigatorYearMonthSelectorMonth = Vue.extend({
  name: 'TDatepickerNavigatorYearMonthSelectorMonth',

  props: {
    dateFormatter: {
      type: Function,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    activeDate: {
      type: Date,
      required: true,
    },
  },

  computed: {
    months(): Date[] {
      const d = new Date();
      return Array
        .from({ length: 12 }, (_x, i) => i)
        .map((month: number) => new Date(d.setMonth(month)));
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'select',
      {
        attrs: {
          class: 'border',
          value: (new Date()).getFullYear(),
        },
        on: {
          // input: (e: InputEvent) => {
          //   const target = (e.target as HTMLInputElement);
          //   let numericValue = parseInt(target.value, 10);

          //   // eslint-disable-next-line no-restricted-globals
          //   if (isNaN(numericValue)) {
          //     numericValue = (new Date()).getFullYear();
          //   }

          //   if (target.value !== numericValue.toString()) {
          //     target.value = numericValue.toString();
          //   }

          //   this.$emit('input', numericValue);
          // },
        },
      },
      this.months.map((month: Date) => createElement(
        'option',
        {
          attrs: {
            value: this.dateFormatter(month, 'n'),
          },
        },
        this.dateFormatter(month, 'F'),
      )),
    );
  },

});

export default TDatepickerNavigatorYearMonthSelectorMonth;
