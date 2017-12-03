import Vue from 'vue';
import VueMaterial from 'vue-material';

import OurProjects from './projects';
import ContactInfo from './contact';

Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
  primary: 'teal',
  accent: 'orange',
  warn: 'red',
  background: 'white'
});

var app = new Vue({
  el: '#app',
  data() {
    return {
    };
  },
  created: function () {
    // document.querySelector('#splash').remove();
    // var app = document.querySelector('#app');
    // app.style.display = 'block';
  },
  methods: {
    
  }
});