<template>
	<div>
		<h2>姓名：{{ 1 | name('君') }}</h2>
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
