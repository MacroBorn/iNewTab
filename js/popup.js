// 定义背景颜色
var $bg1 = "linear-gradient(red, blue)";
var $bg2 = "linear-gradient(to right, red, blue)";
var $bg3 = "linear-gradient(to bottom right,red, green, blue)";

$(function(){
	init();
	// 读取配置,进行操作
	var defaultConfig = {topic: '1',bg:$bg1}; // 默认配置
	// 读取数据，第一个参数是指定要读取的key以及设置默认值
	chrome.storage.sync.get(defaultConfig, function(items) {
		var _topic = items.topic;
		var _bg = items.bg;
		if (!_topic) return;
		$('input:radio').eq(parseInt(_topic)).attr('checked', 'true');
		changePopupBg(_bg);
	});
})

function init(){
	setI18n();
}

function setI18n(){
	var getI18nMsg = chrome.i18n.getMessage;
	$(".my_theme").html(getI18nMsg('my_theme'));
	$(".switch").html(getI18nMsg('timing_switch'));
	$(".one").html(getI18nMsg('theme_one'));
	$(".two").html(getI18nMsg('theme_two'));
	$(".three").html(getI18nMsg('theme_three'));
	$(".clearCache").html(getI18nMsg('clear_cache'));
}

// 清除缓存
$('.clearCache').click(() => {
	chrome.storage.sync.get(null, function(items) {
		var _topic = items.topic;
		var _bg = items.bg;
		console.log(_topic+";"+_bg);
	});

	var _config = new Array("topic","bg");
	chrome.storage.sync.remove(_config, function() {
		reloadNewTab();
	});
});

// 改变面板背景颜色
function changePopupBg(color){
	$("body").css("background",color);
}

// 切换主题，改变即刷新
$('input[type=radio]').change(() => {
	// 保存配置信息
	var _topic = $('input:radio:checked').val();
	var _bg = $bg1;// default
	if(_topic=="2"){
		_bg = $bg2;
	}else if(_topic=="3"){
		_bg = $bg3;
	}
	chrome.storage.sync.set({topic: _topic,bg:_bg}, function() {
		reloadNewTab();
	});

});

// 获取标题
function reloadNewTab(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		var _url = tabs.length ? tabs[0].url : null;
		// 刷新当前标签页
		if(_url&&_url=="chrome://newtab/"){
			reload();
		}
		// 关闭 popup
		window.close();
	});
}

// 重新加载当前标签页
function reload(){
	getCurrentTabId(tabId =>{
		chrome.tabs.reload(tabId,null,function(){
			console.log("加载成功");
		})
	});
}

// 获取当前选项卡ID
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}