import type { MonsterType, TNode } from "../atoms/types";
import { createNode } from "../compounds/Node";
import { unique, intersection, union } from "../atoms/Iterable";
import { Box } from "ezell-toolbelt";

export function getWeaknesses(node: TNode) {
  return node.get("weaknesses");
}

export function isLengthGt<T>(query: number) {
  return (arr: T[]) => arr.length > query;
}

export const bySharedWeaknesses =
  (badMatchups: MonsterType[]) => (compliment: MonsterType) =>
    Boolean(
      Box(createNode(compliment))
        .map(getWeaknesses)
        .map((arr) => intersection(arr)(badMatchups))
        .map(isLengthGt(0)).value
    );

export const byNearestGoodMatchup =
  (results: MonsterType[]) => (potentialCompliment: MonsterType) =>
    Boolean(
      Box(createNode(potentialCompliment))
        .map(getWeaknesses)
        .map(unique)
        .map(isLengthGt(0)).value
    );

export const byCompliment = (results: MonsterType[], badMatchup: MonsterType) =>
  Box(createNode(badMatchup))
    .map(getWeaknesses)
    .map((arr) => arr.filter(byNearestGoodMatchup(results)))
    .map(union(results)).value ?? results;

export const getCompliments = (
  query: MonsterType,
  _ = 0,
  queries: MonsterType[] = []
): MonsterType[] =>
  Box(createNode(query))
    .map(getWeaknesses)
    .map((arr) => arr.reduce(byCompliment, [query, ...queries])).value ?? [];

export interface ITraversal {
  byCompliment: (
    results: MonsterType[],
    weakness: MonsterType
  ) => MonsterType[];
  getCompliments: (
    query: MonsterType,
    index?: number,
    queries?: MonsterType[]
  ) => MonsterType[];
}

export default (): ITraversal => {
  return { byCompliment, getCompliments };
};
