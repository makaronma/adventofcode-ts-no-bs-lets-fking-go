import { chunk } from "lodash";
import { getData, getExampleData } from "../utils";

const charToScore = (char: string): number => {
  const charCode = char.charCodeAt(0);
  if (charCode < "a".charCodeAt(0)) {
    // it is upper case
    return charCode - "A".charCodeAt(0) + 27;
  }

  return charCode - "a".charCodeAt(0) + 1;
}

const getCommonCharsOfTwoString = (s1: string, s2: string): string[] => {
  const chars: string[] = [];
  s1.split("").forEach((char) => {
    if (s2.includes(char)) chars.push(char);
  });
  return chars;
};


export default {
  part1: () =>
    getData(3, (data) => {
      console.time("=========part1=========");
      let sumScore = 0;

      for (const d of data) {
        const left = d.slice(0, d.length / 2);
        const right = d.slice(d.length / 2);
        let score = 0;

        right.split("").forEach((char) => {
          if (left.includes(char)) {
            score = charToScore(char);
          }
        });

        sumScore += score;
      }

      console.log({ sumScore });
      console.timeEnd("=========part1=========");
    }),

  part2: () =>
    getData(3, (data) => {
      console.time("=========part2=========");
      let sumScore = 0;

      for (const groupRows of chunk(data, 3)) {
        let commonCharsInGroup: string[] = [];

        for (let index = 1; index < groupRows.length; index++) {
          commonCharsInGroup.push(
            getCommonCharsOfTwoString(groupRows[0], groupRows[index]).toString()
          );
        }
        const finalCommonChar = getCommonCharsOfTwoString(
          commonCharsInGroup[0],
          commonCharsInGroup[1]
        ).find((c) => c !== ",");
        if (finalCommonChar) {
          sumScore += charToScore(finalCommonChar);;
        }
      }
      console.log({ sumScore });
      console.timeEnd("=========part2=========");
    }),

  combined: () =>
    getExampleData(3, (data) => {
      // part1
      console.time("=========combined=========");

      console.log({ data });
      console.timeEnd("=========combined=========");
    }),
};
