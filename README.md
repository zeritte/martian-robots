# Martian robots

## How to run

```
npm install
npm run start
```

To run the tests:

```
npm run test
```

The app checks the `input.txt` file for instructions, and writes the final output to `output.txt`

### Technologies

1. Typescript
2. Node.js
3. Jest
4. mock-fs
5. ts-node

## Design

The app has `Robot` and `Grid` classes. The input validation is done in class level. `move` and `turn` functionalities are implemented in `Robot` class, any further addition to type of supported command can be implemented easily by utilising these.

Various unit tests are implemented for functions and input validation.

### Robot class

`constructor(id, x, y, orientation, commands)` -> Does simple input validation, and saves the robot properties.
`move(gridSize, lostScents)` -> Moves the robot forward by one grid. Returns an object for `Grid` class to update the lost scents in case it falls.
`turn(clockwise)` -> Turns the robot direction by 90 degrees.

### Grid class

`constructor(width, height)` -> Does simple input validation, and saves the grid properties.
`addRobot(robot)` -> Adds a robot to grid.
`moveAllRobots()` -> Executes the commands for robots, in the order of input with no concurrency.
`display()` -> Displays the status of grid robots at a time point.
`[private]moveRobot` -> For each robot, executes the commands one by one and gets the robot move around the grid.

### Things to improve

- I am not completely happy with lost scent update part. The communication between a grid and a robot on it can be moved to a separate messaging type of logic.
- Input validation can be extended.
- `id` property is provided to robots for any further robot based action.
- Concurrency can be added.

## Problem: Martian Robots

### The Problem

The surface of Mars can be modelled by a rectangular grid around which robots are able to
move according to instructions provided from Earth. You are to write a program that
determines each sequence of robot positions and reports the final position of the robot.

A robot position consists of a grid coordinate (a pair of integers: x-coordinate followed by
y-coordinate) and an orientation (N, S, E, W for north, south, east, and west).
A robot instruction is a string of the letters “L”, “R”, and “F” which represent, respectively, the
instructions:

- Left : the robot turns left 90 degrees and remains on the current grid point.
- Right : the robot turns right 90 degrees and remains on the current grid point.
- Forward : the robot moves forward one grid point in the direction of the current
  orientation and maintains the same orientation.

The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).
There is also a possibility that additional command types may be required in the future and
provision should be made for this.

Since the grid is rectangular and bounded (…yes Mars is a strange planet), a robot that
moves “off” an edge of the grid is lost forever. However, lost robots leave a robot “scent” that
prohibits future robots from dropping off the world at the same grid point. The scent is left at
the last grid position the robot occupied before disappearing over the edge. An instruction to
move “off” the world from a grid point from which a robot has been previously lost is simply
ignored by the current robot.

### The Input

The first line of input is the upper-right coordinates of the rectangular world, the lower-left
coordinates are assumed to be 0, 0.

The remaining input consists of a sequence of robot positions and instructions (two lines per
robot). A position consists of two integers specifying the initial coordinates of the robot and
an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a
string of the letters “L”, “R”, and “F” on one line.

Each robot is processed sequentially, i.e., finishes executing the robot instructions before the
next robot begins execution.

The maximum value for any coordinate is 50.

All instruction strings will be less than 100 characters in length.

### The Output

For each robot position/instruction in the input, the output should indicate the final grid
position and orientation of the robot. If a robot falls off the edge of the grid the word “LOST”
should be printed after the position and orientation.

#### Sample Input

```
5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL
```

#### Sample Output

```
1 1 E
3 3 N LOST
2 3 S
```
