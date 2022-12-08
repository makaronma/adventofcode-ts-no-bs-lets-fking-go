import { isNumberHighest } from "./../utils";
import { getData, getExampleData } from "../utils";

const getEdgesCount = (data: string[]) =>
  data.reduce((prev, d, i) => {
    if (i === 0 || i === data.length - 1) {
      return prev + data[i].split("").length;
    }
    return prev + 2;
  }, 0);

const inc = (target: number, otherTrees: number[]): number => {
  let sum = 0;
  for (const t of otherTrees) {
    if (target > t) {
      sum++;
    } else {
      sum + 1;
      break;
    }
  }
  return sum;
};

export default {
  part1: () =>
    getData(8, (data) => {
      console.time("=========part1=========");
      let sum = getEdgesCount(data);

      for (let i = 1; i < data.length - 1; i++) {
        const horizontal = data[i]
          .split("")
          .reduce<number[]>((sum, d) => [...sum, Number(d)], []);

        for (let j = 1; j < data[i].length - 1; j++) {
          const vertical = data.reduce<number[]>(
            (sum, d) => [...sum, Number(d.split("")[j])],
            []
          );
          const up = vertical.slice(0, i);
          const down = vertical.slice(i + 1, vertical.length);
          const left = horizontal.slice(0, j);
          const right = horizontal.slice(j + 1, horizontal.length);

          const tree = Number(data[i][j]);
          const partialIsTallest = [up, down, left, right].some((direction) =>
            isNumberHighest(tree, direction)
          );

          if (partialIsTallest) {
            sum++;
          }
        }
      }

      console.log({ sum });
      console.timeEnd("=========part1=========");
    }),

  part2: () =>
    getData(8, (data) => {
      console.time("=========part2=========");
      let highest = 0;

      for (let i = 0; i < data.length; i++) {
        const horizontal = data[i]
          .split("")
          .reduce<number[]>((sum, d) => [...sum, Number(d)], []);

        for (let j = 0; j < data[i].length; j++) {
          const tree = Number(data[i][j]);

          const vertical = data.reduce<number[]>(
            (sum, d) => [...sum, Number(d.split("")[j])],
            []
          );

          const up = vertical.slice(0, i).reverse();
          const down = vertical.slice(i + 1, vertical.length);
          const left = horizontal.slice(0, j).reverse();
          const right = horizontal.slice(j + 1, horizontal.length);

          const seeTreeCount: number = [up, down, left, right].reduce<number>(
            (prev, dir) => prev * inc(tree, dir),
            1
          );

          if (seeTreeCount > highest) {
            highest = seeTreeCount;
          }
        }
      }

      console.log({ highest });
      console.timeEnd("=========part2=========");
    }),

  combined: () =>
    getExampleData(8, (data) => {
      // part1
      console.time("=========combined=========");

      console.timeEnd("=========combined=========");
    }),
};
