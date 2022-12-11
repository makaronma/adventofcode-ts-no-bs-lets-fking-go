import { getData, getExampleData, getExampleData2 } from "../utils";
import "../number.extensions";
import "../string.extensions";


const getMonkeyFn = (fnStr: string): ((num: number) => number) => {
  const [operatorStr, valStr] = fnStr.split(" ");
  const val = valStr === "old" ? undefined : Number(valStr);

  if (operatorStr === "*") {
    return (num: number) => num * (val ?? num);
  }
  if (operatorStr === "+") {
    return (num: number) => num + (val ?? num);
  }
  if (operatorStr === "-") {
    return (num: number) => num - (val ?? num);
  }
  if (operatorStr === "/") {
    return (num: number) => num / (val ?? num);
  }
  
  return (num: number) => num;
};

interface Monkey {
  items: number[];
  operation: (item:number) => number; // new item val
  divisible: number;
  truePass: number;
  falsePass: number;
  inspectCount: number;
}

export default {
  part1: () =>
    getData(11, (data) => {
      console.time("=========part1=========");
      const monkeys: Monkey[] = [];
      let currentMonkeyIndex = 0;

      // tmp
      let items: Monkey["items"] = [];
      let operation: Monkey["operation"] = (item: number) => item;
      let divisible: Monkey["divisible"] = 0;
      let truePass: Monkey["truePass"] = 0;
      let falsePass: Monkey["falsePass"] = 0;
      let inspectCount: Monkey["inspectCount"] = 0;

      for (const d of data) {
        if (d.includes("Monkey")) {
          const [, index] = d.split(" ");
          currentMonkeyIndex = Number(index[0]);
        }

        if (d.includes("Starting items:")) {
          items = d.split(": ")[1].split(", ").map(Number);
        }
        if (d.includes("= old ")) {
          operation = getMonkeyFn(d.split("= old ")[1]);
        }
        if (d.includes("Test")) {
          divisible = Number(d.split("divisible by ")[1]);
        }
        if (d.includes("true")) {
          truePass = Number(d.split("monkey ")[1]);
        }
        if (d.includes("false")) {
          falsePass = Number(d.split("monkey ")[1]);
          monkeys[currentMonkeyIndex] = { items, operation, divisible, truePass, falsePass, inspectCount };
        }
      }

      for (let round = 0; round < 20; round++) {
        
        for (const m of monkeys) {
          let indexToRemove: number[] = [];
          for (let i = 0; i < m.items.length; i++) {
            m.items[i] = Math.floor(m.operation(m.items[i]) / 3);
            
            const output = m.items.slice(i, i + 1)[0];
            monkeys[m.items[i] % m.divisible ? m.falsePass : m.truePass].items.push(output);
            indexToRemove.push(i)
          }
          m.inspectCount += m.items.length;
          m.items = m.items.filter((v, i) => !indexToRemove.includes(i));
        }
      }

      const sorted = monkeys.sort((a, b) => (a.inspectCount > b.inspectCount) ? -1 : 1)
      console.log(sorted[0].inspectCount*sorted[1].inspectCount);
      console.timeEnd("=========part1=========");
    }),

  part2: () =>
    getData(11, (data) => {
      console.time("=========part2=========");
      console.time("=========part1=========");
      const monkeys: Monkey[] = [];
      let currentMonkeyIndex = 0;

      // tmp
      let items: Monkey["items"] = [];
      let operation: Monkey["operation"] = (item: number) => item;
      let divisible: Monkey["divisible"] = 0;
      let truePass: Monkey["truePass"] = 0;
      let falsePass: Monkey["falsePass"] = 0;
      let inspectCount: Monkey["inspectCount"] = 0;

      for (const d of data) {
        if (d.includes("Monkey")) {
          const [, index] = d.split(" ");
          currentMonkeyIndex = Number(index[0]);
        }

        if (d.includes("Starting items:")) {
          items = d.split(": ")[1].split(", ").map(Number);
        }
        if (d.includes("= old ")) {
          operation = getMonkeyFn(d.split("= old ")[1]);
        }
        if (d.includes("Test")) {
          divisible = Number(d.split("divisible by ")[1]);
        }
        if (d.includes("true")) {
          truePass = Number(d.split("monkey ")[1]);
        }
        if (d.includes("false")) {
          falsePass = Number(d.split("monkey ")[1]);
          monkeys[currentMonkeyIndex] = { items, operation, divisible, truePass, falsePass, inspectCount };
        }
      }
      const dd = monkeys.reduce((s, m) => m.divisible * s, 1);

      for (let round = 0; round < 10000; round++) {
        
        for (const m of monkeys) {
          let indexToRemove: number[] = [];
          for (let i = 0; i < m.items.length; i++) {
            m.items[i] = Math.floor(m.operation(m.items[i]))%dd;
            
            const output = m.items.slice(i, i + 1)[0];
            monkeys[m.items[i] % m.divisible ? m.falsePass : m.truePass].items.push(output);
            indexToRemove.push(i)
          }
          m.inspectCount += m.items.length;
          m.items = m.items.filter((v, i) => !indexToRemove.includes(i));
        }
      }

      const sorted = monkeys.sort((a, b) => (a.inspectCount > b.inspectCount) ? -1 : 1)
      console.log(sorted);
      console.log(sorted[0].inspectCount*sorted[1].inspectCount);
      console.timeEnd("=========part2=========");
    }),

  combined: () =>
    getExampleData(11, (data) => {
      // part1
      console.time("=========combined=========");

      console.timeEnd("=========combined=========");
    }),
};
