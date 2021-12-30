import type { MonsterType, TNode } from "../atoms/types";
import { createMergedNode } from "./DualTypeNode";
import { flatten, toArray } from "../atoms/Iterable";
import { Box } from "ezell-toolbelt";

type TFrequencyTable = Map<MonsterType, number>;

type TContext = {
  frequencyTable: TFrequencyTable;
  weaknesses: MonsterType[][];
  overlappingWeaknesses: MonsterType[];
  offendingTypes: MonsterType[][];
  canContinue: boolean;
};

interface IDualTypeUserInput {
  checkUserInput: (
    query: MonsterType[][]
  ) => [boolean, MonsterType[][], MonsterType[]];
}

export const byFrequency = (
  table: TFrequencyTable,
  weakness: MonsterType
): TFrequencyTable => {
  const count = table.get(weakness) ?? 0;
  table.set(weakness, count + 1);
  return table;
};

export const byThreshold =
  (max: number) =>
  ([_, count]) =>
    count >= max;

export function createNode(types: MonsterType[]) {
  return createMergedNode(types);
}

export function getWeaknessesFromNode(node: TNode) {
  return node.get("weaknesses");
}

export function getFreqTable(types: MonsterType[][]) {
  return Box(types)
    .map((arr) => flatten(arr))
    .map((arr) => arr.reduce(byFrequency, new Map() as TFrequencyTable)).value;
}

export function checkFrequencies(table: TFrequencyTable) {
  return (threshold: number) =>
    !Boolean(
      Box(table)
        .map((map) => toArray(map))
        .map((table) => table.find(byThreshold(threshold))).value
    );
}

export function getOffendingTypes(weaknesses: MonsterType[][]) {
  return (frequencyTable: TFrequencyTable) => (userInput: MonsterType[][]) =>
    Box(weaknesses).map((arr) =>
      arr
        .map((weaknessArr, i) =>
          weaknessArr.find((type) => frequencyTable.get(type) >= 2) ? i : -1
        )
        .filter((i) => i > -1)
        .map((i) => userInput[i])
    ).value;
}

export function getOverlappingWeaknesses(frequencyTable: TFrequencyTable) {
  return Box(frequencyTable)
    .map((table) => toArray(table))
    .map((arr) => arr.filter(byThreshold(2)).map(([type]) => type)).value;
}

export function setCtx(newCtx: Partial<TContext>) {
  return (currentCtx: Partial<TContext>) => ({
    ...currentCtx,
    ...newCtx,
  });
}

export function withWeaknesses(userInput: MonsterType[][]) {
  return (ctx: Partial<TContext>) => ({
    ...ctx,
    weaknesses: userInput.map(createNode).map(getWeaknessesFromNode),
  });
}

export function withFrequencyTable(ctx: Partial<TContext>) {
  return {
    ...ctx,
    frequencyTable: getFreqTable(ctx.weaknesses),
  };
}

export function withCanContinue(ctx: Partial<TContext>) {
  return {
    ...ctx,
    canContinue: checkFrequencies(ctx.frequencyTable)(2),
  };
}

export function withOffendingTypes(userInput: MonsterType[][]) {
  return (ctx: Partial<TContext>) => ({
    ...ctx,
    offendingTypes: getOffendingTypes(ctx.weaknesses)(ctx.frequencyTable)(
      userInput
    ),
  });
}

export function withOverlappingWeaknesses(ctx: Partial<TContext>) {
  return {
    ...ctx,
    overlappingWeaknesses: getOverlappingWeaknesses(ctx.frequencyTable),
  };
}

export const checkUserInput = (
  userInput: MonsterType[][]
): [boolean, MonsterType[][], MonsterType[]] => {
  const { canContinue, offendingTypes, overlappingWeaknesses } = Box(
    {} as Partial<TContext>
  )
    .map(withWeaknesses(userInput))
    .map(withFrequencyTable)
    .map(withCanContinue)
    .map(withOffendingTypes(userInput))
    .map(withOverlappingWeaknesses).value as TContext;

  return [canContinue, offendingTypes, overlappingWeaknesses];
};

export default (): IDualTypeUserInput => {
  return { checkUserInput };
};
