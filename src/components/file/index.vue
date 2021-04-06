<template>
    <div>
        <kc-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          ref="upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="6"
          :before-upload="before"
          :on-change='change'
          :on-success='success'
          :auto-upload="false"
          :file-list="fileList">
          <!-- 当使用下面这行默认的上传按钮时，”上传到服务器“按钮点击也会打开window文件弹窗 ，所以当使用手动上传时-->
          <!-- 最好将提交行为按钮放到upload组件外 -->
          <kc-button size="small" type="dafault" style="width:113px;height:36px;"><i class="icon kc-icon-upload2" style="font-size:14px;font-weight:700;color:#575A5F;margin-right:5px;"></i>点击上传</kc-button>
            <!-- <kc-button style="margin-left: 10px;" size="small" type="success" @click="subUpload">上传到服务器</kc-button> -->
            <div slot="tip" class="kc-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </kc-upload>
    </div>
</template>
<script>
export default {
	data() {
		return {
			// fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
			fileList: []
		};
	},
	methods: {
		handleRemove(file, fileList) {
			// console.log(file, fileList);
		},
		handlePreview(file) {
			// console.log(file);
		},
		handleExceed(files, fileList) {
			// this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
		},
		beforeRemove(file, fileList) {
			// return this.$confirm(`确定移除 ${ file.name }？`);
		},
		subUpload() {
			console.log('2233');
			// this.$refs.upload.submit();
		},
		//  如果是自动上传 先触发change,然后success，成功/失败再次change。手动上传的话，本地上传只触发一次change函数
		// res是返回的一个id。常见在change事件中绑定this.fileList=fileList
		// 如果是自动上传，那么上传相同文件限制的代码如下会生效但是控制台会报status错误.手动上传不会报错。
		// 应该是修改了fileList报的错.fileList是只读属性据说
		success(res, file, fileList){
			console.log('success函数', res, file, fileList);
		},
		before(file) {
			console.log('上传前', file);
		},
		change(file, fileList){
			console.log('change函数', file, fileList);
			if(fileList.filter(item => {
				return item.name == file.name;
			}).length > 1){
				alert(111);
				//    fileList.splice(-1);
				//    fileList.pop()
				this.fileList = fileList;
			}
			// let existArr = fileList.filter((item) => {
		// 			return item.name === file.name;
		// 		});
		// 		if (existArr.length > 1) {
		// 			this.$alert('请勿上传重复文件！', '提示', {
		// 				confirmButtonText: '确定',
		// 				type: 'warning'
		// 			});
		// 			fileList.splice(-1);
		// 		}
		}
	}
};
</script>