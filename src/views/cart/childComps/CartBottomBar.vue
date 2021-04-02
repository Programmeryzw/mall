<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :isChecked="isCheckedAll" @click.native="selectAll"/>
      <span>全选</span>
    </div>
    <div class="totle-price">
      合计:{{totalPrice}}
    </div>
    <div class="check-count" @click="calcClick">
      去计算:({{checkedLength}})
    </div>
  </div>  
</template>

<script>
import CheckButton from './checkButton'

  export default {
    name:"CartBottomBar",
    components: {
      CheckButton
    },
    methods: {
      selectAll() {
        if(this.isCheckedAll){
          this.$store.state.cart.forEach(item => item.checked = false)
        }else{
          this.$store.state.cart.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(!this.checkedLength){
          this.$toast.show('请选择商品', 1000)
        }
      }
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cart.filter( item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + parseFloat(item.price.substring(1)) * item.count
        }, 0).toFixed(2)
      },
      checkedLength() {
        return this.$store.state.cart.filter(item => item.checked).length
      },
      isCheckedAll() {
        if(this.$store.state.cart.length === 0) return false
        return !this.$store.state.cart.find(item => !item.checked)
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar{
    display: flex;
    position: relative;
    bottom: 44px;
    z-index: 9;
    height: 35px;
    background-color: #eee;
    font-size: 14px;
  }
  .cart-bottom-bar div{
    line-height: 35px;
    text-align: center;
  }

  .cart-bottom-bar .check-content{
    display: flex;
    flex: 0.5;
    align-items: center;
  }
  .check-content .check-button{
    height: 20px;
    width: 20px;
    line-height: 20px;
    margin: 0 5px 0 10px;
  }

  .cart-bottom-bar .totle-price{
    flex: 1;
  }

  .cart-bottom-bar .check-count{
    flex: 0.5;
    background-color: #ff0000;
    color: #fff;
  } 
</style>
