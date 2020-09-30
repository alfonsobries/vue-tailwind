
import Vue, { CreateElement, VNode } from 'vue';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { HideReason } from '../../types/Dialog';
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
    enableBodyScroll() {
      const mdl = this.$el as HTMLDivElement;
      enableBodyScroll(mdl);
    },
    disableBodyScroll() {
      const mdl = this.$el as HTMLDivElement;
      disableBodyScroll(mdl, {
        reserveScrollBarGap: true,
      });
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
              cancelButtonText: this.cancelButtonText,
              cancelButtonAriaLabel: this.cancelButtonAriaLabel,
              okButtonText: this.okButtonText,
              okButtonAriaLabel: this.okButtonAriaLabel,
              showCloseButton: this.showCloseButton,
              closeButtonHtml: this.closeButtonHtml,
              inputAttributes: this.inputAttributes,
            },
            on: {
              dismiss: (e: MouseEvent, reason: HideReason) => this.$emit('dismiss', e, reason),
              cancel: (e: MouseEvent, reason: HideReason) => this.$emit('cancel', e, reason),
              submit: (e: MouseEvent, reason: HideReason) => this.$emit('submit', e, reason),
              input: (e: InputEvent) => this.$emit('input', e),
            },
          },
        ),
      ],
    );
  },
});

export default TDialogOverlay;
