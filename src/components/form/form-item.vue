<template>
  <div>
    <label v-if="label || $slots.label" :class="{ 'i-form-item-label-required': isRequired }"
      ><slot name="label">{{ label }}</slot></label
    >
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="i-form-item-message">{{ validateMessage }}</div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import Emitter from '../../mixins/emitter';

export default {
  name: 'SkyFormItem',
  mixins: [Emitter],
  props: {
    /*
    单个表单组件的标签文本，
    类似原生的 `<label>` 元素，类型为 String。
    */
    label: {
      type: String,
      default: '',
    },
    /*
    对应表单域 Form 组件 model 里的字段，
    用于在校验或重置时访问表单组件绑定的数据，
    类型为 String。
    */
    prop: {
      type: String,
    },
  },
  inject: ['form'],
  data() {
    return {
      isRequired: false, // 是否为必填
      validateState: '', // 校验状态
      validateMessage: '', // 校验不通过时的提示信息
      initialValue: '', // 存储的初始值
    };
  },
  computed: {
    // 从 Form 的 model 中动态得到当前表单组件的数据
    fieldValue() {
      return this.form.model[this.prop];
    },
  },
  methods: {
    setRules() {
      const rules = this.getRules();
      if (rules.length) {
        // eslint-disable-next-line array-callback-return
        rules.every((rule) => {
          // 如果当前校验规则中有必填项，则标记出来
          this.isRequired = rule.required;
        });
      }
      this.$on('on-form-blur', this.onFieldBlur);
      this.$on('on-form-change', this.onFieldChange);
    },
    // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
    getRules() {
      let formRules = this.form.rules;

      formRules = formRules ? formRules[this.prop] : [];

      return [].concat(formRules || []);
    },
    // 重置数据
    resetField() {
      this.validateState = '';
      this.validateMessage = '';

      this.form.model[this.prop] = this.initialValue;
    },
    // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter((rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
    },
    onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange() {
      // if (this.validateDisabled) {
      //   this.validateDisabled = false;
      //   return;
      // }
      console.log('change?');
      this.validate('change');
    },
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    // eslint-disable-next-line func-names
    validate(trigger, callback = function() {}) {
      const rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        return;
      }

      // 设置状态为校验中
      this.validateState = 'validating';

      // 以下为 async-validator 库的调用方法
      const descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      const model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, (errors) => {
        this.validateState = errors ? 'error' : 'success';
        this.validateMessage = errors ? errors[0].message : '';
        callback(this.validateMessage);
      });
    },
  },
  mounted() {
    /* Vue.js 的组件渲染顺序是由内而外的，所以 FormItem 要先于 Form 渲染
     如果在 Form 的 mounted 里监听事件，是不可以的，所以要在其 created 内监听自定义事件，
    Form 的 created 要先于 FormItem 的 mounted。 */
    if (this.prop) {
      this.dispatch('SkyForm', 'on-form-item-add', this);

      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue;

      this.setRules();
    }
  },
  beforeDestroy() {
    this.dispatch('SkyForm', 'on-form-item-remove', this);
  },
};
</script>

<style>
.i-form-item-label-required::before {
  color: red;
  content: '*';
}
.i-form-item-message {
  color: red;
}
</style>
