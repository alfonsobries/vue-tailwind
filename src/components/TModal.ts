import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Vue, { CreateElement, VNode } from 'vue';
import Component from '../base/Component';
import Key from '../types/Key';

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
    fixedClasses: {
      type: Object,
      default() {
        return {
          overlay: 'overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed',
          wrapper: 'relative mx-auto',
          modal: 'overflow-hidden relative ',
        };
      },
    },
    classes: {
      type: Object,
      default() {
        return {
          overlay: 'z-40 bg-black bg-opacity-50',
          wrapper: 'z-50 max-w-lg',
          modal: 'bg-white shadow',
          body: '',
          header: '',
          footer: '',
          close: 'absolute right-0 top-0',
          closeIcon: 'h-5 w-5 fill-current',
          overlayEnterClass: '',
          overlayEnterActiveClass: 'opacity-0 transition ease-out duration-100',
          overlayEnterToClass: 'opacity-100',
          overlayLeaveClass: 'transition ease-in opacity-100',
          overlayLeaveActiveClass: '',
          overlayLeaveToClass: 'opacity-0 duration-75',
          enterClass: '',
          enterActiveClass: '',
          enterToClass: '',
          leaveClass: '',
          leaveActiveClass: '',
          leaveToClass: '',
        };
      },
    },
  },

  data() {
    return {
      overlayShow: this.value,
      modalShow: this.value,
      params: undefined,
      preventAction: false,
    };
  },

  watch: {
    value(value) {
      if (value) {
        this.show();
      } else {
        this.hide();
      }
    },
    async overlayShow(shown) {
      this.$emit('input', shown);
      this.$emit('change', shown);

      await this.$nextTick();

      if (shown) {
        this.modalShow = true;
      } else {
        this.closed();
      }
    },
    async modalShow(shown) {
      await this.$nextTick();

      if (!shown) {
        this.overlayShow = false;
      } else {
        this.opened();
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
    if (this.overlayShow) {
      this.prepareDomForModal();
    }
  },

  beforeDestroy() {
    if (this.disableBodyScroll) {
      enableBodyScroll(this.$refs.overlay as HTMLDivElement);
    }
  },

  render(createElement) {
    const renderFun: (createElement: CreateElement) => VNode = this.render;
    return renderFun(createElement);
  },

  methods: {
    render(createElement: CreateElement) {
      return createElement(
        'transition',
        {
          props: {
            enterClass: this.getElementCssClass('overlayEnterClass'),
            enterActiveClass: this.getElementCssClass('overlayEnterActiveClass'),
            enterToClass: this.getElementCssClass('overlayEnterToClass'),
            leaveClass: this.getElementCssClass('overlayLeaveClass'),
            leaveActiveClass: this.getElementCssClass('overlayLeaveActiveClass'),
            leaveToClass: this.getElementCssClass('overlayLeaveToClass'),
          },
        },
        this.overlayShow ? [
          createElement(
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
          ),
        ] : undefined,
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
        'transition',
        {
          props: {
            enterClass: this.getElementCssClass('enterClass'),
            enterActiveClass: this.getElementCssClass('enterActiveClass'),
            enterToClass: this.getElementCssClass('enterToClass'),
            leaveClass: this.getElementCssClass('leaveClass'),
            leaveActiveClass: this.getElementCssClass('leaveActiveClass'),
            leaveToClass: this.getElementCssClass('leaveToClass'),
          },
        },
        this.modalShow ? [
          createElement(
            'div',
            {
              ref: 'modal',
              class: this.getElementCssClass('modal'),
            },
            this.renderChilds(createElement),
          ),
        ] : undefined,
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
      if (e.keyCode === Key.ESC && this.escToClose) {
        this.hide();
      }
    },
    beforeOpen() {
      this.$emit('before-open', { params: this.params, cancel: this.cancel });
    },
    opened() {
      this.$emit('opened', { params: this.params });
      this.prepareDomForModal();
    },
    beforeClose() {
      if (this.disableBodyScroll) {
        const mdl = this.$refs.overlay as HTMLDivElement | undefined;
        if (mdl) {
          enableBodyScroll(mdl);
        }
      }
      this.$emit('before-close', { cancel: this.cancel });
    },
    closed() {
      this.$emit('closed');
    },
    prepareDomForModal() {
      if (this.disableBodyScroll) {
        const mdl = this.$refs.overlay as HTMLDivElement | undefined;
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
      this.beforeClose();

      if (!this.preventAction) {
        this.modalShow = false;
      } else {
        this.preventAction = false;
      }
    },
    show(params = undefined) {
      this.params = params;

      this.beforeOpen();

      if (!this.preventAction) {
        this.overlayShow = true;
      } else {
        this.preventAction = false;
      }
    },
    cancel() {
      this.preventAction = true;
    },
    outsideClick() {
      if (this.clickToClose) {
        this.hide();
      }
    },
  },
});

export default TModal;
