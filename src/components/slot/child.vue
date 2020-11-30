<template>
	<div>
		<!-- <slot></slot> -->
		<h2>标题</h2>
		<div class="content">
			<slot name='content' :row='list'></slot>
			<h3>以下是内容</h3>
		</div>
		<div class="sex">
			<slot name='sex' :sex='sex'></slot>
		</div>
		<div class="footer">
			<h3>以下是底部</h3>
			<slot name='footer' :page1='page'></slot>
		</div>
		<slot>默认</slot>
	</div>
</template>
<script>
export default {
	name: 'child',
	data() {
		return {
			list: [
				{
					name: 'zi1'
				},
				{
					name: 'zi2'
				}
			],
			sex: '男',
			page: 10
		};
	},
	methods: {
		
	}
};
</script>