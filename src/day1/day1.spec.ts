import { getExampleData } from './../utils';
const { chopBy } =require("../utils")

const root = process.cwd()
describe('test chopby', () => {
  test('root', () => {
    getExampleData(1, (data) => {
      console.log(data)
      // expect(chopBy(["a", "", "b"], "")).toStrictEqual([["a"], ["b"]]);
    });
  })
})