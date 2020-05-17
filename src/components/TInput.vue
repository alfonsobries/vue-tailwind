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
    :class="inputClass"
    @blur="onBlur"
    @focus="onFocus"
    @keyup="onKeyUp"
    @keydown="onKeyDown"
  >
</template>

<script lang="ts">
import TInput from '../inputs/Text';

export default TInput.extend({
  name: 'TInput',
});
</script>
