<template>
  <Sky-Form ref="form" :model="formValidate" :rules="ruleValidate">
    <Sky-Form-Item label="用户名" prop="name">
      <Sky-Input v-model="formValidate.name" />
    </Sky-Form-Item>
    <Sky-Form-Item label="邮箱" prop="mail">
      <Sky-Input v-model="formValidate.mail" />
    </Sky-Form-Item>
    <Sky-Form-Item label="多选框" prop="groupValue">
      <SkyCheckboxGroup v-model="formValidate.groupValue">
        <Sky-Checkbox label="喇叭" />
        <Sky-Checkbox label="笛子" />
        <Sky-Checkbox label="箫" />
      </SkyCheckboxGroup>
    </Sky-Form-Item>
    <Sky-Form-Item label="单选" prop="fruits">
      <Sky-Radio-Group v-model="formValidate.fruits">
        <Sky-Radio label="苹果" /> <Sky-Radio label="桃子" /> <Sky-Radio label="梨子" />
      </Sky-Radio-Group>
    </Sky-Form-Item>
    <button type="button" @click="handleSubmit">提交</button>
    <button type="button" @click="handleReset">重置</button>
  </Sky-Form>
</template>

<script>
export default {
  data() {
    return {
      formValidate: {
        name: '',
        mail: '',
        groupValue: ['喇叭', '笛子'],
        fruits: '',
      },
      ruleValidate: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
        ],
        groupValue: [
          {
            type: 'array',
            required: true,
            message: '必须要选择啊',
            trigger: 'change',
          },
        ],
        fruits: [
          {
            type: 'string',
            required: true,
            message: '要吃水果哦',
            trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // eslint-disable-next-line no-alert
          window.alert('提交成功');
        } else {
          // eslint-disable-next-line no-alert
          window.alert('表单校验失败');
        }
      });
    },
    handleReset() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
