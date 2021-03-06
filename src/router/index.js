import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index/index.vue';
import websocket from '@/components/websocket';
import form from '@/components/form';
import table from '@/components/table';
import tableHe from '@/components/tableHe';
import tableHe1 from '@/components/tableHe1';
import red from '@/components/index/red';
import swiper from '@/components/swiper';
import export1 from '@/components/export/index';
import slot from '@/components/slot';
import wangeditor from '@/components/wangeditor';
import componentsTest from '@/components/componentsTest';
import filters from '@/components/filters';

// 把路由当成一个插件来使用
// 模块化工程中 必须要用 Vue.use() 安装一下
Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/index',
			name: '首页',
			component: index
		},
		{
			path: '/',
			name: '',
			redirect: '/index'
		},
		{
			path: '/websocket',
			name: '实时通讯',
			component: websocket
		},
		{
			path: '/form',
			name: '表单',
			component: form
		},
		{
			path: '/table',
			name: '表格',
			component: table
		},
		{
			path: '/tableHe',
			name: '表格合并',
			component: tableHe
		},
		{
			path: '/tableHe1',
			name: '表格合并1',
			component: tableHe1
		},
		{
			path: '/red',
			name: 'red',
			component: red
		},
		{
			path: '/swiper',
			name: 'swiper',
			component: swiper
		},
		{
			path: '/export',
			name: 'export',
			component: export1
		},
		{
			path: '/slot',
			name: 'slot',
			component: slot
		},
		{
			path: '/wangeditor', // 富文本编辑器
			name: 'wangeditor',
			component: wangeditor
		},
		{
			path: '/componentsTest', // 组件测试
			name: 'componentsTest',
			component: componentsTest
		},
		{
			path: '/filters', // 过滤器
			name: 'filters',
			component: filters
		}
	]
});
