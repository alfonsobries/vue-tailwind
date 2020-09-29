import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { CreateElement, VNode } from 'vue';
import Component from '../base/Component';
import Key from '../types/Key';
import TDialogOverlay from './TDialog/TDialogOverlay';
import {
  DismissReason, DialogType,
} from '../types/Dialog';

const getInitialData = () => ({
  overlayShow: false,
  dialogShow: false,
  params: undefined,
  preventAction: false,
  reasonToClose: null as DismissReason | null,
  resolve: null as null | ((value?: unknown) => void),
  reject: null as null | ((reason?: unknown) => void),
});

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
    dismissButtonText: {
      type: String,
      default: 'Cancel',
    },
    dismissButtonAriaLabel: {
      type: String,
      default: undefined,
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
    type: {
      type: String,
      default: DialogType.Alert,
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

          iconWrapper: 'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-200',
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
          body: '',
          buttons: 'mt-4 flex space-x-4',

          iconWrapper: '',
          icon: '',
          content: '',

          titleWrapper: '',
          title: '',

          textWrapper: '',
          text: '',

          secondaryButton: 'inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5',
          primaryButton: 'inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5',

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
    return getInitialData();
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

  // created() {
  //   // this.$dialog.$on('dialog-alert', (resolve: ((value?: unknown) => void), reject: ((value?: unknown) => void), params = undefined) => {
  //   //   this.resolve = resolve;
  //   //   this.reject = reject;
  //   //   this.show(DialogType.Alert, params);
  //   // });
  // },

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
              type: this.type,
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
              dismissButtonText: this.dismissButtonText,
              dismissButtonAriaLabel: this.dismissButtonAriaLabel,
              primaryButtonText: this.primaryButtonText,
              primaryButtonAriaLabel: this.primaryButtonAriaLabel,
              showCloseButton: this.showCloseButton,
              closeButtonHtml: this.closeButtonHtml,
              getElementCssClass: this.getElementCssClass,
            },
            on: {
              outsideClick: this.outsideClick,
              keyup: this.keyupHandler,
              hide: (e: MouseEvent, reason: DismissReason) => this.hide(e, reason),
            },
          },
        ),
      ],
    );
  },

  methods: {
    keyupHandler(e: KeyboardEvent) {
      if (e.keyCode === Key.ESC && this.escToClose) {
        this.hide(e, DismissReason.Esc);
      }
    },
    beforeOpen() {
      this.$emit('before-open', { params: this.params, cancel: this.cancel });
    },
    opened() {
      this.$emit('opened', { params: this.params });
      this.prepareDomForDialog();
    },
    beforeClose(event: Event, reason: DismissReason) {
      if (this.disableBodyScroll) {
        const mdl = this.$refs.modal as HTMLDivElement | undefined;
        if (mdl) {
          enableBodyScroll(mdl);
        }
      }

      this.$emit('before-close', {
        cancel: this.cancel,
        event,
        reason,
      });
    },
    closed() {
      this.$emit('closed');

      if (this.resolve) {
        this.resolve({
          meta: {
            reason: this.reasonToClose,
            // @TODO
            isConfirmed: true,
            isDenied: false,
            isDismissed: false,
          },
        });
      }

      this.reset();
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
    hide(e: Event, reason: DismissReason) {
      this.beforeClose(e, reason);

      if (!this.preventAction) {
        this.reasonToClose = reason;
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
    reset() {
      Object.assign(this.$data, getInitialData());
    },
    outsideClick(e: Event) {
      if (this.clickToClose) {
        this.hide(e, DismissReason.Outside);
      }
    },
  },
});

export default TDialog;
