import { findIndexForAToTouchB, isTouching } from ".";

describe("test find index to touch", () => {
  test("vertical", () => {
    expect(findIndexForAToTouchB([0, 0], [0, 2])).toEqual([0, 1]);
  });
  test("horizontal", () => {
    expect(findIndexForAToTouchB([0, 0], [2, 0])).toEqual([1, 0]);
  });

  test("diagonalUpRight1", () => {
    expect(findIndexForAToTouchB([0, 0], [1, 2])).toEqual([1, 1]);
  });
  test("diagonalUpRight2", () => {
    expect(findIndexForAToTouchB([0, 0], [2, 1])).toEqual([1, 1]);
  });
  test("diagonalUpLeft1", () => {
    expect(findIndexForAToTouchB([0, 0], [-1, 2])).toEqual([-1, 1]);
  });
  test("diagonalUpLeft2", () => {
    expect(findIndexForAToTouchB([0, 0], [-2, 1])).toEqual([-1, 1]);
  });
  test("diagonalDownLeft1", () => {
    expect(findIndexForAToTouchB([0, 0], [-1, -2])).toEqual([-1, -1]);
  });
  test("diagonalDownLeft2", () => {
    expect(findIndexForAToTouchB([0, 0], [-2, -1])).toEqual([-1, -1]);
  });
  test("diagonalDownRight1", () => {
    expect(findIndexForAToTouchB([0, 0], [2, -1])).toEqual([1, -1]);
  });
  test("diagonalDownRight2", () => {
    expect(findIndexForAToTouchB([0, 0], [1, -2])).toEqual([1, -1]);
  });
});


describe("test is touching", () => {
  test("is touching", () => {
    expect(isTouching([-1, -1], [0, 0])).toEqual(true);
    expect(isTouching([1, 1], [0, 0])).toEqual(true);
    expect(isTouching([-1, 1], [0, 0])).toEqual(true);
    expect(isTouching([1, -1], [0, 0])).toEqual(true);
  });
  test("is not touching", () => {
    expect(isTouching([2, 1], [0, 0])).toEqual(false);
    expect(isTouching([-2, 1], [0, 0])).toEqual(false);
    expect(isTouching([1, 2], [0, 0])).toEqual(false);
    expect(isTouching([1, -2], [0, 0])).toEqual(false);
  });
});