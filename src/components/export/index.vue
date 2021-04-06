<template>
	<div>
		<h1>我是 export</h1>
	</div>
</template>

<script>
	import { a4 as a2, gg } from './1';
	export default {
		name: 'Export',
		data() {
			return {};
		},
		created() {
			console.log(a2, gg, 111);
		}
	};
</script>
