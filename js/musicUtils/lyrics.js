(function(window){
	function Lyrics(){
		return Lyrics.prototype.init();
	}
	Lyrics.prototype={
		constructor:Lyrics,
		times:[],
		lyrics:[],
		path:null,
		init:function(){
		},
		initParamter:function(){
			this.times=[];
			this.lyrics=[];
		},
		parseLyrics:function(data){
			var $this=this;
			var array=data.split("\n");
			var arrayReg=/\[(\d*:\d*\.\d*)\]/;
			var arrayReg2=/[^(\[\d*:\d*\.\d*\])]\D*/;		
			$.each(array, function(index,ele) {
				var res=arrayReg.exec(ele);
				if(res==null){
					return true;
				}
				var time=res[1];
				var min=time.split(":")[0];
				var second=time.split(":")[1];
				var minS=parseInt(min)*60;
				
				var seconds=Number(minS+parseFloat(second)).toFixed(2);				
				var lyricsText=arrayReg2.exec(ele)[0];
				
				$this.times.push(parseFloat(seconds));
				$this.lyrics.push(lyricsText);							
			});				
		},
		getText:function(callBack){
			var a=this;
			$.ajax({
				url:a.path,
				dataType:"text", 
			    success:function(data){
			    	a.parseLyrics(data);
			    	callBack();
			    }
			});
	   },
		
	}	
	Lyrics.prototype.init.prototype=Lyrics.prototype;
	window.Lyrics=Lyrics;
})(window);
