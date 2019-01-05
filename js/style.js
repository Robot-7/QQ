var nowLeft = document.getElementById("container4-wrap-middle");

var rightButton = document.getElementById("container4-rightButton");
var leftButton = document.getElementById("container4-leftButton");

var indexButton = document.getElementsByClassName("notactive");
var wrap = document.getElementById("container4-wrap");

rightButton.onclick = function() {
	Slide(1);
}

function Slide(n)
{
	var j=returnActive();
	
	if(n+j<0 || n+j>7)
	{
		j=7-j-n;
		for(var i=0;i<8;i++)
		{
			moveImage(-n);
		}

	}

	moveImage(n);
	
	indexButtonChange(n+j);
	
}

leftButton.onclick = function(n) {
	
	
  Slide(-1);

}

function indexButtonChange(n)
{
	var activeIndexButton=document.getElementsByClassName("active notactive")[0];
	
	activeIndexButton.className="notactive";
			
	indexButton[n].className="active notactive";
	
}

function returnActive()
{
	for(var j=0;j<indexButton.length;j++)
			{
				if(indexButton[j].className=="active notactive")
				{
					break;
				}
				
			}
			return j;
}

for(var i = 0; i < indexButton.length; i++) {
	(function(n) {
		
		    indexButton[n].onmouseover = function() {
									
			var j=returnActive();
			
			console.log(j);
			
			indexButtonChange(n);
				
		    moveImage(n-j);
				
		};
	})(i);

}
var now=0;
function moveImage(n) {

	var Leftwidth = wrap.getBoundingClientRect().left;
	var allWidth = document.body.clientWidth;


	now = now - (allWidth - 2 * Leftwidth) * n;
	nowLeft.style.left = now + "px";

}

var time;

play();
function play(){
	time=setInterval(function(){
	Slide(1);	
},3000)
}

wrap.onmouseover=function(){
	clearInterval(time);
	console.log(1);
	
};

wrap.onmouseout=function(){
	play();
}
