class Task {
    constructor(name, iterations, priority = 1) {
        this.name = name
        this.index = 0;
        this.iterations = iterations;
        this.priority = priority;
    }

    run() {
        this.index++;
    }

    onFinish() {
        console.log(this.name + " 100%")
    }
}

const colorize = (color, output) => {
    const colors = {
        gray: 90,
        red: 91,
        green: 92,
        yellow: 93,
        blue: 94,
        pink: 95,
        cyan: 96,
    }
    return ['\033[', colors[color], 'm', output, '\033[0m'].join('');
}


class RoundRobinScheduler {
    constructor(timeSlotPerTask) {
        this.tasks = [];
        this.timeSlotPerTask = timeSlotPerTask;
        this.doneString = ''
    }
    addTask(task) {
        this.tasks.push(task)
    }
    run() {
        this.doneString = ''
        const totalIterations = this.tasks.reduce((p, c) => p + c.iterations, 0);
        let doneIterations = 0;
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
                doneIterations += 1;
            } else {
                this.tasks[0].onFinish();
                this.doneString += `${this.tasks[0].name}\t`
                for (let j = 0; j < Math.floor((this.tasks[0].index / this.tasks[0].iterations) * 20); j++) {
                    this.doneString += '='
                }
                this.doneString += `> 100%\n`
                this.tasks.shift();
            }
            if (!this.tasks.length || doneIterations % 50 === 0) {
                let string = '----------------------------------\n'
                string += 'Scheduling Algorithm: R.R.\n'
                string += `Iterations: ${doneIterations}/${totalIterations}\n`
                string += colorize('gray', '----------------------------------\n')
                string += colorize('green', '• Done     ')
                string += colorize('yellow', '• On going    ')
                string += colorize('red', '• pending\n')
                string += colorize('gray', '----------------------------------\n')
                string += colorize('green', this.doneString);
                console.clear();
                const tasks = this.tasks
                tasks.forEach((t, index) => {
                    string += colorize(index === 0 ? 'yellow' : 'red', `${t.name}\t`)
                    for (let j = 0; j < Math.floor((t.index / t.iterations) * 20); j++) {
                        string += colorize(index === 0 ? 'yellow' : 'red', '=')
                    }
                    string += colorize(index === 0 ? 'yellow' : 'red', `> ${Math.floor((t.index / t.iterations) * 100)}%\n`)
                })
                string += '----------------------------------\n'
                process.stdout.write(string + "\r");
            }

        }
    }
}


class FirstComeFirstServeScheduler {
    constructor() {
        this.tasks = [];
        this.doneString = ''
    }

    addTask(task) {
        this.tasks.push(task)
    }

    run() {
        this.doneString = ''
        const totalIterations = this.tasks.reduce((p, c) => p + c.iterations, 0);
        let doneIterations = 0;
        while (this.tasks.length) {
            if (this.tasks[0].index < this.tasks[0].iterations) {
                this.tasks[0].run();
                doneIterations += 1;
            } else {
                this.tasks[0].onFinish()
                this.doneString += `${this.tasks[0].name}\t`
                for (let j = 0; j < Math.floor((this.tasks[0].index / this.tasks[0].iterations) * 20); j++) {
                    this.doneString += '='
                }
                this.doneString += `> 100%\n`
                this.tasks.shift();
            }
            if (!this.tasks.length || doneIterations % 50 === 0) {
                let string = '----------------------------------\n'
                string += 'Scheduling Algorithm: F.C.F.S\n'
                string += `Iterations: ${doneIterations}/${totalIterations}\n`
                string += colorize('gray', '----------------------------------\n')
                string += colorize('green', '• Done     ')
                string += colorize('yellow', '• On going    ')
                string += colorize('red', '• pending\n')
                string += colorize('gray', '----------------------------------\n')
                string += colorize('green', this.doneString);
                console.clear();
                const tasks = this.tasks
                tasks.forEach((t, index) => {
                    string += colorize(index === 0 ? 'yellow' : 'red', `${t.name}\t`)
                    for (let j = 0; j < Math.floor((t.index / t.iterations) * 20); j++) {
                        string += colorize(index === 0 ? 'yellow' : 'red', '=')
                    }
                    string += colorize(index === 0 ? 'yellow' : 'red', `> ${Math.floor((t.index / t.iterations) * 100)}%\n`)
                })
                string += '----------------------------------\n'
                process.stdout.write(string + "\r");
            }

        }
    }
}


