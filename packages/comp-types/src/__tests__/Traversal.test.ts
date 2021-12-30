import Traversal from "../compounds/Traversal";
const { getCompliments } = Traversal();

describe("type node traversal", () => {
  it("finds a list of complimentary types", () => {
    const queryType = "fire";
    const results = getCompliments(queryType);
    expect(results.length).toBeGreaterThan(0);
  });
});
