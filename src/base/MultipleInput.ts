import flatten from 'lodash/flatten';
import get from 'lodash/get';
import map from 'lodash/map';
import HtmlInput from './HtmlInput';
import InputOption from '../types/InputOption';
import InputOptions from '../types/InputOptions';
import NormalizedOption from '../types/NormalizedOption';
import NormalizedOptions from '../types/NormalizedOptions';

const MultipleInput = HtmlInput.extend({
  props: {
    value: {
      type: [Array, String, Number],
      default: null,
    },
    multiple: {
      type: Boolean,
      default: undefined,
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
      return flatten(this.normalizedOptions.map((option) => {
        if (option.children) {
          return option.children;
        }

        return option;
      }));
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

      return {
        value: this.guessOptionValue(option),
        text: this.guessOptionText(option),
      };
    },
  },
});

export default MultipleInput;
