import TextInput from './TextInput';

const Text = TextInput.extend({
  props: {
    type: {
      type: String,
      default: 'text',
    },
    max: {
      type: [String, Number],
      default: undefined,
    },
    min: {
      type: [String, Number],
      default: undefined,
    },
  },
});

export default Text;
