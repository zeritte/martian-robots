const mock = require("mock-fs");
import fs, { writeFileSync } from "fs";
import { process } from "../index";

jest.spyOn(fs, "writeFileSync");
const mockWriteFileSync = writeFileSync as jest.MockedFunction<typeof writeFileSync>;

describe("TEST main 'process' function", () => {
  describe("WHEN the input file IS NOT found", () => {
    beforeEach(() => {
      mock({});
    });

    afterEach(() => {
      mock.restore();
      jest.clearAllMocks();
    });

    it("SHOULD return the no such file error", () => {
      try {
        process();
      } catch (e) {
        expect((e as Error).message).toContain("no such file or directory, open 'input.txt'");
      }
    });
  });

  describe("WHEN the input file IS found", () => {
    describe("WHEN the input IS NOT properly structured", () => {
      describe("WHEN the input DOES NOT have proper gird size", () => {
        beforeEach(() => {
          mock({
            "input.txt": `salih salih`
          });
        });

        afterEach(() => {
          mock.restore();
          jest.clearAllMocks();
        });

        it("SHOULD return invalid grid size error", () => {
          try {
            process();
          } catch (e) {
            expect((e as Error).message).toContain("Non-integer grid size provided");
          }
        });
      });

      describe("WHEN the input HAS a MISSING robot command", () => {
        beforeEach(() => {
          mock({
            // Grid size and robot position are given, but robot commands are missing
            "input.txt": `5 3
1 1 E
`
          });
        });

        afterEach(() => {
          mock.restore();
          jest.clearAllMocks();
        });

        it("SHOULD return invalid robot data error", () => {
          try {
            process();
          } catch (e) {
            expect((e as Error).message).toContain("Unable to parse one of the robot data");
          }
        });
      });
    });

    describe("WHEN the input IS properly structured", () => {
      beforeEach(() => {
        mock({
          "input.txt": `5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`
        });
      });

      afterEach(() => {
        mock.restore();
        jest.clearAllMocks();
      });

      it("SHOULD write the correct output to output.txt file", () => {
        process();

        expect(mockWriteFileSync).toHaveBeenCalledWith(
          "output.txt",
          `1 1 E
3 3 N LOST
2 3 S`
        );
      });
    });
  });
});
