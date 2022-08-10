import Robot from "../src/robot";

describe("TEST 'robot' class", () => {
  describe("WHEN the constructor properties ARE NOT properly constructed", () => {
    describe("WHEN invalid origin passed", () => {
      it("SHOULD return invalid integer error", () => {
        try {
          // @ts-expect-error
          new Robot(1, "a", NaN);
        } catch (e) {
          expect((e as Error).message).toContain("Non-integer robot position provided");
        }
      });
    });

    describe("WHEN invalid orientation passed", () => {
      it("SHOULD return invalid orientation error", () => {
        try {
          // @ts-expect-error
          new Robot(1, 1, 1, "P");
        } catch (e) {
          expect((e as Error).message).toContain("Unkown robot orientation provided");
        }
      });
    });

    describe("WHEN an invalid command passed", () => {
      it("SHOULD return invalid orientation error", () => {
        try {
          // @ts-expect-error
          new Robot(1, 1, 1, "N", ["X"]);
        } catch (e) {
          expect((e as Error).message).toContain("Unkown robot command provided");
        }
      });
    });

    describe("WHEN a too long robot command passed", () => {
      it("SHOULD return max command error", () => {
        try {
          new Robot(1, 1, 1, "N", Array(101).fill("R"));
        } catch (e) {
          expect((e as Error).message).toContain("Max robot command length exceeded");
        }
      });
    });
  });

  describe("WHEN the constructor properties ARE properly constructed", () => {
    describe("WHEN turn command is passed", () => {
      it("SHOULD turn right properly", () => {
        const robot = new Robot(1, 1, 1, "N", []);
        robot.turn(true);
        expect(robot.orientation).toEqual("E");
      });

      it("SHOULD turn left properly", () => {
        const robot = new Robot(1, 1, 1, "N", []);
        robot.turn(false);
        expect(robot.orientation).toEqual("W");
      });
    });

    describe("WHEN move command is passed", () => {
      describe("WHEN moving IS NOT possible", () => {
        describe("WHEN moving DOES cause a fall", () => {
          it("SHOULD BE lost out of upper edges AND update lost scents", () => {
            const robot = new Robot(1, 2, 5, "N", []);
            const updatedMoveResult = robot.move([5, 5], [[5, 5]]);
            expect(robot.lost).toBe(true);
            expect(robot.x).toEqual(2);
            expect(robot.y).toEqual(5);
            expect(updatedMoveResult).toEqual({
              didFall: true,
              fallenCoordinates: [2, 5]
            });
          });

          it("SHOULD BE lost out of lower edges AND update lost scent", () => {
            const robot = new Robot(1, 0, 0, "S", []);
            const updatedLostScents = robot.move([5, 5], []);
            expect(robot.lost).toBe(true);
            expect(robot.x).toEqual(0);
            expect(robot.y).toEqual(0);
            expect(updatedLostScents).toEqual({
              didFall: true,
              fallenCoordinates: [0, 0]
            });
          });
        });

        describe("WHEN moving DOES NOT cause a fall because of a lost scent", () => {
          it("SHOULD NOT BE lost", () => {
            const robot = new Robot(1, 3, 5, "N", []);
            const moveResult = robot.move([5, 5], [[3, 5]]);
            expect(robot.lost).toBe(false);
            expect(robot.x).toEqual(3);
            expect(robot.y).toEqual(5);
            expect(moveResult).toEqual({
              didFall: false
            });
          });
        });
      });

      describe("WHEN moving IS possible", () => {
        it("SHOULD move properly in north direction", () => {
          const robot = new Robot(1, 1, 1, "N", []);
          const moveResult = robot.move([5, 5], []);
          expect(robot.x).toEqual(1);
          expect(robot.y).toEqual(2);
          expect(moveResult).toEqual({
            didFall: false
          });
        });

        it("SHOULD move properly in west direction", () => {
          const robot = new Robot(1, 1, 0, "W", []);
          const moveResult = robot.move([5, 5], []);
          expect(robot.x).toEqual(0);
          expect(robot.y).toEqual(0);
          expect(moveResult).toEqual({
            didFall: false
          });
        });

        it("SHOULD move properly in south direction", () => {
          const robot = new Robot(1, 1, 1, "S", []);
          const moveResult = robot.move([5, 5], []);
          expect(robot.x).toEqual(1);
          expect(robot.y).toEqual(0);
          expect(moveResult).toEqual({
            didFall: false
          });
        });

        it("SHOULD move properly in east direction", () => {
          const robot = new Robot(1, 1, 1, "E", []);
          const moveResult = robot.move([5, 5], []);
          expect(robot.x).toEqual(2);
          expect(robot.y).toEqual(1);
          expect(moveResult).toEqual({
            didFall: false
          });
        });
      });
    });
  });
});
