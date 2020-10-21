import Vue, { CreateElement, VNode } from 'vue';
import TDialogOverlayWrapperTransitionDialog, { DialogInput } from './TDialogOverlayWrapperTransitionDialog';

const TDialogOverlayWrapperTransition = Vue.extend({
  name: 'TDialogOverlayWrapperTransition',

  props: {
    getElementCssClass: {
      type: Function,
      required: true,
    },
    dialogShow: {
      type: Boolean,
      required: true,
    },
    titleTag: {
      type: String,
      required: true,
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
      required: true,
    },
    text: {
      type: String,
      default: undefined,
    },
    cancelButtonText: {
      type: String,
      required: true,
    },
    cancelButtonAriaLabel: {
      type: String,
      default: undefined,
    },
    okButtonText: {
      type: String,
      required: true,
    },
    okButtonAriaLabel: {
      type: String,
      default: undefined,
    },
    showCloseButton: {
      type: Boolean,
      required: true,
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
      required: true,
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
      required: true,
    },
  },

  render(createElement: CreateElement): VNode {
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
      [
        createElement(
          TDialogOverlayWrapperTransitionDialog,
          {
            props: {
              getElementCssClass: this.getElementCssClass,
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
              type: this.type,
            },
            scopedSlots: this.$scopedSlots,
            on: {
              dismiss: (e: MouseEvent) => this.$emit('dismiss', e),
              cancel: (e: MouseEvent) => this.$emit('cancel', e),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              submit: (e: MouseEvent, input: DialogInput, response?: any) => this.$emit('submit', e, input, response),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              submitError: (e: MouseEvent, input: DialogInput, error?: any) => this.$emit('submitError', e, input, error),
            },
          },
          this.$slots.default,
        ),
      ],
    );
  },
});

export default TDialogOverlayWrapperTransition;
