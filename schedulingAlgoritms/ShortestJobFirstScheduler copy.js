const Task = require('../Task.js');


class ShortestJobFirstScheduler {
  constructor() {
    this.tasks = []; // the queued tasks
  }

  addTask(task) {
    this.tasks.push(task)
  }

  sort() {
    this.tasks.sort((a, b) => a.iterations - b.iterations); // sort by the smallest "iterations"
  }

  run() {
    this.sort(); // sort once before while loop
    while (this.tasks.length) {
      if (this.tasks[0].index < this.tasks[0].iterations) {
        this.tasks[0].run();
      }
      else {
        this.tasks[0].onFinish();
        this.tasks.shift();
        this.sort(); // sort before starting next cycle, in case a new task was added to the list
      }
    }
  }
}

const shortestJobFirstScheduler = new ShortestJobFirstScheduler();

shortestJobFirstScheduler.addTask(new Task("A", 100000));
shortestJobFirstScheduler.addTask(new Task("B", 300000));
shortestJobFirstScheduler.addTask(new Task("C", 400000));
shortestJobFirstScheduler.addTask(new Task("D", 200000));

shortestJobFirstScheduler.run();