<template>
	<div style="width:50%">
		<el-form ref="ruleForm" :model="ruleForm" label-width="100px" status-icon :rules="rules">
			<el-form-item label="活动名称" prop="name">
				<!-- <el-form-item label="活动名称" prop="name" :show-message='false' :rules="{required: true, message: '请输入工地名称', trigger: 'blur'}"> -->
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="是否喜欢敲代码：" prop="isLoveCV">
				<!-- 是可以被别的元素包裹用来加一些样式的，自定义 -->
				<span class="pl20">
					<el-radio-group v-model="ruleForm.isLoveCV">
						<el-radio label="1">是</el-radio>
						<el-radio label="0">否</el-radio>
					</el-radio-group>
				</span>
			</el-form-item>
			<el-form-item label="活动形式" prop="desc">
				<el-select v-model="ruleForm.desc" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="特殊资源" prop="radio1">
				<el-radio-group v-model="ruleForm.radio1" @change="change">
					<el-radio :label="0">线上品牌商赞助</el-radio>
					<el-radio :label="1">线下场地免费</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
		<button @click="jump">按钮</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ruleForm: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					radio1: ''
				},
				rules: {
					isLoveCV: [{
						required: true,
						message: '请输入2',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请输入2',
						trigger: 'change'
					}],
					radio1: [{
						required: true,
						message: '请输入',
						trigger: 'change'
					}],
					name: ''
				}
			};
		},
		methods: {
			jump() {
				this.$router.push({ path: '/' });
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
					// alert('submit!')
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			change(e) {
				if (e === 0) {
					this.rules.name = {
						required: true,
						message: '请输入工地名称',
						trigger: 'blur'
					};
				} else {
					this.rules.name = '';
				}
			}
		}
	};
</script>
