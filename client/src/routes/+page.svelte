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
    assemblySchedule
  } from '../schedules.js';
  let today = new Date();
  let dow = today.getDay();
  let currTime = new Time(today.getHours(), today.getMinutes());
  let untilSchool = $state('');
  let minLeft = $state('');
  let period = $state('');
  let date = $state('');
  let clock = $state('');
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
    updatePeriod();
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
      untilSchool = `${hours} hours and ${minutes} minutes until school`;
    } else {
      untilSchool = '';
      for (let i = 0; i < schedule.length; i++) {
        let curr = schedule[i];
        if (currTime.isIn(curr.start, curr.end)) {
          period = curr.name;
          minLeft = `${curr.end - currTime} minutes left`;
        }
        if (i != 0 && currTime.isIn(schedule[i - 1].end, curr.start)) {
          period = '';
          minLeft = `${curr.end - currTime} minutes before Period ${i + 1}`;
        }
      }
    }
  }

  function setSchedule(newSchedule, n) {
    schedule = newSchedule;
    updatePeriod();
    dropdownOpen = false;
    label = n;
  }
  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }
  onMount(() => {
    updateTime();
    setInterval(updateTime, 1000);
  });
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
            <button onclick={() => setSchedule(regSchedule, 'Regular Schedule')}
              >Regular Schedule</button
            >
            <button
              onclick={() => setSchedule(strikeSchedule, 'STRIKE Schedule')}
              >STRIKE Schedule</button
            >
            <button
              onclick={() => setSchedule(erSchedule, 'Early Release Schedule')}
              >Early Release Schedule</button
            >
            <button
              onclick={() =>
                setSchedule(lopezSchedule, 'Lopez 8th Grade Schedule')}
              >Lopez 8th Grade Schedule</button
            >
            <button
              onclick={() =>
                setSchedule(sem1Schedule, 'Semester Exam Schedule 1')}
              >Semester Exam Schedule 1</button
            >
            <button
              onclick={() =>
                setSchedule(sem2Schedule, 'Semester Exam Schedule 2')}
              >Semester Exam Schedule 2</button
            >
            <button
              onclick={() =>
                setSchedule(sem3Schedule, 'Semester Exam Schedule 3')}
              >Semester Exam Schedule 3</button
            >
            <button
              onclick={() =>
                setSchedule(sem4Schedule, 'Semester Exam Schedule 4')}
              >Semester Exam Schedule 4</button
            >
            <button
              onclick={() => setSchedule(assemblySchedule, 'Assembly Schedule')}
              >Assembly Schedule</button
            >
          </div>
        {/if}
      </div>
      <table class="table w-full bg-white text-center md:text-2xl">
        <tbody>
          {#each schedule as { id, name, start, end }}
            <tr {id}>
              <td>{name}</td>
              <td>{start} - {end}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </main>
</div>
