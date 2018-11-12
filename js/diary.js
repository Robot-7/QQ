var timeArray = document.getElementsByClassName("time");
var togetherTime = new Date("2018/8/4 00:00");

var monthTable=document.getElementById("monthTable");
var tableTdArray=monthTable.getElementsByTagName("td");

var calendarMonth=document.getElementById("calendar-month");
var calendarYear=document.getElementById("calendar-year");

/*var addMonthButton=document.getElementById("add-month");
var reduceMonthButton=document.getElementById("reduce-month");

addMonthButton.onclick=function(){
	clearTableDays();
	var n=parseInt(calendarMonth.innerHTML);
	calendarMonth.innerHTML=n;	
	n=n+1;
	showTableDays(getMonthDays(currentTime.getFullYear(),n+1),currentTime.getFullYear(),n,currentTime.getDate());
}

reduceMonthButton.onclick=function(){
	clearTableDays();
	var n=parseInt(calendarMonth.innerHTML);
	n=n-1;
	calendarMonth.innerHTML=n;
	showTableDays(getMonthDays(currentTime.getFullYear(),n-1),currentTime.getFullYear(),n,currentTime.getDate());
}
*/
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

function keepDouble(time) {
	if(time < 10) {
		return "0" + time;
	}
	return time;
}


function getMonthDays(year, month) {

	switch(month) {
		case 1:
			return 31;
		case 2:
			if(year % 4 == 0 && year % 400 == 0) {
				return 29;
			} else {
				return 28;
			}
		case 3:
			return 31;
		case 4:
			return 30;
		case 5:
			return 31;
		case 6:
			return 30;
		case 7:
			return 31;
		case 8:
			return 31;
		case 9:
			return 30;
		case 10:
			return 31;
		case 11:
			return 30;
		case 12:
			return 31;
	}
}

var currentTime=new Date();
showTableDays(getMonthDays(currentTime.getFullYear(),currentTime.getMonth()+1),currentTime.getFullYear(),currentTime.getMonth()+1,currentTime.getDate());


function clearTableDays(){
	for(var i=0;i<tableTdArray.length;i++)
	{
		tableTdArray[i].innerHTML="";
	}
}

function showTableDays(n,year,month,day){
	
	var currentStandardTime=getInstanceDate(year,month,day);
	console.log(currentStandardTime);

	calendarMonth.innerHTML=getMonthByEnglish(currentStandardTime.getMonth());
	calendarYear.innerHTML=currentStandardTime.getFullYear();
	
	var endIndex=5*7-(7-returnDay(year,currentStandardTime.getMonth()+1,day));

			
	for(var i=endIndex;i>endIndex-getMonthDays(currentStandardTime.getFullYear(),currentStandardTime.getMonth()+1);i--)
	{
		tableTdArray[i-2].innerHTML=n;
		if(n==currentStandardTime.getDate())
		{
			tableTdArray[i-2].className="activeDay";
		}
		n--;
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
		
		
	}
}

function returnDay(year,month,day)
{
	var monthEndDay=getInstanceDate(year,month,getMonthDays(year,month+1));
	return monthEndDay.getDay();
}

function getInstanceDate(year,month,day){
	var str=year+"/"+month+"/"+day;
	return new Date(str);
}
