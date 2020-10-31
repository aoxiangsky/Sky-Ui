<template>
  <button>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: 'SkyButton',
};
</script>
