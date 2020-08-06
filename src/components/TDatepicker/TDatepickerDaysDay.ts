import Vue, { CreateElement, VNode } from 'vue';


const TDatepickerDaysDay = Vue.extend({
  name: 'TDatepickerDaysDay',

  props: {
    day: {
      type: Date,
      required: true,
    },
    locale: {
      type: String,
      required: true,
    },
    value: {
      type: Date,
      required: true,
    },
  },

  computed: {
    dateFormatter() : Intl.DateTimeFormat {
      return new Intl.DateTimeFormat(this.locale, {
        day: 'numeric',
      });
    },
  },

  methods: {
    getDay(): string {
      return this.dateFormatter.format(new Date(this.day));
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'button',
      {
        class: '',
      },
      this.getDay(),
    );
  },
});

export default TDatepickerDaysDay;
