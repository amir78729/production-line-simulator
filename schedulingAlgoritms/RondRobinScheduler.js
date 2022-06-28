const Task = require('../Task.js');


class RondRobinScheduler {
  constructor(timeSlotPerTask) {
    this.tasks = [];
    this.timeSlotPerTask = timeSlotPerTask;
  }

  addTask(task) {
    this.tasks.push(task)
  }

  run() {
    let lastSetDate = Date.now();
    while (this.tasks.length) {
      if (Date.now() - lastSetDate > this.timeSlotPerTask) {
        this.tasks.push(this.tasks.shift());
        lastSetDate = Date.now();
        if (this.tasks.length > 1) {
          console.log("");
        }
      }
      if (this.tasks[0].index < this.tasks[0].iterations) {
        this.tasks[0].run();
      }
      else {
        this.tasks[0].onFinish();
        this.tasks.shift();
      }
    }
  }
}


const rondRobinScheduler = new RondRobinScheduler(1000); // time per slot will be 1 second

rondRobinScheduler.addTask(new Task("A", 100000));
rondRobinScheduler.addTask(new Task("B", 300000));
rondRobinScheduler.addTask(new Task("C", 400000));
rondRobinScheduler.addTask(new Task("D", 200000));

rondRobinScheduler.run();