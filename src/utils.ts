import fs from 'fs';

export const getData = (dayNumber: number, callback: (arr: string[]) => void) =>
  fs.readFile(`src/day${dayNumber}/input.txt`, "utf8", (err, data) => {
    if (err) throw err;
    const arr = data.toString().split("\n");
    callback(arr);
  });

export const getExampleData = (dayNumber: number, callback: (arr: string[]) => void) =>
  fs.readFile(`src/day${dayNumber}/input.example.txt`, "utf8", (err, data) => {
    if (err) throw err;
    const arr = data.toString().split("\n");
    callback(arr);
  });

/**
 * @description Chop an Array of String by a seperator
 * @example chopBy(["a", "b", "ss", "c", "d"], "ss")
 * -> [ [ 'a', 'b' ], [ 'c', 'd' ] ]
 */
export const chopBy = (arr: string[], seperator: string): string[][] =>
  arr.reduce<string[][]>((prev, el, i) => {
    if (i === 0) return [[el]];

    if (el === seperator) return [...prev, []];

    return [...prev.slice(0, -1), [...prev[prev.length - 1], el]];
  }, []);

export const chopAndMutate = <TData,VOutput>(
  arr: TData[],
  seperator: TData,
  incrementer: (prevSum: VOutput, curr: TData) => VOutput,
  dataTypeTransformer: (data:TData)=>VOutput
): VOutput[] => {
  console.time('chopAndMutate');

  let result: VOutput[] = [];
  let lastSeperatorIndex: number | undefined = undefined;
  
  arr.forEach((el, i) => {
    if (i === 0) {
      result = [dataTypeTransformer(el)];
      return;
    }
    if (el === seperator) {
      lastSeperatorIndex = i;
      return;
    }

    if (i - 1 === lastSeperatorIndex) {
      result = [...result, dataTypeTransformer(el)];
      return;
    }
    result[result.length - 1] = incrementer(result[result.length - 1], el);
    return;
  });

  console.timeEnd('chopAndMutate');

  return result;
};

/**
 * @description Get number of largest values in an array
 * @example getTopsOfNums([1, 5, 7, 3, 35, 5, 10, 12], 3)
 * -> [ 35, 10, 12 ]
 */
export const getTopsOfNums = (arr: number[], numOfTops: number): number[] =>{
  console.time("getTopsOfNums");
  
  const result =  arr.reduce<number[]>((prev, curr) => {
    if (prev.length === 0) return [curr];
    
    const isLargerThanSomeVal = prev.some((val) => val < curr);
    if (isLargerThanSomeVal) {
      if (prev.length >= numOfTops) {
        const minVal = Math.min(...prev);
        return [...prev.filter((val) => val !== minVal), curr];
      }
      return [...prev, curr];
    }
    return prev;
  }, []);
  
  console.timeEnd("getTopsOfNums");

  return result
}