import type { MonsterType, TNode } from "../atoms/types";
import { unique, intersection, flatten, difference } from "../atoms/Iterable";
import { createMergedNode } from "./DualTypeNode";
import { createNode } from "./Node";
import { Box } from "ezell-toolbelt";

type TCtx = {
  neutral: MonsterType[];
  resistedBy: MonsterType[];
  safeCompliments: MonsterType[][];
  offensiveCompliments: MonsterType[];
  advantages: MonsterType[];
  node: TNode;
  weaknesses: MonsterType[];
};

export function getStrengthsFromNode(node: TNode) {
  return node.get("strengths");
}

export function getNeutralFromNode(node: TNode) {
  return node.get("neutral");
}

export function getResistedByFromNode(node: TNode) {
  return node.get("resistedBy");
}

export function getWeaknessesFromNode(node: TNode) {
  return node.get("weaknesses");
}

export function getNode(query: MonsterType[][]) {
  return Box(query).flatMap(flatten).flatMap(createMergedNode).value;
}

export function getAdvantages(node: TNode) {
  return Box(node).flatMap(getStrengthsFromNode).value;
}

export function getResistedBy(node: TNode) {
  return Box(node).flatMap(getResistedByFromNode).value;
}

export function getNeutral(node: TNode) {
  return Box(node).flatMap(getNeutralFromNode).value;
}

export function getOffensiveCompliments(resistedBy: MonsterType[]) {
  return Box(resistedBy)
    .map((arr) =>
      arr.map(
        (type) => Box(type).map(createNode).map(getWeaknessesFromNode).value
      )
    )
    .map(unique).value as MonsterType[];
}

export function getSafeCompliments(weaknesses: MonsterType[]) {
  return (offensiveCompliments: MonsterType[]) =>
    offensiveCompliments
      .filter(
        (type) =>
          !Boolean(
            Box(type)
              .map(createNode)
              .map(getWeaknessesFromNode)
              .map(intersection(weaknesses))
              .map((arr) => arr.length > 0).value
          )
      )
      .map((type) => [type]);
}

export function withNode(query: MonsterType[][]) {
  return (ctx: Partial<TCtx>) => ({
    ...ctx,
    node: getNode(query),
  });
}

export function withNeutral(ctx: Partial<TCtx>) {
  return {
    ...ctx,
    neutral: getNeutral(ctx.node),
  };
}

export function withAdvantages(ctx: Partial<TCtx>) {
  return {
    ...ctx,
    advantages: getAdvantages(ctx.node),
  };
}

export function withResistedBy(ctx: Partial<TCtx>) {
  return {
    ...ctx,
    resistedBy: difference(getResistedBy(ctx.node))([
      ...ctx.advantages,
      ...ctx.neutral,
    ]),
  };
}

function withOffensiveCompliments(ctx: Partial<TCtx>) {
  return {
    ...ctx,
    offensiveCompliments: getOffensiveCompliments(ctx.resistedBy),
  };
}

function withWeaknesses(ctx: Partial<TCtx>) {
  return {
    ...ctx,
    weaknesses: getWeaknessesFromNode(ctx.node),
  };
}

function withSafeCompliments(ctx: Partial<TCtx>) {
  return {
    ...ctx,
    safeCompliments: getSafeCompliments(ctx.weaknesses)(
      ctx.offensiveCompliments
    ),
  };
}

export const findCoverageGaps = (
  query: MonsterType[][]
): [MonsterType[], MonsterType[][]] => {
  const { resistedBy, safeCompliments } = Box({} as Partial<TCtx>)
    .map(withNode(query))
    .map(withNeutral)
    .map(withAdvantages)
    .map(withResistedBy)
    .map(withOffensiveCompliments)
    .map(withWeaknesses)
    .map(withSafeCompliments).value;

  return [resistedBy, safeCompliments];
};

interface ITypeCoverage {
  findCoverageGaps: (
    query: MonsterType[][]
  ) => [MonsterType[], MonsterType[][]];
}

export default (): ITypeCoverage => {
  return { findCoverageGaps };
};
