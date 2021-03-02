<template>
  <el-popover
    :placement="placement"
    :width="width"
    trigger="click"
    v-model="visible"
    ref="popover"
    @hide="hideHandle">
    <div class="del-popover-wrap">
      <i class="el-icon-warning"></i>
      <p v-if="msg" v-html="msg"></p>
      <p v-else>确认要{{handle}}<span class='primary'>{{name}}</span> 吗？</p>
    </div>
    <div class="page-btn-wrap btn-right">
      <el-button plain size="mini" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="sureHandle">确定</el-button>
    </div>
    <i slot="reference"></i>
  </el-popover>
</template>

<script>
export default {
	name: 'table-del-btn-popover',
	data () {
		return {
			visible: false,
			placement: 'top',
			width: 200,
			handle: '删除', // 操作名称，默认“删除”
			name: '', // 如“xx单位”
			msg: '' // 如“确认删除吗”，和name互斥
		};
	},
	methods: {
		init (data) {
			this.handle = data.handle || '删除';
			this.placement = data.placement || 'top';
			if (data.msg) {
				this.msg = data.msg;
			} else {
				this.name = data.name || '';
			}
			this.width = data.width || 200;
			this.visible = true;
			this.$nextTick(() => {
				let e = data.e;
				let pop = this.$refs['popover'];
				pop.popperJS._reference = e.currentTarget;
				pop.popperJS.state.position = pop.popperJS._getPosition(pop.popperJS._popper, pop.popperJS._reference);
				pop.popperJS.update();
			});
			return new Promise((resolve, reject) => {
				this.resolve = resolve;
				this.reject = reject;
			});
		},
		sureHandle () {
			this.resolve();
			this.visible = false;
		},
		hideHandle () {
			this.reject();
		}
	}
};
</script>

<style lang="less">
.del-popover-wrap {
	padding-left: 20px;
  position: relative;
  font-size: 12px;
	.primary {
		color: #5F76E7;
	}
  i {
    position: absolute;
    top: 1px;
    left: 0;
    font-size: 16px;
		color: #E6A23C;
  }
}
.page-btn-wrap {
  margin-top: 20px;
  &.fixed {
    position: fixed;
    bottom: 35px;
    right: 15px;
  }
  &.btn-center {
    text-align: center;
  }
  &.btn-right {
    text-align: right;
  }
}
</style>
