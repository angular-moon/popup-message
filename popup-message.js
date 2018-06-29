var swal = require('sweetalert2');
var pop = {};

pop.showToast = function(message)
{
	if(!$){
		alert(message);
		return;
	}
	var messageBox = '<div class="toast_wrap"><div class="toast"></div></div>';
	$("body").append(messageBox);
	$(".toast").html(message);
	$(".toast_wrap").fadeIn(400).delay(1000).fadeOut(400,function(){
		$(this).remove();
	});
};

var showMsgId = 0;
function msgbox(type, message, cb, title, cancelCb, width, height){
	var isFire = false;
	var id = showMsgId++;
	if(!cb){
		cb = function (){};
	}
	if(!cancelCb){
		cancelCb = function (){};
	}
	switch(type){
		case 'alert': if(!title)title='提示'; break;
		case 'error': if(!title)title='错误'; break;
	    case 'warning': if(!title)title='警告'; break;
		case 'success': if(!title)title='成功'; break;
		case 'confirm': if(!title)title='请确认'; break;
	}
	
	if(!$ || !$.msgbox){
		alert(message);
		return;
	}
	
	$.msgbox.defaults({"zIndex":999999});
	
	var options = {
			'id':id,
			'type':type,
			'lang':'zh_CN',
			overlay:true};
	
	if(!$.msgbox(id))
		$.msgbox(options);
	
	$.msgbox(id).content(message);
	$.msgbox(id).title(title);
	if(type == "confirm"){
		$.msgbox(id).options.onClose = function(){
			if(isFire)
				return;
			isFire = true;
			if(this.val())
				cb();
			else 
				cancelCb();
		};
	}else{
		$.msgbox(id).options.onClose = function(){
			if(isFire)
				return;
			isFire = true;
			cb();
		};
	}
	if(width)
		$.msgbox(id).options.width = width;
	else
	 	delete $.msgbox(id).options.width;

	 if(height)
		$.msgbox(id).options.height = height;
	else
	 	delete $.msgbox(id).options.height;

	$.msgbox(id).open();
};

function sweetalert(type, message, cb, title, cancelCb){
    var isFire = false;
    var options = { title:title,
                    html: message,
					type: type,
                    allowEscapeKey: true,
                    allowOutsideClick: false,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					showCancelButton: false
                    };


	switch(type){
		case 'alert': if(!title)options.title='提示';options.type='info'; break;
		case 'error': if(!title)options.title='错误'; break;
		case 'warning': if(!title)options.title='警告'; break;
		case 'success': if(!title)options.title='成功'; break;
		case 'confirm':
			if(!title)options.title='请确认';
			options.type='warning';
			options.showCancelButton = true;
			break;
	}

    swal(options).then(function(){
        if(isFire) return;
        isFire = true;
        //调用确定10回调函数
        (cb || $.noop)();

    //调用取消回调函数
    }, (cancelCb || $.noop))
}

//type:"alert, error, warning, success, confirm"
//message:"提示信息";
//cb:类型为confirm时为确定按钮的回调,为其他类型时为关闭按钮的回调;
//title:"自定义title"
//cancelCb:类型为confirm时,取消按钮的回调;
//width:指定弹出窗口宽度
//height:指定弹出窗口高度
pop.showMsg = function(type, message, cb, title, cancelCb, width, height){
	if($.browser.msie && $.browser.version < 10){
		msgbox.apply(this, arguments);
	}else{
		sweetalert.apply(this, arguments);
	}
}

pop.alert = createShot("alert");
pop.error = createShot("error");
pop.warning = createShot("warning");
pop.success = createShot("success");
pop.confirm = function(message, cb, title, cancelCb, width, height){
		pop.showMsg("confirm", message, cb, title, cancelCb, width, height);
	}

function createShot(type){
	return function(message, cb, title, width, height){
		pop.showMsg(type, message, cb, title, null, width, height);
	}
}

return pop;
