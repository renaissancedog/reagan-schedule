//Time class
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

//schedules
export const specialDates = [[[[8, 11]], 'First Day Schedule']];
export const reg = [
  { name: 'Period 1', id: 'p1', start: new Time(8, 55), end: new Time(9, 50) },
  { name: 'Period 2', id: 'p2', start: new Time(9, 55), end: new Time(10, 50) },
  {
    name: 'Period 3',
    id: 'p3',
    start: new Time(10, 55),
    end: new Time(11, 45)
  },
  {
    name: 'Period 4',
    id: 'p4',
    start: new Time(11, 50),
    end: new Time(12, 40)
  },
  {
    name: 'Period 5',
    id: 'p5',
    start: new Time(12, 45),
    end: new Time(13, 35)
  },
  {
    name: 'Period 6',
    id: 'p6',
    start: new Time(13, 40),
    end: new Time(14, 30)
  },
  {
    name: 'Period 7',
    id: 'p7',
    start: new Time(14, 35),
    end: new Time(15, 25)
  },
  {
    name: 'Period 8',
    id: 'p8',
    start: new Time(15, 30),
    end: new Time(16, 20)
  }
];
export const strike = [
  { name: 'Period 1', id: 'p1', start: new Time(8, 55), end: new Time(9, 45) },
  { name: 'Period 2', id: 'p2', start: new Time(9, 50), end: new Time(10, 35) },
  {
    name: 'STRIKE Time',
    id: 'STRIKE',
    start: new Time(10, 40),
    end: new Time(11, 20)
  },
  {
    name: 'Period 3',
    id: 'p3',
    start: new Time(11, 25),
    end: new Time(12, 10)
  },
  {
    name: 'Period 4',
    id: 'p4',
    start: new Time(12, 15),
    end: new Time(13, 0)
  },
  { name: 'Period 5', id: 'p5', start: new Time(13, 5), end: new Time(13, 50) },
  {
    name: 'Period 6',
    id: 'p6',
    start: new Time(13, 55),
    end: new Time(14, 40)
  },
  {
    name: 'Period 7',
    id: 'p7',
    start: new Time(14, 45),
    end: new Time(15, 30)
  },
  {
    name: 'Period 8',
    id: 'p8',
    start: new Time(15, 35),
    end: new Time(16, 20)
  }
];
export const er = [
  { name: 'Period 1', id: 'p1', start: new Time(8, 50), end: new Time(9, 26) },
  { name: 'Period 2', id: 'p2', start: new Time(9, 30), end: new Time(10, 6) },
  {
    name: 'Period 3',
    id: 'p3',
    start: new Time(10, 10),
    end: new Time(10, 45)
  },
  {
    name: 'Period 4',
    id: 'p4',
    start: new Time(10, 49),
    end: new Time(11, 24)
  },
  { name: 'Period 5', id: 'p5', start: new Time(11, 28), end: new Time(12, 3) },
  { name: 'Period 6', id: 'p6', start: new Time(12, 7), end: new Time(12, 42) },
  {
    name: 'Period 7',
    id: 'p7',
    start: new Time(12, 46),
    end: new Time(13, 21)
  },
  { name: 'Period 8', id: 'p8', start: new Time(13, 25), end: new Time(14, 0) }
];
export const day1 = [
  { name: 'Period 1', id: 'p1', start: new Time(8, 55), end: new Time(9, 40) },
  { name: 'Period 2', id: 'p2', start: new Time(9, 45), end: new Time(11, 50) },
  {
    name: 'Period 3',
    id: 'p3',
    start: new Time(11, 55),
    end: new Time(12, 35)
  },
  {
    name: 'Period 4',
    id: 'p4',
    start: new Time(12, 40),
    end: new Time(13, 20)
  },
  {
    name: 'Period 5',
    id: 'p5',
    start: new Time(13, 25),
    end: new Time(14, 5)
  },
  {
    name: 'Period 6',
    id: 'p6',
    start: new Time(14, 10),
    end: new Time(14, 50)
  },
  {
    name: 'Period 7',
    id: 'p7',
    start: new Time(14, 55),
    end: new Time(15, 35)
  },
  {
    name: 'Period 8',
    id: 'p8',
    start: new Time(15, 40),
    end: new Time(16, 20)
  }
];
export const sem1 = [
  { name: 'Period 1', id: 'p1', start: new Time(8, 50), end: new Time(9, 35) },
  { name: 'Period 2', id: 'p2', start: new Time(9, 40), end: new Time(10, 25) },
  {
    name: 'Period 3',
    id: 'p3',
    start: new Time(10, 30),
    end: new Time(11, 15)
  },
  {
    name: 'Period 4',
    id: 'p4',
    start: new Time(11, 20),
    end: new Time(12, 30)
  },
  {
    name: 'Period 5',
    id: 'p5',
    start: new Time(12, 35),
    end: new Time(13, 20)
  },
  {
    name: 'Period 6',
    id: 'p6',
    start: new Time(13, 25),
    end: new Time(14, 35)
  },
  {
    name: 'Period 7',
    id: 'p7',
    start: new Time(14, 40),
    end: new Time(15, 25)
  },
  {
    name: 'Period 8',
    id: 'p8',
    start: new Time(15, 30),
    end: new Time(16, 15)
  }
];
export const sem2 = [
  { name: 'Period 1', id: 'p1', start: new Time(8, 50), end: new Time(9, 35) },
  { name: 'Period 2', id: 'p2', start: new Time(9, 40), end: new Time(10, 50) },
  {
    name: 'Period 3',
    id: 'p3',
    start: new Time(10, 55),
    end: new Time(11, 40)
  },
  {
    name: 'Period 4',
    id: 'p4',
    start: new Time(11, 45),
    end: new Time(12, 30)
  },
  {
    name: 'Period 5',
    id: 'p5',
    start: new Time(12, 35),
    end: new Time(13, 45)
  },
  {
    name: 'Period 6',
    id: 'p6',
    start: new Time(13, 50),
    end: new Time(14, 35)
  },
  {
    name: 'Period 7',
    id: 'p7',
    start: new Time(14, 40),
    end: new Time(15, 25)
  },
  {
    name: 'Period 8',
    id: 'p8',
    start: new Time(15, 30),
    end: new Time(16, 15)
  }
];
export const sem3 = [
  { name: 'Period 1', id: 'p1', start: new Time(8, 50), end: new Time(10, 5) },
  {
    name: 'Period 4',
    id: 'p4',
    start: new Time(10, 10),
    end: new Time(10, 45)
  },
  {
    name: 'Period 5',
    id: 'p5',
    start: new Time(10, 50),
    end: new Time(11, 25)
  },
  { name: 'Period 6', id: 'p6', start: new Time(11, 30), end: new Time(12, 5) },
  {
    name: 'Period 7',
    id: 'p7',
    start: new Time(12, 10),
    end: new Time(13, 20)
  }
];
export const sem4 = [
  { name: 'Period 3', id: 'p3', start: new Time(8, 50), end: new Time(10, 5) },
  {
    name: 'Period 4',
    id: 'p4',
    start: new Time(10, 10),
    end: new Time(10, 45)
  },
  {
    name: 'Period 5',
    id: 'p5',
    start: new Time(10, 50),
    end: new Time(11, 25)
  },
  { name: 'Period 6', id: 'p6', start: new Time(11, 30), end: new Time(12, 5) },
  {
    name: 'Period 8',
    id: 'p8',
    start: new Time(12, 10),
    end: new Time(13, 20)
  }
];
export const assembly = [
  { name: 'Period 1', id: 'p1', start: new Time(8, 50), end: new Time(9, 55) },
  { name: 'Period 2', id: 'p2', start: new Time(10, 0), end: new Time(11, 0) },
  {
    name: 'Period 3',
    id: 'p3',
    start: new Time(11, 5),
    end: new Time(12, 5)
  },
  {
    name: 'Period 4',
    id: 'p4',
    start: new Time(12, 10),
    end: new Time(12, 50)
  },
  {
    name: 'Period 5',
    id: 'p5',
    start: new Time(12, 55),
    end: new Time(13, 35)
  },
  {
    name: 'Period 6',
    id: 'p6',
    start: new Time(13, 40),
    end: new Time(14, 20)
  },
  {
    name: 'Period 7',
    id: 'p7',
    start: new Time(14, 25),
    end: new Time(15, 25)
  },
  {
    name: 'Period 8',
    id: 'p8',
    start: new Time(15, 30),
    end: new Time(16, 15)
  }
];
export const senior1 = [
  { name: 'Period 1', id: 'p1', start: new Time(8, 50), end: new Time(10, 5) },
  {
    name: 'Period 2',
    id: 'p2',
    start: new Time(10, 10),
    end: new Time(10, 55)
  },
  {
    name: 'Period 3',
    id: 'p3',
    start: new Time(11, 0),
    end: new Time(11, 45)
  },
  {
    name: 'Period 4',
    id: 'p4',
    start: new Time(11, 50),
    end: new Time(12, 35)
  },
  {
    name: 'Period 5',
    id: 'p5',
    start: new Time(12, 40),
    end: new Time(13, 25)
  },
  {
    name: 'Period 6',
    id: 'p6',
    start: new Time(13, 30),
    end: new Time(14, 15)
  },
  {
    name: 'Period 7',
    id: 'p7',
    start: new Time(14, 20),
    end: new Time(15, 30)
  },
  {
    name: 'Period 8',
    id: 'p8',
    start: new Time(15, 35),
    end: new Time(16, 15)
  }
];
export const senior2 = [
  { name: 'Period 1', id: 'p1', start: new Time(8, 50), end: new Time(9, 35) },
  { name: 'Period 2', id: 'p2', start: new Time(9, 40), end: new Time(10, 25) },
  {
    name: 'Period 3',
    id: 'p3',
    start: new Time(10, 30),
    end: new Time(11, 40)
  },
  {
    name: 'Period 4',
    id: 'p4',
    start: new Time(11, 45),
    end: new Time(12, 30)
  },
  {
    name: 'Period 5',
    id: 'p5',
    start: new Time(12, 35),
    end: new Time(13, 20)
  },
  {
    name: 'Period 6',
    id: 'p6',
    start: new Time(13, 25),
    end: new Time(14, 10)
  },
  {
    name: 'Period 7',
    id: 'p7',
    start: new Time(14, 15),
    end: new Time(15, 0)
  },
  {
    name: 'Period 8',
    id: 'p8',
    start: new Time(15, 5),
    end: new Time(16, 15)
  }
];
export const labels = new Map(
  Object.entries({
    'Regular Schedule': reg,
    'STRIKE Schedule': strike,
    // 'Early Release Schedule': er,
    // 'First Day Schedule': day1
    // 'Semester Exam Schedule 1': sem1,
    // 'Semester Exam Schedule 2': sem2,
    // 'Semester Exam Schedule 3': sem3,
    // 'Semester Exam Schedule 4': sem4,
    // 'Senior Exam Schedule 1': senior1,
    // 'Senior Exam Schedule 2': senior2,
    // 'Assembly Schedule': assembly
  })
);
