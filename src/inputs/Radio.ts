import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import CssClass from '@/types/CssClass';
import HtmlInput from './HtmlInput';

const Radio = HtmlInput.extend({
  props: {
    value: {
      type: [String, Object, Number, Boolean],
      default: 'on',
    },
    checked: {
      type: [Boolean, String],
      default: false,
    },
    model: {
      // v-model
      type: [String, Object, Number, Boolean],
      default: undefined,
    },
  },

  data() {
    return {
      localValue: this.checked ? this.value : this.model,
    };
  },

  model: {
    prop: 'model',
    event: 'input',
  },

  computed: {
    inputClass(): CssClass {
      return get(this.classes, this.variant, undefined);
    },
  },

  watch: {
    model(model) {
      if (!isEqual(model, this.localValue)) {
        this.localValue = model;
      }
    },
    checked(checked) {
      const localValue = checked ? this.value : null;
      if (!isEqual(localValue, this.localValue)) {
        this.localValue = localValue;
      }
    },
    localValue(localValue) {
      this.$emit('input', localValue);
      this.$emit('change', localValue);
    },
  },

  methods: {
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
