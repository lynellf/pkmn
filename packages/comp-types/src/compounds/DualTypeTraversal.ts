import type { MonsterType, TNode } from "../atoms/types";
import { byCompliment } from "./Traversal";
import { createMergedNode } from "./DualTypeNode";
import { Box } from "ezell-toolbelt";

export interface IDualTypeTraversal {
  getCompliments: (
    query: MonsterType[],
    index?: number,
    queries?: MonsterType[][]
  ) => MonsterType[];
}

export function getMergedCompliments(queries: MonsterType[][]) {
  return (node: TNode) =>
    Box(node.get("weaknesses")).map((weaknesses) =>
      weaknesses.reduce(byCompliment, queries.flat())
    ).value;
}

export const getCompliments = (
  query: MonsterType[],
  _ = 0,
  queries: MonsterType[][] = []
): MonsterType[] =>
  Box(createMergedNode(query)).map(getMergedCompliments([query, ...queries]))
    .value;

export default (): IDualTypeTraversal => {
  return { getCompliments };
};
