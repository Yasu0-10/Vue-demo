
(function () {
	var E = window.wangEditor;
	var $ = window.jQuery;
	E.config.uploadFileUrl = '';
	E.config.uploadFileFileName = 'upfile';
	E.config.fileListInit = false;

	// 用 createMenu 方法创建菜单
	E.createMenu(function (check) {
		// 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
		var menuId = 'fileUpload';

		// check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
		if (!check(menuId)) {
			return;
		}

		// this 指向 editor 对象自身
		var editor = this;
		var url = editor.config.uploadFileUrl;
		var filename = editor.config.uploadFileFileName;

		var $dom = $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-upload"></i></a>');
		var $upfile = $('<input type="file" style="display:none">');

		// 创建 menu 对象
		var menu = new E.Menu({
			editor: editor, // 编辑器对象
			id: menuId, // 菜单id
			title: '上传附件(视频文件大小不超过200M，其他格式不超过20M)', // 菜单标题

			// 正常状态和选中状态下的dom对象，样式需要自定义
			$domNormal: $dom,
			$domSelected: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-upload"></i></a>')
		});

		// 菜单正常状态下，点击将触发该事件
		menu.clickEvent = function (e) {
			var rangeElem = editor.getRangeElem();
			var targetElem = editor.getSelfOrParentByName(rangeElem, '.upfile');
			if (!targetElem) { $upfile.click(); } else alert('不要在附件链接内添加附件');
			// editor.customCommand(e, commandFn);
		};

		// 菜单选中状态下，点击将触发该事件
		menu.clickEventSelected = function (e) {
			var rangeElem = editor.getRangeElem();
			var targetElem = editor.getSelfOrParentByName(rangeElem, 'a');
			if (!targetElem) { $upfile.click(); } else alert('不要在附件链接内添加附件');
			// editor.customCommand(e, commandFn);
		};

		var xhrOnProgress = function(fun) {
			xhrOnProgress.onprogress = fun; //绑定监听

			//使用闭包实现监听绑
			return function() {
				//通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
				var xhr = $.ajaxSettings.xhr();

				//判断监听函数是否为函数
				if (typeof xhrOnProgress.onprogress !== 'function'){
					return xhr;
				}

				//如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
				if (xhrOnProgress.onprogress && xhr.upload) {
					xhr.upload.onprogress = xhrOnProgress.onprogress;
				}

				return xhr;
			};
		};

		$upfile.change(function (e) {
			if ($(this).val() != '') {
				var fileData = $upfile[0].files[0];
				var formData = new FormData();

				formData.append(filename, fileData);

				// 检查文件大小
				// 判断类型 是否是视频格式 //视频限制100M 非视频限制20M // 上传附件超过5M文字提示
				var videoReg = /wmv|mov|mpeg|mpg|rmvb|rm|avi|mp4|3gp|flv|dat/i;
				var fileMaxSize = 20 * 1024 * 1024;

				// 视频格式
				if(videoReg.test(fileData.type)){
					fileMaxSize = 200 * 1024 * 1024; //单位b
				}

				if(fileData.size > fileMaxSize){
					alert('附件大小超限！');
					return;
				}

				var file_html = '<div><a class="upfile fileIsUploading" href="javascript:;" target="_blank">' + fileData.name + '</a>';


				// 大于 10M 提示
				if(fileData.size > 10 * 1024 * 1024){
					file_html += '<div class="file-upload-tip fileUploadTip">' +
                        '<div class="upload-progress-box">' +
                        '<div class="upload-progress-bar"><span class="active"></span></div>' +
                        '<span class="percent">0%</span>' +
                        '文件过大上传时间会较长。（注：附件大小和网络会影响学员答题中打开附件的速度）' +
                        '</div>' +
                        '</div>';
				}
				file_html += '</div>';

				editor.command(e, 'insertHtml', file_html);

				$.ajax({
					url: url,
					data: formData,
					type: 'post',
					cache: false,
					contentType: false,
					processData: false,
					xhr: xhrOnProgress(function(e){
						var percent = parseFloat(e.loaded / e.total * 100).toFixed(2) + '%'; //文件上传百分比

						$('.fileUploadTip .percent').text(percent);
						$('.fileUploadTip .active').width(percent);
					}),
					success: function (msg) {
						msg = JSON.parse(msg);

						if (msg.success) {
							$('.upfile.fileIsUploading').attr('href', msg.bizContent.url).removeClass('fileIsUploading');
							$('.fileUploadTip').remove();
						} else if(msg.code == '33038'){
							alert('当前存储空间不足，无法上传附件，请联系客服增购后再进行操作！');
							$('.upfile.fileIsUploading').parent().remove();
						} else {
							alert(msg.desc);
							$('.upfile.fileIsUploading').parent().remove();
						}
					},
					error: function (err) {
						alert('上传失败！');
						$('.upfile.fileIsUploading').parent().remove();
					}

				});
			}
		});

		// 根据当前选区，自定义更新菜单的选中状态或者正常状态
		menu.updateSelectedEvent = function () {
			return false;
		};

		// 增加到editor对象中
		editor.menus[menuId] = menu;
	});
})();

