import { CommandDirectionType } from "./enums";
import Robot from "./robot";

class Grid {
  #width: number;
  #height: number;
  robots: Robot[];
  lostScents: Array<[number, number]>;

  constructor(width: number, height: number) {
    if (!Number.isInteger(width) || !Number.isInteger(height)) {
      throw new Error("Non-integer grid size provided");
    }

    this.#width = width;
    this.#height = height;
    this.robots = [];
  }

  public addRobot(robot: Robot) {
    if (this.#width < robot.x || this.#height < robot.y) {
      throw new Error("Robot out of grid boundaries");
    }

    this.robots.push(robot);
  }

  private moveRobot(robotId: number, commands: CommandDirectionType[]) {}

  public moveAllRobots() {
    for (let i = 0; i < this.robots.length; i += 1) {
      const robot = this.robots[i];
      const robotId = robot.id;
      const commands = robot.commands;
    }
  }
}

export default Grid;
