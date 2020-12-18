<template>
	<div class="viewFrameWork sidebar-full" id="viewFrameWork">
    <div class="viewFrameWork-main">
        <div class="viewFrameWork-body">
            <div class="body-wrapper">
                <div class="body-content">
                    <div class="cont-r">
                      <div class="tab-content">
                          <form action="" name="form" method="post" id="subForm1">
                              <div class="batch-cont" id="inputArea">
                                  <div class="addQuestion4"></div>
                                  <div class="batch-input clearfix">
                                      <div class="batch-input-box">
																				<div class="toolbar">
                                          <span class="title">输入区：</span>
                                          <div class="toolbar-right">
                                            <span class="example" id="showExample">输入范例 <span class="icon icon-a_arrow_down" style="font-size: 12px;"></span> </span>
                                            <span class="standard" id="showStandard">输入规范 <span class="icon icon-a_arrow_down" style="font-size: 12px;"></span> </span>
                                          </div>
                                        </div>
                                        <div id="text-input" class="box" style="white-space: pre-wrap !important;"></div>
                                      </div>
                                      <div class="batch-preview-box">
                                          <div class="toolbar">
                                              <span class="title">检查区：</span>
                                              <span class="error-text" id="errorText"><span class="count" id="errorCount"></span>处错误，请参照例题修改</span>
                                              <button class="btn btn-s-blue" id="nextError">下一处</button>
                                          </div>
                                          <div class="box">
                                              <div id="preview"></div>
                                          </div>
                                      </div>
                                      <div class="dialog-style-button" hidden >
                                          <div class="body-toolbar-right toolbar-right-operation">
                                              <button type="button" class="btn btn-warning btn-size" id="importButton">
                                                  <span id="import1" style="display:inline-block;">录入</span>
                                                  <span id="import_questions1"  style="display:none;">录入中<span class="ani_dot">...</span></span>
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </form>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
	name: 'question',
	data() {
		return {
			name: 'question'
		};
	},
	created() {
	},
	mounted() {
		initFroala();
	},
	methods: {
	}
};
</script>
<style scoped>

</style>