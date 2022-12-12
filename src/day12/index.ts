import { getData, getExampleData, getExampleData2 } from "../utils";
import "../number.extensions";
import "../string.extensions";

type Position = [number, number]; // [y, x]
interface Point {
  position: Position;
  char: string;
}

export default { 
  part1: () =>
    getExampleData2(12, (data) => {
      console.time("=========part1=========");
      const grid = data.map((d) => d.split(""));
      const colCount = data[0].split("").length;
      const rowCount = data.length;
      let availablePaths: Position[][] = [];

      const canChoose = (
        [selfY, selfX]: Position,
        [targetY, targetX]: Position
      ): boolean => {
        const selfCharCode=grid[selfY][selfX].charCodeAt(0)
        const targetCharCode=grid[targetY][targetX].charCodeAt(0)
        return (
          targetCharCode - 1 === selfCharCode ||
          targetCharCode === selfCharCode ||
          (grid[selfY][selfX] === "z" && grid[targetY][targetX]==="E")
        )
      };

      const getOkNextPath = ([y, x]: Position): Point[] => {
        let points: Point[] = [];
        if (x === 0 && y === 0) {
          return [
            { position: [0, 1], char: grid[0][1] },
            { position: [1, 0], char: grid[1][0] },
          ];
        }

        // up
        if (y > 0 && canChoose([y, x], [y - 1, x])) {
          points.push({ position: [y - 1, x], char: grid[y - 1][x] });
        }
        // down
        if (y < rowCount-1 && canChoose([y, x], [y + 1, x])) {
          points.push({ position: [y + 1, x], char: grid[y + 1][x] });
        }

        // left
        if (x > 0 && canChoose([y, x], [y, x - 1])) {
          points.push({ position: [y, x - 1], char: grid[y][x - 1] });
        }
        // right
        if (x < colCount-1 && canChoose([y, x], [y, x + 1])) {
          points.push({ position: [y, x + 1], char: grid[y][x + 1] });
        }

        return points;
      };

      const recur = (
        [y, x]: Position,
        prevWalkedPostion: Position[]
      ) => {
        if (prevWalkedPostion.some((p) => p[0] === y && p[1] === x)) {
          return;
        }
        const walkedPostion: Position[] = [...prevWalkedPostion, [y, x]];

        const nextPaths = getOkNextPath([y, x]);
        if (nextPaths.length === 0) {
          if (grid[y][x] === "E") {
            // console.log("EE");
            availablePaths.push(walkedPostion);
          }
          return;
        }else{
          nextPaths.forEach((p) => {
            recur(p.position, walkedPostion);
          });
        }
      };

      console.log("q");
      recur([0, 0], []);
      console.log("wqwewq");

      const fastestPath = availablePaths.sort((a, b) => a.length - b.length)[0];

      console.log(fastestPath.length-1);

      console.timeEnd("=========part1=========");
    }),

  part2: () =>
    getExampleData(12, (data) => {
      console.time("=========part2=========");
      console.timeEnd("=========part2=========");
    }),

  combined: () =>
    getExampleData(12, (data) => {
      // part1
      console.time("=========combined=========");

      console.timeEnd("=========combined=========");
    }),
};
