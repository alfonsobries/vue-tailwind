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
      default: 'block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
    },
  },
  render(createElement: CreateElement) {
    const renderFun: (ce: CreateElement) => VNode = this.render;
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
        on: this.getListeners({
          blur: this.blurHandler,
          focus: this.focusHandler,
          keyup: this.keyupHandler,
          keydown: this.keydownHandler,
          input: this.inputHandler,
        }),
      });
    },
    inputHandler(e: Event) {
      const target = (e.target as HTMLInputElement);

      this.$emit('input', target.value);
    },
  },

});

export default TInput;
