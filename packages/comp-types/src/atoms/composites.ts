import Iter from "./Iterable";
import type { MonsterType, MatchupTable, MatchupTuple } from "./types";
import {
  defenseChart,
  asType,
  getValueGte,
  getValueLte,
  asSelf,
} from "./primitives";

export function getMatchup(defType: MonsterType) {
  return (atkType: MonsterType) => defenseChart.get(defType).get(atkType);
}

export const getDefenses = (type: MonsterType) => {
  return Iter(defenseChart.get(type));
};

export const getWeaknesses = (type: MonsterType): MonsterType[] => {
  const byWeakness = getValueGte(2);
  const defenseTable = getDefenses(type);
  const listOfWeaknesses = defenseTable.filter(byWeakness).unpack(asType);
  return listOfWeaknesses;
};

export const getResistances = (type: MonsterType): MonsterType[] => {
  const byResistance = getValueLte(0.5);
  const defenseTable = getDefenses(type);
  const listOfResistances = defenseTable.filter(byResistance).unpack(asType);
  return listOfResistances;
};

export const getCompliments = (type: MonsterType): MonsterType[] => {
  const weaknesses = Iter(getWeaknesses(type));
  const compliments = weaknesses.flatMap(getWeaknesses).unique().unpack(asSelf);
  return compliments;
};

export const getAllWeaknesses = (team: MonsterType[]): MonsterType[] => {
  return Iter(team).flatMap(getWeaknesses).unique().unpack(asSelf);
};

export const byUniqueWeakness =
  (teamWeaknesses: MonsterType[]) => (query: MonsterType) => {
    const weaknesses = getWeaknesses(query);
    const isUnique = weaknesses.every(
      (weakness) => !teamWeaknesses.includes(weakness)
    );
    return isUnique;
  };

export const byAdvantage =
  (type: MonsterType) =>
  ([_, table]: [MonsterType, MatchupTable]): boolean =>
    (table.get(type) ?? -1) >= 2;

export const byDisadvantage =
  (type: MonsterType) =>
  ([_, table]: [MonsterType, MatchupTable]): boolean =>
    (table.get(type) ?? 2) <= 0.5;

export const byNeutral =
  (type: MonsterType) =>
  ([_, table]: [MonsterType, MatchupTable]): boolean =>
    table.get(type) === 1;

export const byKeyname = (matchup: MatchupTuple): MonsterType => matchup[0];

export const getAtkAdvantages = (type: MonsterType): MonsterType[] =>
  Iter(defenseChart).filter(byAdvantage(type)).unpack(byKeyname);

export const getAtkDisadvantages = (type: MonsterType): MonsterType[] =>
  Iter(defenseChart).filter(byDisadvantage(type)).unpack(byKeyname);

export const getAtkNeutrals = (type: MonsterType): MonsterType[] =>
  Iter(defenseChart).filter(byNeutral(type)).unpack(byKeyname);

export const byTotalResistances = (typeA: MonsterType, typeB: MonsterType) => {
  const byWeakness = getValueGte(2);
  const byResistance = getValueLte(0.5);
  const typeADefChart = getDefenses(typeA);
  const typeBDefChart = getDefenses(typeB);
  const typeAResistances = typeADefChart.filter(byResistance).asArr;
  const typeBResistances = typeBDefChart.filter(byResistance).asArr;
  const typeAWeaknesses = typeADefChart.filter(byWeakness).asArr;
  const typeBWeaknesses = typeBDefChart.filter(byWeakness).asArr;
  const typeADiff = typeAResistances.length - typeAWeaknesses.length;
  const typeBDiff = typeBResistances.length - typeBWeaknesses.length;
  return typeBDiff - typeADiff;
};
