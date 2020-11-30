// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store';
import ElementUI from 'element-ui';
import Echarts from 'echarts';
import Swiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import '../src/assets/iconfont/iconfont.css';
import 'element-ui/lib/theme-chalk/index.css';
import filter1 from '../static/fileter';
Object.keys(filter1).forEach((fnc) => {
	Vue.filter(fnc, filter1[fnc]);
});
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Swiper);
Vue.prototype.$echarts = Echarts;

function hasBtnPermission (permission) {
	let getBtnPermissionArr = JSON.parse(localStorage.getItem('btnPermission'));
	return getBtnPermissionArr.indexOf(permission) > -1;
}
let btnPermissionArr = ['a', 'b', 'c', 'd', 'e', 'f'];
localStorage.setItem('btnPermission', JSON.stringify(btnPermissionArr));
Vue.prototype.has = hasBtnPermission;
// Vue.use(Echarts)
/* eslint-disable */
new Vue({
  el: '#app',
  // store,
  router,
  components: { App },
  template: '<App/>'
})
