import { getData, getExampleData, getExampleData2 } from "../utils";
import "../number.extensions";
import "../string.extensions";

const getDrawWhat = (cycle: number, x: number): string => {
  return [x, x + 1, x + 2].includes(cycle) ? "#" : ".";
};

export default {
  part1: () =>
    getData(10, (data) => {
      console.time("=========part1=========");
      const signalArr = [...new Array(6)].map((_, i) => 20 + i * 40);

      let sum = 0;
      let cycle = 0;
      let x = 1;
      let isWaiting = true;

      const recurseInc = (valToInc: number) => {
        cycle++;
        if (signalArr.includes(cycle)) {
          sum += x * cycle;
        }
        if (isWaiting) {
          isWaiting = false;
          recurseInc(valToInc);
        } else {
          isWaiting = true;
          x += valToInc;
        }
      };

      for (const d of data) {
        const [action, valToInc] = d.split(" ");

        if (action === "addx") {
          recurseInc(Number(valToInc));
        } else if (action === "noop") {
          cycle++;
        }
      }

      console.log({ sum });
      console.timeEnd("=========part1=========");
    }),

  part2: () =>
    getData(10, (data) => {
      console.time("=========part2=========");
      let text: string = "";
      let cycle = 0;
      let isWaiting = true;
      let x = 0;
      const ROW_SIZE = 40;

      const recurseInc = (valToInc: number) => {
        text += getDrawWhat(cycle % 40, x);
        cycle++;

        if (isWaiting) {
          isWaiting = false;
          recurseInc(valToInc);
        } else {
          isWaiting = true;
          x += valToInc;
        }
      };

      for (const d of data) {
        const [action, valToInc] = d.split(" ");

        if (action === "addx") {
          recurseInc(Number(valToInc));
        } else if (action === "noop") {
          text += getDrawWhat(cycle % 40, x);
          cycle++;
        }
      }

      console.log(text.chunk(ROW_SIZE));

      console.timeEnd("=========part2=========");
    }),

  combined: () =>
    getExampleData(10, (data) => {
      // part1
      console.time("=========combined=========");

      console.timeEnd("=========combined=========");
    }),
};