class FixedPriorityScheduler {
    constructor() {
        this.tasks = [];
        this.doneString = ''
    }

    addTask(task) {
        this.tasks.push(task)
    }

    sort() {
        this.tasks.sort((a, b) => a.priority - b.priority)
    }

    run() {
        this.doneString = ''
        this.sort();
        const totalIterations = this.tasks.reduce((p, c) => p + c.iterations, 0);
        let doneIterations = 0;
        while (this.tasks.length) {
            if (this.tasks[0].index < this.tasks[0].iterations) {
                this.tasks[0].run();
                doneIterations += 1;
            } else {
                this.tasks[0].onFinish();
                this.doneString += `${this.tasks[0].name}\t`
                for (let j = 0; j < Math.floor((this.tasks[0].index / this.tasks[0].iterations) * 20); j++) {
                    this.doneString += '='
                }
                this.doneString += `> 100%\n`
                this.tasks.shift();
                this.sort();
            }
            if (!this.tasks.length || doneIterations % 50 === 0) {
                let string = '----------------------------------\n'
                string += 'Scheduling Algorithm: F.P.\n'
                string += `Iterations: ${doneIterations}/${totalIterations}\n`
                string += colorize('gray', '----------------------------------\n')
                string += colorize('green', '• Done     ')
                string += colorize('yellow', '• On going    ')
                string += colorize('red', '• pending\n')
                string += colorize('gray', '----------------------------------\n')
                string += colorize('green', this.doneString);
                console.clear();
                const tasks = this.tasks
                tasks.forEach((t, index) => {
                    string += colorize(index === 0 ? 'yellow' : 'red', `${t.name}\t`)
                    for (let j = 0; j < Math.floor((t.index / t.iterations) * 20); j++) {
                        string += colorize(index === 0 ? 'yellow' : 'red', '=')
                    }
                    string += colorize(index === 0 ? 'yellow' : 'red', `> ${Math.floor((t.index / t.iterations) * 100)}%\n`)
                })
                string += '----------------------------------\n'
                process.stdout.write(string + "\r");
            }
        }
    }
}


class ShortestJobFirstScheduler {
    constructor() {
        this.tasks = [];
        this.doneString = ''
    }

    addTask(task) {
        this.tasks.push(task)
    }

    sort() {
        this.tasks.sort((a, b) => a.iterations - b.iterations);
    }

    run() {
        this.doneString = ''
        this.sort();
        const totalIterations = this.tasks.reduce((p, c) => p + c.iterations, 0);
        let doneIterations = 0;
        while (this.tasks.length) {
            if (this.tasks[0].index < this.tasks[0].iterations) {
                this.tasks[0].run();
                doneIterations += 1;
            } else {
                this.tasks[0].onFinish();
                this.doneString += `${this.tasks[0].name}\t`
                for (let j = 0; j < Math.floor((this.tasks[0].index / this.tasks[0].iterations) * 20); j++) {
                    this.doneString += '='
                }
                this.doneString += `> 100%\n`
                this.tasks.shift();
                this.sort();
            }
            if (!this.tasks.length || doneIterations % 50 === 0) {
                let string = '----------------------------------\n'
                string += 'Scheduling Algorithm: S.J.F.\n'
                string += `Iterations: ${doneIterations}/${totalIterations}\n`
                string += colorize('gray', '----------------------------------\n')
                string += colorize('green', '• Done     ')
                string += colorize('yellow', '• On going    ')
                string += colorize('red', '• pending\n')
                string += colorize('gray', '----------------------------------\n')
                string += colorize('green', this.doneString);
                console.clear();
                const tasks = this.tasks
                tasks.forEach((t, index) => {
                    string += colorize(index === 0 ? 'yellow' : 'red', `${t.name}\t`)
                    for (let j = 0; j < Math.floor((t.index / t.iterations) * 20); j++) {
                        string += colorize(index === 0 ? 'yellow' : 'red', '=')
                    }
                    string += colorize(index === 0 ? 'yellow' : 'red', `> ${Math.floor((t.index / t.iterations) * 100)}%\n`)
                })
                string += '----------------------------------\n'
                process.stdout.write(string + "\r");
            }
        }
    }
}

