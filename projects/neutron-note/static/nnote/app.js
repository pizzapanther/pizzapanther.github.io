import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';

import router from './routes';

Vue.use(VueRouter);
Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
  primary: 'deep-purple',
  accent: 'teal',
  warn: 'red',
  background: 'white'
});

var app = new Vue({
  el: '#app',
  router: router,
  data: {},
  created: function () {
    document.querySelector('#splash').remove();
    PageService.set_title();
  }
});
