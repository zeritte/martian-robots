import Grid from "../src/grid";
import Robot from "../src/robot";

describe("TEST 'Grid' class", () => {
  describe("WHEN the grid size IS NOT properly structred", () => {
    it("SHOULD throw non-integer size error", () => {
      try {
        // @ts-expect-error
        new Grid("1", "2");
      } catch (e) {
        expect((e as Error).message).toContain("Non-integer grid size provided");
      }
    });
  });

  describe("WHEN the grid size IS properly structred", () => {
    describe("WHEN a robot that IS NOT in grid boundaries added", () => {
      it("SHOULD throw out of boundary error", () => {
        try {
          const grid = new Grid(1, 1);
          const robot = new Robot(1, 2, 5, "N", []);
          grid.addRobot(robot);
        } catch (e) {
          expect((e as Error).message).toContain("Robot out of grid boundaries");
        }
      });
    });

    describe("WHEN a robot that IS in grid boundaries added", () => {
      it("SHOULD add and return robots", () => {
        const grid = new Grid(5, 5);
        const robot = new Robot(1, 2, 4, "N", []);
        grid.addRobot(robot);
        expect(grid.getRobots()).toContain(robot);
      });
    });
  });
});
