import { CommandDirection } from "./enums";
import Robot from "./robot";

class Grid {
  #width: number;
  #height: number;
  robots: Robot[];
  lostScents: Array<[number, number]> = [];

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

  private moveRobot(robot: Robot) {
    for (let i = 0; i < robot.commands.length; i += 1) {
      const command = robot.commands[i];
      switch (command) {
        case CommandDirection.FORWARD:
          const updatedLostScents = robot.move(1, [this.#width, this.#height], this.lostScents);
          this.lostScents = updatedLostScents;
          break;
        case CommandDirection.LEFT:
          robot.turn(false);
          break;
        case CommandDirection.RIGHT:
          robot.turn(true);
          break;
        default:
          throw new Error("Unkown robot command");
      }
    }
  }

  public moveAllRobots() {
    for (let i = 0; i < this.robots.length; i += 1) {
      const robot = this.robots[i];
      this.moveRobot(robot);
    }
  }

  public display(): string {
    const gridState: string[] = [];
    for (let i = 0; i < this.robots.length; i += 1) {
      const robot = this.robots[i];
      let robotState = `${robot.x} ${robot.y} ${robot.orientation}`;
      if (robot.lost) {
        robotState += " LOST";
      }
      gridState.push(robotState);
    }
    return gridState.join("\n");
  }
}

export default Grid;
