// var introjs =  introJs();
$(document).ready(function() {
	// 点击查看例题
	$('#showExample').click(function (e) {
		e.stopPropagation();
		e.preventDefault();
		var newHeight = $('.batch-input-box').height() / 2 - 40;
		// 切换icon
		changeIconClass($(this));
		// 规范icon恢复原状
		if($('#showStandard').find('.icon').hasClass('icon-a_arrow_up')){
			$('#showStandard').find('.icon').removeClass('icon-a_arrow_up');
			$('#showStandard').find('.icon').addClass('icon-a_arrow_down');
		}
		// 关闭范例
		changeDialogShow($('#qtStandard'));
		changeDialogShow($('#qtStandard1'));
		$('#qtStandard').css('height', '0px');
		$('#qtStandard').removeClass('active');
		$('#qtStandard1').css('height', '0px');
		$('#qtStandard1').removeClass('active');
		if ($('#qtExample').hasClass('active')){
			$('#qtExample').removeClass('active');
			changeDialogShow($('#qtExample'));
		} else {
			$('#qtExample').addClass('active');
			$('#qtExample').animate({
				height: newHeight
			});
		}
		if ($('#continueOpen').hasClass('active')){
			$('#qtExample .modal-footer').css('width', '140px');
			$('#continueOpen').removeClass('active');
		}
	});
	// 继续展开
	$('#continueOpen').click(function (e) {
		e.stopPropagation();
		e.preventDefault();
		var newHeight = $('.batch-input-box').height() / 2 - 40;
		$('.textarea-group').hide();
		newHeight = $('.batch-input-box').height() - 40;
		$('#qtExample').animate({
			height: newHeight
		});
		$('#qtExample .modal-footer').css('width', '60px');
		$('#continueOpen').addClass('active');
	});

	// 点击关闭例题
	$('#qtExample .btn-close').click(function(e){
		e.stopPropagation();
		e.preventDefault();
		if($('#continueOpen').hasClass('active')){
			var newHeight = $('.batch-input-box').height() / 2 - 40;
			$('#qtExample').animate({
				height: newHeight
			});
			$('#qtExample .modal-footer').css('width', '140px');
			$('#continueOpen').removeClass('active');
			$('.textarea-group').show();
		}else{
			changeIconClass($('#showExample'));
			$('.textarea-group').removeClass('active');
			$('#qtExample').removeClass('active');
			$('.textarea-group').show();
			// 动画关闭
			changeDialogShow($('#qtExample'));
		}
	});

	//点击查看规范
	$('#showStandard').click(function (e) {
		e.stopPropagation();
		e.preventDefault();
		changeIconClass($(this));
		if($('#showExample').find('.icon').hasClass('icon-a_arrow_up')){
			$('#showExample').find('.icon').removeClass('icon-a_arrow_up');
			$('#showExample').find('.icon').addClass('icon-a_arrow_down');
		}
		var newHeight = $('.batch-input-box').height() / 2 - 40;
		changeDialogShow($('#qtExample'));
		$('#qtExample').removeClass('active');
		$('#qtExample').css('height', '0px');
		if (labelOpen == 1) {
			if ($('#qtStandard').hasClass('active')){
				$('#qtStandard').removeClass('active');
				changeDialogShow($('#qtStandard'));
			} else {
				$('#qtStandard').addClass('active');
				$('#qtStandard').animate({
					height: newHeight
				});
			}
		} else {
			if ($('#qtStandard1').hasClass('active')){
				$('#qtStandard1').removeClass('active');
				changeDialogShow($('#qtStandard1'));
			} else {
				$('#qtStandard1').addClass('active');
				$('#qtStandard1').animate({
					height: newHeight
				});
			}
		}
	});

	// 点击关闭规范
	$('#qtStandard .btn-close').click(function(e){
		e.stopPropagation();
		e.preventDefault();
		changeIconClass($('#showStandard'));
		$('.textarea-group').removeClass('active');
		$('#qtStandard').removeClass('active');
		// 动画关闭
		changeDialogShow($('#qtStandard'));
	});
	$('#qtStandard1 .btn-close').click(function(e){
		e.stopPropagation();
		e.preventDefault();
		$('.textarea-group').removeClass('active');
		$('#qtStandard1').removeClass('active');
		// 动画关闭
		changeDialogShow($('#qtStandard1'));
	});

	// 导入试题,和下面方法完全一致
	$('#importBtn').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		var previewHtml = $('#preview').html();
		var previewText = $('#preview').text();

		if($.trim(previewHtml) === '' || $.trim(previewText) === ''){
			alert('导入内容不能为空！');
			return false;
		}

		if($('.check_error').size() > 0){
			alert('存在错误，请检查试题！');
			return false;
		}
		var text = $('#text-input .fr-view').html();
		$('#errorText , #errorTextNew').hide();
		if($('input[name=classification]').val() == ''){
			alert('请选择试题分类！');
			return false;
		}else{
			var data = serializeFn();
			var dataForm = JSON.stringify(data);
			$('#import').hide();
			$('#import_questions').show();
			$.ajax({
				type: 'POST',
				cache: false,
				headers: { 'cache-control': 'no-cache' },
				dataType: 'json',
				contentType: 'application/json',
				url: '/baseinfo/admin/upload_testqm_txt/',
				data: dataForm,
				success: function(msg){
					ajaxSuccessFn(msg.bizContent.successCount);
					$('#import_questions').hide();
					$('#import').show();
					var message = '成功导入 ' + msg.bizContent.successCount + ' 道试题，失败 ' + msg.bizContent.failCount + ' 道题';
					$('#import_result').text(message);
					if (USER_ROLE == 'sub_admin' && KSXRIGHTS.allowPaperAdd != 1){
						$('#conResult').hide();
					}
					$('#txtImport').modal();
					// gio
					ksxProbe.gioTrack('enterQuestionSuccess', 1, {
						'questionEnterMethod_var': '批量录入',
						'questionEnterCount_var': msg.bizContent.successCount
					});

					$('#txtImport').on('hidden.bs.modal', function (e) {
						$('#txtImport').off().on('hidden', 'hidden.bs.modal');
						location.reload();
					});
				}
			});
		}
	});


	//导入试题，和上面方法完全一致
	$('#importButton').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		var previewHtml = $('#preview').html();
		var previewText = $('#preview').text();

		if($.trim(previewHtml) === '' || $.trim(previewText) === ''){
			alert('导入内容不能为空！');
			return false;
		}

		if($('.check_error').size() > 0){
			alert('存在错误，请检查试题！');
			return false;
		}
		var text = $('#text-input .fr-view').html();
		$('#errorText , #errorTextNew').hide();
		if($('input[name=classification]').val() == ''){
			alert('请选择试题分类！');
			return false;
		}else{
			var data = serializeFn();
			var dataForm = JSON.stringify(data);
			$('#import1').hide();
			$('#import_questions1').show();
			$.ajax({
				type: 'POST',
				cache: false,
				headers: { 'cache-control': 'no-cache' },
				dataType: 'json',
				contentType: 'application/json',
				url: '/baseinfo/admin/upload_testqm_txt/',
				data: dataForm,
				success: function(msg){
					ajaxSuccessFn(msg.bizContent.successCount);
					$('#import_questions1').hide();
					$('#import1').show();
					var message = '成功导入 ' + msg.bizContent.successCount + ' 道试题，失败 ' + msg.bizContent.failCount + ' 道题';
					$('#import_result').text(message);
					if (USER_ROLE == 'sub_admin' && KSXRIGHTS.allowPaperAdd != 1){
						$('#conResult').hide();
					}
					$('#txtImport').modal();
					// gio
					ksxProbe.gioTrack('enterQuestionSuccess', 1, {
						'questionEnterMethod_var': '批量录入',
						'questionEnterCount_var': msg.bizContent.successCount
					});

					$('#txtImport').on('hidden.bs.modal', function (e) {
						$('#txtImport').off().on('hidden', 'hidden.bs.modal');
						location.reload();
					});
				}
			});
		}
	});

	$('#closeButton').click(function () {
		$('#txtImport').modal('hide');
		location.reload();
	});

	//点击确认关闭导入结果模态框
	$('#conResult').click(function (e) {
		e.stopPropagation();
		e.preventDefault();
		$('div#text-input').froalaEditor('html.set', '');
		$('div#text-input').froalaEditor('destroy');
		initFroala();
		$('#preview').empty();
		$('#txtImport').modal('hide');
		window.open(getAdminUrlPrefix + '/examadmin/admin/paper_add_new');
	});

	// 重载页面，继续录入
	$('#continueAddQuestion').click(function (e) {
		e.stopPropagation();
		e.preventDefault();
		$('#txtImport').off().on('hidden', 'hidden.bs.modal');
		location.reload();
	});
	var errorIndex = -1;
	var topNum = 0;
	var bottomNum = 0;
	// 点击显示下一个错误
	$('#nextError').click(function (e) {
		e.stopPropagation();
		e.preventDefault();
		var boxOffsetTop = $('.box').offset().top;
		var error = $('#preview').find('.check_error');

		//先判断滚动条是否到底部
		if(bottomNum === 1){
			topNum = 0;
			bottomNum = 0;
			errorIndex = -1;
		}else{
			errorIndex++;
			if(errorIndex > error.length - 1){
				errorIndex = -1;
			}
			topNum += parseInt(error.eq(errorIndex).offset().top - boxOffsetTop - 10);
		}

		// 范例和规范打开 对应错题显示
		if ($('#qtExample').hasClass('active')) {
			$('.box').scrollTop(topNum + $('#qtExample').height());
		}else if($('#qtStandard').hasClass('active')){
			$('.box').scrollTop(topNum + $('#qtStandard').height());
		}else if($('#qtStandard1').hasClass('active')){
			$('.box').scrollTop(topNum + $('#qtStandard1').height());
		} else {
			$('.box').scrollTop(topNum);
		}
		// checkError();
	});
	//滚动检测
	$('.box').scroll(function(){
		if($(this).scrollTop() + $(this).height() >= $('#preview').height()){
			errorIndex = -1;
			topNum = 0;
			bottomNum = 1;
		}
	});
	//导入选择分类
	$('body').on('click', '#selTypeLink', function(e) {
		// e.stopPropagation();//解决点击'试题分类'，'试题难度'下拉框不隐藏的bug
		// e.preventDefault();
		showSelType(this);
	});
	// 批量补充难度
	$('.body-content .cont-r .tab-content .batch-type .simulationOption div').click(function(e){
		var $this = $(this);
		var idx = $this.index();
		$('.body-content .cont-r .tab-content .batch-type .simulationOption div').removeClass('now_diff'); //移除所有选项的选中标记
		$(this).addClass('now_diff'); //为被点选项加上选中标记，在输入区被编辑后进行校验时，调用该选项的点击，对所有难度的输入错误进行再次纠正，实现难度纠错状态的保存
		e.stopPropagation();
		$this.parents('.simulationSelect').next().children().prop('selected', false);
		$this.parents('.simulationSelect').children('span').text($this.text());
		$this.parent().hide();
		var errorChidren = $('#preview').children('.check_error');
		var errChidrenDiff = $('#preview').children('.check_error_diff');
		for(var i = 0; i < $(errorChidren).length; i++){
			if($(errorChidren[i]).find('.qt_difficult').hasClass('qt_error')) {
				$(errorChidren[i]).addClass('new_error');
			}
		}
		for (var i = 0; i < $(errChidrenDiff).length; i++) {
			if($(errChidrenDiff[i]).find('.qt_difficult').hasClass('qt_error_diff')) {
				$(errChidrenDiff[i]).addClass('new_error');
			}
		}
		var newChidren = $('#preview').children('.new_error');
		if ($this.text() == '请选择'){
			for (var i = 0; i < newChidren.length; i++) {
				var diffBox = $(newChidren[i]).find('.qt_difficult');
				$(diffBox).addClass('qt_error');
				$(diffBox).html('<span class="title">难度：</span>');
				$('.new_error').addClass('check_error');
			}
			//判断一下是否存在错误
			if($('#preview .qt_error').length > 0){
				$('#errorText').show();
				$('#nextError').show();
			}
		} else {
			for (var i = 0; i < newChidren.length; i++) {
				var diffBox = $(newChidren[i]).find('.qt_difficult');

				diffBox.removeClass('qt_error');
				diffBox.removeClass('qt_error_diff');
				if($(newChidren[i]).find('.qt_error').length == 0){
					$(newChidren[i]).removeClass('check_error');
				}
				if($(newChidren[i]).find('.qt_error_diff').length == 0){
					$(newChidren[i]).removeClass('check_error_diff');
				}
				$(diffBox).html('<span class="title">难度：</span>' + $this.text());
			}
			//判断一下是否存在错误
			if($('#preview .qt_error').length == 0) {
				$('#errorText').hide();
				$('#nextError').hide();
			}else {
				$('#errorCount').text($('.check_error').size());
			}
		}

		//对所有单选题进行一次判断，如难度纠正后没有其他错误，放出'录入为多选题'选项 。取消纠正后，难度变为错误时，该选项隐藏
		$('.question[data-type=1]').each(function(){
			if($(this).find('.qt_error').length != 0){
				$(this).find('.change-type').hide();
			}else{
				$(this).find('.change-type').show();
			}
		});
	});

	//选择试题类型，显示不同示例
	$('#manualInput select[name=type]').change(function(e) {
		var $this = $(this);
		// 更换试题类型时给出提示信息
		if($('#inputArea').attr('style') != 'display: none;'){
			if(confirm('输入区试题内容会清空，请确认') == false){
				$this.prev().children('.title-font').text($this.prev().children('.title-font').attr('oldValue'));
				$this.val(qt_type);
				return false;
			}
		}
		$this.prev().children('.title-font').attr('oldValue', $this.prev().children('.title-font').html());
		qt_type = $(this).val();
		$('#text-input .fr-view').html('');
		$('#preview').empty();
		$('#qtExample .accordion').hide();
		$('#accordion' + qt_type).show();
	});

	$('#helpBtn').click(function (e) {
		e.stopPropagation();
		e.preventDefault();
		window.open('https://www.kancloud.cn/zhoujun123/examstar-stbq/1071627');
	});
});

