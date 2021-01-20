import Component from './Component';

type EventListenerOptions = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key: string]: Function | Function[];
} | undefined

const HtmlInput = Component.extend({
  props: {
    id: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: undefined,
    },
    autofocus: {
      type: Boolean,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: undefined,
    },
    tabindex: {
      type: [String, Number],
      default: undefined,
    },
  },
  methods: {
    getListeners(listeners: EventListenerOptions): EventListenerOptions {
      return {
        ...this.$listeners,
        ...listeners,
      };
    },
  },
});

export default HtmlInput;
