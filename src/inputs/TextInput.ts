import HtmlInput from './HtmlInput';

const TextInput = HtmlInput.extend({
  props: {
    value: {
      type: String,
      default: undefined,
    },
    autocomplete: {
      type: Boolean,
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
    variant: {
      type: String,
      default: undefined,
    },
    classes: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      localValue: this.value as string | null,
      valueWhenFocus: null as string | null,
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
    onBlur(e: FocusEvent) {
      this.$emit('blur', e);

      if (this.localValue !== this.valueWhenFocus) {
        this.$emit('change', this.localValue);
      }
    },

    onFocus(e: FocusEvent) {
      this.$emit('focus', e);

      this.valueWhenFocus = this.localValue;
    },

    onKeyUp(e: KeyboardEvent) {
      this.$emit('keyup', e);
    },

    onKeyDown(e: KeyboardEvent) {
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
