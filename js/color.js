$(function(){
		//一、二级菜单的背景颜色
	var baseLiBackground={
		'0':'#5FD9CD',
		'1':'#4CB4E7',
		'2':'#9DD3FA',
		'3':'#1CDDB1',
		'4':'#B3ADE9',
		'5':'#FFCBD4',
		'6':'#FF9AB5',
		
	}
	
	//一、二级菜单的字体颜色
	var baseSpanColor={
		'0':'#008B8B',
		'1':'white',
		'2':'#1F6FB5',
		'3':'#D2F557',
		'4':'#D5C9F9',
		'5':'#9F605B',
		'6':'#F8F9C2',
	}
	
	//一级菜单的背景颜色(hover)
	var activeLiBackgroundList01={
		'0':'#B8FFB8',
		'1':'#FFEE93',
		'2':'#FCD692',
		'3':'#04DD98',
		'4':'#BDD9FC',
		'5':'#B79E97',
		'6':'#FFDBE8',
	}
	
	//一级菜单的字体颜色(hover)
	var activeSpanColorList01={
		'0':'#008B8B',
		'1':'#4CB4E7',
		'2':'#FAFFEB',
		'3':'#F2FE28',
		'4':'#EEFFC6',
		'5':'#FFCBD4',
		'6':'#CF2782',
	}
	
	//二级菜单的背景颜色(hover)
	var activeLiBackgroundList02={
		'0':'#EAF786',
		'1':'#FFC09F',
		'2':'#1F6FB5',
		'3':'#D2F557',
		'4':'#B0FEFB',
		'5':'#B79E97',
		'6':'#CF2782',
	}
	
	//二级菜单的字体颜色(hover)
	var activeSpanColorList02={
		'0':'#FFB5A1',
		'1':'#A3A380',
		'2':'#FCD692',
		'3':'#04DD98',
		'4':'#B3ADE9',
		'5':'white',
		'6':'#F8F9C2',
	}
	
	
	var n=Math.round(Math.random()*6);
	
	
	var formerLiBackground01=baseLiBackground[n];
	var formerSpanColor01=baseSpanColor[n];
	
	var activeLiBackground01=activeLiBackgroundList01[n];
	var activeSpanColor01=activeSpanColorList01[n];
	
	var activeLiBackground02=activeLiBackgroundList02[n];
	var activeSpanColor02=activeSpanColorList02[n];
	
    $("li").css("background", formerLiBackground01);
	$("span").css("color", formerSpanColor01);
	
	
	

	var firstLi = document.getElementsByClassName("first-child");
	var firstSpan = document.getElementsByClassName("first-span");
	
	setIndex(firstLi);
    setColor(firstLi[0], activeLiBackground01, firstSpan[0], activeSpanColor01);
	
	for(var i = 0; i < firstLi.length; i++) {

		firstLi[i].onmouseenter = function() {

			$("li").css("background", formerLiBackground01);
			$("span").css("color", formerSpanColor01);
			setColor(firstLi[this.index], activeLiBackground01, firstSpan[this.index], activeSpanColor01);

			var secondLi = firstLi[this.index].getElementsByTagName("li");
			var secondSpan = firstLi[this.index].getElementsByTagName("span");

			for(var i = 0; i < secondLi.length; i++) {

				(function(n) {

					secondLi[n].onmouseenter = function() {
						clearColor(secondLi,formerLiBackground01, secondSpan, formerSpanColor01);
						setColor(secondLi[n], activeLiBackground02, secondSpan[n + 1], activeSpanColor02);

					}
				})(i);
			}
		}
	}

	function clearColor(bList, bColor, tList, tColor) {
		for(var i = 0; i < bList.length; i++) {
			bList[i].style.background = bColor;
			tList[i + 1].style.color = tColor;
		}
	}

	function setColor(li, bColor, text, tColor) {
		li.style.background = bColor;
		text.style.color = tColor;
	}

	function setIndex(list) {
		for(var i = 0; i < list.length; i++) {
			list[i].index = i;
		}
	}
	/*  $("li").on("mouseover",function(){
	  	$("li").css("background","#00FFFF");
	  })*/

})
