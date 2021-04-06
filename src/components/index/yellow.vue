<template>
	<div>
		<p>子页面标题：{{ chi }}</p>
		<p>{{ value }}</p>
		<p @click="log">点击</p>
	</div>
</template>

<script>
	export default {
		name: 'Red',
		props: {
			chi: String,
			value: String
		},
		data() {
			return {};
		},
		methods: {
			log() {
				this.$emit('input', '33333');
			}
		}
	};
</script>
