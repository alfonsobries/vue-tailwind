import HtmlInput from './HtmlInput';

const Radio = HtmlInput.extend({
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
      default: false,
    },
    checked: {
      type: [Boolean, String],
      default: false,
    },
    model: {
      // v-model
      type: [String, Object, Number, Boolean, Array],
      default: undefined,
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

  computed: {
    isChecked: {
      get() {
        if (Array.isArray(this.model)) {
          return this.model;
        }
        return this.model === this.value;
      },
      set(checked) {
        this.localValue = checked;
      },
    },
  },

  watch: {
    indeterminate: {
      async handler(indeterminate) {
        this.$nextTick();
        this.setIndeterminate(indeterminate);
      },
      immediate: true,
    },
    checked: {
      handler(checked) {
        this.setChecked(checked);
      },
      immediate: true,
    },
  },

  methods: {
    setIndeterminate(indeterminate: boolean) {
      if (!this.$el) { return; }
      (this.$el as HTMLInputElement).indeterminate = indeterminate;
      // Emit update event to prop
      this.$emit('update:indeterminate', indeterminate);
    },
    setChecked(checked: boolean) {
      if (!this.$el) { return; }
      (this.$el as HTMLInputElement).checked = !checked;
      (this.$el as HTMLInputElement).click();
      // Emit update event to prop
      this.$emit('update:checked', checked);
    },

    onChange() {
      let localValue;
      let isChecked;
      if (Array.isArray(this.isChecked)) {
        localValue = this.localValue;
        isChecked = this.isChecked.indexOf(this.value) >= 0;
      } else {
        localValue = this.localValue ? this.value : this.uncheckedValue;
        isChecked = !!this.localValue;
      }
      this.$emit('input', localValue);
      this.$emit('change', localValue);
      this.$emit('update:indeterminate', false);
      this.$emit('update:checked', isChecked);
    },

    onBlur(e: FocusEvent) {
      this.$emit('blur', e);
    },

    onFocus(e: FocusEvent) {
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

export default Radio;
