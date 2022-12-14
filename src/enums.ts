type ReverseMap<T> = T[keyof T];

export const Orientation = {
  NORTH: "N",
  EAST: "E",
  WEST: "W",
  SOUTH: "S"
} as const;

export const CommandDirection = {
  LEFT: "L",
  RIGHT: "R",
  FORWARD: "F"
} as const;

export const SortedOrientations = [
  Orientation.NORTH,
  Orientation.EAST,
  Orientation.SOUTH,
  Orientation.WEST
];

export type OrientationType = ReverseMap<typeof Orientation>;
export type CommandDirectionType = ReverseMap<typeof CommandDirection>;
