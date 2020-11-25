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
      default: () => ({
        wrapper: 'border rounded shadow-sm bg-white border-gray-100',
        body: 'p-3',
        header: 'border-b border-gray-100 p-3 rounded-t',
        footer: 'border-gray-100 border-t p-3 rounded-b',
      }),
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
