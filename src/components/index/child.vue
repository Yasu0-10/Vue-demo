<template>
	<div>
		<h3>子组件内容，姓名：{{ value }}</h3>
		<!-- <button @click='change'>子组件改名</button> -->
		<!-- <input type="checkbox" v-model='ischecked' @change="change"> -->
		<input v-model="hh" type="text" @input="change">
	</div>
</template>

<script>
	export default {
		name: 'Child',
		model: {
			prop: 'value',
			event: 'fn'
		},
		props: { value: String },
		data() {
			return {
				gg: '李四',
				hh: '',
				ischecked: true
			};
		},
		computed: {},
		mounted() {
			console.log(this.$attrs, 888);
		},
		methods: {
			change() {
				this.$emit('fn', this.hh);
			},
			log(e) {
				this.$emit('fn', this.hh);
			}
		}
	};
</script>
