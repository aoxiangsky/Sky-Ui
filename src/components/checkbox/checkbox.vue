<template>
  <label>
    <span>
      <span></span>
      <input
        v-if="group"
        :value="label"
        v-model="model"
        :name="name"
        @change="change"
        type="checkbox"
      />
      <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :name="name"
        :checked="currentValue"
        @change="change"
      />
    </span>
    <slot>{{ label }}</slot>
  </label>
</template>

<script>
import { findComponentUpward } from '../../utils/tools';

export default {
  name: 'SkyCheckbox',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
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
      type: [String, Number, Boolean],
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      model: [],
      currentValue: this.value,
      group: false,
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
        this.parent.change(this.model);
      } else {
        this.$emit('change', value);
        this.dispatch('iFormItem', 'on-form-change', value);
      }
    },
    updateModel() {
      this.currentValue = this.value === this.trueValue;
    },
  },
  watch: {
    /*
      现在实现的 `v-model`，只是由内而外的，
      也就是说，通过点击 `<input> `选择，会通知到使用者，
      而使用者手动修改了 prop `value` ，
      Checkbox 是没有做响应的
    */
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        throw new Error('Value should be trueValue or falseValue.');
      }
    },
  },
  mounted() {
    this.parent = findComponentUpward(this, 'SkyCheckboxGroup');
    if (this.parent) {
      this.group = true;
    }
    if (this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
    }
  },
};
</script>
