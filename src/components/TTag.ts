import { CreateElement, VNode } from 'vue';
import Component from '../base/Component';

const TTag = Component.extend({
  name: 'TTag',

  props: {
    text: {
      type: String,
      default: undefined,
    },
    tagName: {
      type: String,
      default: 'div',
    },
  },

  render(createElement) {
    const renderFun: (createElement: CreateElement) => VNode = this.render;
    return renderFun(createElement);
  },

  methods: {
    render(createElement: CreateElement) {
      return createElement(
        this.tagName,
        {
          class: this.componentClass,
        },
        this.text === undefined ? this.$slots.default : this.text,
      );
    },
  },
});

export default TTag;
