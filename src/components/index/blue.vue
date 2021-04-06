<template>
	<div>
		<h3>子页面</h3>
		<button @click="fn">按钮</button>
		<p>{{ newTil }}</p>
	</div>
</template>

<script>
	export default {
		name: 'Blue',
		//   props: ['title'],
		data() {
			return {
				name: 'blue',
				title: 'data的title'
			};
		},
		computed: {
			newTil: {
				get() {
					return this.title;
				},
				set(val) {
					this.title = val;
				}
			}
		},
		methods: {
			fn() {
				console.log('222');
				this.newTil = '小标题';
				console.log(this.newTil);
			//   总结：当computed是data中数据时，想要修改，如上。但是仍然不能修改prop的值。
			}
		}
	};
</script>
