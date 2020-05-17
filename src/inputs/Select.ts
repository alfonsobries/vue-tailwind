import MultipleInput from './MultipleInput';
import NormalizedOption from '../types/NormalizedOption';
import NormalizedOptions from '../types/NormalizedOptions';
import InputOption from '../types/InputOption';

const Select = MultipleInput.extend({
  props: {
    placeholder: {
      type: String,
      default: undefined,
    },
  },

  computed: {
    normalizedOptionsWithPlaceholder(): NormalizedOptions {
      if (typeof this.placeholder === 'undefined') {
        return this.normalizedOptions;
      }

      const { normalizedOptions } = this;

      normalizedOptions.unshift({
        value: null,
        text: this.placeholder,
      });

      return normalizedOptions;
    },
  },

  watch: {
    localValue(localValue: string | null) {
      this.$emit('input', localValue);
      this.$emit('change', localValue);
    },
    value(value) {
      this.localValue = value;
    },
  },

  methods: {
    normalizeOption(option: InputOption): NormalizedOption {
      if (
        typeof option === 'string'
        || typeof option === 'number'
        || typeof option === 'boolean'
      ) {
        return {
          value: option,
          text: option,
        };
      }

      return {
        value: this.guessOptionValue(option),
        text: this.guessOptionText(option),
        children: option.children ? option.children.map((childOption) => this.normalizeOption(childOption)) : undefined,
      };
    },
    onBlur(e: FocusEvent) {
      this.$emit('blur', e);
    },

    onFocus(e: FocusEvent) {
      this.$emit('focus', e);
    },

    blur() {
      (this.$refs.select as HTMLSelectElement).blur();
    },

    focus(options?: FocusOptions | undefined) {
      (this.$refs.select as HTMLSelectElement).focus(options);
    },
  },
});

export default Select;
