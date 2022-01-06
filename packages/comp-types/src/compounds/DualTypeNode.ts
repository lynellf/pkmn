import type { MonsterType, TNode } from "../atoms/types";
import { product } from "../atoms/primitives";
import { getMatchup } from "../atoms/composites";
import { unique } from "../atoms/Iterable";
import { createNode } from "../compounds/Node";
import { Box } from "ezell-toolbelt";

interface IDualTypeNode {
  createMergedNode: (query: MonsterType[]) => TNode;
}

export function mergeWith(tableB: TNode) {
  return (tableA: TNode) =>
    new Map(
      [...tableA].map(([key, entry]) => [
        key,
        [...entry, ...(tableB.get(key) ?? [])],
      ])
    );
}

export function checkWeaknesses(defTypes: MonsterType[]) {
  return (atkTypes: MonsterType[]) =>
    unique(
      atkTypes.filter(
        (atkType) =>
          defTypes.reduce(
            (acc, defType) => product(acc)(getMatchup(defType)(atkType)),
            1
          ) > 1
      )
    );
}

export function checkResistances(defTypes: MonsterType[]) {
  return (atkTypes: MonsterType[]) =>
    unique(
      atkTypes.filter(
        (atkType) =>
          defTypes.reduce(
            (acc, defType) => product(acc)(getMatchup(defType)(atkType)),
            1
          ) < 1
      )
    );
}

export function checkNeutral(defTypes: MonsterType[]) {
  return (atkTypes: MonsterType[]) =>
    unique(
      atkTypes.filter(
        (atkType) =>
          defTypes.reduce(
            (acc, defType) => product(acc)(getMatchup(defType)(atkType)),
            1
          ) === 1
      )
    );
}

export function filterWeaknesses(node: TNode) {
  return node.set(
    "weaknesses",
    checkWeaknesses(node.get("self"))(node.get("weaknesses"))
  );
}

export function filterResistances(node: TNode) {
  return node.set(
    "resistances",
    checkResistances(node.get("self"))(node.get("resistances"))
  );
}

export function filterNeutrals(node: TNode) {
  return node.set(
    "neutral",
    checkNeutral(node.get("self"))(node.get("neutral"))
  );
}

export function filterResistedBy(node: TNode) {
  return node.set(
    "resistedBy",
    checkResistances(node.get("resistedBy"))(node.get("self"))
  );
}

export const mergeNodes = (outputNode: TNode, query: MonsterType) => {
  return Box(createNode(query))
    .map(mergeWith(outputNode))
    .map(filterWeaknesses)
    .map(filterResistances)
    .map(filterNeutrals).value;
};

export const createMergedNode = (query: MonsterType[]) =>
  query.reduce(mergeNodes, new Map() as TNode);

export default (): IDualTypeNode => {
  return { createMergedNode };
};
