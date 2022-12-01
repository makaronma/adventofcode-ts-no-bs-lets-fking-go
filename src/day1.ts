import fs from "fs";
import { chopBy, chopAndMutate, getTopsOfNums } from "./utils";

// https://adventofcode.com/2022/day/1

export default () =>
  {
    console.time("day1")
    
    console.time("readFile")
    fs.readFile("day1.txt", "utf8", (err, data) => {
      if (err) throw err;
      console.timeEnd("readFile")
      console.time('cal')
      console.time("split")
      const calories = data.toString().split("\n");
      console.timeEnd("split")
      
      // console.time('ori')
      // const snackCalories = chopBy(calories, "");
      // const maxs = snackCalories.map((cs) => cs.reduce((a, b) => +a + +b, 0));
      // console.timeEnd('ori')
      
      const maxs = chopAndMutate<string, number>(
        calories,
        "",
        (prevSum, curr) => prevSum + +curr,
        (data) => +data
        );
        
        
        // const highestOne = Math.max(...maxs);
        // console.log({ highestOne });
        
        const top3 = getTopsOfNums(maxs, 3).reduce((a, b) => a + b, 0);
        console.log({ top3 });
        
        console.timeEnd('cal')
        console.timeEnd("day1")
      });
    }
