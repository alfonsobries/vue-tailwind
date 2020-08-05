import Component from '@/base/Component';
import { CreateElement, VNode } from 'vue';

const TDatepickerDaysDay = Component.extend({
  name: 'TDatepickerDaysDay',

  props: {
    day: {
      type: Date,
      required: true,
    },
    value: {
      type: Date,
      required: true,
    },
  },

  render(createElement: CreateElement): VNode {
    const day: Date = this.day as Date;
    return createElement(
      'button',
      {
        class: '',
      },
      day.getDate(),
    );
  },

  methods: {
    getDay(): Date {
      return this.day as Date;
    },
  },
});

export default TDatepickerDaysDay;
