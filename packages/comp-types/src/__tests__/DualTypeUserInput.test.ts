import { checkUserInput } from "../compounds/DualTypeUserInput";

describe("user input validation", () => {
  it("passes", () => {
    const [isValid] = checkUserInput([["fire"], ["water"]]);
    expect(isValid).toBe(true);
  });

  it("passes a pair of dual-types", () => {
    const [isValid] = checkUserInput([
      ["water", "flying"],
      ["fighting", "psychic"],
    ]);
    expect(isValid).toBe(true);
  });

  it("fails a pair of dual-types", () => {
    const [isValid] = checkUserInput([
      ["water", "flying"],
      ["grass", "ice"],
    ]);
    expect(isValid).toBe(false);
  });

  it("fails", () => {
    const [isValid] = checkUserInput([["flying"], ["water"]]);
    expect(isValid).toBe(false);
  });

  it("fails with context", () => {
    const [isValid, offendingTypes, sharedWeakness] = checkUserInput([
      ["flying"],
      ["water"],
      ["fighting"],
    ]);
    const expectedOffenders = [["flying"], ["water"]];
    const expectedWeaknesses = ["electric"];
    expect(isValid).toBe(false);
    expect(expectedOffenders).toStrictEqual(offendingTypes);
    expect(expectedWeaknesses).toStrictEqual(sharedWeakness);
  });

  it("fails a pair of dual-types with context", () => {
    const [isValid, offendingTypes, sharedWeakness] = checkUserInput([
      ["water", "flying"],
      ["grass", "ice"],
    ]);
    const expectedOffenders = [
      ["water", "flying"],
      ["grass", "ice"],
    ];
    const expectedWeaknesses = ["rock"];
    expect(isValid).toBe(false);
    expect(expectedOffenders).toStrictEqual(offendingTypes);
    expect(expectedWeaknesses).toStrictEqual(sharedWeakness);
  });
});
