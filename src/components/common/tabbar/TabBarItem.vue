<template>
  <div class="tab-bar-item" @click="clickItem">
    <div v-if="!isActive"><slot name="item-icon">aaa</slot></div>
    <div v-else>
      <slot name="item-icon-active"><h1>aaa</h1></slot>
    </div>
    <div :style="isActiveColor"><slot name="item-text">111</slot></div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  computed: {
    isActive() {
      return this.$route.path === this.path;
    },
    isActiveColor() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    clickItem() {
      this.$router.replace(this.path);
    }
  }
};
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}
</style>
