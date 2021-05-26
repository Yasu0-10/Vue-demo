<template>
	<div>
		<h1>filters页面</h1>
		<h2>姓名：{{ 1 | name('君') }}</h2>
		<h2>性别：{{ '恩' | filter2() }}</h2>
		<!-- <modal></modal> -->
	</div>
</template>

<script>
	export default {
		name: 'name',
		filters: {
			name(a1, a2) {
				console.log(a1, a2);
				return a1 + a2;
			}
		},
		data() {
			return {};
		}
	};
</script>
