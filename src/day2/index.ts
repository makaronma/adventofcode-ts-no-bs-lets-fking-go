import { getData, getExampleData } from "../utils";

const abc = ["A", "B", "C"] as const;
const xyz = ["X", "Y", "Z"] as const;

type LEFT = typeof abc[number];
type RIGHT = typeof xyz[number];

const scorePair = {
  win: 6,
  draw: 3,
  lose: 0,
};

const getCharBaseScore = (right: RIGHT): number => xyz.indexOf(right) + 1;

const getRequiredCharToWin = (left: LEFT): RIGHT => {
  const i = abc.indexOf(left) + 1;
  return xyz[i > xyz.length - 1 ? 0 : i];
};

const getRequiredCharToLose = (left: LEFT): RIGHT => {
  const i = abc.indexOf(left) - 1;
  return xyz[i < 0 ? xyz.length - 1 : i];
};
const getRequiredCharToDraw = (left: LEFT): RIGHT => {
  return xyz[abc.indexOf(left)];
};

const getResultScore = (left: LEFT, right: RIGHT): number => {
  // draw
  if (getRequiredCharToDraw(left) === right) {
    return scorePair.draw;
  }
  // lose
  if (getRequiredCharToLose(left) === right) {
    return scorePair.lose;
  }
  // win
  if (getRequiredCharToWin(left) === right) {
    return scorePair.win;
  }
  return 0.1;
};

export default {
  part1: () =>
    getData(2, (data) => {
      console.time("part1");
      let sumScore = 0;
      data.forEach((d) => {
        const [left, right] = d.split(" ") as [LEFT, RIGHT];
        const baseScore = getCharBaseScore(right);
        const resultScore = getResultScore(left, right);
        sumScore += baseScore + resultScore;
      });
      console.log({ part1: sumScore });
      console.timeEnd("part1");
    }),

  part2: () =>
    getData(2, (data) => {
      console.time("part2");
      let sumScore = 0;
      data.forEach((d) => {
        const [left, right] = d.split(" ") as [LEFT, RIGHT];
        if (right === "X") {
          const newChar = getRequiredCharToLose(left);
          sumScore += scorePair.lose + getCharBaseScore(newChar);
        } else if (right === "Y") {
          const newChar = getRequiredCharToDraw(left);
          sumScore += scorePair.draw + getCharBaseScore(newChar);
        } else if (right === "Z") {
          const newChar = getRequiredCharToWin(left);
          sumScore += scorePair.win + getCharBaseScore(newChar);
        }
      });
      console.log({ part2: sumScore });
      console.timeEnd("part2");
    }),

  combined: () =>
    getData(2, (data) => {
      // part1
      console.time("combined");
      let sumScorePart1 = 0;
      let sumScorePart2 = 0;
      data.forEach((d) => {
        const [left, right] = d.split(" ") as [LEFT, RIGHT];
        const baseScore = getCharBaseScore(right);
        const resultScore = getResultScore(left, right);
        sumScorePart1 += baseScore + resultScore;

        // part2
        if (right === "X") {
          const newChar = getRequiredCharToLose(left);
          sumScorePart2 += scorePair.lose + getCharBaseScore(newChar);
        } else if (right === "Y") {
          const newChar = getRequiredCharToDraw(left);
          sumScorePart2 += scorePair.draw + getCharBaseScore(newChar);
        } else if (right === "Z") {
          const newChar = getRequiredCharToWin(left);
          sumScorePart2 += scorePair.win + getCharBaseScore(newChar);
        }
      });

      console.log({ part1: sumScorePart1 });
      console.log({ part2: sumScorePart2 });
      console.timeEnd("combined");
    }),
};
