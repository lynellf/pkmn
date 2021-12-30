import type { MonsterType } from "../atoms/types";
import Defense from "../elements/Defense";
import Offense from "../elements/Offense";

export type TNode = Map<
  | "strengths"
  | "weaknesses"
  | "resistances"
  | "resistedBy"
  | "self"
  | "neutral",
  MonsterType[]
>;

interface INode {
  create: (type: MonsterType) => TNode;
}

export const createNode = (type: MonsterType): TNode => {
  const { getNeutral, getStrengths, getResistedBy } = Offense();
  const { getWeaknesses, getResistances } = Defense();
  return new Map([
    ["self", [type]],
    ["neutral", getNeutral(type)],
    ["resistedBy", getResistedBy(type)],
    ["strengths", getStrengths(type)],
    ["weaknesses", getWeaknesses(type)],
    ["resistances", getResistances(type)],
  ]);
};

export default (): INode => {
  return {
    create: createNode,
  };
};
