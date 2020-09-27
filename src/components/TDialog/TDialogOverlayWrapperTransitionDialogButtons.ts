import Vue, { CreateElement, VNode } from 'vue';

const TDialogOverlayWrapperTransitionDialogButtons = Vue.extend({
  name: 'TDialogOverlayWrapperTransitionDialogButtons',

  props: {
    getElementCssClass: {
      type: Function,
      required: true,
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
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'div',
      {
        class: this.getElementCssClass('buttons'),
      },
      [
        createElement(
          'button',
          {
            attrs: {
              type: 'button',
            },
            class: this.getElementCssClass('secondaryButton'),
          },
          this.dismissButtonText,
        ),
        createElement(
          'button',
          {
            attrs: {
              type: 'button',
            },
            class: this.getElementCssClass('primaryButton'),
          },
          this.primaryButtonText,
        ),
      ],
    );
  },
});

export default TDialogOverlayWrapperTransitionDialogButtons;
