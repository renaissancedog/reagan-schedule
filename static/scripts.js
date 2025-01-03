//have a great day!

//Time and Date classes - not my code
function Time(h, m) {
  this.hours = typeof h === 'number' && h >= 0 && h <= 23 ? h : 0;
  this.minutes = typeof m === 'number' && m >= 0 && m <= 59 ? m : 0;
}

Time.prototype = {
  valueOf: function () {
    return this.hours * 60 + this.minutes;
  },
  toString: function () {
    let hours = this.hours === 0 ? 12 : this.hours % 12 || 12;
    let minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    let ampm = this.hours < 12 ? 'AM' : 'PM';
    return `${hours}:${minutes} ${ampm}`;
  },
  isIn: function (start, end) {
    return this.valueOf() >= start.valueOf() && this.valueOf() < end.valueOf();
  },
  subtract: function (t) {
    let x = this.valueOf(),
      y = t.valueOf();
    return x - y + (x > y ? 0 : 24 * 60);
  }
};

Date.prototype.toString = function () {
  let hours = this.getHours();
  let minutes = this.getMinutes();
  let seconds = this.getSeconds();
  let ampm = hours < 12 ? 'AM' : 'PM';
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return `${hours}:${minutes}:${seconds} ${ampm}`;
};

import {
  sem1Dates,
  sem1Schedule,
  sem2Dates,
  sem2Schedule,
  sem3Dates,
  sem3Schedule,
  sem4Dates,
  sem4Schedule,
  erDates,
  erSchedule,
  strikeSchedule,
  regSchedule,
  lopezSchedule,
  holidayDates,
  assemblyDates,
  assemblySchedule
} from './schedules.js';
let suppressVacation = false;
let onBreak = false;
$('.toggle').click(function (e) {
  e.preventDefault();
  suppressVacation = !suppressVacation;
  toggleSchedule(!suppressVacation);
});
function updateSchedule(schedule) {
  for (let item of schedule) {
    let str = item.start.toString() + ' - ' + item.end.toString();
    $('#' + item.id + '>.time').html(str);
  }
}
function toggleSchedule(bool) {
  if (bool) {
    $('#mainDiv').hide();
    $('#breakDiv').show();
  } else {
    $('#mainDiv').show();
    $('#breakDiv').hide();
  }
  if (onBreak) {
    $('#backButton').show();
  } else {
    $('#backButton').hide();
  }
}
function updateTime(schedule) {
  let today = new Date();
  $('#clock').html(today.toString());
  updatePeriod(schedule);
  if (!suppressVacation) {
    vacation();
  }
}
function updatePeriod(schedule) {
  let today = new Date();
  let dow = today.getDay(); // day of week
  let currTime = new Time(today.getHours(), today.getMinutes());

  if (
    !currTime.isIn(schedule[0].start, schedule[schedule.length - 1].end) ||
    dow === 6 ||
    dow === 0
  ) {
    // If not during school
    for (let item of schedule) {
      if ($('#' + item.id).hasClass('info')) {
        $('#' + item.id).removeClass('info');
      }
    }

    $('#per').html('');
    $('#min-left').html('');
    let minutes = schedule[0].start.subtract(currTime);
    let hours = Math.floor(minutes / 60);
    minutes %= 60;

    // add 24 or 48 hours if on the weekend
    hours +=
      (dow === 5 &&
        currTime.valueOf() > schedule[schedule.length - 1].end.valueOf()) ||
      (dow === 6 && currTime.valueOf() < schedule[0].start.valueOf())
        ? 24 * 2
        : (dow === 6 && currTime.valueOf() > schedule[0].start.valueOf()) ||
            (dow === 0 && currTime.valueOf() < schedule[0].start.valueOf())
          ? 24
          : 0;
    if (minutes == 1 && hours == 1) {
      $('#until-school').html(`1 hour and 1 minute until school`);
    } else if (minutes == 1 && hours != 1) {
      $('#until-school').html(`${hours} hours and 1 minute until school`);
    } else if (minutes != 1 && hours == 1) {
      $('#until-school').html(`1 hour and ${minutes} minutes until school`);
    } else {
      $('#until-school').html(
        `${hours} hours and ${minutes} minutes until school`
      );
    }
  } else {
    // Updates current period if during school
    if ($('#until-school').html() != '') $('#until-school').html('');
    let min, curr;
    for (let i = 0; i < schedule.length; i++) {
      curr = schedule[i];
      if (currTime.isIn(curr.start, curr.end)) {
        $('#per').html(curr.name);
        if (!$('#' + curr.id).hasClass('info'))
          $('#' + curr.id).addClass('info');
        min = curr.end - currTime;
        if (min == 1) {
          $('#min-left').html(min + ' minute left');
        } else {
          $('#min-left').html(min + ' minutes left');
        }
      } else {
        if ($('#' + curr.id).hasClass('info'))
          $('#' + curr.id).removeClass('info');
        if (i != 0) {
          if (currTime.isIn(schedule[i - 1].end, curr.start)) {
            $('#per').html('Before ' + curr.name);
            min = curr.start - currTime;
            if (min == 1) {
              $('#min-left').html(min + ' minute left');
            } else {
              $('#min-left').html(min + ' minutes left');
            }
          }
        }
      }
    }
  }
}
function vacation() {
  let today = new Date();
  let month = today.getMonth();
  let date = today.getDate();
  for (let i = 0; i < holidayDates.length; i++) {
    let breakRange = holidayDates[i];
    let start = breakRange[0],
      end = breakRange[1];
    if (start[0] == 11 && end[0] == 0) {
      //spans over the new year
      if ((month == 11 && date >= start[1]) || (month == 0 && date <= end[1])) {
        onBreak = true;
      }
    } else if (start[0] < end[0]) {
      //2 or more months
      if (month > start[0] && month < end[0]) {
        onBreak = true;
      } else if (month == start[0]) {
        if (date >= start[1]) {
          onBreak = true;
        }
      } else if (month == end[0]) {
        if (date <= end[1]) {
          onBreak = true;
        }
      }
    } else if (start[0] == end[0]) {
      //inside a month
      if (date >= start[1] && date <= end[1] && month == start[0]) {
        onBreak = true;
      }
    }
  }
  toggleSchedule(onBreak);
}

