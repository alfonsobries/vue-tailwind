import { CreateElement, VNode } from 'vue';
import HtmlInput from '../base/HtmlInput';
import CssClass from '../types/CssClass';
import Key from '../types/Key';

const TCheckbox = HtmlInput.extend({
  name: 'TCheckbox',

  props: {
    value: {
      type: [String, Object, Number, Boolean, Array],
      default: true,
    },
    uncheckedValue: {
      type: [String, Object, Number, Boolean, Array],
      default: false,
    },
    indeterminate: {
      type: [Boolean, String],
      default: undefined,
    },
    checked: {
      type: [Boolean, String],
      default: undefined,
    },
    model: {
      // v-model
      type: [String, Object, Number, Boolean, Array],
      default: undefined,
    },
    classes: {
      type: [String, Array, Object],
      default: 'form-checkbox',
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
    return {
      localValue: this.model,
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

  computed: {
    isChecked: {
      get() {
        if (this.model === undefined) {
          return this.checked;
        }

        if (Array.isArray(this.model)) {
          return this.model.indexOf(this.value) >= 0;
        }

        return this.model === this.value;
      },
      set(checked) {
        this.localValue = checked;
      },
    },
  },

  watch: {
    isChecked(isChecked) {
      const input = this.getInput();
      if (input.checked !== isChecked) {
        input.checked = isChecked;
      }
    },
    indeterminate(indeterminate) {
      this.setIndeterminate(indeterminate);
    },
    checked(checked) {
      this.setChecked(checked);
    },
  },

  methods: {
    getInput(): HTMLInputElement {
      return this.$refs.input as HTMLInputElement;
    },
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
          value: this.isChecked ? this.value : this.uncheckedValue,
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
              if (e.keyCode === Key.SPACE) {
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
          checked: this.isChecked,
          value: this.value,
          id: this.id,
          type: 'checkbox',
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
          change: this.changeHandler,
        },
      });
    },


    wrapperSpaceHandler(e: KeyboardEvent) {
      e.preventDefault();
      this.click();
    },

    setIndeterminate(indeterminate: boolean) {
      const input = this.getInput();

      input.indeterminate = indeterminate;

      // Emit update event to prop
      this.$emit('update:indeterminate', indeterminate);
    },

    setChecked(checked: boolean) {
      const input = this.getInput();

      // this.localValue = checked;
      input.checked = !checked;
      input.click();

      // Emit update event to prop
      this.$emit('update:checked', checked);
    },

    changeHandler() {
      const input = this.getInput();
      const isChecked = input.checked;

      let localValue;
      if (Array.isArray(this.model)) {
        localValue = [...this.model];
        const index = localValue.indexOf(this.value);
        if (isChecked && index < 0) {
          localValue.push(this.value);
        } else if (!isChecked && index >= 0) {
          localValue.splice(index, 1);
        }
      } else {
        localValue = isChecked ? this.value : this.uncheckedValue;
      }

      this.$emit('input', localValue);
      this.$emit('change', localValue);
      this.$emit('update:indeterminate', false);
      this.$emit('update:checked', isChecked);
    },

    blurHandler(e: FocusEvent) {
      this.$emit('blur', e);
    },

    focusHandler(e: FocusEvent) {
      this.$emit('focus', e);
    },

    blur() {
      this.getInput().blur();
    },

    click() {
      this.getInput().click();
    },

    focus(options?: FocusOptions | undefined) {
      this.getInput().focus(options);
    },
  },
});

export default TCheckbox;
