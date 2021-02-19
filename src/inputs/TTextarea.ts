import { CreateElement, VNode } from 'vue';
import TextInput from '../base/TextInput';

const TTextarea = TextInput.extend({
  name: 'TTextarea',
  props: {
    rows: {
      type: String,
      default: undefined,
    },
    cols: {
      type: String,
      default: undefined,
    },
    wrap: {
      type: String,
      default: 'soft',
    },
    classes: {
      type: [String, Array, Object],
      default: 'block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50  disabled:opacity-50 disabled:cursor-not-allowed',
    },
  },
  render(createElement) {
    const renderFun: (createElement: CreateElement) => VNode = this.render;
    return renderFun(createElement);
  },
  methods: {
    render(createElement: CreateElement): VNode {
      return createElement('textarea', {
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
          required: this.required,
          placeholder: this.placeholder,
          pattern: this.pattern,
          multiple: this.multiple,
          minlength: this.minlength,
          maxlength: this.maxlength,
          wrap: this.wrap,
          rows: this.rows,
          cols: this.cols,
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
      const target = (e.target as HTMLTextAreaElement);
      this.$emit('input', target.value);
    },
  },
});

export default TTextarea;
