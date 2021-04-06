<template>
	<div>
		<h1>引入子组件</h1>
		<child>
			<!-- template本身不会渲染成任何dom元素 -->
			<!-- 以下2种写法都可以，放在template上和放在普通元素上。使用时有多个slot同名的时，dom只会渲染底下一个 -->
			<!-- 默认slot有个default名字，任何不被其他具名slot包裹的内容都会被渲染进这个slot -->
			<!--
				<template slot="sex" slot-scope="test">
				<div>
				{{ test.sex }}
				</div>
				</template>
				<div slot='sex' slot-scope="test">
				{{test.sex}}
				</div>
			-->
			<!-- 新语法，在template上使用v-slot: name，或者#name ，类似旧的 slot='name'  -->
			<template #footer>
				<div>
					㡳
				</div>
			</template>
		</child>
	</div>
</template>

<script>
	import child from './child';
	export default {
		name: 'Father',
		components: { child },
		data() {
			return { name: '父组件' };
		},
		methods: {}
	};
</script>
