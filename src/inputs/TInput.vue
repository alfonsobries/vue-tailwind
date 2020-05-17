<template>
  <input
    :id="id"
    v-model="localValue"
    :name="name"
    :disabled="disabled"
    :readonly="readonly"
    :autocomplete="autocomplete"
    :autofocus="autofocus"
    :max="max"
    :maxlength="maxlength"
    :min="min"
    :minlength="minlength"
    :multiple="multiple"
    :pattern="pattern"
    :placeholder="placeholder"
    :required="required"
    :type="type"
    :class="variantClass"
    @blur="onBlur"
    @focus="onFocus"
    @keyup="onKeyUp"
    @keydown="onKeyDown"
  >
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';
import TextInput from '../components/TextInput';

@Component({})
export default class TInput extends TextInput {
  readonly $el!: HTMLInputElement;

  @Prop({ default: 'text' })
  type?: string

  @Prop()
  readonly max?: string | number

  @Prop()
  readonly min?: string | number

  @Watch('localValue')
  onLocalValueChange(localValue: string | null) {
    this.$emit('input', localValue);
  }

  @Watch('value')
  onValueChange(value: string | null): void {
    this.localValue = value;
  }

  onBlur(e: FocusEvent) {
    this.$emit('blur', e);

    if (this.localValue !== this.valueWhenFocus) {
      this.$emit('change', this.localValue);
    }
  }

  onFocus(e: FocusEvent) {
    this.$emit('focus', e);

    this.valueWhenFocus = this.localValue;
  }

  onKeyUp(e: KeyboardEvent) {
    this.$emit('keyup', e);
  }

  onKeyDown(e: KeyboardEvent) {
    this.$emit('keydown', e);
  }

  blur() {
    this.$el.blur();
  }

  click() {
    this.$el.click();
  }

  focus(options?: FocusOptions | undefined) {
    this.$el.focus(options);
  }

  select() {
    this.$el.select();
  }

  setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none' | undefined) {
    this.$el.setSelectionRange(start, end, direction);
  }

  setRangeText(replacement: string) {
    this.$el.setRangeText(replacement);
  }

  get variantClass() {
    if (this.classes && typeof this.classes[this.variant || 'default'] !== 'undefined') {
      return this.classes[this.variant || 'default'];
    }

    return '';
  }
}
</script>
