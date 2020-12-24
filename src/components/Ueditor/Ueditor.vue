<template>
  <div>
    <script :id="id"  :defaultMsg="writeMsg" type="text/plain" ></script>
    <el-dialog
      title="上传图片"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      width="30%">
      <el-upload action="/proxyApi"
        class="upload-demo"
        drag :headers="headers"
        accept=".gif, .jpeg, .jpg, .png, .webp"
        :on-success="uploadImageSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过5M
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import '../../../static/ueditor/ueditor.config.js';
import '../../../static/ueditor/ueditor.all.js';
import '../../../static/ueditor/lang/zh-cn/zh-cn.js';

//引入公式插件
import '../../../static/ueditor/kityformula-plugin/addKityFormulaDialog.js';
import '../../../static/ueditor/kityformula-plugin/getKfContent.js';
import '../../../static/ueditor/kityformula-plugin/defaultFilterFix.js';
let UE = window.UE;
export default {
	name: 'UEditor',
	model: {
		prop: 'content',
		event: 'change'
	},
	props: {
		content: {
			type: Object,
			default: () => {}
		},
		writeMsg: {
			type: String
		},
		config: {
			type: Object,
			default () {
				return {
					zIndex: 5,
					autoHeightEnabled: false,
					autoFloatEnabled: false, //不允许滚动时固定在顶部
					initialContent: '请输入内容...', //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
					autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
					initialFrameWidth: null,
					initialFrameHeight: 250,
					UEDITOR_HOME_URL: '/static/ueditor/',
					toolbars: [
						[
							'bold', //加粗
							'italic', //斜体
							'underline', //下划线
							'strikethrough', //删除线
							'subscript', //下标
							'superscript', //上标
							'fontfamily', //字体
							'fontsize', //字号
							'spechars', //特殊字符
							'lineheight', //行间距
							'touppercase', //字母大写
							'tolowercase', //字母小写
							'justifyleft', //居左对齐
							'justifyright', //居右对齐
							'justifycenter', //居中对齐
							'justifyjustify', //两端对齐
							'undo', //撤销
							'cleardoc' //清空文档
						],
						[
							'mergeright', //右合并单元格
							'mergedown', //下合并单元格
							'deleterow', //删除行
							'deletecol', //删除列
							'splittorows', //拆分成行
							'splittocols', //拆分成列
							'deletecaption', //删除表格标题
							'inserttitle', //插入标题
							'mergecells', //合并多个单元格
							'deletetable', //删除表格
							// 'insertvideo', //视频
							// 'forecolor', //字体颜色
							'insertorderedlist', //有序列表
							'insertunorderedlist', //无序列表
							'fullscreen', //全屏
							'imagecenter', //居中
							'inserttable' //插入表格
						]
					]
				};
			}
		}
	},
	data() {
		return {
			editor: null,
			id: 'editor' + new Date().getTime(),
			isinit: false,
			dialogVisible: false
		};
	},
	computed: {
		headers() {
			return {};
		}
	},
	mounted() {
		//初始化UE
		const _this = this;
		this.editor = UE.delEditor(this.id);
		this.editor = UE.getEditor(this.id, this.config);
		let that = this;
		UE.registerUI(
			'test-dialog',
			function(editor, uiName) {
				var btn = new window.UE.ui.Button({
					name: 'upLoadPic',
					title: '上传图片',
					cssRules: 'background-position: -380px 0px;background-image: url(../images/icons.png)',
					onclick: function() {
						// 渲染dialog
						that.dialogVisible = true;
						editor.execCommand(uiName);
					}
				});
				return btn;
			}
		);
		this.editor.ready(() => {
			_this.isinit = true;
			this.$emit('ready', this.editor);
			this.editor.addListener('contentChange', () => {
				const wordCount = this.editor.getContentLength(true);
				const content = this.editor.getContent();
				const plainTxt = this.editor.getPlainTxt();
				const htmlCont = this.editor.getAllHtml();
				// 编辑器内容有变动,通知父组件
				this.$emit('change', { wordCount: wordCount, content: content, plainTxt: plainTxt, htmlCont: htmlCont });
				// this.$emit('change', {name: 'd'});
			});
		});
	},
	watch: {
		// 'content': function (val) {
		// 	this.editor.setContent(val);
		// }
	},
	destoryed() {
		this.editor.destory();
	},
	methods: {
		uploadFile(file) {
			//关键
			let editor = document.querySelector('.edui-default').getAttribute('id');
			window.UE.getEditor(editor).execCommand('insertimage', {
				src: file.url,
				width: '100',
				height: '100'
			});
			this.dialogVisible = false;
		},
		uploadImageSuccess(response, file, fileList) {
			if (response) {
				this.$message({
					message: '上传成功',
					type: 'success'
				});
				let fileObj = {
					name: response.originalName,
					url: 'http://testfile.233863.com/uploadtest/20201219/ae73adceaec04f458d474d709e1265ee.jpg'
				};
				this.uploadFile(fileObj);
			} else {
				this.$message({
					message: '上传失败',
					type: 'warning'
				});
			}
		},
		//获取html内容，返回: <p>hello</p>,目前使用这个
		getUEContent() {
			return this.editor.getContent();
		},
		//获取纯文本内容，返回: hello
		getContentTxt() {
			return this.editor.getContentTxt();
		},
		clear() {
			this.editor.execCommand('cleardoc');
		},
		setUEContent(val) {
			if(this.isinit){
				return this.editor.setContent(val);
			}else{
				const _this = this;
				setTimeout(function(){ //过段时间在加载
					_this.setUEContent(val);
				}, 500);
			}
		}
	}
};
</script>