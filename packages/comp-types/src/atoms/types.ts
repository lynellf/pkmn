import type { MonsterType as Base } from "./primitives";

export type MonsterType = Base;

export type TypeChart = Map<MonsterType, Map<MonsterType, number>>;

export type TType = [MonsterType, number];

export type MatchupTuple = [MonsterType, MatchupTable];
export type MatchupTable = Map<MonsterType, number>;

export type TNode = Map<
  | "strengths"
  | "weaknesses"
  | "resistances"
  | "resistedBy"
  | "self"
  | "neutral",
  MonsterType[]
>;
