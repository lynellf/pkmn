import Node from "../compounds/Node";

const { create } = Node();

describe("type node creation", () => {
  it("should create a node", () => {
    const node = create("fairy");
    const strengths = node.get("strengths") ?? [];
    const weaknesses = node.get("weaknesses") ?? [];
    const resistances = node.get("resistances") ?? [];
    const resistedBy = node.get("resistedBy") ?? [];

    expect(strengths.length).toBeGreaterThan(0);
    expect(weaknesses.length).toBeGreaterThan(0);
    expect(resistances.length).toBeGreaterThan(0);
    expect(resistedBy.length).toBeGreaterThan(0);
  });
});
