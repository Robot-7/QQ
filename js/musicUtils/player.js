(function(window) {
	function Player($music) {
		return new Player.prototype.init($music);
	}
	Player.prototype = {
		constructor: Player,
		init: function($music) {
			this.$music = $music;
			this.music = $music.get(0);
			this.music.volume = 20 / 80 * 0.6;	
		},
		setCurrentTime: function(value) {
			console.log(value);
			this.music.currentTime = value * this.music.duration;
			console.log(this.music.currentTime);
		},
		loadMusic: function(name) {
			var src = "music/" + name + ".mp3";
			this.$music.attr('src', src);
			this.music.load();
		},
		isEndMusic: function() {
			if(this.music.currentTime == this.music.duration) {
				return true;
			}
		},
		isOutOfMusicListIndex: function(n) {
			if(n > 8) {
				n = 0;
			}
			if(n < 0) {
				n = 8;
			}
			return n;
		},
	}
	Player.prototype.init.prototype = Player.prototype;
	window.Player = Player;
})(window);