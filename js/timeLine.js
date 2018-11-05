var liList = document.getElementsByClassName("wrap-list");

var contentList = document.getElementsByClassName("wrap-content");

var triangleList = document.getElementsByClassName("triangle");

var line = document.getElementById("wrap-middle");

var data1=document.getElementById("time-show1");
var data2=document.getElementById("time-show2");

var wrapUl=document.getElementById("wrap-ul");
var now = 0;



for(var i = 0; i < liList.length; i++) {
	now = now + 120;
	liList[i].style.top = now + "px";
}

for(var i = 0; i < liList.length; i++) {
	(function(n) {

		liList[n].onmouseover = function() {

			var activeContent = document.getElementsByClassName("wrap-showContent")[0];

			var activeTriangle = document.getElementsByClassName("wrap-showTriangle")[0];

			var activeLi = document.getElementsByClassName("wrap-showList")[0];

			activeContent.className = "wrap-content";

			activeTriangle.className = "triangle";

			activeLi.className = "wrap-list";

			console.log(n);
			
			if(n<3)
			{
				data1.style.opacity=1;
				data2.style.opacity=0;
			}
			
			if(n>=4)
			{
				data1.style.opacity=0;
				data2.style.opacity=1;
			}

			liList[n].className = "wrap-list wrap-showList";

			contentList[n].className = "wrap-content wrap-showContent";

			triangleList[n].className = "triangle wrap-showTriangle";

		}

	})(i);
}

$(window).scroll(function(){
		var htmlHeight=$(document).height();
		
		var windowHeight=$(window).height();
		
		var scorllTop=$(document).scrollTop();
		
		
	
})
