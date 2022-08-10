import { CommandDirection, Orientation, SortedOrientations } from "./enums";
import type { CommandDirectionType, OrientationType } from "./enums";
import { MAX_ROBOT_COMMAND_SIZE } from "./constants";

type MoveResult =
  | {
      didFall: true;
      fallenCoordinates: [number, number];
    }
  | {
      didFall: false;
    };

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

    if (commands.length > MAX_ROBOT_COMMAND_SIZE) {
      throw new Error("Max robot command length exceeded");
    }

    this.id = id;
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.commands = commands;
  }

  public move(gridSize: [number, number], lostScents: Array<[number, number]>): MoveResult {
    const gridHorizontalSize = gridSize[0];
    const gridVerticalSize = gridSize[1];

    if (this.lost) {
      return { didFall: false };
    }

    const canFall = !lostScents.some(
      coordinates => coordinates[0] === this.x && coordinates[1] === this.y
    );

    let newX: number, newY: number;
    switch (this.orientation) {
      case Orientation.EAST:
        newX = this.x + 1;
        if (newX > gridHorizontalSize || newX < 0) {
          if (!canFall) return { didFall: false };
          this.lost = true;
          break;
        }
        this.x = newX;
        break;
      case Orientation.WEST:
        newX = this.x - 1;
        if (newX > gridHorizontalSize || newX < 0) {
          if (!canFall) return { didFall: false };
          this.lost = true;
          break;
        }
        this.x = newX;
        break;
      case Orientation.NORTH:
        newY = this.y + 1;
        if (newY > gridVerticalSize || newY < 0) {
          if (!canFall) return { didFall: false };
          this.lost = true;
          break;
        }
        this.y = newY;
        break;
      case Orientation.SOUTH:
        newY = this.y - 1;
        if (newY > gridVerticalSize || newY < 0) {
          if (!canFall) return { didFall: false };
          this.lost = true;
          break;
        }
        this.y = newY;
        break;
      default:
        throw new Error("Unkown robot orientation state");
    }

    if (this.lost) {
      return { didFall: true, fallenCoordinates: [this.x, this.y] };
    }
    return { didFall: false };
  }

  public turn(clockwise: boolean) {
    const currentOrientationIndex = SortedOrientations.findIndex(e => e === this.orientation);
    // Getting the modulus of the new index, to keep it in the array boundaries
    let newOrientationIndex =
      ((clockwise ? currentOrientationIndex + 1 : currentOrientationIndex - 1) +
        SortedOrientations.length) %
      SortedOrientations.length;
    const newOrientation = SortedOrientations[newOrientationIndex];
    this.orientation = newOrientation;
  }
}

export default Robot;
