import Vue, { CreateElement, VNode } from 'vue';
import TToggle from '../TToggle';
import isNumeric from '../../utils/isNumeric';

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
    amPm: {
      type: Boolean,
      required: true,
    },
    showSeconds: {
      type: Boolean,
      required: true,
    },
    activeDate: {
      type: Date,
      required: true,
    },
    locale: {
      type: Object,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
      alreadyTriedAnInvalidValue: false,
      lastValidValue: '',
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
      const numbers = timeInputKeys.join('').substr(this.showSeconds ? -6 : -4);
      const minutesInput = this.$refs.minutes as HTMLInputElement;
      const hoursInput = this.$refs.hours as HTMLInputElement;
      const fullTime: string = numbers.padStart(this.showSeconds ? 6 : 4, ' ').substr(this.showSeconds ? -6 : -4);

      if (this.showSeconds) {
        const secondsInput = this.$refs.seconds as HTMLInputElement;
        secondsInput.value = fullTime.substr(4, 2).trim();
        minutesInput.value = fullTime.substr(2, 2).trim();
        hoursInput.value = fullTime.substr(0, 2).trim();
      } else {
        minutesInput.value = fullTime.substr(2, 2).trim();
        hoursInput.value = fullTime.substr(0, 2).trim();
      }
    },
    activeDate(activeDate: Date) {
      this.localActiveDate = new Date(activeDate.valueOf());
      this.lastValidValue = '';
      this.alreadyTriedAnInvalidValue = false;
      this.timeInputKeys = [];
    },
  },

  methods: {
    handleFullTimeBlur(e: FocusEvent) {
      this.$emit('blur', e);

      if (!this.timeInputKeys.length) {
        return;
      }

      const numbers = this.timeInputKeys.filter((key) => isNumeric(key)).join('').substr(this.showSeconds ? -6 : -4);
      const fullTime: string = numbers.padStart(this.showSeconds ? 6 : 4, '0').substr(this.showSeconds ? -6 : -4);
      let time: Date;

      if (this.showSeconds) {
        if (this.amPm && Number(fullTime.substr(0, 2)) <= 12) {
          const formattedIntendedTime = `${fullTime.substr(0, 2)}:${fullTime.substr(2, 2)}:${fullTime.substr(4, 2)} ${this.amPmFormatted}`;
          time = this.parse(formattedIntendedTime, 'H:i:S K');
        } else {
          const formattedIntendedTime = `${fullTime.substr(0, 2)}:${fullTime.substr(2, 2)}:${fullTime.substr(4, 2)}`;
          time = this.parse(formattedIntendedTime, 'G:i:S');
        }
      } else if (this.amPm && Number(fullTime.substr(0, 2)) <= 12) {
        const formattedIntendedTime = `${fullTime.substr(0, 2)}:${fullTime.substr(2, 2)} ${this.amPmFormatted}`;
        time = this.parse(formattedIntendedTime, 'H:i K');
      } else {
        const formattedIntendedTime = `${fullTime.substr(0, 2)}:${fullTime.substr(2, 2)}`;
        time = this.parse(formattedIntendedTime, 'G:i');
      }


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
      }

      this.focusNextElementFullTimeSelector();
    },
    focusNextElementFullTimeSelector() {
      if (this.amPm) {
        type AMPMPicker = Element & {
          focus: () => void
        };

        (this.$refs.amPm as AMPMPicker).focus();
      } else {
        this.focusOkButton();
      }
    },
    focusOkButton() {
      (this.$refs.okButton as HTMLButtonElement).focus();
    },
    handleTimeInputFocus(e: FocusEvent) {
      const input = e.target as HTMLInputElement;
      input.focus();
      setTimeout(() => {
        input.setSelectionRange(0, 2);
      }, 1);
    },
    handleTimeInput(e: InputEvent, maxValue: number, minValue: number, valueHandler: (numericValue: number) => void) {
      const input = e.target as HTMLInputElement;
      const { value } = input;

      if (value === '') {
        return;
      }

      const numericValue = Number(value);
      const keyPressed = Number(e.data);

      if (!isNumeric(numericValue)) {
        input.value = this.lastValidValue;
        return;
      }

      if (numericValue > maxValue || numericValue < minValue) {
        if (isNumeric(keyPressed)) {
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
      const newDate: Date = new Date(this.localActiveDate.valueOf());
      newDate.setHours(hours);
      this.localActiveDate = newDate;
    },
    setMinutes(minutes: number): void {
      const newDate: Date = new Date(this.localActiveDate.valueOf());
      newDate.setMinutes(minutes);
      this.localActiveDate = newDate;
    },
    setSeconds(seconds: number): void {
      const newDate: Date = new Date(this.localActiveDate.valueOf());
      newDate.setSeconds(seconds);
      this.localActiveDate = newDate;
    },
    updateSecondsInput() {
      if (!this.showSeconds) {
        return;
      }

      const seconds = this.$refs.seconds as HTMLInputElement | undefined;
      if (seconds) {
        seconds.value = this.secondsFormatted;
      }
    },
    updateMinutesInput() {
      const minutes = this.$refs.minutes as HTMLInputElement | undefined;
      if (minutes) {
        minutes.value = this.minutesFormatted;
      }
    },
    updateHoursInput() {
      const hours = this.$refs.hours as HTMLInputElement | undefined;
      if (hours) {
        hours.value = this.hoursFormatted;
      }
    },
    focus(): void {
      const timeInput = this.$refs.timeInput as HTMLDivElement | undefined;
      if (timeInput) {
        timeInput.focus();
      }
    },
  },

  render(createElement: CreateElement): VNode {
    const subElements: VNode[] = [];

    const label = createElement(
      'label',
      {
        class: this.getElementCssClass('timepickerTimeLabel'),
      },
      this.locale.timeLabel,
    );

    const timePickerInputs = [
      createElement(
        'input',
        {
          ref: 'hours',
          class: this.getElementCssClass('timepickerInput'),
          domProps: {
            value: this.hoursFormatted,
          },
          attrs: {
            inputmode: 'numeric',
            type: 'text',
            contenteditable: false,
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
                } else {
                  this.setHours(hours);
                }
              });
            },
            blur: (e: FocusEvent) => {
              this.$emit('blur', e);
              this.$emit('input', this.localActiveDate);
              this.$nextTick(() => {
                this.updateHoursInput();
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
          class: this.getElementCssClass('timepickerTimeSeparator'),
          attrs: {
            contenteditable: false,
          },
        },
        ':',
      ),
      createElement(
        'input',
        {
          ref: 'minutes',
          class: this.getElementCssClass('timepickerInput'),
          domProps: {
            value: this.minutesFormatted,
          },
          attrs: {
            inputmode: 'numeric',
            type: 'text',
            contenteditable: false,
          },
          on: {
            input: (e: InputEvent) => {
              const maxMinutes = 59;
              const minMinutes = 0;
              this.handleTimeInput(e, maxMinutes, minMinutes, this.setMinutes);
            },
            blur: (e: FocusEvent) => {
              this.$emit('blur', e);
              this.$emit('input', this.localActiveDate);
              this.$nextTick(() => {
                this.updateMinutesInput();
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
          class: this.getElementCssClass('timepickerTimeSeparator'),
          attrs: {
            contenteditable: false,
          },
        },
        ':',
      ));

      timePickerInputs.push(
        createElement(
          'input',
          {
            ref: 'seconds',
            class: this.getElementCssClass('timepickerInput'),
            domProps: {
              value: this.secondsFormatted,
            },
            attrs: {
              inputmode: 'numeric',
              type: 'text',
              contenteditable: false,
            },
            on: {
              input: (e: InputEvent) => {
                const maxSeconds = 59;
                const minSeconds = 0;
                this.handleTimeInput(e, maxSeconds, minSeconds, this.setSeconds);
              },
              blur: (e: FocusEvent) => {
                this.$emit('blur', e);
                this.$emit('input', this.localActiveDate);
                this.$nextTick(() => {
                  this.updateSecondsInput();
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
          ref: 'timeInput',
          class: this.getElementCssClass('timepickerTimeFieldsWrapper'),
          style: {
            caretColor: 'transparent',
          },
          attrs: {
            tabindex: 0,
            inputmode: 'numeric',
            contenteditable: true,
          },
          on: {
            keydown: (e: KeyboardEvent) => {
              if (e.target !== this.$refs.timeInput) {
                return;
              }

              e.preventDefault();

              const { key } = e;

              if (key === 'Enter') {
                this.focusNextElementFullTimeSelector();
              } else if (key === 'Backspace') {
                this.timeInputKeys.pop();
              } if (isNumeric(key)) {
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
              wrapper: '',
              wrapperChecked: '',
              wrapperDisabled: '',
              wrapperCheckedDisabled: '',
              button: '',
              buttonChecked: '',
              checkedPlaceholder: '',
              uncheckedPlaceholder: '',
            },
            classes: {
              wrapper: this.getElementCssClass('timepickerAmPmWrapper'),
              wrapperChecked: this.getElementCssClass('timepickerAmPmWrapperChecked'),
              wrapperDisabled: this.getElementCssClass('timepickerAmPmWrapperDisabled'),
              wrapperCheckedDisabled: this.getElementCssClass('timepickerAmPmWrapperCheckedDisabled'),
              button: this.getElementCssClass('timepickerAmPmButton'),
              buttonChecked: this.getElementCssClass('timepickerAmPmButtonChecked'),
              checkedPlaceholder: this.getElementCssClass('timepickerAmPmCheckedPlaceholder'),
              uncheckedPlaceholder: this.getElementCssClass('timepickerAmPmUncheckedPlaceholder'),
            },
          },
          on: {
            blur: (e: FocusEvent) => this.$emit('blur', e),
            input: (amOrPM: string) => {
              const formattedDate = this.format(new Date(this.localActiveDate.valueOf()), 'Y-m-d G:i:S');
              const newActiveDate = this.parse(`${formattedDate} ${amOrPM}`, 'Y-m-d G:i:S K');
              this.$emit('input', newActiveDate);
            },
            keydown: (e: KeyboardEvent) => {
              const { key } = e;

              if (key === 'Enter') {
                this.focusOkButton();
              }
            },
          },
        },
      ));
    }

    timePickerElements.push(
      createElement(
        'a',
        {
          ref: 'okButton',
          attrs: {
            href: '#',
          },
          class: this.getElementCssClass('timepickerOkButton'),
          on: {
            blur: (e: FocusEvent) => this.$emit('blur', e),
            click: (e: MouseEvent) => {
              e.preventDefault();

              this.$emit('submit', this.localActiveDate);
            },
          },
        },
        this.locale.okLabel,
      ),
    );

    const timePickerWrapper = createElement(
      'div',
      {
        class: this.getElementCssClass('timepickerTimeWrapper'),
      },
      timePickerElements,
    );

    subElements.push(label);
    subElements.push(timePickerWrapper);

    return createElement(
      'div',
      {
        class: this.getElementCssClass('timepickerWrapper'),
      },
      subElements,
    );
  },
});

export default TDatepickerTimeSelector;
