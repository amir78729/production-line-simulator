# Production Line Simulator

The purpose of this project is to provide a management panel to control the production line of automobile parts.

## Configuration

```javascript
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
```
We can modify products and scheduling algorithms in `configs` variable.

## Number of products

At first, the program asks for the number of products.

## Insert product data

The program introduces the available products to us and then we have to enter the information about each product.

The requested information for each product is as follows:
- Product Name
- Number required for production
- Priority (for FP algorithm)

### Summery

When we enter the information, a summary of the incoming products is displayed. For example:

```javascript
Products:
[
  { name: 'body', amount: 1000, priority: 1 },
  { name: 'door', amount: 2000, priority: 3 },
  { name: 'engine', amount: 3000, priority: 2 },
  { name: 'glasses', amount: 5000, priority: 5 },
  { name: 'color', amount: 4000, priority: 4 }
]
```

## Selecting scheduling algorithm

After our products are identified, we must select the desired algorithm from one of the items displayed to us.

## Set deadline and checking feasibility

Next in the deadline section we have to enter the unit value that we can wait for the whole production process to be done.
It is checked if the deadline we want is longer than the time it really needs, we will not do the production process and the user must either manipulate his products or his deadline.

## Simulation

We come to the part of simulating the production of our products with the help of the algorithm we have chosen.
At any moment we can see how many units of work have been done and the status of the tasks can be seen.

- 🟢 Green Tasks: Completed
- 🟡 Yellow Tasks: Ongoing
- 🔴 Red Tasks: Pending

## Test cases

### Feasible R.R.

```
5
body
1000
1
door
2000
3
engine
3000
2
glasses
5000
5
color
4000
4
roundRobin
1950000
```

### Feasible S.J.F.

```
5
body
1000
1
door
2000
3
engine
3000
2
glasses
5000
5
color
4000
4
shortestJobFirst
1950000
```

### Feasible F.P.

```
5
body
1000
1
door
2000
3
engine
3000
2
glasses
5000
5
color
4000
4
fixedPriority
1950000
```
### Feasible F.C.F.S.

```
5
body
1000
1
door
2000
3
engine
3000
2
glasses
5000
5
color
4000
4
firstComeFirstServe
1950000
```
### Non-feasible F.C.F.S.

```
5
body
1000
1
door
2000
3
engine
3000
2
glasses
5000
5
color
4000
4
firstComeFirstServe
1750000
```
