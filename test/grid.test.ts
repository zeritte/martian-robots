import Grid from "../src/grid";
import Robot from "../src/robot";

describe("TEST 'Grid' class", () => {
  describe("WHEN the grid size IS NOT properly structured", () => {
    it("SHOULD throw non-integer size error", () => {
      try {
        // @ts-expect-error
        new Grid("1", "2");
      } catch (e) {
        expect((e as Error).message).toContain("Non-integer grid size provided");
      }
    });

  describe("WHEN the grid size DOES exceed the max grid size allowance", () => {
    it("SHOULD throw max grid size error for height", () => {
      try {
        new Grid(50, 51);
      } catch (e) {
        expect((e as Error).message).toContain("Max grid size exceeded");
      }
    });

    it("SHOULD throw max grid size error for width", () => {
      try {
        new Grid(55, 10);
      } catch (e) {
        expect((e as Error).message).toContain("Max grid size exceeded");
      }
    });
  });

  describe("WHEN the grid size IS properly structred", () => {
    describe("WHEN addRobot function is called", () => {
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
          expect(grid.robots).toContain(robot);
        });
      });
    });

    describe("WHEN display function is called", () => {
      describe("WHEN there IS a lost robot", () => {
        it("SHOULD throw out of boundary error", () => {
          const grid = new Grid(10, 10);
          const robot1 = new Robot(1, 2, 5, "N", []);
          robot1.lost = true;
          const robot2 = new Robot(1, 9, 8, "W", []);
          grid.addRobot(robot1);
          grid.addRobot(robot2);
          expect(grid.display()).toEqual(`2 5 N LOST
9 8 W`);
        });
      });

      describe("WHEN there IS NOT a lost robot", () => {
        it("SHOULD throw out of boundary error", () => {
          const grid = new Grid(10, 10);
          const robot = new Robot(1, 2, 5, "N", []);
          grid.addRobot(robot);
          expect(grid.display()).toEqual(`2 5 N`);
        });
      });
    });

    describe("WHEN moveAllRobots function is called", () => {
      it("SHOULD move properly", () => {
        const grid = new Grid(10, 10);
        const robot = new Robot(1, 2, 5, "N", [
          "F",
          "F",
          "L",
          "L",
          "L",
          "L",
          "R",
          "F",
          "F",
          "F",
          "L"
        ]);
        grid.addRobot(robot);
        grid.moveAllRobots();
        expect(grid.display()).toEqual(`5 7 N`);
      });

      it("SHOULD move AND fall properly", () => {
        const grid = new Grid(10, 10);
        const robot1 = new Robot(1, 2, 5, "N", ["F", "F", "L", "L", "L", "L", "R", "F", "F", "F"]);
        const robot2 = new Robot(1, 7, 5, "E", ["F", "F", "F", "F"]);
        const robot3 = new Robot(1, 7, 5, "E", ["F", "F", "F", "F", "R", "R", "F"]);
        grid.addRobot(robot1);
        grid.addRobot(robot2);
        grid.addRobot(robot3);
        grid.moveAllRobots();
        expect(grid.display()).toEqual(`5 7 E
10 5 E LOST
9 5 W`);
      });
    });
  });
});
