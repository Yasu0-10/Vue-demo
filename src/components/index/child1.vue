<template>
	<div @click="$emit('click')">
		<h2 @click='click1'>我是child1子组件</h2>
		<p @click='click2'>你好</p>
	</div>
</template>
<script>
export default {
	methods: {
		click1(){
			this.$emit('click1'); //触发父组件中的click1方法
		},
		click2(){
			this.$emit('click2'); //触发父组件中的click2方法
		}
	}
};
</script>