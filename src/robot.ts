import { CommandDirection, Orientation, SortedOrientations } from "./enums";
import type { CommandDirectionType, OrientationType } from "./enums";

class Robot {
  id: number;
  x: number;
  y: number;
  orientation: OrientationType;
  commands: CommandDirectionType[];
  lost: boolean = false;

  constructor(
    id: number,
    x: number,
    y: number,
    orientation: OrientationType,
    commands: CommandDirectionType[]
  ) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new Error("Non-integer robot position provided");
    }

    if (!Object.values(Orientation).includes(orientation)) {
      throw new Error("Unkown robot orientation provided");
    }

    if (commands.some(command => !Object.values(CommandDirection).includes(command))) {
      throw new Error("Unkown robot command provided");
    }

    this.id = id;
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.commands = commands;
  }

}

export default Robot;
