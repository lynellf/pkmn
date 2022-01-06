import Defense from "../elements/Defense";

const { getCompliments } = Defense();

describe("defense", () => {
  it("gets counters for fire weaknessess", () => {
    const compliments = getCompliments("fire");
    expect(compliments.length).toBeTruthy();
  });
});
