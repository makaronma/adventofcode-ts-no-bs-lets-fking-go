import { chunk, groupBy } from "lodash";
import { getData, getExampleData } from "../utils";

export default {
  part1: () =>
    getData(4, (data) => {
      console.time("=========part1=========");
      let sumScore = 0;
      for (const group of data) {
        let groupScore = 0;
        const [left, right] = group.split(",");
        const [leftMin, leftMax] = left.split("-").map(Number);
        const [rightMin, rightMax] = right.split("-").map(Number);
        if (leftMin >= rightMin && leftMax <= rightMax) {
          groupScore = 1;
        }
        if (rightMin >= leftMin && rightMax <= leftMax) {
          groupScore = 1;
        }
        sumScore += groupScore;
      }

      console.log({ sumScore });
      console.timeEnd("=========part1=========");
    }),

  part2: () =>
    getData(4, (data) => {
      console.time("=========part2=========");
      let sumScore = 0;
      for (const group of data) {
        let groupScore = 0;
        const [left, right] = group.split(",");
        const [leftMin, leftMax] = left.split("-").map(Number);
        const [rightMin, rightMax] = right.split("-").map(Number);
        if (
          (leftMin >= rightMin && leftMin <= rightMax) ||
          (leftMax >= rightMin && leftMax <= rightMax)
        ) {
          groupScore = 1;
        }
        if (
          (rightMin >= leftMin && rightMin <= leftMax) ||
          (rightMax >= leftMin && rightMax <= leftMax)
        ) {
          groupScore = 1;
        }
        sumScore += groupScore;
      }

      console.log({ sumScore });
      console.timeEnd("=========part2=========");
    }),

  combined: () =>
    getExampleData(4, (data) => {
      // part1
      console.time("=========combined=========");

      console.timeEnd("=========combined=========");
    }),
};
