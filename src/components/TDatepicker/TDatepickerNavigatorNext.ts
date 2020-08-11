import Vue, { CreateElement, VNode } from 'vue';

const TDatepickerNavigatorNext = Vue.extend({
  name: 'TDatepickerNavigatorNext',

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
    prevMonth(): void {
      const newDate = new Date(this.localValue.valueOf());
      newDate.setMonth(newDate.getMonth() - 1);
      this.inputHandler(newDate);
    },
    nextMonth(): void {
      const newDate = new Date(this.localValue.valueOf());
      newDate.setMonth(newDate.getMonth() + 1);
      this.inputHandler(newDate);
    },
    inputHandler(newDate: Date): void {
      this.$emit('input', newDate);
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'button',
      {
        attrs: {
          type: 'button',
          class: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 rounded-full p-1 -mr-1',
        },
        on: {
          click: this.nextMonth,
        },
      },
      [
        createElement(
          'svg',
          {
            attrs: {
              fill: 'none',
              viewBox: '0 0 24 24',
              stroke: 'currentColor',
            },
            class: 'h-6 w-6 text-gray-500 inline-flex',
          },
          [
            createElement('path', {
              attrs: {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                d: 'M9 5l7 7-7 7',
              },
            }),
          ],
        ),
      ],
    );
  },

});

export default TDatepickerNavigatorNext;
