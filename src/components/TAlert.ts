import { CreateElement, VNode } from 'vue';
import Component from '../base/Component';

const TAlert = Component.extend({
  name: 'TAlert',

  props: {
    tagName: {
      type: String,
      default: 'div',
    },
    bodyTagName: {
      type: String,
      default: 'div',
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    timeout: {
      type: Number,
      default: undefined,
    },
    classes: {
      type: Object,
      default() {
        return {
          wrapper: 'relative flex items-center p-4 bg-blue-50 border-l-4 border-blue-500 rounded shadow-sm',
          body: 'flex-grow',
          close: 'absolute relative flex items-center justify-center flex-shrink-0 w-6 h-6 ml-4 text-blue-500 transition duration-100 ease-in-out rounded hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
          closeIcon: 'fill-current h-4 w-4',
        };
      },
    },
  },

  data() {
    return {
      localShow: this.show,
    };
  },

  render(createElement) {
    const renderFun: (createElement: CreateElement) => VNode = this.render;
    return renderFun(createElement);
  },

  watch: {
    show(show) {
      this.localShow = show;
    },
    localShow(localShow) {
      this.$emit('update:show', localShow);
      if (this.localShow) {
        this.$emit('shown');
        if (this.timeout) {
          this.initTimeout();
        }
      } else {
        this.$emit('hidden');
      }
    },
  },

  mounted() {
    if (this.localShow && this.timeout) {
      this.initTimeout();
    }
  },

  methods: {
    render(createElement: CreateElement) {
      if (!this.localShow) {
        return createElement();
      }

      return createElement(
        this.tagName,
        {
          class: this.getElementCssClass('wrapper'),
        },
        !this.dismissible
          ? [
            createElement(
              this.bodyTagName,
              {
                ref: 'body',
                class: this.getElementCssClass('body'),
              },
              this.$slots.default,
            ),
          ]
          : [
            createElement(
              this.bodyTagName,
              {
                ref: 'body',
                class: this.getElementCssClass('body'),
              },
              this.$slots.default,
            ),
            createElement(
              'button',
              {
                ref: 'close',
                class: this.getElementCssClass('close'),
                attrs: {
                  type: 'button',
                },
                on: {
                  click: this.hide,
                },
              },
              this.$slots.close
              || [
                createElement(
                  'svg',
                  {
                    attrs: {
                      fill: 'currentColor',
                      xmlns: 'http://www.w3.org/2000/svg',
                      viewBox: '0 0 20 20',
                    },
                    class: this.getElementCssClass('closeIcon'),
                  },
                  [
                    createElement('path', {
                      attrs: {
                        'clip-rule': 'evenodd',
                        'fill-rule': 'evenodd',
                        d: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z',
                      },
                    }),
                  ],
                ),
              ],
            ),
          ],
      );
    },
    initTimeout() {
      setTimeout(() => {
        this.hide();
      }, this.timeout);
    },
    hide() {
      this.localShow = false;
    },
  },
});

export default TAlert;
