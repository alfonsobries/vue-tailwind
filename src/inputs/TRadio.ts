import isEqual from 'lodash/isEqual';
import { CreateElement, VNode } from 'vue';
import HtmlInput from './HtmlInput';

const TRadio = HtmlInput.extend({
  name: 'TRadio',

  props: {
    value: {
      type: [String, Object, Number, Boolean],
      default: 'on',
    },
    checked: {
      type: [Boolean, String],
      default: false,
    },
    model: {
      // v-model
      type: [String, Object, Number, Boolean],
      default: undefined,
    },
    classes: {
      type: [String, Array, Object],
      default: 'form-radio',
    },
  },

  data() {
    return {
      localValue: this.checked ? this.value : null,
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

  watch: {
    model(model) {
      if (!isEqual(model, this.localValue)) {
        this.localValue = model;
      }
    },
    checked(checked) {
      const localValue = checked ? this.value : null;
      if (!isEqual(localValue, this.localValue)) {
        this.localValue = localValue;
      }
    },
    localValue(localValue) {
      this.$emit('input', localValue);
      this.$emit('change', localValue);
    },
  },

  methods: {
    render(createElement: CreateElement): VNode {
      return createElement('input', {
        class: this.inputClass,
        ref: 'input',
        attrs: {
          value: this.value,
          id: this.id,
          type: 'radio',
          checked: this.model === undefined ? this.checked : isEqual(this.model, this.value),
          name: this.name,
          disabled: this.disabled,
          readonly: this.readonly,
          autofocus: this.autofocus,
          required: this.required,
        },
        on: {
          blur: this.blurHandler,
          focus: this.focusHandler,
          input: this.inputHandler,
        },
      });
    },

    inputHandler(e: Event) {
      const target = (e.target as HTMLInputElement);
      this.localValue = target.value;
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

export default TRadio;
