import Vue, { CreateElement, VNode } from 'vue';
import TDialogOverlayWrapperTransitionDialogContent from './TDialogOverlayWrapperTransitionDialogContent';
import TDialogOverlayWrapperTransitionDialogIcon from './TDialogOverlayWrapperTransitionDialogIcon';
import TDialogOverlayWrapperTransitionDialogClose from './TDialogOverlayWrapperTransitionDialogClose';
import TDialogOverlayWrapperTransitionDialogLoader from './TDialogOverlayWrapperTransitionDialogLoader';
import TDialogOverlayWrapperTransitionDialogButtons from './TDialogOverlayWrapperTransitionDialogButtons';

export type DialogInput = string | string[] | null;

type ResolvableParam = undefined | ((val: DialogInput) => string | null | (Promise<string | null>));

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

  data() {
    return {
      currentValue: null as DialogInput,
      errorMessage: '',
      busy: false,
    };
  },

  methods: {
    submitHandler(e: MouseEvent) {
      return this.resolveParam(this.inputValidator as ResolvableParam, this.currentValue)
        .then((errorMessage) => {
          if (errorMessage && typeof errorMessage === 'string') {
            this.errorMessage = String(errorMessage);
            return;
          }

          this.resolveParam(this.preConfirm as ResolvableParam, this.currentValue)
            .then((response) => {
              this.$emit('submit', e, this.currentValue, response);
            }).catch((error) => {
              this.$emit('submitError', e, this.currentValue, error);
            }).then(() => {
              this.busy = false;
            });
        }).catch((errorMessage) => {
          this.errorMessage = String(errorMessage);
        });
    },
    inputHandler(input: DialogInput) {
      this.errorMessage = '';
      this.currentValue = input;
    },
    resolveParam(resolvable: ResolvableParam, input: DialogInput): Promise<string | null> {
      if (typeof resolvable === 'function') {
        const result = resolvable(input);

        if (result instanceof Promise) {
          this.busy = true;
          return result;
        }

        return new Promise((resolve) => {
          resolve(result);
        });
      }

      return new Promise((resolve) => resolve());
    },
  },
  render(createElement: CreateElement): VNode {
    if (!this.dialogShow) {
      return createElement();
    }

    return createElement(
      'div',
      {
        ref: 'dialog',
        class: this.getElementCssClass('dialog'),
      },
      [
        createElement(
          TDialogOverlayWrapperTransitionDialogLoader,
          {
            props: {
              getElementCssClass: this.getElementCssClass,
              busy: this.busy,
            },
            scopedSlots: {
              loader: this.$scopedSlots.loader,
            },
          },
        ),
        createElement(
          TDialogOverlayWrapperTransitionDialogClose,
          {
            props: {
              getElementCssClass: this.getElementCssClass,
              showCloseButton: this.showCloseButton,
            },
            on: {
              dismiss: (e: MouseEvent) => this.$emit('dismiss', e),
            },
            scopedSlots: {
              closeButton: this.$scopedSlots.closeButton,
            },
          },
        ),
        createElement(
          'div',
          {
            ref: 'body',
            class: this.getElementCssClass('body'),
          },
          [
            createElement(
              TDialogOverlayWrapperTransitionDialogIcon,
              {
                props: {
                  getElementCssClass: this.getElementCssClass,
                  icon: this.icon,
                },
                scopedSlots: {
                  icon: this.$scopedSlots.icon,
                },
              },
            ),
            createElement(
              TDialogOverlayWrapperTransitionDialogContent,
              {
                props: {
                  getElementCssClass: this.getElementCssClass,
                  titleTag: this.titleTag,
                  title: this.title,
                  textTag: this.textTag,
                  text: this.text,
                  type: this.type,
                  inputAttributes: this.inputAttributes,
                  inputType: this.inputType,
                  inputValue: this.inputValue,
                  inputOptions: this.inputOptions,
                  inputPlaceholder: this.inputPlaceholder,
                  errorMessage: this.errorMessage,
                },
                on: {
                  input: this.inputHandler,
                },
                scopedSlots: {
                  title: this.$scopedSlots.title,
                },
              },
              this.$slots.default,
            ),
          ],
        ),
        createElement(
          TDialogOverlayWrapperTransitionDialogButtons,
          {
            props: {
              getElementCssClass: this.getElementCssClass,
              type: this.type,
              cancelButtonText: this.cancelButtonText,
              cancelButtonAriaLabel: this.cancelButtonAriaLabel,
              okButtonText: this.okButtonText,
              okButtonAriaLabel: this.okButtonAriaLabel,
            },
            on: {
              cancel: (e: MouseEvent) => this.$emit('cancel', e),
              submit: this.submitHandler,
            },
            scopedSlots: {
              buttons: this.$scopedSlots.buttons,
            },
          },
        ),
      ],
    );
  },
});

export default TDialogOverlayWrapperTransitionDialog;
