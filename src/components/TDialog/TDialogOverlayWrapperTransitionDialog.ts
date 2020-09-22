import Vue, { CreateElement, VNode } from 'vue';

const TDialogOverlayWrapperTransitionDialog = Vue.extend({
  name: 'TDialogOverlayWrapperTransitionDialog',

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
    if (!this.dialogShow) {
      return createElement();
    }

    const subElements: VNode[] = [];

    if (this.showCloseButton) {
      subElements.push(createElement(
        'button',
        {
          ref: 'close',
          class: this.getElementCssClass('close'),
          attrs: {
            type: 'button',
          },
          on: {
            click: () => this.$emit('hide'),
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


    if (this.title || this.htmlTitle) {
      subElements.push(createElement(
        'div',
        {
          class: this.getElementCssClass('titleWrapper'),
          domProps: {
            innerHTML: this.htmlTitle,
          },
        },
        this.title ? [
          createElement(
            this.titleTag,
            {
              class: this.getElementCssClass('title'),
            },
            this.title,
          ),
        ] : undefined,
      ));
    }

    if (this.text || this.htmlText) {
      subElements.push(createElement(
        'div',
        {
          class: this.getElementCssClass('textWrapper'),
          domProps: {
            innerHTML: this.htmlText,
          },
        },
        this.text ? [
          createElement(
            this.textTag,
            {
              class: this.getElementCssClass('text'),
            },
            this.text,
          ),
        ] : undefined,
      ));
    }


    return createElement(
      'div',
      {
        ref: 'dialog',
        class: this.getElementCssClass('dialog'),
      },
      subElements,
    );
  },
});

export default TDialogOverlayWrapperTransitionDialog;
