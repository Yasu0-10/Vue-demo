
<template>
  <div>
		<p>图标：<i class="pospfont pospiback"></i></p>
		<h1>父组件内容</h1>
		<p>父组件姓名：{{name}}</p>
		<button @click='change'>父组件改名</button>
		<input type="text" v-model='name'>
		<child v-model='name' v-bind='obj'></child>
		<h2>{{obj.name}}</h2>
		<p @click="$router.push({path: '/form'})">跳到表单</p>
  </div>
</template>

<script>
import child from './child';
export default {
	name: 'index',
	components: {
		child
	},
	created () {
		this.add();
		// this.obj.name = 2;
		// console.log(111);
	},
	data () {
		return {
			name: '',
			num: 1,
			obj: {
				name: '展示',
				sex: '女',
				has: '???'
			}
		};
	},
	methods: {
		change() {
			this.name = '父李四';
		},
		add() {
			setTimeout(() => {
				this.obj.name = '啊哈哈';
			}, 3000);
		}
	},
	mounted() {
		// this.num = 2;
		console.log(111);
	},
	watch: {
		'obj.name': {
			handler(val) {
				console.log(222, val);
			},
			deep: true
		}
	}
};
</script>
<style scoped lang="less">
	h1{
		color: red;
	}
</style>
