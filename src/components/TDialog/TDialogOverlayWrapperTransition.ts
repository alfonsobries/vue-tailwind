import Vue, { CreateElement, VNode } from 'vue';
import TDialogOverlayWrapperTransitionDialog from './TDialogOverlayWrapperTransitionDialog';

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
    dismissButtonText: {
      type: String,
      required: true,
    },
    dismissButtonAriaLabel: {
      type: String,
      default: undefined,
    },
    primaryButtonText: {
      type: String,
      required: true,
    },
    primaryButtonAriaLabel: {
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
              dismissButtonText: this.dismissButtonText,
              dismissButtonAriaLabel: this.dismissButtonAriaLabel,
              primaryButtonText: this.primaryButtonText,
              primaryButtonAriaLabel: this.primaryButtonAriaLabel,
              showCloseButton: this.showCloseButton,
              closeButtonHtml: this.closeButtonHtml,
              type: this.type,
            },
            on: {
              hide: (e: MouseEvent) => this.$emit('hide', e),
            },
          },
        ),
      ],
    );
  },
});

export default TDialogOverlayWrapperTransition;