function ajaxSuccessFn(num){
	if (companyId && companyId != undefined){
		var data = {
			'companyId': Number(companyId),
			'moduleType': 3,
			'functionType': 6,
			'instructions': {
				'operator': surname,
				'operatorPhone': adminPhone,
				'operationDetail': '使用 [批量录入] 成功录入 [' + num + '] 道题'
			}
		};

		$.ajax({
			type: 'POST',
			cache: false,
			contentType: 'application/json; charset=utf-8',
			headers: { 'cache-control': 'no-cache' },
			dataType: 'json',
			url: '/node-customer-tracking/usage/buryingPoint',
			data: JSON.stringify(data),
			success: function (msg) {}
		});
	}
}

function changeDialogShow(_this){
	_this.animate({
		height: '0px'
	});
}
// 切换icon
function changeIconClass(_this){
	if (_this.find('.icon').hasClass('icon-a_arrow_down')){
		_this.find('.icon').removeClass('icon-a_arrow_down');
		_this.find('.icon').addClass('icon-a_arrow_up');
		$('.textarea-group').addClass('active');
	} else {
		_this.find('.icon').removeClass('icon-a_arrow_up');
		_this.find('.icon').addClass('icon-a_arrow_down');
		$('.textarea-group').removeClass('active');
	}
}


