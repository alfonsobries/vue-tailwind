import { CreateElement, VNode } from 'vue';
import TextInput from '../base/TextInput';

const TInput = TextInput.extend({
  name: 'TInput',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    max: {
      type: [String, Number],
      default: undefined,
    },
    min: {
      type: [String, Number],
      default: undefined,
    },
    classes: {
      type: [String, Array, Object],
      default: 'form-input',
    },
  },
  render(createElement) {
    const renderFun: (createElement: CreateElement) => VNode = this.render;
    return renderFun(createElement);
  },
  methods: {
    render(createElement: CreateElement): VNode {
      return createElement('input', {
        class: this.componentClass,
        ref: 'input',
        domProps: {
          value: this.localValue,
        },
        attrs: {
          id: this.id,
          name: this.name,
          disabled: this.disabled,
          readonly: this.readonly,
          autocomplete: this.autocomplete,
          autofocus: this.autofocus,
          type: this.type,
          required: this.required,
          placeholder: this.placeholder,
          pattern: this.pattern,
          multiple: this.multiple,
          minlength: this.minlength,
          min: this.min,
          maxlength: this.maxlength,
          max: this.max,
        },
        on: {
          blur: this.blurHandler,
          focus: this.focusHandler,
          keyup: this.keyupHandler,
          keydown: this.keydownHandler,
          input: this.inputHandler,
        },
      });
    },

    inputHandler(e: Event) {
      const target = (e.target as HTMLInputElement);
      this.$emit('input', target.value);
    },
  },

});

export default TInput;
