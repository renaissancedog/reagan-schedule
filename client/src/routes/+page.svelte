<script>
  import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  import {
    sem1Schedule,
    sem2Schedule,
    sem3Schedule,
    sem4Schedule,
    erSchedule,
    strikeSchedule,
    regSchedule,
    lopezSchedule,
    assemblySchedule,
    specialDates
  } from '../schedules.js';
  onMount(() => {
    updateTime();
    updatePeriod();
    specialSchedule();
    setInterval(updateTime, 1000);
    setInterval(updatePeriod, 1000);
  });
  const labels = new Map(
    Object.entries({
      'Regular Schedule': regSchedule,
      'STRIKE Schedule': strikeSchedule,
      'Early Release Schedule': erSchedule,
      'Lopez 8th Grade Schedule': lopezSchedule,
      'Semester Exam Schedule 1': sem1Schedule,
      'Semester Exam Schedule 2': sem2Schedule,
      'Semester Exam Schedule 3': sem3Schedule,
      'Semester Exam Schedule 4': sem4Schedule,
      'Assembly Schedule': assemblySchedule
    })
  );
  let schedules=[
    'Regular Schedule',
    'STRIKE Schedule',
    'Early Release Schedule',
    'Lopez 8th Grade Schedule',
    'Semester Exam Schedule 1',
    'Semester Exam Schedule 2',
    'Semester Exam Schedule 3',
    'Semester Exam Schedule 4',
    'Assembly Schedule'
  ];
  let today = new Date();
  let dow = today.getDay();
  let currTime = new Time(today.getHours(), today.getMinutes());
  let untilSchool = $state('');
  let minLeft = $state('');
  let period = $state('');
  let date = $state('');
  let clock = $state('');
  let highlightedId = $state('');
  let label = $state('Regular Schedule');
  let schedule = $state(regSchedule);
  let dropdownOpen = $state(false);
  function Time(h, m) {
    this.hours = h;
    this.minutes = m;
  }
  Time.prototype = {
    valueOf() {
      return this.hours * 60 + this.minutes;
    },
    toString() {
      let hours = this.hours % 12 || 12;
      let minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
      let ampm = this.hours < 12 ? 'AM' : 'PM';
      return `${hours}:${minutes} ${ampm}`;
    },
    isIn(start, end) {
      return (
        this.valueOf() >= start.valueOf() && this.valueOf() < end.valueOf()
      );
    },
    subtract(t) {
      return this.valueOf() - t.valueOf();
    }
  };

  function updateTime() {
    today = new Date();
    dow = today.getDay();
    currTime = new Time(today.getHours(), today.getMinutes());
    date = dayjs().format('dddd, MMMM D');
    clock = dayjs().format('h:mm:ss A');
  }

  function updatePeriod() {
    if (
      dow === 6 ||
      dow === 0 ||
      !currTime.isIn(schedule[0].start, schedule[schedule.length - 1].end)
    ) {
      period = '';
      minLeft = '';
      let minutes = schedule[0].start.subtract(currTime);
      let hours = Math.floor(minutes / 60);
      if (dow == 6) {
        hours += 24;
      }
      minutes %= 60;
      untilSchool = `${hours} ${hours == 1 ? 'hour' : 'hours'} and ${minutes} ${minutes == 1 ? 'minute' : 'minutes'} until school`;
      highlightedId = '';
    } else {
      untilSchool = '';
      for (let i = 0; i < schedule.length; i++) {
        let curr = schedule[i];
        if (currTime.isIn(curr.start, curr.end)) {
          period = curr.name;
          minLeft = `${curr.end - currTime} ${curr.end - currTime == 1 ? 'minute' : 'minutes'} left`;
          highlightedId = curr.id;
        }
        if (i != 0 && currTime.isIn(schedule[i - 1].end, curr.start)) {
          period = '';
          minLeft = `${curr.start - currTime} ${curr.start - currTime == 1 ? 'minute' : 'minutes'} before Period ${i + 1}`;
          highlightedId = '';
        }
      }
    }
  }
  function specialSchedule() {
    let isSpecialDay = false;
    let month = today.getMonth() + 1;
    let day = today.getDate();
    for (let i = 0; i < specialDates.length; i++) {
      for (let j = 0; j < specialDates[i][0].length; j++) {
        if (
          specialDates[i][0][j][0] == month &&
          specialDates[i][0][j][1] == day
        ) {
          isSpecialDay = true;
          setSchedule(specialDates[i][1]);
          break;
        }
      }
    }
    if (isSpecialDay) {
      return;
    }
    if (dow == 4) {
      setSchedule('STRIKE Schedule');
    } else {
      setSchedule('Regular Schedule');
    }
  }
  function setSchedule(newSchedule) {
    schedule = labels.get(newSchedule);
    updatePeriod();
    dropdownOpen = false;
    label = newSchedule;
  }
  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }
</script>

<div class="flex flex-row items-center justify-center">
  <main class="w-full px-2 pt-2 font-sans lg:w-1/2">
    <div class="space-y-4 text-center text-3xl text-sky-600">
      <div class="text-5xl">{clock}</div>
      <div>{date}</div>
      <div>{period}</div>
      <div>{minLeft}</div>
      <div>{untilSchool}</div>
    </div>
    <div class="container-fluid">
      <div class="dropdown text-left">
        <button
          class="dropbtn bg-sky-600 p-3 text-lg text-white"
          onclick={toggleDropdown}
        >
          {label}
        </button>
        {#if dropdownOpen}
          <div
            class="dropdown-content absolute min-w-40 bg-gray-100 text-black"
          >
            {#each schedules as schedule}
              <button
                class="dropdown-item"
                onclick={() => setSchedule(schedule)}
              >
                {schedule}
              </button>
            {/each}
          </div>
        {/if}
      </div>
      <table class="table w-full bg-white text-center md:text-2xl">
        <tbody>
          {#each schedule as { id, name, start, end }}
            <tr class={id === highlightedId ? 'info' : ''}>
              <td>{name}</td>
              <td>{start} - {end}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </main>
</div>
