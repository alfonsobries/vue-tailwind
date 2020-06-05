import get from 'lodash/get';
import map from 'lodash/map';
import HtmlInput from './HtmlInput';
import InputOption from '../types/InputOption';
import InputOptions from '../types/InputOptions';
import NormalizedOption from '../types/NormalizedOption';
import NormalizedOptions from '../types/NormalizedOptions';

const InputWithOptions = HtmlInput.extend({
  props: {
    value: {
      type: [String, Number],
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
      const opts: InputOptions = this.options;


      if (!opts) {
        return [];
      }

      if (Array.isArray(opts)) {
        return opts.map((option) => this.normalizeOption(option));
      }

      return map<object, NormalizedOption>(opts, (option, key) => ({
        value: key,
        text: option,
      }));
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
    guessOptionValue(option: InputOption) {
      if (this.valueAttribute) {
        return get(option, this.valueAttribute);
      }
      return get(option, 'value', get(option, 'id', get(option, 'text')));
    },

    guessOptionText(option: InputOption) {
      if (this.textAttribute) {
        return get(option, this.textAttribute);
      }
      return get(option, 'text', get(option, 'label'));
    },

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

      if (option.children) {
        const children = option.children.map((childOption) => this.normalizeOption(childOption));
        return {
          value: this.guessOptionValue(option),
          text: this.guessOptionText(option),
          children,
        };
      }

      return {
        value: this.guessOptionValue(option),
        text: this.guessOptionText(option),
      };
    },
  },
});

export default InputWithOptions;
