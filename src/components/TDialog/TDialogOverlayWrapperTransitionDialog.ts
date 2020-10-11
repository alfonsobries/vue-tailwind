import Vue, { CreateElement, VNode } from 'vue';
import TDialogOverlayWrapperTransitionDialogContent from './TDialogOverlayWrapperTransitionDialogContent';
import TDialogOverlayWrapperTransitionDialogIcon from './TDialogOverlayWrapperTransitionDialogIcon';
import TDialogOverlayWrapperTransitionDialogClose from './TDialogOverlayWrapperTransitionDialogClose';
import TDialogOverlayWrapperTransitionDialogLoader from './TDialogOverlayWrapperTransitionDialogLoader';
import TDialogOverlayWrapperTransitionDialogButtons from './TDialogOverlayWrapperTransitionDialogButtons';
import { HideReason } from '../../types/Dialog';

export type DialogInput = string | string[] | null;

type InputValidator = undefined | ((val: DialogInput) => string | null | (Promise<string | null>));

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
    inputParser: {
      type: Object,
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
      return this.validateInput(this.currentValue)
        .then((errorMessage) => {
          if (errorMessage && typeof errorMessage === 'string') {
            this.errorMessage = String(errorMessage);
            return;
          }

          this.$emit('submit', e, HideReason.Ok, this.currentValue);
        }).catch((errorMessage) => {
          this.errorMessage = String(errorMessage);
        }).then(() => {
          this.busy = false;
        });
    },
    inputHandler(input: DialogInput) {
      this.errorMessage = '';
      this.currentValue = input;
    },
    validateInput(input: DialogInput): Promise<string | null> {
      const inputValidator = this.inputValidator as InputValidator;

      if (typeof inputValidator === 'function') {
        const result = inputValidator(input);

        if (result instanceof Promise) {
          this.busy = true;
          return result;
        }

        return new Promise((resolve, reject) => {
          if (result) {
            reject(result);
          } else {
            resolve();
          }
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
              dismiss: (e: MouseEvent) => this.$emit('dismiss', e, HideReason.Close),
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
                  htmlIcon: this.htmlIcon,
                  icon: this.icon,
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
                  htmlTitle: this.htmlTitle,
                  textTag: this.textTag,
                  text: this.text,
                  htmlText: this.htmlText,
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
              },
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
              cancel: (e: MouseEvent) => this.$emit('cancel', e, HideReason.Cancel),
              submit: this.submitHandler,
            },
          },
        ),
      ],
    );
  },
});

export default TDialogOverlayWrapperTransitionDialog;
