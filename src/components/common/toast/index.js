import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
  //创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  //创建组件实例
  const toast = new toastConstructor()
  //挂在到一个dom上，后面才能拿到$el
  toast.$mount(document.createElement('div'))
  //在body添加toast元素
  document.body.appendChild(toast.$el)
  //将toast实例对象添加到vue原型上，这样就可以在任何地方都可以取到了
  Vue.prototype.$toast = toast
}


export default obj;