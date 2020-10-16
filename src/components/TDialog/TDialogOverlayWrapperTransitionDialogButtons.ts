import Vue, { CreateElement, VNode } from 'vue';
import { DialogType } from '../../types/Dialog';

const TDialogOverlayWrapperTransitionDialogButtons = Vue.extend({
  name: 'TDialogOverlayWrapperTransitionDialogButtons',

  props: {
    getElementCssClass: {
      type: Function,
      required: true,
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
    type: {
      type: String,
      required: true,
    },
  },

  methods: {
    cancel(e?: MouseEvent) {
      this.$emit('cancel', e);
    },
    ok(e?: MouseEvent) {
      this.$emit('submit', e);
    },
  },

  render(createElement: CreateElement): VNode {
    const type: DialogType = this.type as DialogType;

    if (this.$scopedSlots.buttons) {
      return createElement(
        'div',
        {
          class: this.getElementCssClass('buttons'),
        },
        [
          this.$scopedSlots.buttons({
            cancelButtonAriaLabel: this.cancelButtonAriaLabel,
            okButtonAriaLabel: this.okButtonAriaLabel,
            cancelButtonText: this.cancelButtonText,
            okButtonText: this.okButtonText,
            okButtonClass: this.getElementCssClass('okButton'),
            cancelButtonClass: this.getElementCssClass('cancelButton'),
            dialogType: type,
            cancel: this.cancel,
            ok: this.ok,
          }),
        ],
      );
    }

    const subElements = [];

    const buttons = {
      cancel: createElement(
        'button',
        {
          attrs: {
            type: 'button',
            'aria-label': this.cancelButtonAriaLabel,
          },
          class: this.getElementCssClass('cancelButton'),
          on: {
            click: this.cancel,
          },
        },
        this.cancelButtonText,
      ),
      ok: createElement(
        'button',
        {
          attrs: {
            type: 'button',
            'aria-label': this.okButtonAriaLabel,
          },
          class: this.getElementCssClass('okButton'),
          on: {
            click: this.ok,
          },
        },
        this.okButtonText,
      ),
    };

    if (type === DialogType.Alert) {
      subElements.push(buttons.ok);
    } else if (type === DialogType.Confirm || type === DialogType.Prompt) {
      subElements.push(buttons.cancel);
      subElements.push(buttons.ok);
    }

    return createElement(
      'div',
      {
        class: this.getElementCssClass('buttons'),
      },
      subElements,
    );
  },
});

export default TDialogOverlayWrapperTransitionDialogButtons;
