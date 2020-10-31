<template>
  <form><slot></slot></form>
</template>

<script>
export default {
  name: 'SkyForm',
  props: {
    /*
        表单控件绑定的数据对象，
        在校验或重置时会访问该数据对象下对应的表单数据，
        类型为 Object。
    */
    model: {
      type: Object,
    },
    /*
        表单验证规则，
        即上面介绍的 async-validator 所使用的校验规则，
        类型为 Object。
    */
    rules: {
      type: Object,
    },
  },
  provide() {
    return { form: this };
  },
  data() {
    return {
      fields: [],
    };
  },
  created() {
    // 表单单例项初始化保存
    this.$on('on-form-item-add', (field) => {
      if (field) this.fields.push(field);
    });
    this.$on('on-form-item-remove', (field) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
    });
  },
  methods: {
    // 公开方法：全部重置数据，遍历存储的每个表单单例实例，重置数据
    resetFields() {
      this.fields.forEach((field) => {
        field.resetField();
      });
    },
    // 公开方法：全部校验数据，支持 Promise
    validate(callback) {
      return new Promise((resolve) => {
        let valid = true;
        let count = 0;
        this.fields.forEach((field) => {
          field.validate('', (errors) => {
            if (errors) {
              valid = false;
            }
            count += 1;
            if (count === this.fields.length) {
              // 全部完成
              resolve(valid);
              if (typeof callback === 'function') {
                callback(valid);
              }
            }
          });
        });
      });
    },
  },
};
</script>
