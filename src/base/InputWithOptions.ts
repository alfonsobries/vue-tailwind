import HtmlInput from './HtmlInput';
import InputOptions from '../types/InputOptions';
import NormalizedOptions from '../types/NormalizedOptions';
import { normalizeOptions } from '../utils/inputOptions';

const InputWithOptions = HtmlInput.extend({
  props: {
    value: {
      type: [String, Object, Number, Boolean],
      default: null,
    },
    valueAttribute: {
      type: String,
      default: undefined,
    },
    textAttribute: {
      type: String,
      default: undefined,
    },
    options: {
      type: [Array, Object],
      default: undefined,
    },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  computed: {
    normalizedOptions(): NormalizedOptions {
      return this.normalizeOptions(this.options);
    },

    flattenedOptions(): NormalizedOptions {
      return this.normalizedOptions.map((option) => {
        if (option.children) {
          return option.children;
        }

        return option;
      }).flat();
    },
  },
  methods: {
    normalizeOptions(options: InputOptions) {
      return normalizeOptions(options, this.textAttribute, this.valueAttribute);
    },
  },
});

export default InputWithOptions;
