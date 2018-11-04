import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import './plugins/element.js'
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false

Vue.use(VeeValidate, {
  inject: false
});

new Vue({
  render: h => h(App),
}).$mount('#app')
