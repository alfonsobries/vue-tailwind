import Vue, { CreateElement, VNode } from 'vue';
import { DialogType } from '../../types/Dialog';
import TDialogOverlayWrapperTransitionDialogContentInput from './TDialogOverlayWrapperTransitionDialogContentInput';

const TDialogOverlayWrapperTransitionDialogContent = Vue.extend({
  name: 'TDialogOverlayWrapperTransitionDialogContent',

  props: {
    getElementCssClass: {
      type: Function,
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
    type: {
      type: String,
      required: true,
    },
    inputAttributes: {
      type: Object,
      default: undefined,
    },
  },

  render(createElement: CreateElement): VNode {
    const subElements = [];

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

    if (this.type === DialogType.Prompt) {
      subElements.push(
        createElement(
          TDialogOverlayWrapperTransitionDialogContentInput,
          {
            props: {
              getElementCssClass: this.getElementCssClass,
              inputAttributes: this.inputAttributes,
            },
            on: {
              input: (e: InputEvent) => this.$emit('input', e),
            },
          },
        ),
      );
    }

    return createElement(
      'div',
      {
        class: this.getElementCssClass('content'),
      },
      subElements,
    );
  },
});

export default TDialogOverlayWrapperTransitionDialogContent;
