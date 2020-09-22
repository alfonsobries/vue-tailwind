import Vue, { CreateElement, VNode } from 'vue';
import TDialogOverlayWrapperTransition from './TDialogOverlayWrapperTransition';

const TDialogOverlayWrapper = Vue.extend({
  name: 'TDialogOverlayWrapper',

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
    bodyTag: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      default: undefined,
    },
    htmlBody: {
      type: String,
      default: undefined,
    },
    showAltButton: {
      type: Boolean,
      required: true,
    },
    altButtonText: {
      type: String,
      required: true,
    },
    altButtonAriaLabel: {
      type: String,
      default: undefined,
    },
    showPrimaryButton: {
      type: Boolean,
      required: true,
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
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'div',
      {
        ref: 'wrapper',
        class: this.getElementCssClass('wrapper'),
      },
      [
        createElement(
          TDialogOverlayWrapperTransition,
          {
            props: {
              dialogShow: this.dialogShow,
              getElementCssClass: this.getElementCssClass,
              titleTag: this.titleTag,
              title: this.title,
              htmlTitle: this.htmlTitle,
              icon: this.icon,
              htmlIcon: this.htmlIcon,
              bodyTag: this.bodyTag,
              body: this.body,
              htmlBody: this.htmlBody,
              showAltButton: this.showAltButton,
              altButtonText: this.altButtonText,
              altButtonAriaLabel: this.altButtonAriaLabel,
              showPrimaryButton: this.showPrimaryButton,
              primaryButtonText: this.primaryButtonText,
              primaryButtonAriaLabel: this.primaryButtonAriaLabel,
              showCloseButton: this.showCloseButton,
              closeButtonHtml: this.closeButtonHtml,
            },
            on: {
              hide: () => this.$emit('hide'),
            },
          },
        ),
      ],
    );
  },
});

export default TDialogOverlayWrapper;
