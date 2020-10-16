import Vue, { CreateElement, VNode } from 'vue';
import { normalizeOptions } from '../../utils/inputOptions';
import uniqid from '../../utils/uniqid';

const TDialogOverlayWrapperTransitionDialogContentInput = Vue.extend({
  name: 'TDialogOverlayWrapperTransitionDialogContentInput',

  props: {
    getElementCssClass: {
      type: Function,
      required: true,
    },
    inputAttributes: {
      type: Object,
      default: undefined,
    },
    inputType: {
      type: String,
      required: true,
    },
    inputValue: {
      type: [String, Array],
      default: undefined,
    },
    inputPlaceholder: {
      type: String,
      default: undefined,
    },
    inputOptions: {
      type: [Array, Object],
      default: undefined,
    },
  },

  data() {
    return {
      errorMessage: null as string | null,
    };
  },

  mounted() {
    this.inputHandler();
  },

  methods: {
    getInputValue() {
      const input = this.$refs.input as HTMLInputElement | undefined;

      if (!input) {
        return undefined;
      }

      const inputName = input.name;

      if (input.type === 'radio') {
        const checkedRadio = (this.$refs.inputWrapper as HTMLDivElement)
          .querySelector(`input[name="${inputName}"]:checked`) as HTMLInputElement;

        return checkedRadio ? checkedRadio.value : null;
      } if (input.type === 'checkbox') {
        if (this.inputOptions) {
          const checkedCheckboxes = (this.$refs.inputWrapper as HTMLDivElement)
            .querySelectorAll(`input[name="${inputName}"]:checked`);

          const inititalValue = Array.from(checkedCheckboxes).map((checkbox) => (checkbox as HTMLInputElement).value);

          return inititalValue;
        }
        return input.checked ? input.value : null;
      }

      return input.value;
    },
    inputHandler() {
      this.errorMessage = null;

      const inputValue = this.getInputValue();

      this.$emit('input', inputValue);
    },
  },

  render(createElement: CreateElement): VNode {
    let input;

    if (this.inputType === 'select') {
      const options = normalizeOptions((this.inputOptions || []))
        .map((option) => {
          const isSelected = this.inputValue === option.value;

          return createElement('option', {
            domProps: {
              value: option.value,
              selected: isSelected,
            },
          }, String(option.text));
        });

      input = createElement('select', {
        class: this.getElementCssClass('select'),
        ref: 'input',
        attrs: {
          name: 'input',
          ...this.inputAttributes,
        },
        on: {
          change: this.inputHandler,
        },
      }, options);
    } else if (this.inputType === 'radio') {
      input = normalizeOptions((this.inputOptions || []))
        .map((option) => {
          const isChecked = this.inputValue === option.value;

          return createElement('label', {
            class: this.getElementCssClass('radioWrapper'),
            attrs: {
              for: `input-${String(option.value)}`,
            },
          },
          [
            createElement('input', {
              class: this.getElementCssClass('radio'),
              ref: 'input',
              attrs: {
                type: 'radio',
                name: 'input',
                id: `input-${String(option.value)}`,
                value: option.value,
                checked: isChecked,
                ...this.inputAttributes,
              },
              on: {
                change: this.inputHandler,
              },
            }),
            createElement('span', {
              class: this.getElementCssClass('radioText'),
            }, String(option.text)),
          ]);
        });
    } else if (this.inputType === 'checkbox') {
      if (this.inputOptions) {
        input = normalizeOptions((this.inputOptions || []))
          .map((option) => {
            const isChecked = Array.isArray(this.inputValue)
              ? this.inputValue.includes(option.value)
              : this.inputValue === option.value;

            return createElement('label', {
              class: this.getElementCssClass('checkboxWrapper'),
              attrs: {
                for: `input-${String(option.value)}`,
              },
            },
            [
              createElement('input', {
                class: this.getElementCssClass('checkbox'),
                ref: 'input',
                attrs: {
                  type: 'checkbox',
                  name: 'input[]',
                  id: `input-${String(option.value)}`,
                  value: option.value,
                  checked: isChecked,
                  ...this.inputAttributes,
                },
                on: {
                  change: this.inputHandler,
                },
              }),
              createElement('span', {
                class: this.getElementCssClass('checkboxText'),
              }, String(option.text)),
            ]);
          });
      } else {
        const id = uniqid();
        input = createElement('label', {
          class: this.getElementCssClass('checkboxWrapper'),
          attrs: {
            for: `input-${id}`,
          },
        },
        [
          createElement('input', {
            class: this.getElementCssClass('checkbox'),
            ref: 'input',
            attrs: {
              type: 'checkbox',
              name: 'input',
              id: `input-${id}`,
              value: this.inputValue,
              ...this.inputAttributes,
            },
            on: {
              change: this.inputHandler,
            },
          }),
          createElement('span', {
            class: this.getElementCssClass('checkboxText'),
          }, this.inputPlaceholder ? String(this.inputPlaceholder) : ''),
        ]);
      }
    } else {
      input = createElement('input', {
        class: this.getElementCssClass('input'),
        ref: 'input',
        domProps: {
          value: this.inputValue,
        },
        attrs: {
          name: 'input',
          type: this.inputType,
          placeholder: this.inputPlaceholder,
          ...this.inputAttributes,
        },
        on: {
          input: this.inputHandler,
        },
      });
    }

    return createElement(
      'div',
      {
        ref: 'inputWrapper',
        class: this.getElementCssClass('inputWrapper'),
      },
      Array.isArray(input) ? input : [input],
    );
  },
});

export default TDialogOverlayWrapperTransitionDialogContentInput;
