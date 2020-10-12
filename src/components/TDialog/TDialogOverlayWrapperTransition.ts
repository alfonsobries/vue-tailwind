import Vue, { CreateElement, VNode } from 'vue';
import { HideReason } from '../../types/Dialog';
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
      required: true,
    },
    text: {
      type: String,
      default: undefined,
    },
    htmlText: {
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
    closeButtonHtml: {
      type: String,
      required: true,
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
              htmlTitle: this.htmlTitle,
              icon: this.icon,
              htmlIcon: this.htmlIcon,
              textTag: this.textTag,
              text: this.text,
              htmlText: this.htmlText,
              cancelButtonText: this.cancelButtonText,
              cancelButtonAriaLabel: this.cancelButtonAriaLabel,
              okButtonText: this.okButtonText,
              okButtonAriaLabel: this.okButtonAriaLabel,
              showCloseButton: this.showCloseButton,
              closeButtonHtml: this.closeButtonHtml,
              inputAttributes: this.inputAttributes,
              inputType: this.inputType,
              inputValidator: this.inputValidator,
              inputValue: this.inputValue,
              inputOptions: this.inputOptions,
              inputPlaceholder: this.inputPlaceholder,
              type: this.type,
            },
            on: {
              dismiss: (e: MouseEvent, reason: HideReason) => this.$emit('dismiss', e, reason),
              cancel: (e: MouseEvent, reason: HideReason) => this.$emit('cancel', e, reason),
              submit: (e: MouseEvent, reason: HideReason, input: DialogInput) => this.$emit('submit', e, reason, input),
            },
          },
        ),
      ],
    );
  },
});

export default TDialogOverlayWrapperTransition;
