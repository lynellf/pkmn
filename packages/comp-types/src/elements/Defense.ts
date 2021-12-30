import { byTotalResistances } from "../atoms/composites";
import type { MonsterType } from "../atoms/types";
import Resistances from "./Resistances";
import Weaknesses from "./Weaknesses";

interface IDefense {
  getResistances: (type: MonsterType) => MonsterType[];
  getWeaknesses: (type: MonsterType) => MonsterType[];
  getAllWeaknesses: (types: MonsterType[]) => MonsterType[];
  byTotalResistances: (typeA: MonsterType, typeB: MonsterType) => number;
  asResistance: (query: MonsterType) => MonsterType[];
  byUniqueWeakness: (
    teamWeaknesses: MonsterType[]
  ) => (type: MonsterType) => boolean;
  getCompliments: (type: MonsterType) => MonsterType[];
}

export default function (): IDefense {
  const { getResistances, asResistance } = Resistances();
  const { getWeaknesses, getAllWeaknesses, byUniqueWeakness, getCompliments } =
    Weaknesses();

  return {
    getResistances,
    getWeaknesses,
    getAllWeaknesses,
    byTotalResistances,
    asResistance,
    byUniqueWeakness,
    getCompliments,
  };
}
