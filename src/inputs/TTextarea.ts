import { CreateElement, VNode } from 'vue';
import TextInput from './TextInput';

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
  },
  render(createElement) {
    const renderFun: (createElement: CreateElement) => VNode = this.render;
    return renderFun(createElement);
  },
  methods: {
    render(createElement: CreateElement): VNode {
      return createElement('textarea', {
        class: this.inputClass,
        ref: 'input',
        domProps: {
          value: this.value,
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
      const target = (e.target as HTMLTextAreaElement);
      console.log(target.value);
      this.localValue = target.value;
    },
  },
});

export default TTextarea;
