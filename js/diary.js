var timeArray = document.getElementsByClassName("time");
var togetherTime = new Date("2018/8/4 00:00");

var monthTable=document.getElementById("monthTable");

var tableTdArray=monthTable.getElementsByTagName("span");

var calendarMonth=document.getElementById("calendar-month");
var calendarYear=document.getElementById("calendar-year");

var addMonthButton=document.getElementById("add-month");
var reduceMonthButton=document.getElementById("reduce-month");

var addYearButton=document.getElementById("add-year");
var reduceYearButton=document.getElementById("reduce-year");

var month=document.getElementsByClassName("time-logo-top-split");
var monthDate=document.getElementsByClassName("time-logo-bottom-split");



var currentTime=new Date();
showTableDays(getMonthDays(currentTime.getFullYear(),currentTime.getMonth()+1),currentTime.getFullYear(),currentTime.getMonth()+1,currentTime.getDate());

/*var hasDiaryDayList={
	'0':15,
	'1':16,
	'2':18
};

function setHasDiaryDay(){

	for(var i=0;i<3;i++)
	{
		tableTdArray[hasDiaryDayList[i]].className+="hasDiaryDay";
	}
}*/

function showMonthAndDate(){
	month[0].innerHTML=getMonthByChinese(calendarMonth.innerHTML);

	 var activeDay=document.getElementsByClassName("activeDay")[0];
	 /*console.log(activeDay.innerHTML);*/
	
	monthDate[0].innerHTML=activeDay.innerHTML;

}


function monthButton(n,m,y){
	
	clearTableDays();
	var year=parseInt(calendarYear.innerHTML)+y;
	var day=currentTime.getDate();
	
	calendarMonth.innerHTML=n;	
	showTableDays(getMonthDays(year,n+m),year,n,day);
	showMonthAndDate();
}

addMonthButton.onclick=function(){
    var n=getMonthByEnglish(calendarMonth.innerHTML)+2;
    
    var y=0;
    if(n-1>currentTime.getMonth() && calendarYear.innerHTML==currentTime.getFullYear())
    {
    	n=n-1;
    	
    }
    if(n==13)
    {
    	n=1;
    	y=1;
    }
/*    console.log(n);*/
	monthButton(n,1,y);
	 pathConditions();
}

reduceMonthButton.onclick=function(){
	var n=getMonthByEnglish(calendarMonth.innerHTML);	
	var y=0;
	if(n==0)
	{
		n=12;
		y=-1;
	}	
	monthButton(n,-1,y);
   pathConditions();
}

addYearButton.onclick=function(){
	var n=getMonthByEnglish(calendarMonth.innerHTML)+1;
	var year=parseInt(calendarYear.innerHTML);
	var y=1;
/*    console.log(year-currentTime.getFullYear());
    console.log(n-1);*/
	if(year+1>currentTime.getFullYear() || (year-currentTime.getFullYear()==-1 && n>currentTime.getMonth()+1))
	{
		y=0;
	}
	monthButton(n,0,y);	
	 pathConditions();
}

reduceYearButton.onclick=function(){
	var n=getMonthByEnglish(calendarMonth.innerHTML)+1;
	var year=calendarYear.innerHTML;
	var y=-1;
	monthButton(n,0,y);
	 pathConditions();
}

function showTableDays(n,year,month,day){
	
	var currentStandardTime=getInstanceDate(year,month,day);
	/*console.log(currentStandardTime);*/

	calendarMonth.innerHTML=getMonthByEnglish(currentStandardTime.getMonth());
	calendarYear.innerHTML=currentStandardTime.getFullYear();
	
    var endIndex;
	if(currentStandardTime.getMonth()+1==12)
	{
		endIndex=6*7-(7-returnDay(year+1,0,day));
	}
	
	endIndex=6*7-(7-returnDay(year,currentStandardTime.getMonth()+1,day));
	/*console.log(endIndex);*/


	var n=getMonthDays(currentStandardTime.getFullYear(),currentStandardTime.getMonth());
	
	for(var i=endIndex;i>endIndex-getMonthDays(currentStandardTime.getFullYear(),currentStandardTime.getMonth());i--)
	{
		tableTdArray[i-1].innerHTML=n;
		if(n==currentStandardTime.getDate())
		{	
		  setActiveDay(tableTdArray[i-1]);
		}
		
		n--;
	}	
}
/*setHasDiaryDay();*/
function getPagesPath(month,day){
	
	/*console.log(month);
	console.log(day);*/
	var str="diray-pages/diary";
	str=str+month+"-"+day+".html";
	
	return str;
	
}

function loadPages(path){
	
	$("#load-diary").load(path);
}

for(var i=0;i<tableTdArray.length;i++)
{
	(function(n){
		tableTdArray[n].addEventListener('click',function(){
			
			setActiveDay(tableTdArray[n]);
			showMonthAndDate();
			pathConditions();
          
		
	})
	})(i);	
}