//显示选择分类对话框
function showSelType(obj){
	selTypeModal.location.href = '/baseinfo/admin/tree/tests_class?sourceFrom=1';
	$('#classDialog').show();
	// $('#typeModal').modal({
	// 	backdrop:"static",
	// 	keyboard:false
	// });
}

//关闭选择分类对话框
function hideSelType(obj){
	$('#classDialog').hide();
	// $('#typeModal').modal('hide');
}

//接受选择分类数据
function selType(id, name){
	$('input[name=classification]').val(id);
	$('#selTypeLink').text(name);
}


//点击导入时检查试题中是否存在错误
function checkError() {
	// 首先检查题目中有无重复项，若有重复则对整题做标记
	$('#preview').find('.question').each(function (index, element) {
		var key_t = [];
		var ans;
		var diffBox = $(this).find('.qt_error_diff').length;
		key_t[0] = $(this).find('.key_A').length;
		key_t[1] = $(this).find('.key_B').length;
		key_t[2] = $(this).find('.key_C').length;
		key_t[3] = $(this).find('.key_D').length;
		key_t[4] = $(this).find('.key_E').length;
		key_t[5] = $(this).find('.key_F').length;
		key_t[6] = $(this).find('.key_G').length;
		key_t[7] = $(this).find('.key_H').length;
		// 按照选项重复个数从大到小排序
		key_t.sort(function(a, b) {
			return b - a;
		});
		if(key_t[0] > 1 || diffBox > 1){
			$(this).addClass('check_error');
		}
		// 对按照答案对选型进行检索，若答案不在选项中，则将答案标记为错误
		if(qt_type == '1' || qt_type == '2'){
			ans = $(this).find('.qt_answer').text().replace(/^答案[:：]/, '').replace(/\s/g, '').toUpperCase();
			if(ans.replace(/[A-Z]/g, '') != ''){
				$(this).addClass('check_error');
			}else {
				var ans_l = $.trim(ans).split('');
				for (var i = 0; i < ans_l.length; i++) {
					var key_f = $(this).find('.key_' + ans_l[i]).length;
					if(key_f == 0){
						$(this).addClass('check_error');
						break;
					}
				}
			}
		}
		if(qt_type == '3') {
			ans = $(this).find('.qt_answer').text().replace(/^答案[:：]/, '').replace(/\s/g, '');
			if(ans != '正确' && ans != '错误' && ans != '对' && ans != '错'){
				// $(this).addClass("check_error");
				$(this).find('.qt_answer').addClass('error');
			}
		}
		if(qt_type == '4' || qt_type == '5'){
			ans = $(this).find('.qt_answer').text().replace(/^答案[:：]/, '').replace(/\s/g, '');
			if(ans == ''){
				$(this).addClass('check_error');
			}
		}
	});
}

