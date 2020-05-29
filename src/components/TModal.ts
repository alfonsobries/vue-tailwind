import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Component from '@/base/Component';
import Vue, { CreateElement, VNode } from 'vue';


const TModal = Component.extend({
  name: 'TModal',

  props: {
    name: {
      type: String,
      default: undefined,
    },
    value: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
      default: undefined,
    },
    footer: {
      type: String,
      default: undefined,
    },
    clickToClose: {
      type: Boolean,
      default: true,
    },
    escToClose: {
      type: Boolean,
      default: true,
    },
    pivotY: {
      type: Number,
      default: 0.2,
    },
    noBody: {
      type: Boolean,
      default: false,
    },
    hideCloseButton: {
      type: Boolean,
      default: false,
    },
    disableBodyScroll: {
      type: Boolean,
      default: true,
    },
    focusOnOpen: {
      type: Boolean,
      default: true,
    },
    classes: {
      type: Object,
      default() {
        return {
          overlay: 'z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black bg-opacity-50',
          wrapper: 'z-50 relative mx-auto my-0 max-w-lg',
          modal: 'bg-white shadow border overflow-hidden relative',
          body: '',
          header: '',
          footer: '',
          close: 'absolute right-0 top-0',
          closeIcon: 'h-5 w-5 fill-current',
        };
      },
    },
  },

  data() {
    return {
      localShow: this.value,
      params: undefined,
    };
  },

  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
  },

  watch: {
    value(value) {
      this.localShow = value;
    },
    async localShow(shown) {
      this.$emit('input', shown);
      this.$emit('change', shown);

      if (shown) {
        this.beforeOpen();
        await this.$nextTick();
        this.opened();
      } else {
        this.beforeClose();
        await this.$nextTick();
        this.closed();
      }
    },
  },

  created() {
    if (!Vue.prototype.$modal) {
      // eslint-disable-next-line no-param-reassign
      Vue.prototype.$modal = new Vue({
        methods: {
          show(name: string, params = undefined) {
            this.$emit(`show-${name}`, params);
          },
          hide(name: string) {
            this.$emit(`hide-${name}`);
          },
        },
      });
    }

    if (this.name) {
      this.$modal.$on(`show-${this.name}`, (params = undefined) => {
        this.show(params);
      });

      this.$modal.$on(`hide-${this.name}`, () => {
        this.hide();
      });
    }
  },

  mounted() {
    if (this.localShow) {
      this.prepareDomForModal();
    }
  },

  beforeDestroy() {
    if (this.disableBodyScroll) {
      enableBodyScroll(this.$refs.modal as HTMLDivElement);
    }
  },

  render(createElement) {
    const renderFun: (createElement: CreateElement) => VNode = this.render;
    return renderFun(createElement);
  },

  methods: {
    render(createElement: CreateElement) {
      if (!this.localShow) {
        return createElement();
      }

      return createElement(
        'div',
        {
          ref: 'overlay',
          attrs: {
            tabindex: 0,
          },
          class: this.getElementCssClass('overlay'),
          on: {
            keyup: this.keyupHandler,
            click: this.clickHandler,
          },
        },
        [
          this.renderWrapper(createElement),
        ],
      );
    },
    renderWrapper(createElement: CreateElement) {
      return createElement(
        'div',
        {
          ref: 'wrapper',
          class: this.getElementCssClass('wrapper'),
        },
        [
          this.renderModal(createElement),
        ],
      );
    },
    renderModal(createElement: CreateElement) {
      return createElement(
        'div',
        {
          ref: 'modal',
          class: this.getElementCssClass('modal'),
        },
        this.renderChilds(createElement),
      );
    },
    renderChilds(createElement: CreateElement) {
      if (this.noBody) {
        return this.$slots.default;
      }

      const childs = [];

      if (!this.hideCloseButton) {
        childs.push(createElement(
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
          this.$slots.button
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
        ));
      }

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
    clickHandler(e: MouseEvent) {
      if (e.target === this.$refs.overlay) {
        this.outsideClick();
      }
    },
    keyupHandler(e: KeyboardEvent) {
      // Esc key
      if (e.keyCode === 27 && this.escToClose) {
        this.hide();
      }
    },
    beforeOpen() {
      this.$emit('before-open', { params: this.params });
    },
    opened() {
      this.$emit('opened', { params: this.params });
      this.prepareDomForModal();
    },
    beforeClose() {
      if (this.disableBodyScroll) {
        const mdl = this.$refs.modal as HTMLDivElement | undefined;
        if (mdl) {
          enableBodyScroll(mdl);
        }
      }
      this.$emit('before-close');
    },
    closed() {
      this.$emit('closed');
    },
    prepareDomForModal() {
      if (this.disableBodyScroll) {
        const mdl = this.$refs.modal as HTMLDivElement | undefined;
        if (mdl) {
          disableBodyScroll(mdl, {
            reserveScrollBarGap: true,
          });
        }
      }

      if (this.focusOnOpen) {
        const ovr = this.$refs.overlay as HTMLDivElement | undefined;
        if (ovr) {
          ovr.focus();
        }
      }
    },
    hide() {
      this.localShow = false;
    },
    show(params = undefined) {
      this.params = params;
      this.localShow = true;
    },
    outsideClick() {
      if (this.clickToClose) {
        this.hide();
      }
    },
  },
});

export default TModal;