function pathConditions(){
	  /*console.log(n);*/
           var activeDay=document.getElementsByClassName("activeDay")[0].innerHTML;
          /* console.log(activeDay);*/
         var str;
         console.log(getMonthByEnglish(calendarMonth.innerHTML)+1);
           if((activeDay==16 || activeDay==18 || activeDay==15 || activeDay==19 || activeDay==7 || activeDay==12 || activeDay==9) && getMonthByEnglish(calendarMonth.innerHTML)+1===11 && calendarYear.innerHTML==currentTime.getFullYear())
           {
           	 str=getPagesPath(getMonthByEnglish(calendarMonth.innerHTML)+1,activeDay); 
           } 
          
            
            else
           {
           	  str=getPagesPath(13,32);
           }  
         /*  console.log(str);*/
            loadPages(str);
}

showMonthAndDate();

loadPages(getPagesPath(getMonthByEnglish(calendarMonth.innerHTML)+1,document.getElementsByClassName("activeDay")[0].innerHTML));

function setActiveDay(preparedDay){
	var activeDay=document.getElementsByClassName("activeDay")[0];
			if(activeDay!==undefined){
				activeDay.className="";
			/*	setHasDiaryDay();*/
			}		
			preparedDay.className+="activeDay";
}

function returnDay(year,month,day)
{ 
	/*console.log(month-1);
	console.log(getMonthDays(year,month-1));*/

	var monthEndDay=getInstanceDate(year,month,getMonthDays(year,month-1));
	/*console.log(monthEndDay.getDay());*/
	if(monthEndDay.getDay()==0){
		return 7;
	}
		return monthEndDay.getDay();
}

function getInstanceDate(year,month,day){
	var str=year+"/"+month+"/"+day;
	return new Date(str);
}


function keepDouble(time) {
	if(time < 10) {
		return "0" + time;
	}
	return time;
}


function getMonthDays(year, month) {

	switch(month) {
		case 0:
			return 31;
		case 1:
			if(year % 4 == 0 && year % 400 == 0) {
				return 29;
			} else {
				return 28;
			}
		case 2:
			return 31;
		case 3:
			return 30;
		case 4:
			return 31;
		case 5:
			return 30;
		case 6:
			return 31;
		case 7:
			return 31;
		case 8:
			return 30;
		case 9:
			return 31;
		case 10:
			return 30;
		case 11:
			return 31;
	}
}


function clearTableDays(){
	for(var i=0;i<tableTdArray.length;i++)
	{
		tableTdArray[i].innerHTML="";
	}
}



function getMonthByEnglish(month){
	switch(month){
		case 0:
		return "January";
		case 1:
		return "February";
		case 2:
		return "March";
		case 3:
		return "April";
		case 4:
		return "May";
		case 5:
		return "June";
		case 6:
		return "July";
		case 7:
		return "August";
		case 8:
		return "September";
		case 9:
		return "October";
		case 10:
		return "November";
		case 11:
		return "December";
		case "January":
		return 0;
		case "February":
		return 1;
		case "March":
		return 2;
		case "April":
		return 3;
		case "May":
		return 4;
		case "June":
		return 5;
		case "July":
		return 6;
		case "August":
		return 7;
		case "September":
		return 8;
		case "October":
		return 9;
		case "November":
		return 10;
		case "December":
		return 11;
		
		
	}
}

function getMonthByChinese(month){
	switch(month){
		case "January":
		return "一月";
		case "February":
		return "二月";
		case "March":
		return "三月";
		case "April":
		return "四月";
		case "May":
		return "五月";
		case "June":
		return "六月";
		case "July":
		return "七月";
		case "August":
		return "八月";
		case "September":
		return "九月";
		case "October":
		return "十月";
		case "November":
		return "十一月";
		case "December":
		return "十二月";
		
	}
}


setInterval(function() {
	updateTime();
}, 1000);

function updateTime() {

	var i = 0;
	var nowTime = new Date();

	var time = nowTime - togetherTime;

	var spanDays = Math.floor(time / (1000 * 60 * 60 * 24));
	time = time - spanDays - spanDays * (1000 * 60 * 60 * 24);
	spanDays = keepDouble(spanDays);
	timeArray[i].innerHTML = spanDays + "天";
	i++;

	var spanHours = Math.floor(time / (1000 * 60 * 60));
	time = time - spanHours * (1000 * 60 * 60);
	spanHours = keepDouble(spanHours);
	timeArray[i].innerHTML = spanHours + "时";
	i++;

	var spanMinutes = Math.floor(time / (1000 * 60));
	time = time - spanMinutes * (1000 * 60);
	spanMinutes = keepDouble(spanMinutes);
	timeArray[i].innerHTML = spanMinutes + "分";
	i++;

	var spanSeconds = Math.floor(time / (1000));
	spanSeconds = keepDouble(spanSeconds);
	timeArray[i].innerHTML = spanSeconds + "秒";

}
