import Vue, { CreateElement, VNode } from 'vue';

const TDatepickerNavigatorYearMonthSelectorMonth = Vue.extend({
  name: 'TDatepickerNavigatorYearMonthSelectorMonth',

  props: {
    getElementCssClass: {
      type: Function,
      required: true,
    },
    value: {
      type: Date,
      default: null,
    },
    formatNative: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      localValue: new Date(this.value.valueOf()),
    };
  },

  computed: {
    months(): Date[] {
      const d = new Date();
      return Array
        .from({ length: 12 }, (_x, i) => i)
        .map((month: number) => new Date(d.setMonth(month)));
    },
  },

  watch: {
    value(value: Date) {
      this.localValue = new Date(value.valueOf());
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'select',
      {
        attrs: {
          class: 'pl-3 text-center text-gray-600 hover:bg-gray-200 focus:text-gray-700 focus:text-gray-700 border rounded-sm appearance-none',
        },
        on: {
          input: (e: InputEvent) => {
            const target = (e.target as HTMLSelectElement);
            const newDate = new Date(this.localValue.valueOf());
            newDate.setMonth(Number(target.value) - 1);
            this.$emit('input', newDate);
          },
        },
      },
      this.months.map((month: Date) => createElement(
        'option',
        {
          attrs: {
            selected: month.getMonth() === this.localValue.getMonth() ? 'selected' : undefined,
            value: month.getMonth(),
          },
        },
        this.formatNative(month, 'F'),
      )),
    );
  },
});

export default TDatepickerNavigatorYearMonthSelectorMonth;
