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

/**
 * @description Get number of largest values in an array
 * @example getTopsOfNums([1, 5, 7, 3, 35, 5, 10, 12], 3)
 * -> [ 35, 10, 12 ]
 */
export const getTopsOfNums = (arr: number[], numOfTops: number): number[] =>
  arr.reduce<number[]>((prev, curr) => {
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
