import type { MonsterType } from "../atoms/types";
import Strengths from "./Strengths";

export interface IOffense {
  getStrengths: (type: MonsterType) => MonsterType[];
  getResistedBy: (type: MonsterType) => MonsterType[];
  getNeutral: (type: MonsterType) => MonsterType[];
}

export default (): IOffense => {
  const { getStrengths, getResistedBy, getNeutral } = Strengths();

  return {
    getStrengths,
    getResistedBy,
    getNeutral,
  };
};
