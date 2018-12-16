(function(window) {
	function Progress($progressBar, $progressLine, $progressPoint) {
		return new Progress.prototype.init($progressBar, $progressLine, $progressPoint);
	}
	Progress.prototype = {
		constructor: Progress,
		value: 0,
		init: function($progressBar, $progressLine, $progressPoint) {
			this.$progressBar = $progressBar;
			this.$progressLine = $progressLine;
			this.$progressPoint = $progressPoint;
			this.progressBar = $progressBar[0];
			this.progressLine = $progressLine[0];
			this.progressPoint = $progressPoint[0];
		},
		progressClick: function(music) {
			var $this=this;
			this.$progressBar.click(function() {
				$this.$progressLine.width(event.clientX - $(this).offset().left-($this.$progressPoint.width()/2));
				$this.$progressPoint.css("left", event.clientX - $(this).offset().left-($this.$progressPoint.width()/2));
				$this.setProgressValue();
				console.log(music.duration);
				console.log($this.value);
				console.log($this.value.toFixed(2)*music.duration);
				music.play();
			
			music.ontimeupdate=function(){
				music.currentTime=$this.value*music.duration/60;
			}
			
				console.log(music.currentTime);
				
				/*console.log($this.value);*/
			})
		},
		setProgressValue:function(){
			this.value=this.$progressLine.width()/this.$progressBar.width();
		},
		setFollowProgress:function(){
			this.$progressLine.css("width",this.value*100+"%");
			this.$progressPoint.css("left",this.value*100+"%")
		}
		
	}
	Progress.prototype.init.prototype = Progress.prototype;
	window.Progress = Progress;
})(window);