<template>
  <textarea
    :id="id"
    v-model="localValue"
    :name="name"
    :disabled="disabled"
    :readonly="readonly"
    :autocomplete="autocomplete"
    :autofocus="autofocus"
    :maxlength="maxlength"
    :minlength="minlength"
    :multiple="multiple"
    :pattern="pattern"
    :placeholder="placeholder"
    :required="required"
    :wrap="wrap"
    :rows="rows"
    :cols="cols"
    :class="inputClass"
    @blur="onBlur"
    @focus="onFocus"
    @keyup="onKeyUp"
    @keydown="onKeyDown"
  />
</template>

<script lang="ts">
import TTextarea from '../inputs/Textarea';

export default TTextarea;
</script>
