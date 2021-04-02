export default {
  addToCart(state, payload) {
    payload.checked = true
    state.cart.push(payload)
  },
  addCounter(state, payload) {
    payload.count++
  }
}