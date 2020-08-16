import { VNode, CreateElement } from 'vue';
import HtmlInput from '@/base/HtmlInput';
import CheckboxValue from '@/types/CheckboxValues';

const isChecked = (model: CheckboxValue, value: CheckboxValue): boolean => {
  if (Array.isArray(model)) {
    return model.indexOf(value) >= 0;
  }

  return model === value;
};

const TToggle = HtmlInput.extend({
  name: 'TToggle',

  props: {
    value: {
      type: [String, Object, Number, Boolean, Array],
      default: true,
    },
    uncheckedValue: {
      type: [String, Object, Number, Boolean, Array],
      default: false,
    },
    model: {
      // v-model
      type: [String, Object, Number, Boolean, Array],
      default: undefined,
    },
    tabindex: {
      type: [String, Number],
      default: 0,
    },
    classes: {
      type: Object,
      default() {
        return {
          wrapper: 'bg-gray-200',
          wrapperChecked: 'bg-blue-500',
          wrapperDisabled: '',
          button: 'h-5 w-5 rounded-full bg-white shadow translate-x-0',
          buttonChecked: 'h-5 w-5 rounded-full bg-white shadow translate-x-4',
        };
      },
    },
    fixedClasses: {
      type: [String, Array, Object],
      default() {
        return {
          wrapper: 'relative inline-flex flex-shrink-0 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline',
          wrapperChecked: 'relative inline-flex flex-shrink-0 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline',
          button: 'relative inline-block transform transition ease-in-out duration-200',
          buttonChecked: 'relative inline-block transform transition ease-in-out duration-200',
        };
      },
    },
  },

  model: {
    prop: 'model',
    event: 'input',
  },

  data() {
    return {
      isChecked: isChecked(this.model, this.value),
    };
  },

  computed: {
    isDisabled() {
      return this.disabled || this.readonly;
    },
    currentValue(): CheckboxValue {
      return this.isChecked ? this.value : this.uncheckedValue;
    },
  },

  watch: {
    model(model) {
      this.isChecked = isChecked(model, this.value);
    },
    isChecked(checked: boolean) {
      let localValue;
      if (Array.isArray(this.model)) {
        localValue = [...this.model];
        const index = localValue.indexOf(this.value);
        if (checked && index < 0) {
          localValue.push(this.value);
        } else if (!checked && index >= 0) {
          localValue.splice(index, 1);
        }
      } else {
        localValue = this.currentValue;
      }

      this.$emit('input', localValue);
      this.$emit('change', localValue);
    },
  },

  methods: {
    blurHandler(e: FocusEvent) {
      this.$emit('blur', e);
    },

    focusHandler(e: FocusEvent) {
      this.$emit('focus', e);
    },

    getElement(): HTMLDivElement {
      return this.$el as HTMLDivElement;
    },

    blur() {
      this.getElement().blur();
    },

    click() {
      this.getElement().click();
    },

    spaceHandler(e: KeyboardEvent) {
      e.preventDefault();
      this.toggleValue();
    },
    clickHandler() {
      this.toggleValue();
    },
    toggleValue() {
      if (this.isDisabled) {
        return;
      }
      this.isChecked = !this.isChecked;
    },
    setChecked(checked: boolean) {
      this.isChecked = checked;
    },

    focus(options?: FocusOptions | undefined) {
      this.getElement().focus(options);
    },
  },

  render(createElement: CreateElement): VNode {
    let subElements = [
      createElement(
        'input',
        {
          ref: 'input',
          attrs: {
            value: this.currentValue,
            id: this.id,
            type: 'hidden',
            name: this.name,
            disabled: this.disabled,
            readonly: this.readonly,
            required: this.required,
            autofocus: undefined,
            tabindex: -1,
          },
        },
      ),
    ];

    const defaultSlot = this.$scopedSlots.default ? this.$scopedSlots.default({
      value: this.currentValue,
      isChecked: this.isChecked,
    }) : undefined;

    if (defaultSlot !== undefined) {
      subElements = subElements.concat(defaultSlot);
    }

    let wrapperClass;
    if (this.isDisabled) {
      wrapperClass = this.getElementCssClass('wrapperDisabled');
    } else {
      wrapperClass = this.isChecked
        ? this.getElementCssClass('wrapperChecked')
        : this.getElementCssClass('wrapper');
    }

    return createElement(
      'span',
      {
        class: wrapperClass,
        attrs: {
          role: 'checkbox',
          tabindex: this.tabindex,
          autofocus: this.autofocus,
          'aria-checked': this.isChecked ? 'true' : 'false',
        },
        on: {
          blur: this.blurHandler,
          focus: this.focusHandler,
          click: (e: MouseEvent) => {
            this.clickHandler();
            this.$emit('click', e);
          },
          keydown: (e: KeyboardEvent) => {
            // Space
            if (e.keyCode === 32) {
              this.spaceHandler(e);
            }

            this.$emit('keydown', e);
          },
        },
      },
      [
        createElement(
          'span',
          {
            class: this.isChecked
              ? this.getElementCssClass('buttonChecked')
              : this.getElementCssClass('button'),
            attrs: {
              'aria-hidden': 'true',
            },
          },
          subElements,
        ),
      ],
    );
  },
});

export default TToggle;
