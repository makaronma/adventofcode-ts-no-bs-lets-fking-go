import { chunk } from "lodash";
import { getData, getExampleData } from "../utils";
const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const getCharScore = (char: string): number => alphabet.indexOf(char) + 1;


function getCommonCharsOfTwoString(s1:string, s2:string) {
  const chars: string[] = [];
  s1.split("").forEach((char) => {
    if (s2.includes(char)) chars.push(char);
  });
  return chars;
}


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
            score = getCharScore(char);
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
          const thisGroupScore = getCharScore(finalCommonChar);
          sumScore += thisGroupScore;
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