// 组织导入试题的信息
function serializeFn() {
	var classification = $('input[name=classification]').val();
	// var difficult=$("select[name=difficult]").val();
	var data = [];

	$('#preview').find('.question').each(function (index, element) {
		var type = $(this).attr('data-type');
		var reQuestion = $(this).find('.qt_title').html().replace(/^[\s\S]*<span class="type-box"[\s\S]*>[\s\S]+<\/span>([\s\S]*)$/, '$1');
		var question = escapeHTML(reQuestion);
		var answer1 = $(this).find('.key_A').length == 0 ? '' : (escapeHTML($(this).find('.key_A').html()) == '' ? ' ' : escapeHTML($(this).find('.key_A').html()));
		var answer2 = $(this).find('.key_B').length == 0 ? '' : (escapeHTML($(this).find('.key_B').html()) == '' ? ' ' : escapeHTML($(this).find('.key_B').html()));
		var answer3 = $(this).find('.key_C').length == 0 ? '' : (escapeHTML($(this).find('.key_C').html()) == '' ? ' ' : escapeHTML($(this).find('.key_C').html()));
		var answer4 = $(this).find('.key_D').length == 0 ? '' : (escapeHTML($(this).find('.key_D').html()) == '' ? ' ' : escapeHTML($(this).find('.key_D').html()));
		var answer5 = $(this).find('.key_E').length == 0 ? '' : (escapeHTML($(this).find('.key_E').html()) == '' ? ' ' : escapeHTML($(this).find('.key_E').html()));
		var answer6 = $(this).find('.key_F').length == 0 ? '' : (escapeHTML($(this).find('.key_F').html()) == '' ? ' ' : escapeHTML($(this).find('.key_F').html()));
		var answer7 = $(this).find('.key_G').length == 0 ? '' : (escapeHTML($(this).find('.key_G').html()) == '' ? ' ' : escapeHTML($(this).find('.key_G').html()));
		var answer8 = $(this).find('.key_H').length == 0 ? '' : (escapeHTML($(this).find('.key_H').html()) == '' ? ' ' : escapeHTML($(this).find('.key_H').html()));
		if(type == '1' || type == '2'){
			var key = escapeHTML($(this).find('.qt_answer').html()).replace(/&nbsp;/g, '').toUpperCase().replace(/<BR CLASS="MARKDOWN_RETURN">/g, '');
		}else if (type == '3') {
			var key = escapeHTML($(this).find('.qt_answer').html()).replace(/(^\s+)|(\s+$)/g, '').replace(/(正确|对)/, 1).replace(/(错误|错)/, 0);
		}else{
			var key = escapeHTML($(this).find('.qt_answer').html());
		}
		var comKeyWord = $(this).find('.qt_comKeyWord').length == 0 ? '' : escapeHTML($(this).find('.qt_comKeyWord').html());
		var coreKeyWord = $(this).find('.qt_coreKeyWord').length == 0 ? '' : escapeHTML($(this).find('.qt_coreKeyWord').html());
		var analysis = $(this).find('.qt_analysis').length == 0 ? '' : escapeHTML($(this).find('.qt_analysis').html());
		var difficult = $(this).find('.qt_difficult').length == 0 ? '' : escapeHTML($(this).find('.qt_difficult').html());
		if ($(this).find('.qt_difficult').length != 0){
			difficult = difficult.slice(0, 2);
		}
		var label = $(this).find('.qt_label').length == 0 ? '' : escapeHTML($(this).find('.qt_label').html());
		data[index] = {
			'classification': classification,
			'type': type,
			'difficult': difficult,
			'question': question,
			'answer1': answer1,
			'answer2': answer2,
			'answer3': answer3,
			'answer4': answer4,
			'answer5': answer5,
			'answer6': answer6,
			'answer7': answer7,
			'answer8': answer8,
			'normal_words': comKeyWord,
			'key_words': coreKeyWord,
			'key': key,
			'analysis': analysis,
			'label': label,
			'disorder': 1
		};
		// 若不存在该项则不存入
		for (i in data[index]) {
			if(data[index][i] == '' || !data[index][i]){
				delete data[index][i];
			}
		}
	});
	return data;
}

