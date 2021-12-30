import { baseTypes } from "../types";

describe("first principles", () => {
  it("is a defchart smoke test", () => {
    const { defChart, defenseChart } = baseTypes;
    const fireDefenses = defChart(defenseChart)("fire");
    const isArray = Array.isArray(fireDefenses);
    const firstItem = fireDefenses?.[0] ?? [];
    const [type, value] = firstItem;
    const typeIsString = typeof type === "string";
    const valueIsNumber = typeof value === "number";
    expect(isArray).toBe(true);
    expect(typeIsString).toBe(true);
    expect(valueIsNumber).toBe(true);
  });

  it("is a getValueLte smoke test", () => {
    const { getValueLte } = baseTypes;
    const isLteToOne = getValueLte(1)([1, 0.9]);
    const isNotLteToOne = getValueLte(1)([1, 1.1]);
    expect(isLteToOne).toBe(true);
    expect(isNotLteToOne).toBe(false);
  });

  it("is a getValueGte smoke test", () => {
    const { getValueGte } = baseTypes;
    const isGteToOne = getValueGte(1)([1, 1.1]);
    const isNotGteToOne = getValueGte(1)([1, 0.9]);
    expect(isGteToOne).toBe(true);
    expect(isNotGteToOne).toBe(false);
  });

  it("is a uniqueness smoke test", () => {
    const { unique } = baseTypes;
    const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const uniqueNums = unique([...oneToTen, 1, 2, 3]);
    expect(uniqueNums).toStrictEqual(oneToTen);
  });

  it("is a some-are-true test", () => {
    const { some } = baseTypes;
    const isTrue = some(true, false, true);
    const isFalse = some(false, false, false);
    expect(isTrue).toBe(true);
    expect(isFalse).toBe(false);
  });

  it('is a "isParallel" test', () => {
    const { byNonType } = baseTypes;
    const isParallel = byNonType(["fire", "water"])("grass");
    const isNotParallel = byNonType(["fire", "water"])("fire");
    expect(isParallel).toBe(true);
    expect(isNotParallel).toBe(false);
  });

  it('is an "asType" test', () => {
    const { asType } = baseTypes;
    const isFire = asType(["fire", 1]) === "fire";
    const isNotFire = asType(["fire", 1]) === "grass";
    expect(isFire).toBe(true);
    expect(isNotFire).toBe(false);
  });
});
