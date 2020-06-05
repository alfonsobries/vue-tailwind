import InputWithOptions from './InputWithOptions';

const MultipleInput = InputWithOptions.extend({
  props: {
    value: {
      type: [Array, String, Number],
      default: null,
    },
    multiple: {
      type: Boolean,
      default: undefined,
    },
  },
});

export default MultipleInput;
