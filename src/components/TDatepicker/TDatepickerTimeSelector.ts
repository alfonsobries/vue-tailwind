import Vue, { CreateElement, VNode } from 'vue';
import TToggle from '../TToggle';

const isNumber = (char: string | number): boolean => /^\d+$/.test(String(char));

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
    locale: {
      type: Object,
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
      timeInputKeys: [] as string[],
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
    timeInputKeys(timeInputKeys: string[]) {
      if (timeInputKeys.length === 0) {
        return;
      }

      const numbers = timeInputKeys.join('').substr(-4);
      const minutesInput = this.$refs.minutes as HTMLInputElement;
      const hoursInput = this.$refs.hours as HTMLInputElement;
      const fullTime: string = numbers.padStart(4, ' ').substr(-4);

      minutesInput.value = fullTime.substr(-2).trim();
      hoursInput.value = fullTime.substr(0, 2).trim();
    },
    activeDate(activeDate: Date) {
      this.localActiveDate = new Date(activeDate.valueOf());
      this.lastValidValue = '';
      this.alreadyTriedAnInvalidValue = false;
      this.timeInputKeys = [];
    },
  },

  methods: {
    handleFullTimeBlur() {
      if (!this.timeInputKeys.length) {
        return;
      }


      const numbers = this.timeInputKeys.filter((key) => isNumber(key)).join('').substr(-4);
      const fullTime: string = numbers.padStart(4, '0').substr(-4);
      const formattedIntendedTime = `${fullTime.substr(0, 2)}:${fullTime.substr(-2)}`;
      const time: Date = this.parse(formattedIntendedTime, 'G:i');

      if (time instanceof Date && !Number.isNaN(time)) {
        this.setHours(time.getHours());
        this.setMinutes(time.getMinutes());
        this.setSeconds(time.getSeconds());

        this.$emit('input', this.localActiveDate);

        this.$nextTick(() => {
          this.updateSecondsInput();
          this.updateMinutesInput();
          this.updateHoursInput();
        });

        this.$refs.amPm.focus();
      }
    },
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

      if (!isNumber(numericValue)) {
        input.value = this.lastValidValue;
        return;
      }

      if (numericValue > maxValue || numericValue < minValue) {
        if (isNumber(keyPressed)) {
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
      this.localActiveDate.setHours(hours);
    },

    setMinutes(minutes: number): void {
      this.localActiveDate.setMinutes(minutes);
    },
    setSeconds(seconds: number): void {
      this.localActiveDate.setSeconds(seconds);
    },
    updateSecondsInput() {
      if (!this.showSeconds) {
        return;
      }
      (this.$refs.seconds as HTMLInputElement).value = this.secondsFormatted;
    },
    updateMinutesInput() {
      (this.$refs.minutes as HTMLInputElement).value = this.minutesFormatted;
    },
    updateHoursInput() {
      (this.$refs.hours as HTMLInputElement).value = this.hoursFormatted;
    },
    focus(): void {
      (this.$refs.timeInput as HTMLDivElement).focus();
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
          class: 'text-center w-8 border-transparent bg-transparent p-0 h-6 text-sm transition duration-100 ease-in-out border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 rounded',
          attrs: {
            type: 'text',
            value: this.hoursFormatted,
          },
          on: {
            input: (e: InputEvent) => {
              const maxHours = this.amPm ? 12 : 23;
              const minHours = this.amPm ? 1 : 0;

              this.handleTimeInput(e, maxHours, minHours, (hours: number) => {
                if (this.amPm) {
                  if (hours === 12) {
                    this.setHours(this.amPmFormatted === this.locale.amPM[1] ? hours : 0);
                  } else {
                    this.setHours(this.amPmFormatted === this.locale.amPM[1] ? hours + 12 : hours);
                  }
                }
              });
            },
            blur: (e: FocusEvent) => {
              e.stopPropagation();
              this.$emit('input', this.localActiveDate);
              this.$nextTick(() => {
                this.updateHoursInput();
              });
            },
            focus: (e: FocusEvent) => {
              e.stopPropagation();
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
          class: 'text-center w-8 border-transparent bg-transparent p-0 h-6 text-sm transition duration-100 ease-in-out border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 rounded',
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
              e.stopPropagation();
              this.$emit('input', this.localActiveDate);
              this.$nextTick(() => {
                this.updateMinutesInput();
              });
            },
            focus: (e: FocusEvent) => {
              e.stopPropagation();
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
            class: 'text-center w-8 border-transparent bg-transparent p-0 h-6 text-sm transition duration-100 ease-in-out border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 rounded',
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
                e.stopPropagation();
                this.$emit('input', this.localActiveDate);
                this.$nextTick(() => {
                  this.updateSecondsInput();
                });
              },
              focus: (e: FocusEvent) => {
                e.stopPropagation();
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
          ref: 'timeInput',
          class: 'bg-gray-100 rounded-md w-full text-right flex items-center border border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
          attrs: {
            tabindex: 0,
          },
          on: {
            keyup: (e: KeyboardEvent) => {
              if (e.target !== this.$refs.timeInput) {
                return;
              }

              const { key } = e;
              if (isNumber(key)) {
                this.timeInputKeys.push(key);
              }
            },
            blur: this.handleFullTimeBlur,
          },
        },
        timePickerInputs,
      ),
    ];

    if (this.amPm) {
      timePickerElements.push(createElement(
        TToggle,
        {
          ref: 'amPm',
          props: {
            model: this.amPmFormatted,
            value: this.locale.amPM[1],
            uncheckedValue: this.locale.amPM[0],
            checkedPlaceholder: this.locale.amPM[0],
            uncheckedPlaceholder: this.locale.amPM[1],
            checkedLabel: this.locale.amPM[1],
            uncheckedLabel: this.locale.amPM[0],
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
              wrapper: 'bg-gray-100 rounded-sm rounded transition duration-100 ease-in-out border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
              wrapperChecked: 'bg-gray-100 rounded-sm rounded transition duration-100 ease-in-out border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
              button: 'rounded-sm w-6 h-6 bg-white shadow flex items-center justify-center text-gray-800 text-xs rounded',
              buttonChecked: 'rounded-sm w-6 h-6 bg-white shadow flex items-center justify-center text-gray-800 text-xs rounded',
              checkedPlaceholder: 'rounded-sm w-6 h-6 flex items-center justify-center text-gray-500 text-xs',
              uncheckedPlaceholder: 'rounded-sm w-6 h-6 flex items-center justify-center text-gray-500 text-xs',
            },
          },
          on: {
            input: (amOrPM: string) => {
              const formattedDate = this.format(new Date(this.localActiveDate.valueOf()), 'Y-m-d G:i:S');
              const newActiveDate = this.parse(`${formattedDate} ${amOrPM}`, 'Y-m-d G:i:S K');
              this.$emit('input', newActiveDate);
            },
          },
        },
      ));
    }

    timePickerElements.push(
      createElement(
        'button',
        {
          class: 'text-blue-600 text-sm uppercase font-semibold transition duration-100 ease-in-out border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 rounded',
          attrs: {
            type: 'button',
          },
          on: {
            click: () => this.$emit('submit', this.localActiveDate),
          },
        },
        'Ok',
      ),
    );

    const timePickerWrapper = createElement(
      'div',
      {
        class: 'flex items-center space-x-2',
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
