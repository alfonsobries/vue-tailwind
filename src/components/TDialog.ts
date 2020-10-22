import { CreateElement, VNode } from 'vue';
import Component from '../base/Component';
import Key from '../types/Key';
import TDialogOverlay from './TDialog/TDialogOverlay';
import { DialogInput } from './TDialog/TDialogOverlayWrapperTransitionDialog';
import {
  HideReason, DialogType,
} from '../types/Dialog';

type InitialData = {
  overlayShow: boolean;
  dialogShow: boolean;
  params: undefined;
  preventAction: boolean;
  hideReason: HideReason | undefined;
  input?: DialogInput;
  resolve: null | ((value?: unknown) => void);
  reject: null | ((reason?: unknown) => void);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  preConfirmResponse: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  preConfirmError: any,
}

export type DialogResponse = {
  hideReason: HideReason;
  isOk: boolean;
  isCancel: boolean;
  isDismissed: boolean;
  input?: DialogInput;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any;
}

type BeforeCloseParams = {
  cancel: () => void;
  event: Event;
  reason: HideReason;
  input: DialogInput;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any;
}

const getInitialData = (vm: { value: boolean }): InitialData => ({
  overlayShow: vm.value,
  dialogShow: vm.value,
  params: undefined,
  preventAction: false,
  hideReason: undefined,
  input: undefined,
  resolve: null,
  reject: null,
  preConfirmResponse: undefined,
  preConfirmError: undefined,
});

