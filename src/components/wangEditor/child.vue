<template>
	<div>
		<h1>wangEditor组件</h1>
		<div class='editor-wrap'>
      <div ref="editor"></div>
		</div>
	</div>
</template>
<script>
import E from 'wangeditor';
let ed = null;
export default {
	name: 'wangEditor',
	model: {
		prop: 'content',
		event: 'editorChange'
	},
	props: {
		// 传递过来的编辑器内容参数，用于设置编辑器内容
		content: {
			type: String,
			default: ''
		},
		menuConfig: {
			type: Array,
			default: () => [
				'bold', // 粗体 B
				'underline', // 下划线 U
				'italic', // 斜体 I
				'strikeThrough', // 删除线 S
				'fontName', // 字体 F
				'fontSize', // 字号 T
				'head', // 标题 H
				'list', // 列表
				'justify', // 对齐方式
				'table', // 表格
				'image', // 插入图片
				// 'video', // 插入视频
				'link', // 插入链接
				// 'foreColor', // 文字颜色
				// 'backColor', // 背景颜色
				// 'quote', // 引用
				// 'emoticon', // 表情
				// 'code', // 插入代码
				'undo', // 撤销
				'redo' // 重复
			]
		}
	},
	watch: {
	},
	data() {
		return {
			editorContent: ''
		};
	},
	mounted() {
		// 初始化
		this.primary();
	},
	methods: {
		primary() {
			ed = new E(this.$refs.editor);
			ed.config.menus = this.menuConfig;
			// 自定义上传参数
			ed.config.uploadImgParams = {
				token: 'xxxxx',
				x: 100
			};
			// ed.config.uploadImgShowBase64 = true;
			// ed.config.uploadImgServer = '/proxyApi';
			// 隐藏上传网图功能
			ed.config.showLinkImg = false;
			// 图片上传功能，完全自己写。
			ed.config.customUploadImg = function (files, insert) {
				// files 是 input 中选中的文件列表
				const formData = new FormData();
				console.log(files, 99);
				formData.append('file', files);
				// axios({//上传图片到后台
				// 	method: 'post',
				// 	url: this.$apis() + '/sys/api/message/uploadFile',
				// 	data: formData
				// }).then(res => {
				// 	if(res.data.success){
				// 		console.log(res.data.obj);
                  
				// 		var imgUrl = res.data.obj.savePath; //后台返回的文件路径

				// insert('http://testfile.233863.com/uploadtest/20201219/ae73adceaec04f458d474d709e1265ee.jpg');//生成img标签并插入文章中
				// 	}else{
				// 		this.$message.error(res.data.msg);
				// 	}
				// });
				// insert 是获取图片 url 后，插入到编辑器的方法

				// 上传代码返回结果之后，将图片插入到编辑器中
			};
			// 图片上传的插入处理
			ed.config.uploadImgHooks = {
				before: function(xhr) {
					console.log(xhr);
					// 可阻止图片上传
					// return {
					// 	prevent: true,
					// 	msg: '需要提示给用户的错误信息'
					// };
				},
				// 图片上传并返回了结果，图片插入已成功
				success: function(xhr) {
					console.log('success', xhr);
				},
				// 图片上传并返回了结果，但图片插入时出错了
				fail: function(xhr, editor, resData) {
					console.log('fail', resData);
				},
				// 上传图片出错，一般为 http 请求的错误
				error: function(xhr, editor, resData) {
					console.log('error', xhr, resData);
				},
				// 上传图片超时
				timeout: function(xhr) {
					console.log('timeout');
				},
				// 图片上传并返回了结果，想要自己把图片插入到编辑器中
				// 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
				customInsert: function(insertImgFn, result) {
					// result 即服务端返回的接口
					console.log('customInsert', result);
					// insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
					// insertImgFn('http://testfile.233863.com/uploadtest/20201219/ae73adceaec04f458d474d709e1265ee.jpg');
				}
			};
			ed.config.onchange = (html) => {
				this.$emit('editorChange', html);
			};
			ed.config.height = 200;
			ed.create();
		},
		// 设置内容,不传任何内容就是获取，获取也可以用.text()
		setContent(val) {
			ed.txt.html(val);
		},
		// 清空内容
		clear() {
			ed.txt.clear();
		},
		// 折叠
		collapseRange() {
			ed.selection.collapseRange();
		}
	}
};
</script>