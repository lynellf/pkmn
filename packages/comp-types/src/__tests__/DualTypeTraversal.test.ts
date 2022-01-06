import { getCompliments } from "../compounds/DualTypeTraversal";
import type { MonsterType } from "../atoms/types";

describe("dual-type node traversal", () => {
  it("gets complimentary types for a poison-dark type pokemon", () => {
    const results = getCompliments(["poison", "dark"]);
    const expectedCompliments = ["water", "grass", "ice"];
    const includesExpectedCompliments = expectedCompliments.every((type) =>
      results.includes(type as MonsterType)
    );
    expect(includesExpectedCompliments).toBe(true);
  });
});
