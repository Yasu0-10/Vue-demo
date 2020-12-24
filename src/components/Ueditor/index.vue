<template>
  <section>
    

  <div class="list">
    <h2 @click="$router.push({path:'/'})">回到首页</h2>
    <div >
      <div>
        <Ueditor :writeMsg="defaultMsg1"  :id="ueditor1" ref="ueditor" @change='change' @ready='ready' v-model='content'></Ueditor> 
      </div>
				<!-- 展示区 -->
			<h2>展示区</h2><el-button @click='clear'></el-button>
			<div v-html='content.content'>qingk</div>
      <el-button  @click="submitForm()">提交</el-button>
    </div>
  </div>
  </section>	
</template>

<script>

import Ueditor from './Ueditor.vue';
export default {
	components: {
		Ueditor
	},
	data() {
		return {
			content: {},
			//				富文本
			defaultMsg1: '',
			ueditor1: 'ueditor1'
		};
	},
	methods: {
		//点击提交按钮
		submitForm(){
			// alert('题干是：' + this.$refs.ue1.getUEContent());
		},
		change(obj) {
			console.log(obj, 11);
			// this.content = obj;
		},
		ready() {
			console.log('初始化成功——父');
		},
		clear() {
			this.$refs.ueditor.clear();
		}

	},
	mounted() {

	}
     
};

</script>

<style scoped>

</style>