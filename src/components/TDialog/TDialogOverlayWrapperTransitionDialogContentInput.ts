import Vue, { CreateElement, VNode } from 'vue';

const TDialogOverlayWrapperTransitionDialogContentInput = Vue.extend({
  name: 'TDialogOverlayWrapperTransitionDialogContentInput',

  props: {
    getElementCssClass: {
      type: Function,
      required: true,
    },
    inputAttributes: {
      type: Object,
      default: undefined,
    },
  },

  render(createElement: CreateElement): VNode {
    return createElement(
      'div',
      {
        ref: 'inputWrapper',
        class: this.getElementCssClass('inputWrapper'),
      },
      [
        createElement('input', {
          class: this.getElementCssClass('input'),
          ref: 'input',
          // domProps: {
          //   value: this.localValue,
          // },
          attrs: this.inputAttributes,
          on: {
            input: (e: InputEvent) => this.$emit('input', e)
          },
      ],
    );
  },
});

export default TDialogOverlayWrapperTransitionDialogContentInput;
