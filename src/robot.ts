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

  public move(
    steps: number,
    gridSize: [number, number],
    lostScents: Array<[number, number]>
  ): Array<[number, number]> {
    const gridHorizontalSize = gridSize[0];
    const gridVerticalSize = gridSize[1];

    if (this.lost) {
      return lostScents;
    }

    const canFall = !lostScents.some(
      coordinates => coordinates[0] === this.x && coordinates[1] === this.y
    );

    let newX: number, newY: number;
    switch (this.orientation) {
      case Orientation.EAST:
        newX = this.x + steps;
        if (newX > gridHorizontalSize || newX < 0) {
          if (!canFall) return lostScents;
          this.lost = true;
          break;
        }
        this.x = newX;
        break;
      case Orientation.WEST:
        newX = this.x - steps;
        if (newX > gridHorizontalSize || newX < 0) {
          if (!canFall) return lostScents;
          this.lost = true;
          break;
        }
        this.x = newX;
        break;
      case Orientation.NORTH:
        newY = this.y + steps;
        if (newY > gridVerticalSize || newY < 0) {
          if (!canFall) return lostScents;
          this.lost = true;
          break;
        }
        this.y = newY;
        break;
      case Orientation.SOUTH:
        newY = this.y - steps;
        if (newY > gridVerticalSize || newY < 0) {
          if (!canFall) return lostScents;
          this.lost = true;
          break;
        }
        this.y = newY;
        break;
      default:
        throw new Error("Unkown robot orientation state");
    }

    if (this.lost) {
      return [...lostScents, [this.x, this.y]];
    }
    return lostScents;
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
