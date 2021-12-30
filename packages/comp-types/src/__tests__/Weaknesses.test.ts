import Weaknesses from "../elements/Weaknesses";

const { getWeaknesses, getAllWeaknesses } = Weaknesses();

describe("weaknesses", () => {
  it("lists weaknesses for a given type", () => {
    const weaknessess = getWeaknesses("fire");
    const expected = ["water", "ground", "rock"];
    expect(weaknessess).toStrictEqual(expected);
  });

  it("lists weaknesses for multiple types", () => {
    const weaknessess = getAllWeaknesses(["fire", "grass"]);
    const expected = [
      "water",
      "ground",
      "rock",
      "fire",
      "ice",
      "poison",
      "flying",
      "bug",
    ];
    expect(weaknessess).toStrictEqual(expected);
  });

  it("lists water weaknesses", () => {
    const weaknessess = getWeaknesses("water");
    const expected = ["electric", "grass"];
    expect(weaknessess).toStrictEqual(expected);
  });

  it("lists electric weaknessess", () => {
    const weaknessess = getWeaknesses("electric");
    const expected = ["ground"];
    expect(weaknessess).toStrictEqual(expected);
  });
});
