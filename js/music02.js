$(function() {

	var music = document.getElementById("music");
	
	
	var soundBar = document.getElementById("sound-bar");
	var soundPoint = document.getElementById("sound-point");

	var musicImg = document.getElementById("music-img");

	var img = document.getElementById("music-photo");
	var imgWrap = document.getElementById("wrap-photo");

	var musicListName = {
		'0': '绅士',
		'1': '光年之外',
		'2': '生僻字',
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
	$("#music-title").children("span").append(musicListName[n]);
/*	musicTitle.append(musicListName[n]);*/

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

	function setModelNumber() {
		if(model == 0) {
			n++;
		} else if(model == 1) {
			n = Math.ceil(Math.random() * 7);
		} else{
			
		}
	}
	
	function continuePlayMusic(){
		isPlay=true;	
		isChangeMusicByClickLi(n);		
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
	
	function isContinuePlayMusicByManualOrAutomatic(pattern){
		//自动切换音乐
		if(pattern==1){
			setModelNumber();
		}	
	}
	
	function isChangeMusicByClickLi(index,pattern){
		    isContinuePlayMusicByManualOrAutomatic(pattern);
		    
		    console.log(n);
		    console.log(index-1);
			if(n != index - 1) {
				$(".list-li").get(n).getElementsByTagName("span")[1].className = "glyphicon glyphicon-play";
				$(".list-li").get(n).getElementsByTagName("div")[1].className = "list-play-button";
				$(".list-li").get(index - 1).getElementsByTagName("div")[1].className = "list-play-button active-list-play-button";
				n = index - 1;
				imgPlay(n);
				changeMusic();
			} else {
				playOrStopMusic(n);
				if(isPlay == false) { 
					$($("ul").find(".list-li").get(n).children[0].children[1].children[0].children[0]).removeClass("glyphicon glyphicon-play");
					$($("ul").find(".list-li").get(n).children[0].children[1].children[0].children[0]).addClass("glyphicon glyphicon-pause");
				} else {
					$($("ul").find(".list-li").get(n).children[0].children[1].children[0].children[0]).removeClass("glyphicon glyphicon-pause");
					$($("ul").find(".list-li").get(n).children[0].children[1].children[0].children[0]).addClass("glyphicon glyphicon-play");			
				}
			}	
	}
	
	function isChangeMusicByClickButton(){
		if(isPlay == true) {
			$("#play-button").find("span").removeClass("glyphicon glyphicon-play");
			$("#play-button").find("span").addClass("glyphicon glyphicon-pause");
		} else {
			$("#play-button").find("span").removeClass("glyphicon glyphicon-pause");
			$("#play-button").find("span").addClass("glyphicon glyphicon-play");
		}
		playOrStopMusic(n);		
	}

	$(".list-li").mouseenter(function() {
		var index = $(this).index();
		$(this).find(".list-play-button").css("display", "block");
		$(this).find(".list-play-music").click(function() {
			//手动切换歌曲
			isChangeMusicByClickLi(index,0);
		})
	})

	$("#play-button").click(function() {
		isChangeMusicByClickButton();
	})

	function isPlayPromise(playPromise) {
		if(playPromise) {
			playPromise.then(() => {
				//音频加载成功
				//音频播放需要耗时
				setTimeout(() => {
					//后续操作
				}, music.duration * 1000);
			}).catch((e) => {

			});
		}

	}

	function playOrStopMusic(n) {
		if(isPlay) {
			var playPromise;
			
			$("#music-title").children("span").empty();
			$("#music-title").children("span").append(musicListName[n]);
			
			playPromise = music.play();
			isPlayPromise(playPromise);
			
			setFollowProgress();			
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
	
	var toggle3=true;
	$("#sound-button").click(function(){
		if(toggle3){
			$("#sound-button").children("span").removeClass("glyphicon glyphicon-volume-up");
			$("#sound-button").children("span").addClass("glyphicon glyphicon-volume-off");
			toggle3=false;
		}
		else{
			$("#sound-button").children("span").removeClass("glyphicon glyphicon-volume-off");
			$("#sound-button").children("span").addClass("glyphicon glyphicon-volume-up");
			toggle3=true;
		}
	})

	$(".list-li").mouseleave(function() {
		$(this).find(".list-play-button").css("display", "none");
	})

	$("#next-button").click(function() {
		n++;		
		changeMusic();
	})

	$("#last-button").click(function() {
		n--;
		changeMusic();
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
				$(".show-lyrics").append($("<li><span>" + ele + "</span></li>"));
				$($(".show-lyrics").find("li").get(index).children[0]).addClass("on");
			});
		});
	}

	//切换歌曲
	function changeMusic() {
		var playPromise;
		clearInterval(timeS);
		$("#music-title").children("span").empty();
		$(".music-showTitle").empty();
		n = player.isOutOfMusicListIndex(n);	
		player.loadMusic(musicListName[n]);
		if(isPlay) {
			creatTimeS();
			playPromise = music.play();
			isPlayPromise(playPromise);
		}
		imgPlay(n);
		lyrics.path = "./source/" + musicListName[n] + ".txt";
		loadLyrics();
		$("#music-title").children("span").append(musicListName[n]);
		$(".music-showTitle").get(0).append(musicListName[n]);
		showTime(n);
	}

	//背景图的切换
	function imgPlay(n) {
		var str;
		imgWrap.style.left = -n * width + "px";
		if(n < 10) {
			str = "0" + (n+1);
		} else {
			str = "" + (n+1);
		}
		$(".right-music-mask_bg").css("background", "url(img-player/p" + str + ".png) no-repeat");
		$(".right-music-mask_bg").css("background-size", "cover");
	}

	var lyricsIndex = 0;
	var lyricsTop = 120;

	music.ontimeupdate = function() {
		
		$("#music-playTime").children("span").empty();
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
			$($(".show-lyrics").find("li").get(lyricsIndex).children[0]).removeClass("on");
			lyricsIndex++;
		}
		if(music.currentTime == music.duration) {
			    continuePlayMusic();
		}
		$("#music-playTime").children("span").append(str);
	}

	function showAllTime() {	
		var time = music.duration;
		var str = "总时间:" + parseInt(time / 60) + "分" + parseInt(time % 60) + "秒";
		$("#music-time").children("span").empty();
		$("#music-time").children("span").append(str);
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