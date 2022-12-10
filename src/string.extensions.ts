interface String {
  chopEnd(sizeToChop: number): string;
  chunk(chunkSize: number): string[];
}

String.prototype.chopEnd = function (sizeToChop: number) {
  return this.slice(0, this.length - sizeToChop);
};

String.prototype.chunk = function (chunkSize: number) {
  const regexChunk = new RegExp(`.{1,${chunkSize}}`, "g"); // '.' represents any character
  return this.match(regexChunk) ?? [];
};