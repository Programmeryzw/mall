import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import Toast from 'components/common/toast/index.js'
import FastClick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
//添加事件总线
Vue.prototype.$bus = new Vue()
//安装toast
Vue.use(Toast)
//安装图片懒加载插件
Vue.use(vueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})
//解决移动端300ms延迟
FastClick.attach(document.body)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

