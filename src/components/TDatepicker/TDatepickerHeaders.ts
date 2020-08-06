import Vue, { CreateElement, VNode } from 'vue';

const TDatepickerHeaders = Vue.extend({
  name: 'TDatepickerHeaders',

  props: {
    locale: {
      type: String,
      required: true,
    },
    weekStart: {
      type: Number,
      required: true,
    },
  },

  computed: {
    weekDays(): string[] {
      return Array.from({ length: 7 }, (_x, i) => {
        const weekDay = this.weekStart + i;
        if (weekDay >= 7) {
          return weekDay - 7;
        }

        return weekDay;
      }).map(this.getWeekDayName);
    },
    dateFormatter() : Intl.DateTimeFormat {
      return new Intl.DateTimeFormat(this.locale, {
        weekday: 'short',
      });
    },
  },

  methods: {
    getWeekDayName(weekDay: number): string {
      const date = new Date();
      date.setDate((date.getDate() + (7 + weekDay - date.getDay())) % 7);
      return this.dateFormatter.format(date).replace('.', '');
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'div',
      {
        class: 'grid gap-1 grid-cols-7 ',
      },
      this.weekDays.map((weekDayName: string) => createElement(
        'span',
        {
          class: 'uppercase text-sm text-gray-700',

        },
        weekDayName,
      )),
    );
  },

});

export default TDatepickerHeaders;
