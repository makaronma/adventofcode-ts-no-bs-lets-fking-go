import fs from "fs";
import { chopAndMutate, getTopsOfNums } from "../utils";

export default () =>
  {
    fs.readFile("day1.txt", "utf8", (err, data) => {
      if (err) throw err;
      const calories = data.toString().split("\n");

      const maxs = chopAndMutate<string, number>(
        calories,
        "",
        (prevSum, curr) => prevSum + +curr,
        (data) => +data
      );

      const top3 = getTopsOfNums(maxs, 3).reduce((a, b) => a + b, 0);
      console.log({ top3 });
    });
  }
