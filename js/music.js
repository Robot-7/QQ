var music = document.getElementById("music");
var musicTitle = document.getElementById("music-title");
var musicTime = document.getElementById("music-time");
var playTime = document.getElementById("music-playTime");

var soundBar = document.getElementById("sound-bar");
var soundPoint = document.getElementById("sound-point");

var musicImg = document.getElementById("music-img");

var img = document.getElementById("music-photo");
var imgWrap = document.getElementById("wrap-photo");

var musicListName = {
	'0': 'light',
	'1': '天空之城',
	'2': '可能否',
	'3': '出山',
	'4': 'neguse',
	'5': '盗将行',
	'6': '纸短情长'
};

var n = 0;

var flag = 1;

var transform = 0;

function tansformImg() {

	transform += 30;

	img.style.transform = "rotate(" + transform + "deg)";

}

var width = img.getBoundingClientRect().width;

function imgPlay(n) {

	imgWrap.style.left = -n * width + "px";

}

music.load();

function musicLoad(name) {

	$("#music-title").empty();

	var src = "music/" + name + ".mp3";

	$("#music").attr('src', src);

	music.load();

}

function getMousePoint() {
	var e = event;
	return e.clientY;
}



var height = 0;

soundBar.addEventListener("click", function() {

	var valueHeight = soundBar.getBoundingClientRect().bottom - getMousePoint();

	soundPoint.style.height = valueHeight + "px";

	var height = soundBar.getBoundingClientRect().height;

	var i = valueHeight / height * 0.6;

	music.volume = i;

})
var timeS;

function creatTimeS() {

	timeS = setInterval(function() {

		tansformImg();

	}, 2000);

}

function borderN(n) {
	
	

	if(n > 6) {
		n = 0;
	}

	if(n < 0) {
		n = 6;
	}

	return n;

}

$(document).ready(function() {

	music.volume = 20 / 80 * 0.6;

	$("#play-button").click(function() {

		if(flag % 2 != 0) {
			
			$("#music-title").empty();
			
			console.log(n);
			
            music.play();
           
			musicTitle.append(musicListName[n]);

			showTime(n);

			creatTimeS();

		} else {

			music.pause();

			flag = flag % 2;

			clearInterval(timeS);

		}

		flag++;

	})

	$("#next-button").click(function() {

		
		n++;
		
		$("#music-title").empty();

		n = borderN(n);

		musicLoad(musicListName[n]);
		
		if(flag % 2 == 0)
		{
			music.play();
		}

		imgPlay(n);

		musicTitle.append(musicListName[n]);

		showTime(n);

	})

	$("#last-button").click(function() {
		
		n--;
		
		$("#music-title").empty();

		n = borderN(n);

		musicLoad(musicListName[n]);

		imgPlay(n);

		musicTitle.append(musicListName[n]);

		showTime(n);
		

	})

})

music.ontimeupdate = function() {

	$("#music-playTime").empty();

	var str = "已播放时间:" + parseInt(music.currentTime / 60) + "分" + parseInt(music.currentTime % 60) + "秒";

	playTime.append(str);

}

musicTime.append("总时间:" + 0 + "分" + 0 + "秒");

function showAllTime() {

	$("#music-time").empty();

	var time = music.duration;

	var str = "总时间:" + parseInt(time / 60) + "分" + parseInt(time % 60) + "秒";

	musicTime.append(str);
}

function showTime(n) {

	music.oncanplay = function() {

		showAllTime();

	}
}