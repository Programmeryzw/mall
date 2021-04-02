export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cart.find(item => item.iid === payload.iid)
      if(oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('商品数量加一')
      }else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加成功')
      }
    })
  }
}