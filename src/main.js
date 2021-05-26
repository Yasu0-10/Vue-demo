// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './utils/directives/dragmove.js';
// import store from './store';
import ElementUI from 'element-ui';
import Echarts from 'echarts';
import Swiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import GlobalDirectives from './utils/directives/index.js';
import '../src/assets/iconfont/iconfont.css';
import 'element-ui/lib/theme-chalk/index.css';
import filters from './utils/filters/filter';
import { baseCom } from './components/baseComponents/index.js';
Object.keys(filters).forEach((fnc) => {
	Vue.filter(fnc, filters[fnc]);
});
// 注册全局组件方法1
// list.forEach(item => {
// 	Vue.component(item.name, item);
// });
// 方法2
Object.keys(baseCom).forEach(item => {
	Vue.component(item.normalize, baseCom[item]);
});

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Swiper);
Vue.use(GlobalDirectives);

// Vue.use(baseCom);
Vue.prototype.$echarts = Echarts;

function hasBtnPermission(permission) {
	const getBtnPermissionArr = JSON.parse(localStorage.getItem('btnPermission'));
	return getBtnPermissionArr.indexOf(permission) > -1;
}
const btnPermissionArr = ['a', 'b', 'c', 'd', 'e', 'f'];
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
