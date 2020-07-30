<template>
  <button
    class="dipont-btn"
    @click="handleClick"
    :disabled="buttonDisabled"
    :type="nativeType"
    :themeType="themeType"
    :style="{
      width: btnWidth + 'px',
      height: btnHeight + 'px',
      borderRadius: btnBr + 'px'
    }"
  >
    <i :class="icon" v-if="icon"></i>
    <span class="dip-btn-inner" v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: "skyButton",
  props: {
    themeType: {
      type: String,
      default: "default"
    },
    icon: {
      type: String,
      default: ""
    },
    nativeType: {
      type: String,
      default: "button"
    },
    btnWidth: {
      type: String,
      default: "136"
    },
    btnHeight: {
      type: String,
      default: "28"
    },
    btnBr: {
      type: String,
      default: "4"
    },
    bacColor: {
      type: String,
      default: ""
    },
    disabled: Boolean
  },
  computed: {
    buttonDisabled() {
      return this.disabled;
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    }
  }
};
</script>

<style scoped lang="scss">
$default-color: #f5f7f9;
$default-word-color: #333;
$default-border-color: #979797;
$default-hover-color: rgb(97, 66, 182);
$disabled-color: #dadada;

@mixin button-color($color, $hover-color, $word-color, $border-color) {
  background-color: $color;
  color: $word-color;
  border: 1px solid $border-color;
  box-shadow: 0 0 0 1px $color inset;
  &:hover {
    background-color: $hover-color;
    box-shadow: 0 0 0 1px $hover-color inset;
  }
}

.dipont-btn {
  cursor: pointer;
  border: none;
  box-sizing: border-box;
  background: 0 0;
  font-family: BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial,
    sans-serif;
  text-decoration: none;
  white-space: nowrap;
  color: #fff;
  outline: 0;
  display: inline-block;
  line-height: 1;
  font-size: 12px;
  transition: all 0.1s linear;
  position: relative;

  .dip-btn-inner {
    display: flex;
    justify-content: center;
  }

  &:disabled {
    cursor: not-allowed;
    color: $disabled-color !important;
    box-shadow: 0 0 0 1px $disabled-color inset !important;
  }

  &[themeType="default"] {
    @include button-color(
      $default-color,
      $default-hover-color,
      $default-word-color,
      $default-border-color
    );
  }
}
</style>
