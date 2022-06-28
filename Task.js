class Task {
  constructor(name, iterations, priority = 1) {
    this.name = name
    this.index = 0;
    this.iterations = iterations;
    this.priority = priority;
  }

  run() {
    this.index++;
    process.stdout.write(this.name + " " + Math.floor((this.index / this.iterations) * 100) + "% \r");
  }

  onFinish() {
    console.log(this.name + " 100%")
  }
}

module.exports = Task
