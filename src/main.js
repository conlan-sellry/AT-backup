import Vue from 'vue';
import App from './App.vue';
import router from './router';
import * as VueGoogleMaps from 'vue2-google-maps';

//import app from './assets/scss/app.scss';

//import vuetify from './plugins/vuetify'; // path to vuetify export

//webpack
//import vuetify from '@/plugins/vuetify'; // path to vuetify export

import { ValidationProvider, extend } from 'vee-validate';
Vue.component('ValidationProvider', ValidationProvider);

//import {VeeValidate} from 'vee-validate';

//import * as VeeValidate from 'vee-validate';
//const validator = new VeeValidate.Validator();

/*Vue.prototype.$validator = validator;
Vue.use(VeeElement, validator) ;*/


//
//Vue.use(VeeValidate);


import LoadScript from 'vue-plugin-load-script';

Vue.use(LoadScript);
/*

Vue.loadScript("https://d10ka0m22z5ju5.cloudfront.net/js/evrythng/5.4.0/evrythng-5.4.0.js")
    .then(() => {
        // Script is loaded, do something
    })
    .catch(() => {
        // Failed to fetch script
    });

Vue.loadScript("https://s3.amazonaws.com/scripts.cs.evrythng.com/another-tomorrow/at-connected.js")
    .then(() => {
        // Script is loaded, do something
    })
    .catch(() => {
        // Failed to fetch script
    });
*/


Vue.use(VueGoogleMaps, {
  load:{
    key: 'AIzaSyCh2hWHOFsiyCuIMUh6XuGAmvT3CRPMfjE',//@TODO - move to Netlify env vars
    //libraries: 'places' // necessary for places input
  }
});

require('./assets/scss/app.scss');

Vue.config.productionTip = false;

new Vue({
  //vuetify,
  components: { App },
  render: h => h(App),
  router
}).$mount('#app');
