import "../number.extensions";
import "../string.extensions";

describe("test number", () => {
  test("Number.loopMapToString", () => {
    const num = 5
    expect(num.loopMapToString(() => "#")).toEqual("#####");
    expect(num.loopMapToString((index) => `${index}`)).toEqual("01234");
  });
});

describe("Test String", () => {
  test("String.chopEnd", () => {
    expect("123456789".chopEnd(2)).toEqual("1234567");
  });
  test("String.chunk", () => {
    expect("123456789".chunk(2)).toEqual(["12", "34", "56", "78", "9"]);
  });
});