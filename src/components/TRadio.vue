<template>
  <input
    :id="id"
    ref="input"
    v-model="localValue"
    :value="value"
    :autofocus="autofocus"
    :readonly="readonly"
    :disabled="disabled"
    :checked="checked"
    :name="name"
    :required="required"
    :class="inputClass"
    type="radio"
    @blur="onBlur"
    @focus="onFocus"
  >
</template>

<script lang="ts">
import TRadio from '../inputs/Radio';

export default TRadio.extend({
  name: 'TRadio',
});
</script>
