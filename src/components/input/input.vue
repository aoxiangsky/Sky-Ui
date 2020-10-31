<template>
  <div>
    <template v-if="type !== 'textarea'">
      <input
        :value="currentValue"
        type="text"
        @blur="handleBlur"
        @input="handleInput"
        @change="handleChange"
      />
    </template>
    <textarea v-else name="" id="" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
import { oneOf } from '../../utils/tools';
import Emitter from '../../mixins/emitter';

export default {
  name: 'SkyInput',
  mixins: [Emitter],
  props: {
    type: {
      validator(value) {
        return oneOf(value, [
          'text',
          'textarea',
          'password',
          'url',
          'email',
          'date',
          'number',
          'tel',
        ]);
      },
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  methods: {
    handleInput(event) {
      const { value } = event.target;
      this.currentValue = value;
      this.$emit('input', value);
      this.dispatch('SkyFormItem', 'on-form-change', value);
    },
    handleChange(event) {
      this.$emit('on-input-change', event);
    },
    handleBlur() {
      this.dispatch('SkyFormItem', 'on-form-blur', this.currentValue);
    },
    setCurrentValue(value) {
      if (value === this.currentValue) return;
      this.currentValue = value;
    },
  },
  watch: {
    value(val) {
      this.setCurrentValue(val);
    },
  },
};
</script>
