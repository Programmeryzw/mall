<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div> 
  </div>
</template>
<script>
  export default {
    name:"Toast",
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message='默认文字', duration=1500){
        this.message = message
        this.isShow = true;

        setTimeout(() => {
          this.isShow = false;
          this.message = "";
        }, duration);
      }
    },
  }
</script>
<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    z-index: 11;

    background-color: #4a4a4a;
    color: #fff;
  }
</style>
