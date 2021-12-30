import type { Types as MonsterType } from "../types";
import {
  getAtkAdvantages as getStrengths,
  getAtkDisadvantages as getResistedBy,
  getAtkNeutrals as getNeutral,
} from "../atoms/composites";

export interface IStrengths {
  getStrengths: (type: MonsterType) => MonsterType[];
  getResistedBy: (type: MonsterType) => MonsterType[];
  getNeutral: (type: MonsterType) => MonsterType[];
}

export default (): IStrengths => {
  return { getStrengths, getResistedBy, getNeutral };
};
