import isEqual from 'lodash/isEqual';
import { CreateElement, VNode } from 'vue';
import HtmlInput from '@/base/HtmlInput';
import CssClass from '@/types/CssClass';

const checkIfTagShouldBeChecked = (
  model: string | object | number | boolean | undefined,
  checked: boolean | string,
  value: | object | number | boolean | undefined,
) => (model === undefined ? !!checked : isEqual(model, value));

const TRadio = HtmlInput.extend({
  name: 'TRadio',

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
    classes: {
      type: [String, Array, Object],
      default: 'form-radio',
    },
    wrapped: {
      type: Boolean,
      default: false,
    },
    wrapperTag: {
      type: String,
      default: 'label',
    },
    labelTag: {
      type: String,
      default: 'span',
    },
    label: {
      type: String,
      default: undefined,
    },
  },

  data() {
    return {
      localValue: this.checked ? this.value : null,
      elementChecked: checkIfTagShouldBeChecked(this.model, this.checked, this.value),
    };
  },

  model: {
    prop: 'model',
    event: 'input',
  },

  render(createElement) {
    const renderFun: (createElement: CreateElement) => VNode = this.render;

    // eslint-disable-next-line max-len
    const createWrappedFunc: (createElement: CreateElement) => VNode = this.renderWrapped;

    if (this.wrapped) {
      return createWrappedFunc(createElement);
    }

    return renderFun(createElement);
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
    renderWrapped(createElement: CreateElement) {
      const childElements: VNode[] = [];

      childElements.push(this.render(createElement));

      const labelClass: CssClass = this.getElementCssClass('label');
      const checkedLabelClass: CssClass = this.getElementCssClass(
        'labelChecked',
        this.getElementCssClass('label'),
      );

      childElements.push(createElement(
        this.labelTag,
        {
          ref: 'label',
          class: this.elementChecked ? checkedLabelClass : labelClass,
        },
        this.label,
      ));

      const wrapperClass: CssClass = this.getElementCssClass('wrapper');
      const checkedWrapperClass: CssClass = this.getElementCssClass(
        'wrapperChecked',
        this.getElementCssClass('wrapper'),
      );

      return createElement(
        this.wrapperTag,
        {
          ref: 'wrapper',
          class: this.elementChecked ? checkedWrapperClass : wrapperClass,
        },
        childElements,
      );
    },
    render(createElement: CreateElement): VNode {
      return createElement('input', {
        class: this.wrapped ? this.getElementCssClass('input') : this.componentClass,
        ref: 'input',
        attrs: {
          value: this.value,
          id: this.id,
          type: 'radio',
          checked: checkIfTagShouldBeChecked(this.model, this.checked, this.value),
          name: this.name,
          disabled: this.disabled,
          readonly: this.readonly,
          autofocus: this.autofocus,
          required: this.required,
        },
        on: {
          blur: this.blurHandler,
          focus: this.focusHandler,
          input: this.inputHandler,
        },
      });
    },


    async inputHandler(e: Event) {
      const target = (e.target as HTMLInputElement);
      this.elementChecked = target.checked;

      // Only update the local value when the element is checked
      if (target.checked) {
        this.localValue = target.value;

        this.sendInputEventToTheNotCheckedInputs();
      }
    },

    /**
     * We need to trigger the input event in all the inputs that are not checked
     * so we can update the `elementChecked` local property that is used to
     * change the classes of the wrapper div according to the state
     */
    sendInputEventToTheNotCheckedInputs() {
      const notCheckedEls = document.querySelectorAll(`input[name=${this.name}]:not(:checked)`);

      notCheckedEls.forEach((el) => {
        el.dispatchEvent(new Event('input'));
      });
    },

    blurHandler(e: FocusEvent) {
      this.$emit('blur', e);
    },

    focusHandler(e: FocusEvent) {
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

export default TRadio;