const configs = {
    products: {
        body: {
            worstCaseExecutionTime: 200,
        },
        door: {
            worstCaseExecutionTime: 100,
        },
        glasses: {
            worstCaseExecutionTime: 50,
        },
        color: {
            worstCaseExecutionTime: 150,
        },
        engine: {
            worstCaseExecutionTime: 200,
        },
        mirror: {
            worstCaseExecutionTime: 50,
        },
        seats: {
            worstCaseExecutionTime: 300,
        },
        steeringWheel: {
            worstCaseExecutionTime: 200,
        },
    },
    algorithms: {
        firstComeFirstServe: {
            scheduler: new FirstComeFirstServeScheduler()
        },
        fixedPriority: {
            scheduler: new FixedPriorityScheduler()
        },
        roundRobin: {
            scheduler: new RoundRobinScheduler(500)
        },
        shortestJobFirst: {
            scheduler: new ShortestJobFirstScheduler()
        },
    }
}


const main = async () => {
    console.clear();
    while (true) {
        process.stdout.write(colorize('yellow', 'Production Line Admin Panel\n'));
        process.stdout.write('Enter Number of Products(-1=exit): ');
        let numberOfProducts;
        await new Promise(function(resolve, reject) {
            process.stdin.once("data", function(_numberOfProducts) {
                if (Number(_numberOfProducts) === -1)
                    process.exit()
                numberOfProducts = _numberOfProducts;
                resolve();
            });
        });

        let products = [];
        let deadline = 0;
        let algorithm = '';

        for (let i = 0; i < numberOfProducts; i++) {
            let productTemp = {};

            console.log()
            process.stdout.write(colorize('gray', `Product Name: \n`));
            Object.keys(configs.products).forEach(p => {
                process.stdout.write(colorize('gray', `- ${p}\n`));
            })
            console.log()

            process.stdout.write(colorize('white', `Product no. ${i + 1}'s Name    : `));
            await new Promise(function(resolve, reject) {
                process.stdin.once("data", function(_name) {
                    productTemp.name = String(_name).replace('\n', '')
                    resolve();
                });
            });

            process.stdout.write(colorize('white', `Product no. ${i + 1}'s Amount  : `));
            await new Promise(function(resolve, reject) {
                process.stdin.once("data", function(_amount) {
                    productTemp.amount = Number(_amount)
                    resolve();
                });
            });

            process.stdout.write(colorize('white', `Product no. ${i + 1}'s Priority: `));
            await new Promise(function(resolve, reject) {
                process.stdin.once("data", function(_priority) {
                    productTemp.priority = Number(_priority)
                    resolve();
                });
            });
            process.stdout.write('\n----------------------------------\n\n')
            products.push(productTemp);
        }
        process.stdout.write(colorize('blue', 'Products:\n'))
        console.log(products);
        const neededTime = products.reduce((previousValue, currentValue) => previousValue + (currentValue.amount * configs.products[currentValue.name].worstCaseExecutionTime), 0);

        process.stdout.write('\n----------------------------------\n\n')
        console.log()
        process.stdout.write(colorize('gray', `Available Algorithms: \n`));
        Object.keys(configs.algorithms).forEach(p => {
            process.stdout.write(colorize('gray', `- ${p}\n`));
        })
        console.log()
        process.stdout.write(colorize('pink', `Scheduling Algorithms: `));
        await new Promise(function(resolve, reject) {
            process.stdin.once("data", function(_alg) {
                algorithm = String(_alg).replace('\n', '')
                resolve();
            });
        });

        process.stdout.write('\n----------------------------------\n\n')
        process.stdout.write(colorize('red', `Deadline: `));
        await new Promise(function(resolve, reject) {
            process.stdin.once("data", function(_dl) {
                deadline = Number(_dl)
                resolve();
            });
        });

        process.stdout.write('\n----------------------------------\n\n')

        if (neededTime > deadline) {
            process.stdout.write(colorize('red', `Taskset is not feasible!\n`));
        } else {
            process.stdout.write(colorize('green', `Taskset is feasible!\n`));
            const scheduler = configs.algorithms[algorithm].scheduler;
            products.forEach((product, index) => {
                scheduler.addTask(new Task(
                    product.name,
                    product.amount * configs.products[product.name].worstCaseExecutionTime,
                    product.priority,
                ))
            })
            scheduler.run()
        }
    }
}
main();
