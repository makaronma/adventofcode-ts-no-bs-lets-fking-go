import { getData, getExampleData } from "../utils";

export default {
  part1: () =>
    getData(6, (data) => {
      console.time("=========part1=========");
      data.forEach((d) => {
        const rowChars = d.split("");
        let result: number | undefined = undefined;
        for (let i = 3; i < rowChars.length; i++) {
          const asd = [
            rowChars[i],
            rowChars[i - 1],
            rowChars[i - 2],
            rowChars[i - 3],
          ];
          if ([...new Set(asd)].length === 4) {
            result = i + 1;
            break;
          }
        }

        console.log({ result });
      });
      console.timeEnd("=========part1=========");
    }),

  part2: () =>
    getData(6, (data) => {
      console.time("=========part2=========");
      data.forEach((d) => {
        const rowChars = d.split("");
        let result: number | undefined = undefined;
        for (let i = 14 - 1; i < rowChars.length; i++) {
          const asd = new Array(14).fill(0).map((_, j) => rowChars[i - j]);
          if ([...new Set(asd)].length === 14) {
            result = i + 1;
            break;
          }
        }

        console.log({ result });
      });
      console.timeEnd("=========part2=========");
    }),

  combined: () =>
    getExampleData(6, (data) => {
      // part1
      console.time("=========combined=========");

      console.timeEnd("=========combined=========");
    }),
};
