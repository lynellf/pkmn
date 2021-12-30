import { createMergedNode, filterWeaknesses } from "../compounds/DualTypeNode";
import { createNode } from "../compounds/Node";
import { difference } from "../atoms/Iterable";

describe("type matchup filtering", () => {
  it("filters out appropriate weaknesses", () => {
    const grassType = createNode("grass");
    const grassWeaknesses = [...grassType.get("weaknesses")];
    const filtered = filterWeaknesses(grassType).get("weaknesses");
    expect(filtered).toStrictEqual(grassWeaknesses);
  });
});

describe("filtering out overlapping defensive/offensive neutrals", () => {
  it("finds the difference between two arrays", () => {
    const sharedWeaknesses = ["fighting", "ghost", "dark"];
    const sharedResistances = ["fighting", "ghost", "normal", "poison", "bug"];

    const diff = difference(sharedWeaknesses)(sharedResistances);
    const isEqual = ["dark", "normal", "poison", "bug"].length === diff.length;

    expect(isEqual).toBe(true);
  });

  it("filters out clashing defensive weaknesses and resistances", () => {
    const node = createMergedNode(["normal", "ghost"]);
    const updatedWeaknesses = node.get("weaknesses");
    expect(updatedWeaknesses.length).toBe(1);
  });
});

describe("creating nodes for possible multi-type pokemon", () => {
  it("creates a node for a single-type pokemon", () => {
    const node = createMergedNode(["water"]);
    const weaknesses = node.get("weaknesses") ?? [];
    const strengths = node.get("strengths") ?? [];
    const resistances = node.get("resistances") ?? [];

    expect(weaknesses.length).toBeGreaterThan(0);
    expect(strengths.length).toBeGreaterThan(0);
    expect(resistances.length).toBeGreaterThan(0);
  });

  it("creates a node for a dual-type pokemon", () => {
    const node = createMergedNode(["water", "flying"]);
    const weaknesses = node.get("weaknesses");
    const strengths = node.get("strengths");
    const resistances = node.get("resistances");

    const expectedWeaknesses = ["electric", "rock"];
    const expectedStrengths = [
      "fire",
      "ground",
      "rock",
      "grass",
      "fighting",
      "bug",
    ];
    const expectedResistances = [
      "fire",
      "water",
      "steel",
      "fighting",
      "ground",
      "bug",
    ];

    expect(weaknesses.length).toBe(expectedWeaknesses.length);
    expect(resistances.length).toBe(expectedResistances.length);
    expect(strengths.length).toBe(expectedStrengths.length);
  });
});
