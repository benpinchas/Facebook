import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './filters'
import './registerServiceWorker'
// import './sass/main.sass'
Vue.config.productionTip = false

new Vue({    
  router,
  store,
  render: h => h(App)
}).$mount('#app')
