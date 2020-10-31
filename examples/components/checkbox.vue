<template>
  <div>
    <SkyCheckboxGroup @change="testChange" v-model="groupValue">
      <Sky-Checkbox @input="testtest" label="喇叭" />
      <Sky-Checkbox label="笛子" />
      <Sky-Checkbox label="箫" />
    </SkyCheckboxGroup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupValue: ['喇叭', '笛子'],
      testValue: [
        {
          name: '鸟',
          value: 'bird',
        },
        {
          name: '狗',
          value: 'gou',
        },
        {
          name: '猪',
          value: 'zhu',
        },
      ],
    };
  },
  methods: {
    testtest(value) {
      console.log(value);
    },
    testChange(value) {
      console.log('change  改变了', value);
    },
  },
};
</script>
