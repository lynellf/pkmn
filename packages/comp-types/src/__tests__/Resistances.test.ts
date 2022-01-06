import Resistances from "../elements/Resistances";

const { getResistances } = Resistances();

describe("Resistances", () => {
  it("lists resistances for a given type", () => {
    const fireResistances = getResistances("fire");
    const expected = ["fire", "grass", "ice", "bug", "fairy", "steel"];
    expect(fireResistances).toStrictEqual(expected);
  });
});
