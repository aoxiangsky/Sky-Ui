<template>
  <label>
    <span>
      <span></span>
      <input type="radio" :disabled="disabled" :checked="currentValue" @change="change" />
    </span>
    <slot>{{ label }}</slot>
  </label>
</template>

<script>
import { oneOf, findComponentUpward } from '../../utils/tools';
import Emitter from '../../mixins/emitter';

export default {
  name: 'SkyRadio',
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    label: {
      type: [String, Number],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
      default() {
        return !this.$SKY_SOAR || this.$SKY_SOAR.size === '' ? 'default' : this.$SKY_SOAR.size;
      },
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      currentValue: this.value,
      group: false,
      parent: findComponentUpward(this, 'SkyRadioGroup'),
    };
  },
  methods: {
    change(event) {
      if (this.disabled) {
        return;
      }
      const { checked } = event.target;
      this.currentValue = checked;

      const value = checked ? this.trueValue : this.falseValue;
      this.$emit('input', value);
      if (this.group) {
        if (this.label !== undefined) {
          this.parent.change({
            value: this.label,
            checked: this.value,
          });
        }
      } else {
        this.$emit('change', value);
        this.dispatch('FormItem', 'on-form-change', value);
      }
    },
    updateValue() {
      this.currentValue = this.value === this.trueValue;
    },
  },
  mounted() {
    if (this.parent) {
      this.group = true;
      if (this.name && this.name !== this.parent.name) {
        if (console.warn) {
          console.warn('[Sky] Name does not match Radio Group name.');
        }
      } else {
        this.groupName = this.parent.name;
      }
    }
    if (this.group) {
      this.parent.updateValue();
    } else {
      this.updateValue();
    }
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateValue();
      } else {
        throw new Error('Value should be trueValue or falseValue.');
      }
    },
  },
};
</script>
