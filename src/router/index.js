import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/pages/home';
import Error from '../components/Error';
import c404 from '../components/404';

Vue.use(Router);

export default new Router({
  mode: 'history', // add 'history' mode
  routes: [
    {
      path: '/',
      component: Home,
    },
    /*{
      path: '/id/:id',
      component: Home,
      props: true
    },*/
    {
      path: '/404',
      component: c404
    },
    {
      path: '/error',
      component: Error
    },
    {
      path: '/:id',
      component: Home,
    },
    /*{
      path: '/assets',
      component: Home,
    },*/
    // {
    //   path: '/404',
    //   component: c404
    // },
  ]
});
