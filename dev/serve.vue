<script>
import Vue from 'vue';
import { SkyButton } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    SkyButton,
  }
});
</script>

<template>
  <div id="app">
    <sky-button type="pripary">9999</sky-button>
  </div>
</template>
