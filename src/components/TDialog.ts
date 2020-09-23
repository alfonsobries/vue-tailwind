import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Vue, { CreateElement, VNode } from 'vue';
import Component from '../base/Component';
import Key from '../types/Key';
import TDialogOverlay from './TDialog/TDialogOverlay';

const TDialog = Component.extend({
  name: 'TDialog',

  props: {
    titleTag: {
      type: String,
      default: 'h3',
    },
    title: {
      type: String,
      default: undefined,
    },
    htmlTitle: {
      type: String,
      default: undefined,
    },
    icon: {
      type: String,
      default: undefined,
    },
    htmlIcon: {
      type: String,
      default: undefined,
    },
    textTag: {
      type: String,
      default: 'p',
    },
    text: {
      type: String,
      default: undefined,
    },
    htmlText: {
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
    showAltButton: {
      type: Boolean,
      default: false,
    },
    altButtonText: {
      type: String,
      default: 'Cancel',
    },
    altButtonAriaLabel: {
      type: String,
      default: undefined,
    },
    showPrimaryButton: {
      type: Boolean,
      default: true,
    },
    primaryButtonText: {
      type: String,
      default: 'OK',
    },
    primaryButtonAriaLabel: {
      type: String,
      default: undefined,
    },
    showCloseButton: {
      type: Boolean,
      default: true,
    },
    closeButtonHtml: {
      type: String,
      default: '@TODO',
    },
    disableBodyScroll: {
      type: Boolean,
      default: true,
    },
    focusOnOpen: {
      type: Boolean,
      default: true,
    },
    target: {
      type: String,
      default: 'body',
    },

    fixedClasses: {
      type: Object,
      default() {
        return {
          overlay: 'overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed',
          wrapper: 'relative mx-auto ',
          dialog: 'overflow-hidden relative',

          close: 'absolute right-0 top-0',
          closeIcon: '',
          content: 'mt-3',

          titleWrapper: '',
          title: 'text-lg leading-6 font-medium text-gray-900 text-center',

          textWrapper: 'mt-2 text-gray-600',
          text: '',

          iconWrapper: 'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100',
          icon: 'w-6 h-6 text-gray-700',

          overlayEnterClass: '',
          overlayEnterActiveClass: '',
          overlayEnterToClass: '',
          overlayLeaveClass: '',
          overlayLeaveActiveClass: '',
          overlayLeaveToClass: '',
          enterClass: '',
          enterActiveClass: '',
          enterToClass: '',
          leaveClass: '',
          leaveActiveClass: '',
          leaveToClass: '',
        };
      },
    },
    classes: {
      type: Object,
      default() {
        return {
          close: 'bg-gray-100 flex h-8 items-center justify-center m-1 rounded-full text-gray-700 w-8 hover:bg-gray-200',
          closeIcon: 'h-5 w-5 fill-current',

          overlay: 'z-40 bg-black bg-opacity-50',
          wrapper: 'z-50 max-w-lg',
          dialog: 'bg-white rounded p-4 text-left overflow-hidden shadow',

          iconWrapper: '',
          icon: '',
          content: '',

          titleWrapper: '',
          title: '',

          textWrapper: '',
          text: '',

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
      overlayShow: false,
      dialogShow: false,
      params: undefined,
      preventAction: false,
    };
  },

  watch: {
    async overlayShow(shown) {
      this.$emit('input', shown);
      this.$emit('change', shown);

      await this.$nextTick();

      if (shown) {
        this.dialogShow = true;
      } else {
        this.closed();
      }
    },
    async dialogShow(shown) {
      await this.$nextTick();

      if (!shown) {
        this.overlayShow = false;
      } else {
        this.opened();
      }
    },
  },

  created() {
    if (!Vue.prototype.$dialog) {
      // eslint-disable-next-line no-param-reassign
      // eslint-disable-next-line no-param-reassign
      Vue.prototype.$dialog = new Vue({
        methods: {
          alert(params = undefined) {
            this.$emit('dialog-alert', params);
          },
        },
      });
    }

    if (!Vue.prototype.$alert) {
      // eslint-disable-next-line no-param-reassign
      Vue.prototype.$alert = function alert(params = undefined) {
        this.$dialog.alert(params);
      };
    }

    // if (!Vue.prototype.$confirm) {
    //   // eslint-disable-next-line no-param-reassign
    //   Vue.prototype.$confirm = new Vue({
    //     methods: {
    //       show(name: string, params = undefined) {
    //         this.$emit(`show-${name}`, params);
    //       },
    //       hide(name: string) {
    //         this.$emit(`hide-${name}`);
    //       },
    //     },
    //   });
    // }
    // if (!Vue.prototype.$prompt) {
    //   // eslint-disable-next-line no-param-reassign
    //   Vue.prototype.$prompt = new Vue({
    //     methods: {
    //       show(name: string, params = undefined) {
    //         this.$emit(`show-${name}`, params);
    //       },
    //       hide(name: string) {
    //         this.$emit(`hide-${name}`);
    //       },
    //     },
    //   });
    // }

    // if (this.name) {
    //   this.$alert.$on(`show-${this.name}`, (params = undefined) => {
    //     this.show(params);
    //   });

    //   this.$alert.$on(`hide-${this.name}`, () => {
    //     this.hide();
    //   });
    // }

    this.$dialog.$on('dialog-alert', (params = undefined) => {
      this.show(params);
    });
  },

  beforeDestroy() {
    if (this.disableBodyScroll) {
      enableBodyScroll(this.$refs.modal as HTMLDivElement);
    }
  },

  render(createElement: CreateElement): VNode {
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
      [
        createElement(
          TDialogOverlay,
          {
            ref: 'overlay',
            props: {
              overlayShow: this.overlayShow,
              dialogShow: this.dialogShow,
              titleTag: this.titleTag,
              title: this.title,
              htmlTitle: this.htmlTitle,
              icon: this.icon,
              htmlIcon: this.htmlIcon,
              textTag: this.textTag,
              text: this.text,
              htmlText: this.htmlText,
              showAltButton: this.showAltButton,
              altButtonText: this.altButtonText,
              altButtonAriaLabel: this.altButtonAriaLabel,
              showPrimaryButton: this.showPrimaryButton,
              primaryButtonText: this.primaryButtonText,
              primaryButtonAriaLabel: this.primaryButtonAriaLabel,
              showCloseButton: this.showCloseButton,
              closeButtonHtml: this.closeButtonHtml,
              getElementCssClass: this.getElementCssClass,
            },
            on: {
              outsideClick: this.outsideClick,
              keyup: this.keyupHandler,
              hide: this.hide,
            },
          },
        ),
      ],
    );
  },

  methods: {
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
      this.prepareDomForDialog();
    },
    beforeClose() {
      if (this.disableBodyScroll) {
        const mdl = this.$refs.modal as HTMLDivElement | undefined;
        if (mdl) {
          enableBodyScroll(mdl);
        }
      }
      this.$emit('before-close', { cancel: this.cancel });
    },
    closed() {
      this.$emit('closed');
    },
    prepareDomForDialog() {
      if (this.disableBodyScroll) {
        const mdl = this.$refs.dialog as HTMLDivElement | undefined;
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
        this.dialogShow = false;
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

export default TDialog;
