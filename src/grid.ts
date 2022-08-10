import Robot from "./robot";
import { CommandDirection } from "./enums";
import { MAX_GRID_SIZE } from "./constants";

class Grid {
  #width: number;
  #height: number;
  robots: Robot[];
  lostScents: Array<[number, number]> = [];

  constructor(width: number, height: number) {
    if (!Number.isInteger(width) || !Number.isInteger(height)) {
      throw new Error("Non-integer grid size provided");
    }

    if (width > MAX_GRID_SIZE || height > MAX_GRID_SIZE) {
      throw new Error("Max grid size exceeded");
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
          const moveForwardResult = robot.move([this.#width, this.#height], this.lostScents);
          if (moveForwardResult.didFall) {
            this.lostScents.push(moveForwardResult.fallenCoordinates);
          }
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
