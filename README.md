* 提供了一个自动消失的弹出提示: showToast(message).
* 对msgbox(ie) 和 sweetalert(ie9+, 现代浏览器)提供了一个简单的封装方法: showMsg(type, message, cb, title, cancelCb, width, height);

#### 参数说明: 
* type:"alert, error, warning, success, confirm"
* message:"提示信息";
* cb:类型为confirm时为确定按钮的回调,为其他类型时为关闭按钮的回调;
* title:"自定义title";
* cancelCb:类型为confirm时,取消按钮的回调;
* width:指定弹出窗口宽度(ie8有效);
* height:指定弹出窗口高度(ie8有效);

---

语法糖 function:

* alert(message, cb, title, width, height);
* error(message, cb, title, width, height);
* warning(message, cb, title, width, height);
* success(message, cb, title, width, height);
* confirm(message, cb, title, cancelCb, width, height);