const TDialog = Component.extend({
  name: 'TDialog',

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: undefined,
    },
    titleTag: {
      type: String,
      default: 'h3',
    },
    title: {
      type: String,
      default: undefined,
    },
    icon: {
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
    clickToClose: {
      type: Boolean,
      default: true,
    },
    escToClose: {
      type: Boolean,
      default: true,
    },
    cancelButtonText: {
      type: String,
      default: 'Cancel',
    },
    cancelButtonAriaLabel: {
      type: String,
      default: undefined,
    },
    okButtonText: {
      type: String,
      default: 'OK',
    },
    okButtonAriaLabel: {
      type: String,
      default: undefined,
    },
    showCloseButton: {
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
    preConfirm: {
      type: Function,
      default: undefined,
    },
    inputAttributes: {
      type: Object,
      default: undefined,
    },
    inputType: {
      type: String,
      default: 'text',
    },
    inputValidator: {
      type: Function,
      default: undefined,
    },
    inputValue: {
      type: [String, Array],
      default: undefined,
    },
    inputOptions: {
      type: [Array, Object],
      default: undefined,
    },
    inputPlaceholder: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: DialogType.Alert,
    },
    fixedClasses: {
      type: Object,
      default() {
        return {
          overlay: 'overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed',
          wrapper: 'relative mx-auto ',
          dialog: 'overflow-hidden relative',
          close: 'absolute right-0 top-0',
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
          wrapper: 'z-50 max-w-md',
          dialog: 'bg-white rounded p-4 text-left overflow-hidden shadow ',

          body: '',
          buttons: 'mt-4 flex space-x-4 justify-center',

          iconWrapper: 'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 flex-shrink-0',
          icon: 'w-6 h-6 text-gray-700',
          content: 'mt-3',

          titleWrapper: '',
          title: 'text-lg leading-6 font-medium text-gray-900 text-center',

          textWrapper: 'mt-2 text-gray-600',
          text: '',

          cancelButton: 'inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 w-full max-w-xs',
          okButton: 'inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 w-full max-w-xs',

          inputWrapper: 'mt-3 flex items-center space-x-4 justify-center',

          input: 'form-input w-full',
          select: 'form-select w-full',

          radioWrapper: 'flex items-center space-x-2',
          radio: 'form-radio',
          radioText: '',

          checkboxWrapper: 'flex items-center space-x-2',
          checkbox: 'form-checkbox',
          checkboxText: '',

          errorMessage: 'text-red-500 block text-sm',

          busyWrapper: 'absolute bg-opacity-50 bg-white flex h-full items-center justify-center left-0 top-0 w-full',
          busyIcon: 'animate-spin h-6 w-6 fill-current text-gray-500',

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
    return getInitialData(this);
  },

  watch: {
    value(value) {
      if (value) {
        this.show();
      } else {
        this.hideReason = HideReason.Value;
        this.close();
      }
    },
    async overlayShow(shown) {
      if (shown) {
        this.$emit('input', shown);
        this.$emit('change', shown);
        await this.$nextTick();
        this.dialogShow = true;
      } else {
        this.closed();
      }
    },
    async dialogShow(shown) {
      if (!shown) {
        this.$emit('input', shown);
        this.$emit('change', shown);
        await this.$nextTick();
        this.overlayShow = false;
      } else {
        this.opened();
      }
    },
  },

  beforeDestroy() {
    const overlay = this.getOverlay();
    if (this.disableBodyScroll && overlay) {
      overlay.focus();
      overlay.enableBodyScroll();
    }
  },

  created() {
    if (this.name) {
      this.$dialog.$on(`show-${this.name}`, (resolve: ((value?: unknown) => void), reject: ((value?: unknown) => void), params = undefined) => {
        this.resolve = resolve;
        this.reject = reject;
        this.show(params);
      });

      this.$dialog.$on(`hide-${this.name}`, () => {
        this.hideReason = HideReason.Method;
        this.close();
      });
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
              icon: this.icon,
              textTag: this.textTag,
              text: this.text,
              cancelButtonText: this.cancelButtonText,
              cancelButtonAriaLabel: this.cancelButtonAriaLabel,
              okButtonText: this.okButtonText,
              okButtonAriaLabel: this.okButtonAriaLabel,
              showCloseButton: this.showCloseButton,
              preConfirm: this.preConfirm,
              inputAttributes: this.inputAttributes,
              inputType: this.inputType,
              inputValidator: this.inputValidator,
              inputValue: this.inputValue,
              inputOptions: this.inputOptions,
              inputPlaceholder: this.inputPlaceholder,
              getElementCssClass: this.getElementCssClass,
            },
            scopedSlots: this.$scopedSlots,
            on: {
              outsideClick: this.outsideClick,
              keyup: this.keyupHandler,
              dismiss: (e: MouseEvent) => this.dismiss(e),
              cancel: (e: MouseEvent) => this.cancel(e),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              submit: (e: MouseEvent, input: DialogInput, response?: any) => this.submit(e, input, response),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              submitError: (e: MouseEvent, input: DialogInput, error?: any) => this.submitError(e, input, error),
            },
          },
          this.$slots.default,
        ),
      ],
    );
  },

  methods: {
    getOverlay() {
      return this.$refs.overlay as unknown as {
        focus: () => void,
        enableBodyScroll: () => void,
        disableBodyScroll: () => void,
      } | undefined;
    },
    keyupHandler(e: KeyboardEvent) {
      if (e.keyCode === Key.ESC && this.escToClose) {
        this.esc(e);
      }
    },
    beforeOpen() {
      this.$emit('before-open', { params: this.params, cancel: this.closeCancel });
    },
    opened() {
      this.$emit('opened', { params: this.params });
      this.prepareDomForDialog();
    },
    beforeClose(event?: Event) {
      if (this.disableBodyScroll) {
        const overlay = this.getOverlay();
        if (overlay) {
          overlay.focus();
          overlay.enableBodyScroll();
        }
      }

      const beforeCloseParams: Partial<BeforeCloseParams> = {
        cancel: this.closeCancel,
        event,
        reason: this.hideReason,
      };

      if (this.input !== undefined) {
        beforeCloseParams.input = this.input;
      }

      if (this.preConfirmResponse !== undefined) {
        beforeCloseParams.response = this.preConfirmResponse;
      }

      this.$emit('before-close', beforeCloseParams);
    },
    closed() {
      const response: Partial<DialogResponse> = {
        hideReason: this.hideReason,
        isOk: this.hideReason === HideReason.Ok,
        isCancel: this.hideReason === HideReason.Cancel,
        isDismissed: typeof this.hideReason === 'string' && [HideReason.Close, HideReason.Esc, HideReason.Outside].includes(this.hideReason),
      };

      if (this.type === DialogType.Prompt && this.hideReason === HideReason.Ok && this.input !== undefined) {
        response.input = this.input;
      }

      if (this.preConfirmResponse !== undefined) {
        response.response = this.preConfirmResponse;
      } else if (this.preConfirmError !== undefined) {
        response.response = this.preConfirmError;
      }

      this.$emit('closed', response);

      if (this.reject && this.preConfirmError !== undefined) {
        this.reject(this.preConfirmError);
      } else if (this.resolve) {
        this.resolve(response);
      }

      this.reset();
    },
    prepareDomForDialog() {
      const overlay = this.getOverlay();
      if (!overlay) {
        return;
      }

      if (this.disableBodyScroll) {
        overlay.disableBodyScroll();
      }

      if (this.focusOnOpen) {
        overlay.focus();
      }
    },
    dismiss(e: Event) {
      this.hideReason = HideReason.Close;

      this.close(e);
    },
    esc(e: Event) {
      this.hideReason = HideReason.Esc;

      this.close(e);
    },
    cancel(e: Event) {
      this.hideReason = HideReason.Cancel;

      this.close(e);
    },
    hide(e: Event) {
      this.hideReason = HideReason.Method;

      this.close(e);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    submit(e: Event, input: DialogInput, response?: any) {
      this.hideReason = HideReason.Ok;
      this.input = input;
      this.preConfirmResponse = response;

      this.close(e);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    submitError(e: Event, input: DialogInput, error?: any) {
      this.hideReason = HideReason.Ok;
      this.input = input;
      this.preConfirmError = error;

      this.close(e);
    },
    close(e?: Event) {
      this.beforeClose(e);

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
    closeCancel() {
      this.preventAction = true;
    },
    reset() {
      Object.assign(this.$data, getInitialData(this));
    },
    outsideClick(e: Event) {
      if (this.clickToClose) {
        this.hideReason = HideReason.Outside;
        this.close(e);
      }
    },
  },
});

export default TDialog;
