import isEqual from 'lodash/isEqual';
import { CreateElement, VNode } from 'vue';
import HtmlInput from '../base/HtmlInput';
import CssClass from '../types/CssClass';
import Key from '../types/Key';

const checkIfTagShouldBeChecked = (
  model: string | Record<string, unknown> | number | boolean | undefined,
  checked: boolean | string,
  value: | Record<string, unknown> | number | boolean | undefined,
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
    inputWrapperTag: {
      type: String,
      default: 'span',
    },
    labelTag: {
      type: String,
      default: 'span',
    },
    label: {
      type: [String, Number],
      default: undefined,
    },
  },

  data() {
    // const defaultValue = (this.model === undefined ? null : this.model);
    return {
      localValue: this.checked ? this.value : null,
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
      if (isEqual(model, this.localValue)) {
        return;
      }

      this.localValue = model;
    },
    checked(checked) {
      const localValue = checked ? this.value : null;
      if (!isEqual(localValue, this.localValue)) {
        this.localValue = localValue;
      }
    },
    localValue(localValue) {
      if (isEqual(this.model, localValue)) {
        return;
      }

      this.$emit('input', localValue);
      this.$emit('change', localValue);
    },
    isChecked(isChecked: boolean) {
      const input = this.$refs.input as HTMLInputElement | undefined;
      if (input && input.checked !== isChecked) {
        input.checked = isChecked;
      }
    },
  },

  computed: {
    isChecked(): boolean {
      return checkIfTagShouldBeChecked(this.model, this.checked, this.value);
    },
  },

  methods: {
    renderWrapped(createElement: CreateElement) {
      const childElements: VNode[] = [];
      const input = this.render(createElement);

      const inputWrapperClass: CssClass = this.getElementCssClass('inputWrapper');
      const checkedInputWrapperClass: CssClass = this.getElementCssClass(
        'inputWrapperChecked',
        this.getElementCssClass('inputWrapper'),
      );

      childElements.push(createElement(
        this.inputWrapperTag,
        {
          ref: 'inputWrapper',
          class: this.isChecked ? checkedInputWrapperClass : inputWrapperClass,
        },
        [
          input,
        ],
      ));

      const labelClass: CssClass = this.getElementCssClass('label');
      const checkedLabelClass: CssClass = this.getElementCssClass(
        'labelChecked',
        this.getElementCssClass('label'),
      );

      let label;
      if (this.$scopedSlots.default !== undefined) {
        label = this.$scopedSlots.default({
          isChecked: this.isChecked,
          value: this.localValue,
          label: this.label,
        });
      } else {
        label = typeof this.label === 'number' ? String(this.label) : this.label;
      }

      childElements.push(createElement(
        this.labelTag,
        {
          ref: 'label',
          class: this.isChecked ? checkedLabelClass : labelClass,
        },
        label,
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
          class: this.isChecked ? checkedWrapperClass : wrapperClass,
          attrs: {
            for: this.id,
            tabindex: this.tabindex,
            autofocus: this.autofocus,
          },
          on: {
            keydown: (e: KeyboardEvent) => {
              if ([Key.DOWN, Key.RIGHT].includes(e.keyCode)) {
                this.selectNextRadio(e);
              } else if ([Key.UP, Key.LEFT].includes(e.keyCode)) {
                this.selectPrevRadio(e);
              } else if (e.keyCode === Key.SPACE) {
                this.wrapperSpaceHandler(e);
              }
            },
          },
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
          required: this.required,
          autofocus: !this.wrapped ? this.autofocus : undefined,
          tabindex: this.wrapped && this.tabindex !== undefined ? -1 : this.tabindex,
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

      // Only update the local value when the element is checked
      if (target.checked) {
        this.localValue = this.value;

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

    selectPrevRadio(e: KeyboardEvent) {
      e.preventDefault();
      const currentEl = this.$refs.input;
      const els: HTMLInputElement[] = Array
        .from(document.querySelectorAll(`input[name=${this.name}]`));
      const currentElementIndex = els
        .findIndex((radioInput) => radioInput === this.$refs.input);
      const prevElement: HTMLInputElement = els[currentElementIndex - 1] || els[els.length - 1];

      if (prevElement !== currentEl && prevElement) {
        const wrapper = prevElement.parentNode ? prevElement.parentNode.parentNode : undefined;
        if (wrapper && (wrapper as HTMLElement).tabIndex >= 0) {
          (wrapper as HTMLElement).focus();
        } else {
          prevElement.focus();
        }
      }
    },

    selectNextRadio(e: KeyboardEvent) {
      e.preventDefault();

      const currentEl = this.$refs.input;
      const els: HTMLInputElement[] = Array
        .from(document.querySelectorAll(`input[name=${this.name}]`));
      const currentElementIndex = els
        .findIndex((radioInput) => radioInput === this.$refs.input);
      const nextElement: HTMLInputElement = els[currentElementIndex + 1] || els[0];

      if (nextElement !== currentEl && nextElement) {
        const wrapper = nextElement.parentNode ? nextElement.parentNode.parentNode : undefined;
        if (wrapper && (wrapper as HTMLElement).tabIndex >= 0) {
          (wrapper as HTMLElement).focus();
        } else {
          nextElement.focus();
        }
      }
    },

    wrapperSpaceHandler(e: KeyboardEvent) {
      e.preventDefault();
      this.localValue = this.value;
    },

    blurHandler(e: FocusEvent) {
      this.$emit('blur', e);
    },

    focusHandler(e: FocusEvent) {
      this.$emit('focus', e);
    },

    blur() {
      (this.$refs.input as HTMLInputElement).blur();
    },

    click() {
      (this.$refs.input as HTMLInputElement).click();
    },

    focus(options?: FocusOptions | undefined) {
      (this.$refs.input as HTMLInputElement).focus(options);
    },
  },
});

export default TRadio;
