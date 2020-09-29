import Vue, { CreateElement, VNode } from 'vue';
import TDialogOverlayWrapperTransitionDialogContent from './TDialogOverlayWrapperTransitionDialogContent';
import TDialogOverlayWrapperTransitionDialogIcon from './TDialogOverlayWrapperTransitionDialogIcon';
import TDialogOverlayWrapperTransitionDialogClose from './TDialogOverlayWrapperTransitionDialogClose';
import TDialogOverlayWrapperTransitionDialogButtons from './TDialogOverlayWrapperTransitionDialogButtons';
import { DismissReason } from '../../types/Dialog';

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
          TDialogOverlayWrapperTransitionDialogClose,
          {
            props: {
              getElementCssClass: this.getElementCssClass,
              showCloseButton: this.showCloseButton,
            },
            on: {
              hide: (e: MouseEvent) => this.$emit('hide', e, DismissReason.Close),
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
              dismissButtonText: this.dismissButtonText,
              dismissButtonAriaLabel: this.dismissButtonAriaLabel,
              primaryButtonText: this.primaryButtonText,
              primaryButtonAriaLabel: this.primaryButtonAriaLabel,
            },
          },
        ),
      ],
    );
  },
});

export default TDialogOverlayWrapperTransitionDialog;
