import Vue, { CreateElement, VNode } from 'vue';
import TToggle from '../TToggle';

const TDatepickerTimeSelector = Vue.extend({
  name: 'TDatepickerTimeSelector',

  props: {
    parse: {
      type: Function,
      required: true,
    },
    format: {
      type: Function,
      required: true,
    },
    datepicker: {
      type: Boolean,
      required: true,
    },
    timepicker: {
      type: Boolean,
      required: true,
    },
    amPm: {
      type: Boolean,
      required: true,
    },
    showSeconds: {
      type: Boolean,
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
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
      alreadyTriedAnInvalidValue: false,
      lastValidValue: '',
      triesForInvalidMinutes: 0,
      triesForInvalidSeconds: 0,
    };
  },

  computed: {
    amPmFormatted(): string | null {
      if (!this.amPm) {
        return null;
      }

      return this.format(this.localActiveDate, 'K');
    },
    minutesFormatted(): string {
      return this.format(this.localActiveDate, 'i');
    },
    hoursFormatted(): string {
      if (this.amPm) {
        return this.format(this.localActiveDate, 'G');
      }

      return this.format(this.localActiveDate, 'H');
    },
    secondsFormatted(): string {
      return this.format(this.localActiveDate, 'S');
    },
  },

  watch: {
    activeDate(activeDate: Date) {
      this.localActiveDate = new Date(activeDate.valueOf());
      this.lastValidValue = '';
      this.alreadyTriedAnInvalidValue = false;
    },
  },

  methods: {
    handleTimeInputFocus(e: FocusEvent) {
      const input = e.currentTarget as HTMLInputElement;
      input.focus();
      setTimeout(() => {
        input.setSelectionRange(0, 2);
      }, 1);
    },
    handleTimeInput(e: InputEvent, maxValue: number, minValue: number, valueHandler: (numericValue: number) => void) {
      const input = e.currentTarget as HTMLInputElement;
      const { value } = input;

      if (value === '') {
        return;
      }

      const numericValue = Number(value);
      const keyPressed = Number(e.data);

      if (Number.isNaN(numericValue)) {
        input.value = this.lastValidValue;
        return;
      }


      if (numericValue > maxValue || numericValue < minValue) {
        if (!Number.isNaN(keyPressed)) {
          if (this.alreadyTriedAnInvalidValue) {
            input.value = String(keyPressed);
            input.dispatchEvent(new Event('input'));
            this.alreadyTriedAnInvalidValue = false;
            return;
          }

          this.alreadyTriedAnInvalidValue = true;
        }

        input.value = this.lastValidValue;
        return;
      }

      valueHandler(numericValue);

      this.alreadyTriedAnInvalidValue = false;
      this.lastValidValue = value;
    },
    setHours(hours: number): void {
      if (this.amPm) {
        if (hours === 12) {
          this.localActiveDate.setHours(this.amPmFormatted === 'PM' ? hours : 0);
        } else {
          this.localActiveDate.setHours(this.amPmFormatted === 'PM' ? hours + 12 : hours);
        }
        return;
      }

      this.localActiveDate.setHours(hours);
    },
    setMinutes(minutes: number): void {
      this.localActiveDate.setMinutes(minutes);
    },
    setSeconds(seconds: number): void {
      this.localActiveDate.setSeconds(seconds);
    },
  },

  render(createElement: CreateElement): VNode {
    const subElements: VNode[] = [];

    const label = createElement(
      'label',
      {
        class: 'flex-grow text-sm text-gray-500',
      },
      'Time',
    );

    const timePickerInputs = [
      createElement(
        'input',
        {
          ref: 'hours',
          class: 'text-center w-8 border-transparent bg-transparent p-0 h-6',
          attrs: {
            type: 'text',
            value: this.hoursFormatted,
          },
          on: {
            input: (e: InputEvent) => {
              const maxHours = this.amPm ? 12 : 23;
              const minHours = this.amPm ? 1 : 0;
              this.handleTimeInput(e, maxHours, minHours, this.setHours);
            },
            blur: (e: FocusEvent) => {
              const input = e.currentTarget as HTMLInputElement;
              this.$emit('input', this.localActiveDate);
              this.$nextTick(() => {
                input.value = this.hoursFormatted;
              });
            },
            focus: (e: FocusEvent) => {
              this.handleTimeInputFocus(e);
            },
          },
        },

      ),
      createElement(
        'span',
        {
          class: 'text-gray-300',
        },
        ':',
      ),
      createElement(
        'input',
        {
          ref: 'minutes',
          class: 'text-center w-8 border-transparent bg-transparent p-0 h-6',
          domProps: {
            value: this.minutesFormatted,
          },
          attrs: {
            type: 'text',
          },
          on: {
            input: (e: InputEvent) => {
              const maxMinutes = 59;
              const minMinutes = 0;
              this.handleTimeInput(e, maxMinutes, minMinutes, this.setMinutes);
            },
            blur: (e: FocusEvent) => {
              const input = e.currentTarget as HTMLInputElement;
              this.$emit('input', this.localActiveDate);
              this.$nextTick(() => {
                input.value = this.minutesFormatted;
              });
            },
            focus: (e: FocusEvent) => {
              this.handleTimeInputFocus(e);
            },
          },
        },
      ),
    ];

    if (this.showSeconds) {
      timePickerInputs.push(createElement(
        'span',
        {
          class: 'text-gray-300',
        },
        ':',
      ));

      timePickerInputs.push(
        createElement(
          'input',
          {
            ref: 'seconds',
            class: 'text-center w-8 border-transparent bg-transparent p-0 h-6',
            domProps: {
              value: this.secondsFormatted,
            },
            attrs: {
              type: 'text',
            },
            on: {
              input: (e: InputEvent) => {
                const maxSeconds = 59;
                const minSeconds = 0;
                this.handleTimeInput(e, maxSeconds, minSeconds, this.setSeconds);
              },
              blur: (e: FocusEvent) => {
                const input = e.currentTarget as HTMLInputElement;
                this.$emit('input', this.localActiveDate);
                this.$nextTick(() => {
                  input.value = this.secondsFormatted;
                });
              },
              focus: (e: FocusEvent) => {
                this.handleTimeInputFocus(e);
              },
            },
          },
        ),
      );
    }

    const timePickerElements = [
      createElement(
        'div',
        {
          class: 'bg-gray-100 rounded-md bg-transparent border-transparent focus:border-transparent focus:ring-0 w-full text-right flex items-center border-2 border-gray-100',
        },
        timePickerInputs,
      ),
    ];

    if (this.amPm) {
      timePickerElements.push(createElement(
        TToggle,
        {
          props: {
            model: this.amPmFormatted,
            value: 'PM',
            uncheckedValue: 'AM',
            checkedPlaceholder: 'AM',
            uncheckedPlaceholder: 'PM',
            checkedLabel: 'PM',
            uncheckedLabel: 'AM',
            fixedClasses: {
              wrapper: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
              wrapperChecked: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
              wrapperDisabled: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed',
              wrapperCheckedDisabled: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed',
              button: 'inline-block absolute transform translate-x-0 transition ease-in-out duration-200',
              buttonChecked: 'inline-block absolute transform translate-x-full transition ease-in-out duration-200',
              checkedPlaceholder: 'inline-block',
              uncheckedPlaceholder: 'inline-block',
            },
            classes: {
              wrapper: 'bg-gray-100 focus:outline-none focus:shadow-outline rounded-sm border-2 border-gray-100 rounded',
              wrapperChecked: 'bg-gray-100 focus:outline-none focus:shadow-outline rounded-sm border-2 border-gray-100 rounded',
              button: 'rounded-sm w-6 h-6 bg-white shadow flex items-center justify-center text-gray-800 text-xs rounded',
              buttonChecked: 'rounded-sm w-6 h-6 bg-white shadow flex items-center justify-center text-gray-800 text-xs rounded',
              checkedPlaceholder: 'rounded-sm w-6 h-6 flex items-center justify-center text-gray-500 text-xs',
              uncheckedPlaceholder: 'rounded-sm w-6 h-6 flex items-center justify-center text-gray-500 text-xs',
            },
          },
          on: {
            input: (amOrPM: 'AM' | 'PM') => {
              const formattedDate = this.format(new Date(this.localActiveDate.valueOf()), 'Y-m-d G:i:S');
              const newActiveDate = this.parse(`${formattedDate} ${amOrPM}`, 'Y-m-d G:i:S K');
              this.$emit('input', newActiveDate);
            },
          },
        },
      ));
    }

    const timePickerWrapper = createElement(
      'div',
      {
        ref: 'timeInput',
        class: 'flex items-center space-x-1',
      },
      timePickerElements,
    );

    subElements.push(label);
    subElements.push(timePickerWrapper);

    return createElement(
      'div',
      {
        class: 'flex items-center px-4 py-2',
      },
      subElements,
    );
  },
});

export default TDatepickerTimeSelector;
