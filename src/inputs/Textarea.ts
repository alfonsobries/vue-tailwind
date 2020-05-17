import TextInput from './TextInput';

const Textarea = TextInput.extend({
  name: 'TTextarea',

  props: {
    rows: {
      type: String,
      default: undefined,
    },
    cols: {
      type: String,
      default: undefined,
    },
    wrap: {
      type: String,
      default: 'soft',
    },
  },
});

export default Textarea;
