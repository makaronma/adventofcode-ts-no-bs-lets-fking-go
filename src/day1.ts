import fs from "fs";
import { chopBy, getTopsOfNums } from "./utils";

// https://adventofcode.com/2022/day/1

export default () =>
  {
    const startTimeInMs = new Date().getTime();
    fs.readFile("day1.txt", "utf8", (err, data) => {
      if (err) throw err;

      const calories = data.toString().split("\n");

      const snackCalories = chopBy(calories, "");

      const maxs = snackCalories.map((cs) => cs.reduce((a, b) => +a + +b, 0));
      const highestOne = Math.max(...maxs);
      console.log({ highestOne });

      const top3 = getTopsOfNums(maxs, 3).reduce((a, b) => a + b, 0);
      console.log({ top3 });

      const endTimeInMs = new Date().getTime();
      const durationInMs = endTimeInMs - startTimeInMs;
      console.log({ durationInMs });
    });
  }
