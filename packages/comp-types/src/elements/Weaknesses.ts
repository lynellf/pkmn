import { MonsterType } from "../atoms/types";
import {
  getWeaknesses,
  getCompliments,
  getAllWeaknesses,
  byUniqueWeakness,
} from "../atoms/composites";

interface IWeaknesses {
  getWeaknesses: (type: MonsterType) => MonsterType[];
  getAllWeaknesses: (types: MonsterType[]) => MonsterType[];
  byUniqueWeakness: (
    teamWeaknesses: MonsterType[]
  ) => (type: MonsterType) => boolean;
  getCompliments: (type: MonsterType) => MonsterType[];
}

export default (): IWeaknesses => {
  return {
    getWeaknesses,
    getAllWeaknesses,
    byUniqueWeakness,
    getCompliments,
  };
};
