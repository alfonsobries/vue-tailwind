import { CreateElement, VNode } from 'vue';
import HtmlInput from '@/base/HtmlInput';

const TCheckbox = HtmlInput.extend({
  name: 'TCheckbox',

  props: {
    value: {
      type: [String, Object, Number, Boolean, Array],
      default: true,
    },
    uncheckedValue: {
      type: [String, Object, Number, Boolean, Array],
      default: false,
    },
    indeterminate: {
      type: [Boolean, String],
      default: undefined,
    },
    checked: {
      type: [Boolean, String],
      default: undefined,
    },
    model: {
      // v-model
      type: [String, Object, Number, Boolean, Array],
      default: undefined,
    },
    classes: {
      type: [String, Array, Object],
      default: 'form-checkbox',
    },
  },

  data() {
    return {
      localValue: this.model,
    };
  },

  model: {
    prop: 'model',
    event: 'input',
  },

  render(createElement) {
    const renderFun: (createElement: CreateElement) => VNode = this.render;
    return renderFun(createElement);
  },

  computed: {
    isChecked: {
      get() {
        if (this.model === undefined) {
          return this.checked;
        }

        if (Array.isArray(this.model)) {
          return this.model.indexOf(this.value) >= 0;
        }

        return this.model === this.value;
      },
      set(checked) {
        this.localValue = checked;
      },
    },
  },

  watch: {
    isChecked(isChecked) {
      const input = this.$el as HTMLInputElement;
      if (input.checked !== isChecked) {
        input.checked = isChecked;
      }
    },
    indeterminate(indeterminate) {
      this.setIndeterminate(indeterminate);
    },
    checked(checked) {
      this.setChecked(checked);
    },
  },

  methods: {
    render(createElement: CreateElement): VNode {
      return createElement('input', {
        class: this.componentClass,
        ref: 'input',
        attrs: {
          checked: this.isChecked,
          value: this.value,
          id: this.id,
          type: 'checkbox',
          name: this.name,
          disabled: this.disabled,
          readonly: this.readonly,
          autofocus: this.autofocus,
          required: this.required,
        },
        on: {
          blur: this.blurHandler,
          focus: this.focusHandler,
          change: this.changeHandler,
        },
      });
    },

    setIndeterminate(indeterminate: boolean) {
      const input = this.$el as HTMLInputElement;

      input.indeterminate = indeterminate;

      // Emit update event to prop
      this.$emit('update:indeterminate', indeterminate);
    },

    setChecked(checked: boolean) {
      const input = this.$el as HTMLInputElement;

      // this.localValue = checked;
      input.checked = !checked;
      input.click();

      // Emit update event to prop
      this.$emit('update:checked', checked);
    },

    changeHandler(e: Event) {
      const input = e.target as HTMLInputElement;
      const isChecked = input.checked;

      let localValue;
      if (Array.isArray(this.model)) {
        localValue = [...this.model];
        const index = localValue.indexOf(this.value);
        if (isChecked && index < 0) {
          localValue.push(this.value);
        } else if (!isChecked && index >= 0) {
          localValue.splice(index, 1);
        }
      } else {
        localValue = isChecked ? this.value : this.uncheckedValue;
      }

      this.$emit('input', localValue);
      this.$emit('change', localValue);
      this.$emit('update:indeterminate', false);
      this.$emit('update:checked', isChecked);
    },

    blurHandler(e: FocusEvent) {
      this.$emit('blur', e);
    },

    focusHandler(e: FocusEvent) {
      this.$emit('focus', e);
    },

    blur() {
      (this.$el as HTMLInputElement).blur();
    },

    click() {
      (this.$el as HTMLInputElement).click();
    },

    focus(options?: FocusOptions | undefined) {
      (this.$el as HTMLInputElement).focus(options);
    },
  },
});

export default TCheckbox;
