import HtmlInput from './HtmlInput';

const TextInput = HtmlInput.extend({
  props: {
    value: {
      type: [String, Number],
      default: undefined,
    },
    autocomplete: {
      type: String,
      default: undefined,
    },
    maxlength: {
      type: [String, Number],
      default: undefined,
    },
    minlength: {
      type: [String, Number],
      default: undefined,
    },
    multiple: {
      type: Boolean,
      default: undefined,
    },
    pattern: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    classes: {
      type: [String, Array, Object],
      default: 'border bg-white',
    },
  },

  data() {
    return {
      localValue: this.value as string | number | null,
      valueWhenFocus: null as string | number | null,
    };
  },

  watch: {
    localValue(localValue: string | null) {
      this.$emit('input', localValue);
    },
    value(value: string | null) {
      this.localValue = value;
    },
  },

  methods: {
    blurHandler(e: FocusEvent) {
      this.$emit('blur', e);

      if (this.localValue !== this.valueWhenFocus) {
        this.$emit('change', this.localValue);
      }
    },

    focusHandler(e: FocusEvent) {
      this.$emit('focus', e);

      this.valueWhenFocus = this.localValue;
    },

    keyupHandler(e: KeyboardEvent) {
      this.$emit('keyup', e);
    },

    keydownHandler(e: KeyboardEvent) {
      this.$emit('keydown', e);
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

    select() {
      (this.$el as HTMLInputElement).select();
    },

    setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none' | undefined) {
      (this.$el as HTMLInputElement).setSelectionRange(start, end, direction);
    },

    setRangeText(replacement: string) {
      (this.$el as HTMLInputElement).setRangeText(replacement);
    },
  },
});

export default TextInput;
