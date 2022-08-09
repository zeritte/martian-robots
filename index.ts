import fs from "fs";
import { CommandDirection, Orientation } from "./src/enums";
import Grid from "./src/grid";
import Robot from "./src/robot";

export const process = () => {
  const input = fs.readFileSync("input.txt", "utf8");
  const splittedInputArray = input.split("\n").filter(line => line.length > 0);

  const [gridWidth, gridHeight] = splittedInputArray[0].split(" ").map(Number);

  const grid = new Grid(gridWidth, gridHeight);

  for (let i = 1; i < splittedInputArray.length; i += 2) {
    const robotOrigins = splittedInputArray[i].split(" ");
    const robotCommands = splittedInputArray[i + 1].split("");

    const robot = new Robot(
      i,
      Number(robotOrigins[0]),
      Number(robotOrigins[1]),
      robotOrigins[2] as Orientation,
      robotCommands as CommandDirection[]
    );

    grid.addRobot(robot);
  }

  const robots = grid.getRobots();
  for (let i = 0; i < robots.length; i += 1) {
    const robot = robots[i];
    robot.move();
  }

  // todo: input validation

  // fs.writeFileSync("output.txt", robotCommands.toString());
};

process();
