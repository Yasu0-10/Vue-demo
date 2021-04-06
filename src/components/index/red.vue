<template>
	<div>
		<child1 @click2="click"></child1>
	</div>
</template>

<script>
	import child1 from './child1';
	export default {
		name: 'Red',
		components: { child1 },
		model: {
			prop: 'value',
			event: 'eventShow'
		},
		data() {
			return {};
		},
		methods: {
			click() {
				console.log('ppppppppppp');
			}
		}
	};
</script>
