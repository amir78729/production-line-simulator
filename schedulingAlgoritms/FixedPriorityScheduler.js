const Task = require('../Task.js');


class FixedPriorityScheduler {
  constructor() {
    this.tasks = []; // the queued tasks
  }

  addTask(task) {
    this.tasks.push(task)
  }

  sort() {
    this.tasks.sort((a, b) => a.priority - b.priority)
  }

  run() {
    this.sort();
    while (this.tasks.length) {
      if (this.tasks[0].index < this.tasks[0].iterations) {
        this.tasks[0].run();
      }
      else {
        this.tasks[0].onFinish();
        this.tasks.shift();
        this.sort();
      }
    }
  }
}

const fixedPriorityScheduler = new FixedPriorityScheduler();

fixedPriorityScheduler.addTask(new Task("A", 100000, 3));
fixedPriorityScheduler.addTask(new Task("B", 200000, 2));
fixedPriorityScheduler.addTask(new Task("C", 1000, 4));
fixedPriorityScheduler.addTask(new Task("D", 2000, 1));

fixedPriorityScheduler.run();