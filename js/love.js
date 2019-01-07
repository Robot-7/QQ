var p = document.getElementById("second-area-item2-p");
var afterP = document.getElementById("counts");

var wrap = document.getElementById("second-item2-wrap");

var rightButton = document.getElementById("wrap-rightButton");
var leftButton = document.getElementById("wrap-leftButton");

var wrap2=document.getElementById("second-area-item2-wrap");



var Indexbtn=document.getElementsByClassName("not-active");
var secondItem2=document.getElementById("second-area-item2-leftId");


$("#nav").load("htmlTop.html");

for(var i = 0; i < Indexbtn.length; i++) {
	(function(n) {
		Indexbtn[n].onmouseover = function() {

			var activeIndexbtn = document.getElementsByClassName("active")[0];
			activeIndexbtn.className = "not-active";
			Indexbtn[n].className = "active not-active";
	
			movePhoto(n);
		};
	})(i);
}

function movePhoto(n)
{
	var topHeight=secondItem2.getBoundingClientRect().top;
	var bottomHeight=secondItem2.getBoundingClientRect().bottom;
	var Height=bottomHeight-topHeight;
	wrap2.style.top=(-Height)*n+"px";
}

var flag = 1;

p.onmouseover = function() {
	moveP(flag);
    console.log(flag);
}

afterP.onmouseover = function() {
	moveP(flag);
}

p.onmouseout = function() {
	
	changeFlag();	
}

function changeFlag()
{
	flag = flag * (-1);

}

afterP.onmouseout = function() {
	changeFlag();

}

function moveP(flag) {
	if(flag == 1) {
		var nowLeft = p.style.left;
		var left = p.getBoundingClientRect().left;
		left=left/3;
		p.style.left = left + "px";
		p.style.color = "#FF0000";
		p.style.transition="all 1s";

		afterP.style.right = left + "px";
		afterP.style.color = "#FF0000";
		afterP.style.transition="all 1s";
	} else {
		p.style.left = 0 + "px";
		p.style.color = "blueviolet";
		p.style.transition="all 1s";
		afterP.style.right = 0;
		afterP.style.color = "blueviolet";
		afterP.style.transition="all 1s";
	}
}

rightButton.onclick = function() {

	Slide(-1);

}

leftButton.onclick = function() {

	Slide(1);

}

var now = 0;

function Slide(n) {
	var item1 = document.getElementById("second-area-itemId");
	var item2= document.getElementById("item2-photo");
	

	var rightWide = item2.getBoundingClientRect().right;
	var leftWide=item2.getBoundingClientRect().left;
    rightWide=(rightWide-leftWide)/3;

	now = now + rightWide * n;

	if(now > 0 || now < -6 * rightWide) {
		now = now - rightWide * n;

	}

	wrap.style.left = now + "px";

}

wrap.addEventListener("mouseover", function() {

	clearInterval(time);
});

wrap.addEventListener("mouseout", function() {

	play();
});

play();

var n = 0;
var flag3 = -1;

function play() {
	time = setInterval(function() {

		n++;
		if(n % 7 == 0) {
			n = n / 7;
			flag3 = flag3 * (-1);
		}
		Slide(flag3);

	}, 2000);

}