//转义部分，换行　$markdown_return 进行两次替换
// 按照URL换码协议，＋会被转换成空格，所以要做相应处理,本js大量调用
function escapeHTML(text) {
	return text.replace(/^[\s\S]*<span class="title"[\s\S]*>[\s\S]+<\/span>([\s\S]*)$/, '$1')
		.replace(/<br class="markdown_return">/g, '$markdown_return')
		.replace(/\&nbsp;/g, ' ')
		.replace(/\$markdown_return/g, '<br class="markdown_return">');
}
// 尝试新的文本编辑器，输入触发，使用froalaEditor富文本;预览区展示
function initFroala() {
	$('div#text-input').froalaEditor({
		key: 'AODOd2HLEBFZOTGHW==',
		charCounterCount: false,
		language: 'zh_cn',
		spellcheck: false,
		toolbarInline: false,
		placeholderText: '请将所选试题复制到这里',
		//      pastePlain: true,//是否为纯文本粘贴
		pasteAllowLocalImages: true,
		imageDefaultWidth: 'auto', //图片默认宽度
		imageDefaultAlign: 'left',
		wordAllowedStyleProps: [], //允许从word粘贴的标签的样式
		htmlAllowedTags: ['p', 'img', 'br', 'sub', 'sup', 'div'], //允许出现的标签
		//      imageMaxSize: 2 * 1024 * 1024,
		imageAllowedTypes: ['jpeg', 'jpg', 'png'],
		imageUploadParam: 'multipartFile',
		imageUploadParams: {code: 1},
		imageUploadURL: '/baseinfo/upload/image'//上传到本地服务器
	}).on('froalaEditor.contentChanged', function (e, editor) {
		setTimeout(function(){
			$('#preview').html('');
			var newArr = [];
			var indexArr = [];
			var questionArr = [];
			var detail = [];
			var contentText = editor.html.get().replace(/<p>/g, '\n\n').replace(/<\/p>/g, '\n\n').replace(/<br>/g, '\n\n').replace(/auto;">/g, 'auto;">\n\n').split('\n');
			//去除空格
			contentText.forEach(function (value) {
				if(value){
					value = value.replace(/&nbsp;/g, ' ');
					value = '&nbsp;&nbsp;&nbsp;' + value;
					value = value.replace(/&nbsp;/g, '\n');
					newArr.push(value);
				}
			});
			//寻找相应的下标
			newArr.forEach(function(value, index){
				if(value.match(nameReg)){
					indexArr.push(index);
				}
			});
			//截取完整小题
			indexArr.forEach(function(value, index){
				questionArr.push(newArr.slice(indexArr[index], indexArr[index + 1]));
			});
			$('.batch-preview-box .toolbar .title').text(questionArr.length > 0 ? '检查区(共' + questionArr.length + '题)：' : '检查区：');
			//判断题型，赋值qt_type
			questionArr.forEach(function (value) {
				var allValue = value.join(' ');
				//匹配没有答案的情况(  答案：/【答案】)
				if (!allValue.match(/\n+\s*【\s*答案\s*】\s*/g) && !allValue.match(/\n+\s*(答案[:：])\s*/g)) {
					//匹配到选项存在则默认为单选题先判断是否带有a.类似标志
					if (allValue.match(/\n+\s*[a-h]\s*[.|、]/ig)) {
						getClassify(value, detail, 1);
					} else if (fillReg.test(allValue)) {
						//在判断是否带有（）
						getClassify(value, detail, 4);
					} else {
						//否则默认为问答题
						getClassify(value, detail, 5);
					}
				} else {
					var answerReg = /^\s*\n?【\s*答案\s*】\s*/;
					var answerJude = /\n\n\n\s*【\s*答案\s*】|\n\n\n\s*答案[:：]/g;
					//针对存在多个答案的情况
					if (allValue.match(answerJude).length > 1) {
						value.forEach(function (ele, i) {
							if (ele.match(answerJude)) {
								value = value.slice(0, i + 1);
							}
						});
					}
					value.forEach(function (val) {
						// 处理下中文括号
						if (answerReg.test(val)) {
							val = val.replace(answerReg, '答案：');
						}
						//只有答案两个字的情况
						if (/^\s*\n?答案\s*\n?$/.test(val)) {
							val = val.replace(/^\s*\n?(答案)\s*/, '答案：');
						}
						if (val.match(singleReg)) {
							var m = val.match(singleReg);//匹配答案项
							var isAnswer = m[0].replace(/^\n?\s*(答案[:|：])\s*/, '');//寻找答案后的字符串
							//有答案字段，没有正确的答案
							if (!isAnswer) {
								var newString = value.join(' ');
								if (newString.match(/\n?\s*[a-h][.|、]\s*/ig)) {
									//有选项情况下，默认为单选题
									getClassify(value, detail, 1);
								} else {
									//填空题筛选
									if ((newString.split('答案')[0]).match(fillReg)) {
										getClassify(value, detail, 4);
										return false;
									}
									//无选项情况下，默认为问答题（主要包括判断题与问答题的区分）
									getClassify(value, detail, 5);
								}
							} else {
								//word版多选题带,号处理
								if (isAnswer.match(/^([a-h][,|，]){0,7}([a-h])$/ig)) {
									isAnswer = isAnswer.replace(/,|，/g, '');
								}
								var isSelect = isAnswer.match(/^\s*[a-h]{1,8}\s*(?:\n|$)/i);//单选/多选
								var isJude = isAnswer.match(/^\s*(正确|错误|对|错)\s*(?:\n|$)/i);//判断
								var isSelects = []; //该数组用于接收处理玩空字符串之后的isSelect
								// 针对大小写选项重复
								if (isSelect) {
									//  数组去重
									isSelect = (isSelect[0].split('')).filter(function (ele, i, array) {
										return array.indexOf(ele) === i;
									});
									//二次处理isSelect,去除空字符串
									isSelect.forEach(function (value1) {
										if ($.trim(value1)) {
											isSelects.push(value1);
										}
									});
									//排序
									isSelects.sort();

									//1，2项比较是否为同一个选项(a,A)
									if (isSelects.length === 2 && isSelects[0].toLocaleLowerCase() === isSelects[1]) {
										isSelects = isSelects.splice(0, 1);
									}
								}
								//单选题
								if (isSelects && isSelects.length === 1) {
									getClassify(value, detail, 1);
								}
								//多选题
								if (isSelects && isSelects.length > 1) {
									getClassify(value, detail, 2);
								}
								//判断题
								if (isJude) {
									getClassify(value, detail, 3);
								}
								if (!isSelect && !isJude) {
									// 填空题
									if ((((value.join(' ').split('答案:'))[0].match(fillReg)) && (value.join(' ').split('答案:')).length > 1) ||
                                        (((value.join(' ').split('答案：'))[0].match(fillReg))) && (value.join(' ').split('答案：')).length > 1) {
										getClassify(value, detail, 4);
									} else {
										//问答题
										getClassify(value, detail, 5);
									}
								}
							}
						}
					});
				}
			});
			var html = '';
			//没有数据时隐藏检查处错误提示
			if(detail.length === 0){
				$('#errorCount').text('');
				$('#errorText').hide();
				$('#nextError').hide();
			}
			var ii = -1;//计数
			console.log(detail, 78778);
			detail.forEach(function (value) {
				ii++;
				qt_type = value.type;
				html = markdown.toHTML((value.name).join(''));
				console.log(html, 8888);
				$('div#preview').append(html);
				// 标记答案
				markAnswer(qt_type, ii);
				changeSize(ii);
				//  错误点及时检测
				var errorNum = $('.check_error').size();
				if(errorNum > 0){
					$('#errorCount').text(errorNum);
					$('#errorText').show();
					if(errorNum === 1){
						$('#nextError').text('查看').show();
					}else{
						$('#nextError').text('下一处').show();
					}
				}else{
					$('#errorCount').text('');
					$('#errorText').hide();
					$('#nextError').hide();
				}
			});

			//禁止右侧多选点击，禁止默认事件
			$('.key input').click(function(){
				return false;
			});
			$('.body-content .cont-r .tab-content .batch-type .simulationOption div.now_diff').click(); //纠正难度错误
		}, 1500);
	}).on('froalaEditor.image.beforeUpload', function (e, editor, images) {
		// Return false if you want to stop the image upload.
		//                if(images[0].size>2*1024*1024){
		//                    alert("图片过大，无法上传");
		//                    return false;
		//                }
	}).on('froalaEditor.image.uploaded', function (e, editor, response){
		//如果上传失败
		if(response.bizContent){
			alert(response.bizContent.desc);
		}
	}).on('froalaEditor.image.error', function (e, editor, error, response) {
		// Image too text-large.
		if (error.code == 5) {
			alert('图片过大，无法上传');
			// Invalid image type.s
		}else if (error.code == 6) {
			alert('不支持该图片类型，请上传jpeg, jpg, png格式的图片');
			// Image file is corrupted.
		}else if(error.code == 8){
			alert('图片已损坏');
		}
	}).on('froalaEditor.focus', function (e, editor) {
		//froala中有专门用于隐藏placeholder的方法--placeholder.hide()，但是尝试过不生效，因此用笨办法做隐藏显示
		if(editor.placeholder.isVisible()){
			$('.fr-placeholder').hide();
		}
	}).on('froalaEditor.blur', function (e, editor) {
		if(editor.html.get() == ''){
			$('.fr-placeholder').show();
		}
	});
}
// initFroala();
// 行号
$('div#text-input').setTextareaCount({
	width: '0',
	bgColor: '#edf2f7',
	color: '#989A9C',
	display: 'inline-block'
});

$('#excel').click(function() {
	var P = $(this).parent();
	P.removeClass().addClass('import_choose excel-checked');
	P.prev().removeClass().addClass('import_choose txt');
	P.next().removeClass().addClass('import_choose word');
});

// 标记答案,initFroala方法中调用
function markAnswer(type, ii) {
	var list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
	$('.question').eq(ii).each(function (index, element) {
		var $that = $(this);
		var titleNum = $(this).find('.type-box .title').text();
		var answerText = $(this).find('.qt_answer').text().replace(/^\s*答案\s*[:：]/, '');
		//word版多选题带,号处理
		if(answerText.match(/^([a-h][,|，]){0,7}([a-h])$/ig)){
			answerText = answerText.replace(/,|，/g, '');
		}
		var answer = answerText.toUpperCase();
		//处理下只有图片的情况
		var checkTitle = $(this).find('.qt_title').text().replace($(this).find('.type-box').text(), '');
		if($.trim(checkTitle) === ''){
			if($(this).find('.qt_title img').size() < 1){
				$(this).find('.qt_title').addClass('qt_error').html('题目（至少两个字)');
			}
		}
		//检测是否按顺序排序
		var select = $(this).find('.key .title').text();
		var type = $(this).data('type');
		select = select.split('.').join('');

		//处理题目中的题号带括号，替换下中文括号
		titleNum = titleNum.replace(/（/, '(');
		titleNum = titleNum.replace(/）/, ')');
		$(this).find('.type-box .title').text(titleNum);

		//错误标记check_error
		if($(this).find('.error,.qt_error').size() > 0){
			$(this).addClass('check_error');
		}
		if(type == '1' || type == '2') {
			for (var k = 0, selectLen = select.length; k < selectLen; k++) {
				//根据选项与ACSII的比较，判断是否为正常的排序及重复选项的存在
				if (!(select[k] === String.fromCharCode(65 + k))) {
					$(this).addClass('check_error');
					$(this).find('.key').addClass('qt_error');
				}
			}
			for (var i = 0, listLen = list.length; i < listLen; i++) {
				//标记选项框
				if (answer.search(list[i]) !== -1) {
					$(this).find('.key_' + list[i] + ' .checkOrRadio').prop('checked', true);
				} else {
					$(this).find('.key_' + list[i] + ' .checkOrRadio').attr('disabled', true);
				}
			}
			//根据选项最后一位的ASCII码 与选项对比小于即为不存选项（大写比较）
			//单选题判断答案是否存在
			// 过滤空字符串
			var answerhandle = answer.split('').filter(function (msg) {
				return msg && msg.trim();
			});
			//单选题判断答案是否存在
			if(answerhandle.length === 1){
				if(select.slice(-1).charCodeAt() < answerhandle[0].toLocaleUpperCase().charCodeAt()){
					$that.addClass('check_error');
					$that.find('.qt_answer').removeAttr('hidden').addClass('qt_error').text('答案不存在！');
				}
			}

			// 多选题判断答案是否存在
			if(answerhandle.length > 1){
				for(var j = 0, answerLen = answerhandle.length; j < answerLen; j++){
					if(answerhandle[j].charCodeAt() > select.slice(-1).charCodeAt()){
						$that.addClass('check_error');
						$that.find('.qt_answer').removeAttr('hidden').addClass('qt_error').text('答案不存在！');
					}
				}
			}
			//题目有错误时把单多选按钮隐藏
			if($(this).find('.qt_error').length != 0){
				$(this).find('.change-type').hide();
			}else{
				$(this).find('.change-type').show();
			}
		}
		if(type == '4'){
			//  填空题括号与答案对应，先进行空元素匹配，在进行重复答案匹配
			var fillReg = /([\(|\（]\s*[\)|\）])/g;
			var newAnswer = [];
			if($(this).find('.qt_title').text().match(fillReg)){
				var fillNum = $(this).find('.qt_title').text().match(fillReg).length;
			}
			var answerNum = answerText.split('|');
			// 先判断长度是否相等
			if(fillNum !== answerNum.length){
				$(this).addClass('check_error');
				//长度不相等即为错
				$(this).find('.qt_answer').addClass('qt_error');
			}else{
				//去除空元素
				answerNum.forEach(function (value) {
					if($.trim(value)){
						newAnswer.push(value);
					}
				});
				if(fillNum !== newAnswer.length){
					$(this).addClass('check_error');
					//长度不相等即为错
					$(this).find('.qt_answer').addClass('qt_error');
				}
			}
		}
		if(type == '5') {
			//问答题答案为空时标记为错误
			if (answerText.length === 0) {
				$(this).addClass('check_error');
				$(this).find('.qt_answer').addClass('qt_error');
			}
		}
	});
	//单选多选相互转化
	$('.change-type input').click(function(){
		if($(this).is(':checked')){
			$(this).parent().siblings().removeClass('type-name-1').addClass('type-name-2');
			changeType($(this), '多选题', 'checkbox', 2);
		}else{
			$(this).parent().siblings().removeClass('type-name-2').addClass('type-name-1');
			changeType($(this), '单选题', 'radio', 1);
		}
	});
}
// 转化单多选题型，上面方法调用
function changeType(tar, title, dataType, inputType) {
	tar.parent().siblings('.type-name').text(title);
	tar.parents('.qt_title').siblings('.key').find('input').attr('type', dataType);
	tar.parents('.question').attr('data-type', inputType);
}
//当题号过长时改变字号
function changeSize(ii) {
	$('.question .qt_title .title').eq(ii).each(function(index, element) {
		var $numWords = $(this).text().length;
		if($numWords == 4){
			$(this).css({'font-size': '20px'});
		}else if ($numWords == 5) {
			$(this).css({'font-size': '16px'});
		}else if ($numWords > 5) {
			$(this).css({'font-size': '14px'});
		}
	});
}
// 试题类型以及难度选择
$('.body-content .cont-r .tab-content .batch-type .simulationSelect').click(function(e){
	e.stopPropagation();
	$(this).children('.simulationOption').show();
	$(this).siblings('.simulationSelect').children('.simulationOption').hide();
});
$('body').click(function(){
	$('.simulationOption').hide();
});

// 组织数据，用于渲染
function getClassify(value, detail, num){
	detail.push({
		name: value,
		type: num});
}

function blobToBase64(blob, callback) {
	var reader = new FileReader();
	reader.readAsDataURL(blob);
	reader.addEventListener('load', function(){
		var img = new Image();
		img.src = reader.result;

		document.body.appendChild(img);
	});
}
