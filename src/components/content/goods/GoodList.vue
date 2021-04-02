<template>
  <div class="goods1">
    <good-list-item v-for="(item, index) in goods" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem'

export default {
  name: "GoodList",
  components: {
    GoodListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods1 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>