let schedule = regSchedule;
function defaultDrop() {
  $('#regular').show();
  $('#strike').show();
  $('#er').show();
  $('#lopez').show();
  $('#assembly').hide();
  $('#sem1').hide();
  $('#sem2').hide();
  $('#sem3').hide();
  $('#sem4').hide();
}
function defaultRows() {
  $('#lunch').hide();
  $('#STRIKE').hide();
  $('#p1').show();
  $('#p2').show();
  $('#p3').show();
  $('#p4').show();
  $('#p5').show();
  $('#p6').show();
  $('#p7').show();
  $('#p8').show();
}
function update(sched) {
  updateSchedule(sched);
  updatePeriod(sched);
  schedule = sched;
}
$('#regular').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
  defaultRows();
  update(regSchedule);
  document.getElementById('dropdown').innerText = 'Regular Schedule';
});

$('#strike').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
  defaultRows();
  $('#STRIKE').show();
  update(strikeSchedule);
  document.getElementById('dropdown').innerText = 'STRIKE Schedule';
});

$('#er').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
  defaultRows();
  update(erSchedule);
  document.getElementById('dropdown').innerText = 'Early Release Schedule';
});
$('#sem1').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
  defaultRows();
  update(sem1Schedule);
  document.getElementById('dropdown').innerText = 'Semester Exam Schedule';
});
$('#sem2').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
  defaultRows();
  update(sem2Schedule);
  document.getElementById('dropdown').innerText = 'Semester Exam Schedule';
});
$('#sem3').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
  defaultRows();
  update(sem3Schedule);
  document.getElementById('dropdown').innerText = 'Semester Exam Schedule';
  $('#p2').hide();
  $('#p3').hide();
  $('#p8').hide();
});
$('#sem4').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
  defaultRows();
  update(sem4Schedule);
  document.getElementById('dropdown').innerText = 'Semester Exam Schedule';
  $('#p1').hide();
  $('#p2').hide();
  $('#p7').hide();
});
$('#assembly').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
  defaultRows();
  update(assemblySchedule);
  document.getElementById('dropdown').innerText = 'Assembly Schedule';
});
$('#lopez').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
  defaultRows();
  $('#lunch').show();
  update(lopezSchedule);
  document.getElementById('dropdown').innerText = 'Lopez 8th Grade Schedule';
});

$(function () {
  let today = new Date();
  let dow = today.getDay(); // day of week
  let month = today.getMonth();
  let date = today.getDate();
  let clicked = false;
  defaultDrop();
  //bad code below! too lazy to find better way to do this
  for (let i = 0; i < erDates.length; i++) {
    if (erDates[i][0] == month && erDates[i][1] == date) {
      clicked = true;
      $('#er').click();
    }
  }
  for (let i = 0; i < sem1Dates.length; i++) {
    if (sem1Dates[i][0] == month && sem1Dates[i][1] == date) {
      clicked = true;
      $('#sem1').show();
      $('#sem1').click();
    }
  }
  for (let i = 0; i < sem2Dates.length; i++) {
    if (sem2Dates[i][0] == month && sem2Dates[i][1] == date) {
      clicked = true;
      $('#sem2').show();
      $('#sem2').click();
    }
  }
  for (let i = 0; i < sem3Dates.length; i++) {
    if (sem3Dates[i][0] == month && sem3Dates[i][1] == date) {
      clicked = true;
      $('#sem3').show();
      $('#sem3').click();
    }
  }
  for (let i = 0; i < sem4Dates.length; i++) {
    if (sem4Dates[i][0] == month && sem4Dates[i][1] == date) {
      clicked = true;
      $('#sem4').show();
      $('#sem4').click();
    }
  }
  for (let i = 0; i < assemblyDates.length; i++) {
    if (assemblyDates[i][0] == month && assemblyDates[i][1] == date) {
      clicked = true;
      $('#assembly').show();
      $('#assembly').click();
    }
  }
  if (!clicked) {
    if (dow == 4) {
      $('#strike').click();
    } else {
      $('#regular').click();
    }
  }
  updateTime(schedule);
  setInterval(function () {
    updateTime(schedule);
  }, 1000);
});
/* DROPDOWN STUFF */
$('#dropdown').click(function (e) {
  e.preventDefault();
  document.getElementById('myDropdown').classList.toggle('show');
});
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
