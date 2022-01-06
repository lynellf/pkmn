import { getResistances } from "../atoms/composites";
import type { MonsterType } from "../atoms/types";

const asResistance = (query: MonsterType) => {
  const resistances = getResistances(query);
  return resistances;
};

interface IResistances {
  getResistances: (type: MonsterType) => MonsterType[];
  asResistance: (query: MonsterType) => MonsterType[];
}

export default (): IResistances => {
  return { getResistances, asResistance };
};
