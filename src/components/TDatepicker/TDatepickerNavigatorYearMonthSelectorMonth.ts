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
          class: 'border',
          value: (new Date()).getFullYear(),
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
            value: this.dateFormatter(month, 'n'),
          },
        },
        this.dateFormatter(month, 'F'),
      )),
    );
  },

});

export default TDatepickerNavigatorYearMonthSelectorMonth;
