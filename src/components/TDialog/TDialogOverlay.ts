import Vue, { CreateElement, VNode } from 'vue';
import TDialogOverlayWrapper from './TDialogOverlayWrapper';

const TDialogOverlay = Vue.extend({
  name: 'TDialogOverlay',

  props: {
    getElementCssClass: {
      type: Function,
      required: true,
    },
    overlayShow: {
      type: Boolean,
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
    icon: {
      type: String,
      default: undefined,
    },
    htmlIcon: {
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
      default: null,
    },
  },

  methods: {
    clickHandler(e: MouseEvent) {
      if (e.target !== this.$el) {
        return;
      }

      this.$emit('outsideClick', e);
    },
    keyupHandler(e: KeyboardEvent) {
      this.$emit('keyup', e);
    },
    focus() {
      (this.$el as HTMLDivElement).focus();
    },
  },

  render(createElement: CreateElement): VNode {
    if (!this.overlayShow) {
      return createElement();
    }

    return createElement(
      'div',
      {
        attrs: {
          tabindex: 0,
        },
        class: this.getElementCssClass('overlay'),
        on: {
          keyup: this.keyupHandler,
          click: this.clickHandler,
        },
      },
      [
        createElement(
          TDialogOverlayWrapper,
          {
            props: {
              type: this.type,
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

export default TDialogOverlay;
