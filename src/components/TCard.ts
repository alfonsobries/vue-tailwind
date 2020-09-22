import { CreateElement, VNode } from 'vue';
import Component from '../base/Component';

const TCard = Component.extend({
  name: 'TCard',

  props: {
    tagName: {
      type: String,
      default: 'div',
    },
    header: {
      type: String,
      default: undefined,
    },
    footer: {
      type: String,
      default: undefined,
    },
    noBody: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: Object,
      default: undefined,
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
          class: this.getElementCssClass('wrapper'),
        },
        this.renderChilds(createElement),
      );
    },
    renderChilds(createElement: CreateElement) {
      if (this.noBody) {
        return this.$slots.default;
      }

      const childs = [];

      if (!!this.$slots.header || this.header !== undefined) {
        childs.push(createElement(
          'div',
          {
            ref: 'header',
            class: this.getElementCssClass('header'),
          },
          this.$slots.header || this.header,
        ));
      }

      childs.push(createElement(
        'div',
        {
          ref: 'body',
          class: this.getElementCssClass('body'),
        },
        this.$slots.default,
      ));

      if (!!this.$slots.footer || this.footer !== undefined) {
        childs.push(createElement(
          'div',
          {
            ref: 'footer',
            class: this.getElementCssClass('footer'),
          },
          this.$slots.footer || this.footer,
        ));
      }

      return childs;
    },
  },
});

export default TCard;
