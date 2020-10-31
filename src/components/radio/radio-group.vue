<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from '../../utils/tools';
import Emitter from '../../mixins/emitter';

export default {
  name: 'SkyRadioGroup',
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      currentValue: this.value,
      childrens: [],
    };
  },
  mounted() {
    this.updateValue();
  },
  methods: {
    updateValue() {
      this.childrens = findComponentsDownward(this, 'SkyRadio');
      if (this.childrens) {
        this.childrens.forEach((child) => {
          // eslint-disable-next-line no-param-reassign
          child.currentValue = this.currentValue === child.label;
          // eslint-disable-next-line no-param-reassign
          child.group = true;
        });
      }
    },
    change(data) {
      this.currentValue = data.value;
      this.updateValue();
      this.$emit('input', data.value);
      this.$emit('change', data.value);
      this.dispatch('SkyFormItem', 'on-form-change', data.value);
    },
  },
  watch: {
    value() {
      if (this.currentValue !== this.value) {
        this.currentValue = this.value;
        this.$nextTick(() => {
          this.updateValue();
        });
      }
    },
  },
};
</script>
