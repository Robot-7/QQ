$(function() {

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
		'0': '绅士',
		'1': '光年之外',
		'2': '悟空',
		'3': 'light',
		'4': '可能否',
		'5': '出山',
		'6': 'neguse',
		'7': '盗将行',
		'8': '小城谣',
	};

	var n = 0;
	

	//1.先加载顶部导航
	$("#nav").load("htmlTop.html");
	//2.加载滚动条
	$(".top-music-player").mCustomScrollbar();

	//3.预加载歌曲的信息
	var player = new Player($("#music"));
	player.loadMusic(musicListName[n]);
	showTime(n);
	musicTitle.append(musicListName[n]);

	//4.进度条的设置
	var progress = new Progress($(".music-bar"), $(".music-line"), $(".music-point"));

	//5.加载歌词
	var lyrics = new Lyrics();
	lyrics.path = "./source/" + musicListName[n] + ".txt";
	loadLyrics();

	//6.模式选择
	var model = 0;
	$("#model-button").click(function() {
		if(model == 0) {
			$("#model-button").children().removeClass("glyphicon glyphicon-repeat");
			$("#model-button").children().addClass("glyphicon glyphicon-random");
			model = 1;
		} else if(model == 1) {
			$("#model-button").children().removeClass("glyphicon glyphicon-random");
			$("#model-button").children().addClass("glyphicon glyphicon-refresh");
			model = 2;
		} else if(model == 2) {
			$("#model-button").children().removeClass("glyphicon glyphicon-refresh");
			$("#model-button").children().addClass("glyphicon glyphicon-repeat");
			model = 0;
		}
	})

	function setModelNumber(n, model) {
		if(model == 0) {
			n++;
			return n;
		} else if(model == 1) {
			n = Math.ceil(Math.random() * 6);
			return n;
		} else if(model == 2) {
			return n;
		}
	}

	var fllow;
	function setFollowProgress() {
		fllow = setInterval(function() {
			progress.value = music.currentTime / music.duration;
			progress.setFollowProgress();
		}, 200);
	}

	function stopFollowProgress() {
		clearInterval(fllow);
	}
	
	var isPlay = true;
	$(".list-li").mouseenter(function() {
		var index = $(this).index();
		$(this).find(".list-play-button").css("display", "block");
		$(this).find(".list-play-music").click(function() {
			playOrStopMusic(n);
/*			console.log(isPlay);*/
			if(n != index - 1) {
				$(".list-li").get(n).getElementsByTagName("span")[1].className = "glyphicon glyphicon-play";
				$(".list-li").get(n).getElementsByTagName("div")[1].className = "list-play-button";
				$(".list-li").get(index - 1).getElementsByTagName("div")[1].className = "list-play-button active-list-play-button";
				n = index - 1;
				imgPlay(n);
				changeMusic(n);
			} else {
				if(isPlay == false) {
					$(this).find("span").removeClass("glyphicon glyphicon-play");
					$(this).find("span").addClass("glyphicon glyphicon-pause");
				} else {
					$(this).find("span").removeClass("glyphicon glyphicon-pause");
					$(this).find("span").addClass("glyphicon glyphicon-play");
				}
			}
			
		})
	})
	
	function playOrStopMusic(n) {
		if(isPlay) {
			$("#music-title").empty();
			music.play();
			setFollowProgress();
			musicTitle.append(musicListName[n]);
			showTime(n);
			creatTimeS();
			isPlay = false;
		} else {
			music.pause();
			stopFollowProgress();
			clearInterval(timeS);
			isPlay = true;
		}
	}

	$("#play-button").click(function() {
		if(isPlay == true) {
			$("#play-button").find("span").removeClass("glyphicon glyphicon-play");
			$("#play-button").find("span").addClass("glyphicon glyphicon-pause");
		} else {
			$("#play-button").find("span").removeClass("glyphicon glyphicon-pause");
			$("#play-button").find("span").addClass("glyphicon glyphicon-play");
		}
		playOrStopMusic(n);
	})

	var toggle2 = false;
	$(".list-collect-music").click(function() {
		if(toggle2 == false) {
			$(this).find("span").removeClass("glyphicon glyphicon-star-empty");
			$(this).find("span").addClass("glyphicon glyphicon-star");
			toggle2 = true;
		} else {
			$(this).find("span").removeClass("glyphicon glyphicon-star");
			$(this).find("span").addClass("glyphicon glyphicon-star-empty");
			toggle2 = false;
		}
	})

	$(".list-li").mouseleave(function() {
		$(this).find(".list-play-button").css("display", "none");
	})
	

	$("#next-button").click(function() {
		n++;
		changeMusic(n);
	})

	$("#last-button").click(function() {
		n--;
		changeMusic(n);
	})

	//图片的旋转
	var transform = 0;
	var timeS;

	function creatTimeS() {
		timeS = setInterval(function() {
			transform += 30;
			img.style.transform = "rotate(" + transform + "deg)";
		}, 2000);
	}

	var width = img.getBoundingClientRect().width;

	//获得鼠标点击的高度
	function getMousePoint() {
		var e = event;
		return e.clientY;
	}

	//调节音量
	var height = 0;
	soundBar.addEventListener("click", function() {
		var valueHeight = soundBar.getBoundingClientRect().bottom - getMousePoint();
		soundPoint.style.height = valueHeight + "px";
		var height = soundBar.getBoundingClientRect().height;
		var i = valueHeight / height * 0.6;
		music.volume = i;
	})

	//播放或者暂停音乐
	var flag = 1;

	//初始化歌词字幕信息
	function loadLyrics() {
		lyrics.initParamter();
		$(".show-lyrics").empty();
		lyricsIndex = 0;
		lyricsTop = 120;
		$(".show-lyrics").css("top", "120");
		lyrics.getText(function() {
			$.each(lyrics.lyrics, function(index, ele) {
				$(".show-lyrics").append($("<li>" + ele + "</li>"));
			});
		});
	}

	//切换歌曲
	function changeMusic(n) {
		clearInterval(timeS);
		$("#music-title").empty();
		$(".music-showTitle").empty();
		n = player.isOutOfMusicListIndex(n);
		player.loadMusic(musicListName[n]);
		if(isPlay) {
			creatTimeS();
			music.play();
		}
		imgPlay(n);
		lyrics.path = "./source/" + musicListName[n] + ".txt";
		loadLyrics();
		musicTitle.append(musicListName[n]);
		$(".music-showTitle").get(0).append(musicListName[n]);
		showTime(n);
	}

	//背景图的切换
	function imgPlay(n) {
		imgWrap.style.left = -n * width + "px";
		$(".right-music-mask_bg").css("background", "url(img-player/" + musicListName[n] + ".png) no-repeat");
		$(".right-music-mask_bg").css("background-size", "cover");
	}

	var lyricsIndex = 0;
	var lyricsTop = 120;
	music.ontimeupdate = function() {
		$("#music-playTime").empty();
		$(".music-showTime").find("span").get(0).innerHTML = "";
		var str = "已播放时间:" + parseInt(music.currentTime / 60) + "分" + parseInt(music.currentTime % 60) + "秒";
		if(parseInt(music.currentTime % 60) < 10) {
			var str2 = parseInt(music.currentTime / 60) + ":0" + parseInt(music.currentTime % 60);
		} else {
			var str2 = parseInt(music.currentTime / 60) + ":" + parseInt(music.currentTime % 60);
		}
		$(".music-showTime").find("span").get(0).append(str2);
		if(Math.abs(lyrics.times[lyricsIndex] - music.currentTime) < 0.25) {
			lyricsTop = lyricsTop - 40;
			var str2 = lyricsTop + "px";
			$(".show-lyrics").css("top", str2);
			$(".show-lyrics").find("li").get(lyricsIndex).className = "on";
			lyricsIndex++;
		}
		playTime.append(str);
		if(player.isEndMusic()) {
			setModelNumber(n, model);
			changeMusic(n);
		};
	}

	function showAllTime() {
		$("#music-time").empty();
		var time = music.duration;
		var str = "总时间:" + parseInt(time / 60) + "分" + parseInt(time % 60) + "秒";
		musicTime.append(str);
		var str2 = parseInt(time / 60) + ":" + parseInt(time % 60);
		$(".music-showTime").find("span").get(2).innerHTML = "";
		$(".music-showTime").find("span").get(2).append(str2);
	}

	function showTime(n) {
		music.oncanplay = function() {
			showAllTime();
		}
	}
})