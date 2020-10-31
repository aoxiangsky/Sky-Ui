<template>
  <div>
    <Sky-Radio-Group v-model="radioVideo">
      <Sky-Radio label="lala">啦啦啦啦啦</Sky-Radio>
      <Sky-Radio label="yaya">呀呀呀呀呀</Sky-Radio>
      <Sky-Radio label="haha">哈哈哈哈哈</Sky-Radio>
    </Sky-Radio-Group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radioVideo: '',
      radioYaya: '',
      radioHaha: '',
    };
  },
};
</script>
