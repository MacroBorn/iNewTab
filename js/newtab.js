// 定义背景颜色
var $bg1 = "linear-gradient(red, blue)";
var $bg2 = "linear-gradient(to right, red, blue)";
var $bg3 = "linear-gradient(to bottom right,red, green, blue)";
var index = 0;
var time;

$(function() {
	// 读取配置,进行操作
	var defaultConfig = {topic: '1',bg:"linear-gradient(red, blue)"}; // 默认配置
	// 读取数据，第一个参数是指定要读取的key以及设置默认值
	chrome.storage.sync.get(defaultConfig, function(items) {
		var _topic = items.topic;
		var _bg = items.bg;
		if (!_topic) return;
		if(_topic == "0"){
			time = setInterval(function(){
				timingSwitchJob();
			},8000);
		}else{
			index = 0;
			clearInterval(time);
			$("body").css("background",_bg);
		}
	});
});

// 定时切换任务
function timingSwitchJob(){
	var tmp = index%3+1;
	if(tmp == 1){
		$("body").css("background",$bg1);
	}else if(tmp == 2){
		$("body").css("background",$bg2);
	}else if(tmp == 3){
		$("body").css("background",$bg3);
	}
	index++;
}