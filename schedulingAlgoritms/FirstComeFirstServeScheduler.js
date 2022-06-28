const Task = require('../Task.js');


class FirstComeFirstServeScheduler {
  constructor() {
    this.tasks = []; // the queued tasks
  }

  addTask(task) {
    this.tasks.push(task)
  }

  run() {
    while (this.tasks.length) {
      if (this.tasks[0].index < this.tasks[0].iterations) {
        this.tasks[0].run();
      }
      else {
        this.tasks[0].onFinish()
        this.tasks.shift();
      }
    }
  }
}

const firstComeFirstServeScheduler = new FirstComeFirstServeScheduler();

firstComeFirstServeScheduler.addTask(new Task("A", 100000));
firstComeFirstServeScheduler.addTask(new Task("B", 300000));
firstComeFirstServeScheduler.addTask(new Task("C", 400000));
firstComeFirstServeScheduler.addTask(new Task("D", 200000));

firstComeFirstServeScheduler.run();