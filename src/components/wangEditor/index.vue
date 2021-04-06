<template>
	<div class="box">
		<h1>使用编辑器组件</h1>
		<editor ref="editor" v-model="content" @editor-change="editorChange"></editor>
		<h2>效果区域展示：</h2>
		<div ref="preview" v-html="content"></div>
		<el-button type="primary" @click="setContent">点击赋值</el-button>
		<el-button type="primary" @click="clearContent">清空文本域</el-button>
	</div>
</template>

<script>
	import editor from './child';
	export default {
		name: 'EditorParent',
		components: { editor },
		data() {
			return { content: '' };
		},
		methods: {
			editorChange(html) {
				console.log(html, 999, '触发父change方法', this.content);
			},
			setContent() {
				// let str = '<h2>手动赋值</h2>';
				// this.$refs.editor.setContent(str);
				console.log(this.$refs.editor, 77);
			},
			clearContent() {
				this.$refs.editor.clear();
			}
		}
	};
</script>
