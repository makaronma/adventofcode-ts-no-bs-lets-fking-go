interface Number {
  loopMapToString(fn: (index?:number) => string): string;
}

Number.prototype.loopMapToString = function (fn: (index?: number) => string) {
  let output: string = "";
  for (let i = 0; i < this; i++) {
    output += fn(i)
  }
  return output;
};