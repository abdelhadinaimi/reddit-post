import { isEqual } from "../../src/utils/compare";


describe("isEqual()",() => {
 
  it("returns true if 2 arrays are equal", () => {
    expect(isEqual([],[])).toBe(true);
    const a1 = new Array(5).fill(1);
    const a2 = new Array(5).fill(1);
    expect(isEqual(a1,a2)).toBe(true);
  });
  
});