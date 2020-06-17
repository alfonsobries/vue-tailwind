import Component from '@/base/Component';
import { CreateElement, VNode } from 'vue';

const TTag = Component.extend({
  name: 'TTag',

  props: {
    text: {
      type: String,
      default: '',
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
          class: this.getElementCssClass(),
        },
        this.$slots.default || this.text,
      );
    },
  },
});

export default TTag;
