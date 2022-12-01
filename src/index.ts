import fs from 'fs'

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  const array = data.toString().split("\n");
  console.log(array);
});