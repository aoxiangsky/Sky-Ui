<template>
  <div class="alert">
    <div class="alert-main" v-for="item in notices" :key="item.name">
      <div class="alert-content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script>
let seed = 0;

function getUuid() {
  seed += 1;
  return `alert_${seed}`;
}
export default {
  name: 'SkyAlert',
  data() {
    return {
      notices: [],
    };
  },
  methods: {
    add(notice) {
      const name = getUuid();
      const noticeInstance = { name, ...notice };
      this.notices.push(noticeInstance);

      const { duration } = notice;
      setTimeout(() => {
        this.remove(name);
      }, duration * 1000);
    },
    remove(name) {
      const { notices } = this;
      for (let i = 0; i < notices.length; i += 1) {
        if (notices[i].name === name) {
          this.notices.splice(i, 1);
          break;
        }
      }
    },
  },
};
</script>

<style>
.alert {
  left: 0;
  pointer-events: none;
  position: fixed;
  text-align: center;
  top: 16px;
  width: 100%;
}
.alert-content {
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  display: inline-block;
  margin-bottom: 8px;
  padding: 8px 16px;
}
</style>
