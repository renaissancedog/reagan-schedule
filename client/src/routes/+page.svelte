<script>
  import { onMount } from 'svelte';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  dayjs.extend(relativeTime);
  import { specialDates, labels } from '../schedules.js';
  onMount(() => {
    updateTime();
    updatePeriod();
    specialSchedule();
    setInterval(updateTime, 1000);
    setInterval(updatePeriod, 1000);
  });

  let now = dayjs();
  let dow = now.day();
  let currTime = new Time(now.hour(), now.minute());
  let untilSchool = $state('');
  let minLeft = $state('');
  let period = $state('');
  let date = $state('');
  let clock = $state('');
  let highlightedId = $state('');
  let label = $state('Regular Schedule');
  let schedule = $state(labels.get('Regular Schedule'));
  let dropdownOpen = $state(false);
  let isSummer = $state(false);
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
    now = dayjs();
    dow = now.day();
    currTime = new Time(now.hour(), now.minute());
    date = now.format('dddd, MMMM D');
    clock = now.format('h:mm:ss A');
  }

  function updatePeriod() {
    if (isSummer) {
      let start = dayjs('2025-08-11 08:55', 'YYYY-MM-DD HH:mm');
      const daysDiff = start.diff(now, 'day');
      start = start.subtract(daysDiff, 'day');
      const hoursDiff = start.diff(now, 'hour');
      start = start.subtract(hoursDiff, 'hour');
      const minutesDiff = start.diff(now, 'minute');
      start = start.subtract(minutesDiff, 'minute');
      const secondsDiff = start.diff(now, 'second');
      const pluralize = (value, unit) =>
        `${value} ${unit}${value !== 1 ? 's' : ''}`;
      untilSchool =
        `${pluralize(daysDiff, 'day')}, ` +
        `${pluralize(hoursDiff, 'hour')}, ` +
        `${pluralize(minutesDiff, 'minute')}, and ` +
        `${pluralize(secondsDiff, 'second')} until school`;
      period = '';
      minLeft = '';
      highlightedId = '';
    } else if (
      dow === 6 ||
      dow === 0 ||
      !currTime.isIn(schedule[0].start, schedule[schedule.length - 1].end)
    ) {
      period = '';
      minLeft = '';
      let minutes = schedule[0].start.subtract(currTime);
      let hours = Math.floor(minutes / 60);
      hours +=
        (dow == 5 && currTime > schedule[schedule.length - 1].end) ||
        (dow == 6 && currTime < schedule[0].start)
          ? 48
          : (dow == 6 && currTime > schedule[0].start) ||
              (dow == 0 && currTime < schedule[0].start)
            ? 24
            : 0;
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
          minLeft = `${curr.start - currTime} ${curr.start - currTime == 1 ? 'minute' : 'minutes'} before ${schedule[i].name}`;
          highlightedId = '';
        }
      }
    }
  }
  function specialSchedule() {
    let isSpecialDay = false;
    let month = now.month() + 1;
    let day = now.date();
    if (
      month == 6 ||
      month == 7 ||
      (month == 8 && day <= 10) ||
      (month == 5 && day >= 23) ||
      (month == 5 && day == 22 && currTime >= new Time(13, 20))
    ) {
      isSummer = true;
      return;
    }
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
  <main class="w-full p-2 font-sans lg:w-1/2">
    <div class="space-y-4 pb-2 text-center text-3xl text-sky-600">
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
            {#each labels as [label]}
              <button class="dropdown-item" onclick={() => setSchedule(label)}>
                {label}
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
