var p = document.getElementById("second-area-item2-p");
var afterP = document.getElementById("counts");

var wrap = document.getElementById("second-item2-wrap");

var rightButton = document.getElementById("wrap-rightButton");
var leftButton = document.getElementById("wrap-leftButton");



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
		p.style.left = left + "px";
		p.style.color = "#FF0000";

		afterP.style.right = left + "px";
		afterP.style.color = "#FF0000";
	} else {
		p.style.left = 0 + "px";
		p.style.color = "blueviolet";
		afterP.style.right = 0;
		afterP.style.color = "blueviolet";
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

	var rightWide = item1.getBoundingClientRect().right;

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