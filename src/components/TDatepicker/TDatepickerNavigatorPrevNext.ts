import Vue, { CreateElement, VNode } from 'vue';

const TDatepickerNavigatorPrevNext = Vue.extend({
  name: 'TDatepickerNavigatorPrevNext',

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
      'div',
      {
        class: 'grid grid-cols-2',
      },
      [
        createElement(
          'button',
          {
            attrs: {
              type: 'button',
            },
            on: {
              click: this.prevMonth,
            },
          },
          '<',
        ),
        createElement(
          'button',
          {
            attrs: {
              type: 'button',
            },
            on: {
              click: this.nextMonth,
            },
          },
          '>',
        ),
      ],
    );
  },

});

export default TDatepickerNavigatorPrevNext;
