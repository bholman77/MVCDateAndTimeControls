/*
		Author: Dung Harry
		Date created: 26th, February 2016
		Programming language: Javascrip programming language

		Description: this is a program about how to create a time picker in Jav$
*/

function createTimePicker(select, startTime, endTime, stepDuration, disableBegin, disableEnd) {
	var hourBegin;
	var minuteBegin;
	var hourEnd;
	var minuteEnd;
	var disableHourBegin;
	var disableMinuteBegin;
	var disableHourEnd;
	var disableMinuteEnd;
	var splitIndex;
	var numElements;
	var text;

	splitIndex = startTime.indexOf(":");

	if (splitIndex != -1) {
		hourBegin = parseInt(startTime.substr(0, splitIndex), 10);
		minuteBegin = parseInt(startTime.substr(splitIndex + 1, startTime.length - 1), 10);
	} else {
		hourBegin = parseInt(startTime, 10);
		minuteBegin = 0;
	}

	splitIndex = endTime.indexOf(":");

	if (splitIndex != -1) {
		hourEnd = parseInt(endTime.substr(0, splitIndex), 10);
		minuteEnd = parseInt(endTime.substr(splitIndex + 1, endTime.length - 1), 10);
	} else {
		hourEnd = parseInt(endTime, 10);
		minuteEnd = 0;
	}

	splitIndex = disableBegin.indexOf(":");

	if (splitIndex != -1) {
		disableHourBegin = parseInt(disableBegin.substr(0, splitIndex), 10);
		disableMinuteBegin = parseInt(disableBegin.substr(splitIndex + 1, disableBegin.length - 1), 10);
	} else {
		disableHourBegin = parseInt(disableBegin, 10);
		disableMinuteBegin = 0;
	}

	splitIndex = disableEnd.indexOf(":");

	if (splitIndex != -1) {
		disableHourEnd = parseInt(disableEnd.substr(0, splitIndex), 10);
		disableMinuteEnd = parseInt(disableEnd.substr(splitIndex + 1, disableEnd.length - 1), 10);
	} else {
		disableHourEnd = parseInt(disableEnd, 10);
		disableMinuteEnd = 0;
	}

	if (stepDuration <= 0 || stepDuration >= 60)
		stepDuration = 30;

	numElements = Math.ceil(((hourEnd - hourBegin) * 60 + (minuteEnd - minuteEnd)) / stepDuration);

	text = "";

	for (var i = 0; i < numElements; i++) {
		var hourInMinute = i * stepDuration;
		var hour = Math.floor(hourInMinute / 60);
		var minute = hourInMinute - hour * 60;

		hour += hourBegin;
		minute += minuteBegin;

		if (minute >= 60) {
			hour++;
			minute -= 60;
		}

		if (hour > hourEnd) {
			hour = hourEnd;
			minute = minuteEnd;
		} else if (hour == hourEnd && minute > minuteEnd)
			minute = minuteEnd;

		var time = "" + hour + ":" + (minute == 0 ? "00" : minute);

		if ((hour > disableHourBegin && hour < disableHourEnd) || (hour == disableHourBegin && minute >= disableMinuteBegin) || (hour == disableHourEnd && minute <= disableMinuteEnd))
			text += "<option value=\"" + time + "\" disabled>" + time + "</option>";
		else
			text += "<option value=\"" + time + "\">" + time + "</option>";
	}

	select.innerHTML = text;
}

var selectTag = document.getElementById("myPicker");
var selectTag1 = document.getElementById("myPicker2");
createTimePicker(selectTag, "6:00", "17:26", 30, "4:00", "12:00");
createTimePicker(selectTag1, "6:00", "17:26", 30, "4:00", "12:00");

selectTag.onchange = function () {
	var divTag = document.getElementById("mySpan");
	divTag.innerHTML = selectTag.value;
}

