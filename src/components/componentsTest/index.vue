<template>
	<div class='box'>
		<h1>Popover组件使用</h1>
		<!-- <imageViewer :image="baidu"></imageViewer> -->
		<el-button key='del' @click.stop="log($event)">delPop</el-button>
		<delPop ref="delPopover"></delPop>
		<el-button key='edit' @click.stop="log1($event)">editPop</el-button>
		<editPop ref="editPopover" type='number'></editPop>
	</div>
</template>
<script>
import imageViewer from '../components/imageViewer/index';
import delPop from '../components/pop/confirm-popover';
import editPop from '../components/pop/edit-popover';
export default {
	name: 'componentsTest',
	components: {
		imageViewer,
		delPop,
		editPop
	},
	data() {
		return {
			baidu: 'https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/e3c7b482aa9ab6c763d2ff506759827f~300x300.image'
		};
	},
	computed: {
		delPopover(e) {
			return this.$refs.delPop;
		}
	},
	methods: {
		log(e) {
			this.$refs.delPopover.init({
				e,
				handle: '干掉',
				name: '石油单位'
			}).then(() => {
				console.log('删除了');
			}).catch(e => {
				console.log('取消了');
			});
		},
		log1(e) {
			this.$refs.editPopover.init({
				'value': 7, // 默认值,非必需。number类型时注意value类型
				'reg' (val) { // 校验，非必需
					if (!val) {
						return '请输入'; // 空值时提示
					}
				},
				e
			}).then(v => {
				console.log('搞定', v);
			}).catch(e => {
				console.log('不行', e);
			});
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