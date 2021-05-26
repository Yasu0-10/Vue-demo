<template>
	<div class="box">
		<newmodal></newmodal>
		<newbutton></newbutton>
		{{ $bug }}
	</div>
</template>

<script>
	export default {
		name: 'ComponentsTest',
		components: {},
		data() {
			return {};
		},
		methods: {
			select(argument, e) {
				console.log(...argument, 22, e);
			}
		}
	};
</script>

<style lang='less' scoped>
	.box {
		width: 100%;
		height: 800px;
	}
</style>
