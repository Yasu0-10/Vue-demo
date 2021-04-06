<template>
	<div class='box'>
		<h1>Popover组件使用</h1>
		<!-- <el-button key='del' @click.stop="log($event)">delPop</el-button>
		<delPop ref="delPopover"></delPop>
		<el-button key='edit' @click.stop="log1($event)">editPop</el-button>
		<editPop ref="editPopover" type='number'></editPop> -->
		<select-box @changeSelect='select(arguments, $event)' :selectWidth='250' :subject='list' v-model='val'></select-box>
	</div>
</template>
<script>
import delPop from '../components/pop/confirm-popover';
import editPop from '../components/pop/edit-popover';
import selectBox from '../components/select';
export default {
	name: 'componentsTest',
	components: {
		delPop,
		editPop,
		selectBox
	},
	data() {
		return {
			baidu: 'https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/e3c7b482aa9ab6c763d2ff506759827f~300x300.image',
			list: [
				{
					value: 1,
					text: '张三'
				},
				{
					value: 2,
					text: '李四'
				},
				{
					value: 3,
					text: '王五'
				}
			],
			val: ''
		};
	},
	computed: {
		delPopover(e) {
			return this.$refs.delPop;
		}
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