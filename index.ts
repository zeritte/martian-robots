import fs from "fs";
import Grid from "./src/grid";
import Robot from "./src/robot";
import type { CommandDirectionType, OrientationType } from "./src/enums";

export const process = () => {
  const input = fs.readFileSync("input.txt", "utf8");
  const splittedInputArray = input.split("\n").filter(line => line.length > 0);

  const [gridWidth, gridHeight] = splittedInputArray[0].split(" ").map(Number);

  const grid = new Grid(gridWidth, gridHeight);

  for (let i = 1; i < splittedInputArray.length; i += 2) {
    let robotOrigins: string[], robotCommands: string[];
    try {
      robotOrigins = splittedInputArray[i].split(" ");
      robotCommands = splittedInputArray[i + 1].split("");
    } catch (e) {
      throw new Error("Unable to parse one of the robot data");
    }

    const robot = new Robot(
      i,
      Number(robotOrigins[0]),
      Number(robotOrigins[1]),
      robotOrigins[2] as OrientationType,
      robotCommands as CommandDirectionType[]
    );

    grid.addRobot(robot);
  }

  grid.moveAllRobots();

  fs.writeFileSync("output.txt", grid.display());
};

process();
