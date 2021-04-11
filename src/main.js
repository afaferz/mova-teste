import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

//SCSS
import './scss/_reset.scss';
import './scss/_variables.scss';

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)


Vue.prototype.$axios = axios;
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
