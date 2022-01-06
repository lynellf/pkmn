import type { Types as MonsterType } from "../types";

export type TGetWeaknesses = (type: MonsterType) => MonsterType[];

export type TFrequencyTable = Map<MonsterType, number>;

export interface IUserInputDeps {
  getWeaknesses: TGetWeaknesses;
}

export const byFreqency = (
  table: TFrequencyTable,
  weakness: MonsterType
): TFrequencyTable => {
  const count = table.get(weakness) ?? 0;
  table.set(weakness, count + 1);
  return table;
};

export const byThreshold =
  (max: number) =>
  ([_, count]: [MonsterType, number]) =>
    count >= max;

export const inspectWeaknesses =
  (getWeaknesses: TGetWeaknesses) =>
  (userInput: MonsterType[]): [boolean, MonsterType[], MonsterType[]] => {
    const weaknesses = userInput.map(getWeaknesses);
    const allWeaknesses = weaknesses.flat();
    const frequencyTable: TFrequencyTable = allWeaknesses.reduce(
      byFreqency,
      new Map()
    );

    const canContinue = !(
      Array.from(frequencyTable).find(byThreshold(2)) !== undefined
    );

    const offendingTypes = weaknesses
      .map((weaknessArr, i) =>
        weaknessArr.find((type) => frequencyTable.get(type) ?? -1 >= 2) !==
        undefined
          ? i
          : -1
      )
      .filter((i) => i !== -1)
      .map((i) => userInput[i]);

    const overlappingWeaknesses = Array.from(frequencyTable)
      .filter(byThreshold(2))
      .map(([type]) => type);

    return [canContinue, offendingTypes, overlappingWeaknesses];
  };

interface IUserInput {
  checkUserInput: (
    userInput: MonsterType[]
  ) => [boolean, MonsterType[], MonsterType[]];
}

export default (deps: IUserInputDeps): IUserInput => {
  const checkUserInput = inspectWeaknesses(deps.getWeaknesses);
  return { checkUserInput };
};
