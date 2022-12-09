import { getData, getExampleData, getExampleData2 } from "../utils";

export const isTouching = (a: [number, number], b: [number, number]) => {
  const [ax, ay] = a;
  const [bx, by] = b;
  return !(Math.abs(ax - bx) > 1 || Math.abs(ay - by) > 1);
};

export const findIndexForAToTouchB = (
  [ax, ay]: [number, number],
  [bx, by]: [number, number]
) => {
  const dx = Math.abs(bx - ax);
  const dy = Math.abs(by - ay);
  const xSign = Math.sign(bx - ax) === 0 ? 1 : Math.sign(bx - ax);
  const ySign = Math.sign(by - ay) === 0 ? 1 : Math.sign(by - ay);

  if (dx === 2) {
    if (dy === 0) {
      return [ax + xSign * 1, ay];
    }
    return [ax + xSign * 1, ay + ySign * 1];
  }
  if (dy === 2) {
    if (dx === 0) {
      return [ax, ay + ySign * 1];
    }
    return [ax + xSign * 1, ay + ySign * 1];
  }
  return [99, 99];
};

export default {
  part1: () =>
    getData(9, (data) => {
      console.time("=========part1=========");

      const tailLocs: string[] = [];

      let hx = 0;
      let hy = 0;

      let tx = 0;
      let ty = 0;

      for (const d of data) {
        const [dir, numOfStep] = d.split(" ");
        const fn: Record<string, () => void> = {
          R: () => hx++,
          L: () => hx--,
          U: () => hy++,
          D: () => hy--,
        };

        for (let i = 0; i < Number(numOfStep); i++) {
          fn[dir]();
          if (!isTouching([hx, hy], [tx, ty])) {
            [tx, ty] = findIndexForAToTouchB([tx, ty], [hx, hy]);
          }
          tailLocs.push(`${tx} ${ty}`);
        }
      }

      console.log(new Set(tailLocs).size);
      console.timeEnd("=========part1=========");
    }),

  part2: () =>
    getData(9, (data) => {
      console.time("=========part2=========");
      let hx = 0;
      let hy = 0;

      let txs = [...new Array(9)].map((_) => 0);
      let tys = [...new Array(9)].map((_) => 0);

      let loc9Touches: string[] = [];

      for (const d of data) {
        const [dir, numOfStep] = d.split(" ");
        const fn: Record<string, () => void> = {
          R: () => hx++,
          L: () => hx--,
          U: () => hy++,
          D: () => hy--,
        };

        for (let i = 0; i < Number(numOfStep); i++) {
          fn[dir]();
          for (let i = 0; i < txs.length; i++) {
            if (i === 0) {
              if (!isTouching([hx, hy], [txs[i], tys[i]])) {
                [txs[i], tys[i]] = findIndexForAToTouchB(
                  [txs[i], tys[i]],
                  [hx, hy]
                );
              }
            } else {
              if (!isTouching([txs[i - 1], tys[i - 1]], [txs[i], tys[i]])) {
                [txs[i], tys[i]] = findIndexForAToTouchB(
                  [txs[i], tys[i]],
                  [txs[i - 1], tys[i - 1]]
                );
              }
            }
            if (i === 8) {
              loc9Touches.push(`${txs[i]}, ${tys[i]}`);
            }
          }
        }
      }
      console.log(new Set(loc9Touches).size);

      console.timeEnd("=========part2=========");
    }),

  combined: () =>
    getExampleData(9, (data) => {
      // part1
      console.time("=========combined=========");

      console.timeEnd("=========combined=========");
    }),
};
