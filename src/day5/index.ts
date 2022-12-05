import { getData, getExampleData } from "../utils";

const trans = (str: string) => str.match(/([A-Z]|(\s{4}))/g);

const trans2 = (str: string) =>
  str.split(/\move|from|to/g).reduce<number[]>((arr, curr) => {
    if (+curr > 0) {
      return [...arr, +curr];
    }
    return arr;
  }, []);

const getChars = (data: string[]) => {
  const allRows: string[][] = [];

  const maxL = trans(data[0])?.length;

  let end = 0;

  let isEnd = false;

  data.forEach((d, i) => {
    const arr = trans(d);

    if (!isEnd && arr) {
      allRows.push(arr);
      end = i;
    } else {
      isEnd = true;
    }
  });

  return { allRows, maxL: maxL ?? 0, end };
};

const getActions = (data: string[], start: number) => {
  let actions: [number, number, number][] = [];
  for (let i = start + 1; i < data.length; i++) {
    const a = trans2(data[i]) as [number, number, number];
    if (a.length > 0) {
      actions.push(a);
    }
  }
  return actions;
};

export default {
  part1: () =>
    getData(5, (data) => {
      console.time("=========part1=========");
      const { allRows, maxL, end } = getChars(data);
      const actions = getActions(data, end);

      const grid: string[][] = [];
      // make 2d array of length maxL
      for (let i = 0; i < maxL; i++) {
        grid[i] = allRows.map((r) => r[i]).filter((g) => !g.includes("  "));
      }

      actions.forEach((a) => {
        const [move, from, to] = a;
        for (let i = 0; i < move; i++) {
          const p = grid[from - 1].shift();
          if (p) grid[to - 1] = [p, ...grid[to - 1]];
        }
      });
      const result = grid.map((r) => r[0]).join("");

      console.log({ result });
      console.timeEnd("=========part1=========");
    }),

  part2: () =>
    getData(5, (data) => {
      console.time("=========part2=========");
      const { allRows, maxL, end } = getChars(data);
      const actions = getActions(data, end);

      const grid: string[][] = [];
      // make 2d array of length maxL
      for (let i = 0; i < maxL; i++) {
        grid[i] = allRows.map((r) => r[i]).filter((g) => !g.includes("  "));
      }

      actions.forEach((a) => {
        const [move, from, to] = a;
        const p = grid[from - 1].slice(0, move);
        grid[from - 1] = grid[from - 1].slice(move, grid[from - 1].length);
        grid[to - 1] = [...p, ...grid[to - 1]];
      });
      const result = grid.map((r) => r[0]).join("");

      console.log({ result });
      console.timeEnd("=========part2=========");
    }),

  combined: () =>
    getExampleData(5, (data) => {
      // part1
      console.time("=========combined=========");

      console.timeEnd("=========combined=========");
    }),
};
