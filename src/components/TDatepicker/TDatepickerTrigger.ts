import Vue, { CreateElement, VNode } from 'vue';

const TDatepickerTrigger = Vue.extend({
  name: 'TDatepickerTrigger',

  props: {
    id: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: undefined,
    },
    autofocus: {
      type: Boolean,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: undefined,
    },
    tabindex: {
      type: [String, Number],
      default: undefined,
    },
    inputName: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    show: {
      type: Function,
      default: undefined,
    },
    hideIfFocusOutside: {
      type: Function,
      default: undefined,
    },
    conjunction: {
      type: String,
      required: true,
    },
    multiple: {
      type: Boolean,
      required: true,
    },
    range: {
      type: Boolean,
      required: true,
    },
    clearable: {
      type: Boolean,
      required: true,
    },
    locale: {
      type: Object,
      required: true,
    },
    userFormatedDate: {
      type: [String, Array],
      required: true,
    },
    formatedDate: {
      type: [String, Array],
      required: true,
    },
    value: {
      type: [Date, Array],
      default: null,
    },
    activeDate: {
      type: Date,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
  },

  computed: {
    hasValue(): boolean {
      if (Array.isArray(this.value)) {
        return this.value.length > 0;
      }

      return !!this.value;
    },
  },

  methods: {
    clearButtonClickHandler(e: MouseEvent) {
      this.$emit('clear', e);
    },
  },

  render(createElement: CreateElement): VNode {
    const formattedDate = this.formatedDate as string[] | string;

    let formText = '';
    if (Array.isArray(this.userFormatedDate)) {
      const conjunction = this.range ? this.locale.rangeSeparator : this.conjunction;
      formText = this.userFormatedDate.join(conjunction);
    } else {
      formText = this.userFormatedDate;
    }

    const subElements = [
      createElement(
        'input',
        {
          ref: 'input',
          class: this.getElementCssClass('input'),
          attrs: {
            readonly: true,
            id: this.id,
            name: this.name,
            disabled: this.disabled,
            autocomplete: 'off',
            autofocus: this.autofocus,
            type: 'text',
            required: this.required,
            placeholder: this.placeholder,
            tabindex: this.tabindex,
            value: formText,
          },
          on: {
            click: (e: MouseEvent) => {
              if (this.show) {
                this.show();
              }

              this.$emit('click', e);
            },
            input: (e: Date) => {
              this.$emit('input', e);
            },
            keydown: (e: KeyboardEvent) => {
              this.$emit('keydown', e);
            },
            blur: (e: KeyboardEvent) => {
              if (this.hideIfFocusOutside) {
                this.hideIfFocusOutside(e);
              }

              this.$emit('blur', e);
            },
            focus: (e: KeyboardEvent) => {
              if (this.show) {
                this.show();
              }

              this.$emit('focus', e);
            },
          },
        },
      ),
    ];

    if (this.clearable && this.hasValue) {
      const clearButtonSlot = this.$scopedSlots.clearButton
        ? this.$scopedSlots.clearButton({
          className: this.getElementCssClass('clearButtonIcon'),
          formatedDate: this.formatedDate,
          userFormatedDate: this.userFormatedDate,
          value: this.value,
          activeDate: this.activeDate,
        }) : [
          createElement(
            'svg',
            {
              attrs: {
                fill: 'currentColor',
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 20 20',
              },
              class: this.getElementCssClass('clearButtonIcon'),
            },
            [
              createElement('polygon', {
                attrs: {
                  points: '10 8.58578644 2.92893219 1.51471863 1.51471863 2.92893219 8.58578644 10 1.51471863 17.0710678 2.92893219 18.4852814 10 11.4142136 17.0710678 18.4852814 18.4852814 17.0710678 11.4142136 10 18.4852814 2.92893219 17.0710678 1.51471863 10 8.58578644',
                },
              }),
            ],
          ),
        ];

      subElements.push(
        createElement(
          'button',
          {
            ref: 'clearButton',
            class: this.getElementCssClass('clearButton'),
            attrs: {
              type: 'button',
              tabindex: -1,
            },
            on: {
              click: this.clearButtonClickHandler,
            },
          },
          clearButtonSlot,
        ),
      );
    }

    if (this.multiple) {
      const dates: string[] = Array.isArray(formattedDate) ? formattedDate : [formattedDate];
      const hiddenInputs: VNode[] = dates.map((date: string) => createElement(
        'input',
        {
          attrs: {
            type: 'hidden',
            value: date,
            name: this.name,
            disabled: this.disabled,
            readonly: this.readonly,
            required: this.required,
          },
        },
      ));

      subElements.push(...hiddenInputs);
    } else {
      subElements.push(
        createElement(
          'input',
          {
            attrs: {
              type: 'hidden',
              value: Array.isArray(formattedDate) ? formattedDate.join(this.conjunction) : formattedDate,
              name: this.name,
              disabled: this.disabled,
              readonly: this.readonly,
              required: this.required,
            },
          },
        ),
      );
    }

    return createElement(
      'div',
      {
        class: this.getElementCssClass('inputWrapper'),
      },
      subElements,
    );
  },

});

export default TDatepickerTrigger;
