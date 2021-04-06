<template>
	<el-popover
		ref="editPopover"
		v-model="show"
		:placement="placement"
		trigger="click"
		:width="width"
		popper-class="edit-popover"
		@hide="hideHandle">
		<el-form
			ref="dataForm"
			:model="form"
			:rules="rules"
			label-width="85px"
			label-position="left"
			:show-message="showMsg"
			class="align-required-label">
			<el-form-item label-width="0" prop="val">
				<el-input v-if="type === 'input'" v-model.trim="form.val" size="mini" :placeholder="placeholder"></el-input>
				<el-input v-else-if="type === 'textarea'" v-model="form.val" type="textarea" :rows="2" size="mini" resize="none" :placeholder="placeholder"></el-input>
				<el-input-number v-else v-model="form.val" :min="0" size="mini" controls-position="right" :placeholder="placeholder"></el-input-number>
			</el-form-item>
		</el-form>
		<i class="el-icon-check" @click="sureHandle"></i>
		<i slot="reference"></i>
	</el-popover>
</template>

<script>
	export default {
		name: 'EditPopover',
		props: {
			placement: {
				type: String,
				default: 'top'
			},
			type: {
				type: String,
				default: 'input'
			},
			placeholder: {
				type: String,
				default: ''
			},
			width: {
				type: [Number, String],
				default: 210
			},
			showMsg: {
				type: Boolean,
				default: true
			}
		},
		data() {
			const validateNum = (rule, value, callback) => {
				if (this.msg) {
					callback(new Error(this.msg));
				} else {
					callback();
				}
			};
			return {
				show: false,
				form: { val: '' },
				rules: {
					val: [{
						validator: validateNum,
						trigger: 'blur'
					}]
				}
			};
		},
		computed: {
			dataForm() {
				return this.$refs.dataForm;
			}
		},
		methods: {
			init(data) {
				this.show = true;
				this.reg = data.reg || function() {};
				this.$nextTick(() => {
					const e = data.e;
					const pop = this.$refs.editPopover;
					this.form.val = data.value;
					pop.popperJS._reference = e.currentTarget;
					pop.popperJS.state.position = pop.popperJS._getPosition(pop.popperJS._popper, pop.popperJS._reference);
					pop.popperJS.update();
				});
				return new Promise((resolve, reject) => {
					this.resolve = resolve;
					this.reject = reject;
				});
			},
			// 特殊情况下，外部组件通过$refs调用切换show/hide,传入布尔值
			toggleShow(flag) {
				this.show = typeof flag === 'boolean' ? flag : !this.show;
			},
			sureHandle() {
				const val = this.form.val;
				const msg = this.reg(val);
				if (msg) {
					this.msg = msg;
					return this.dataForm.validateField('val');
				}
				this.resolve(val);
				this.show = false;
			},
			hideHandle() {
				this.dataForm.resetFields();
				this.reject(new Error('hide'));
			}
		}
	};
</script>

<style lang="less">
  .edit-popover {
    padding-right: 30px !important;
    padding-bottom: 0 !important;
    .el-icon-check {
      position: absolute;
      top: 50%;
      right: 10px;
      width: 20px;
      height: 28px;
      line-height: 28px;
      margin-top: -14px;
      text-align: center;
      cursor: pointer;
      &:hover {
        color: #f9c506;
      }
    }
  }
</style>
