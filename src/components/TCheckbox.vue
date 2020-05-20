<template>
  <input
    :id="id"
    ref="input"
    v-model="isChecked"
    :value="value"
    :autofocus="autofocus"
    :readonly="readonly"
    :disabled="disabled"
    :name="name"
    :required="required"
    :class="inputClass"
    type="checkbox"
    @blur="onBlur"
    @focus="onFocus"
    @change="onChange"
  >
</template>

<script lang="ts">
import TCheckbox from '../inputs/Checkbox';

export default TCheckbox.extend({
  name: 'TCheckbox',
});
</script>
