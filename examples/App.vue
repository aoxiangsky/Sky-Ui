<template>
  <div class="sky-show">
    <ul class="list-content">
      <li><router-link to="/button">Button</router-link></li>
      <li><router-link to="/input">Input</router-link></li>
      <li><router-link to="/radio">Radio</router-link></li>
      <li><router-link to="/checkbox">Checkbox</router-link></li>
      <li><router-link to="/form">Form</router-link></li>
      <li><router-link to="/alert">Alert</router-link></li>
      <li><router-link to="/table-render">Table-render</router-link></li>
      <li><router-link to="/table-slot">Table-slot</router-link></li>
      <li><router-link to="/tree">Tree</router-link></li>
    </ul>
    <div class="show-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
};
</script>

<style lang="scss" scoped>
.sky-show {
  display: flex;
  min-height: 80vh;
}
.list-content {
  list-style: none;
  width: 320px;
}
li {
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  margin: 5px;
  a {
    border-radius: 4px;
    box-sizing: border-box;
    color: #333;
    display: inline-block;
    height: 100%;
    padding-left: 20px;
    text-decoration: none;
    width: 100%;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}
.router-link-exact-active {
  background: rgba(135, 206, 235, 0.3);
}
.show-content {
  padding: 20px;
  width: calc(100% - 200px);
}
</style>
