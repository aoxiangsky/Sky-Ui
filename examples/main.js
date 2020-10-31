import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueRouter from 'vue-router';
import SkySoar from '../src/index';
import App from './App.vue';
import routes from './routes';

Vue.use(VueRouter);
Vue.use(SkySoar, {});

Vue.config.productionTip = false;

// 开启debug模式
Vue.config.debug = true;

const router = new VueRouter({
  esModule: false,
  mode: 'history',
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
