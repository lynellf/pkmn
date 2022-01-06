export type MonsterType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "fairy"
  | "steel";

const normalDefense = new Map<MonsterType, number>([
  ["normal", 1],
  ["fire", 1],
  ["water", 1],
  ["electric", 1],
  ["grass", 1],
  ["ice", 1],
  ["fighting", 2],
  ["poison", 1],
  ["ground", 1],
  ["ghost", 0],
  ["flying", 1],
  ["psychic", 1],
  ["bug", 1],
  ["rock", 1],
  ["dragon", 1],
  ["dark", 1],
  ["fairy", 1],
  ["steel", 1],
]);

const fireDefense = new Map<MonsterType, number>([
  ["normal", 1],
  ["fire", 0.5],
  ["water", 2],
  ["electric", 1],
  ["grass", 0.5],
  ["ice", 0.5],
  ["fighting", 1],
  ["poison", 1],
  ["ground", 2],
  ["ghost", 1],
  ["flying", 1],
  ["psychic", 1],
  ["bug", 0.5],
  ["rock", 2],
  ["dragon", 1],
  ["dark", 1],
  ["fairy", 0.5],
  ["steel", 0.5],
]);

const waterDefense = new Map<MonsterType, number>([
  ["normal", 1],
  ["fire", 0.5],
  ["water", 0.5],
  ["electric", 2],
  ["grass", 2],
  ["ice", 0.5],
  ["fighting", 1],
  ["poison", 1],
  ["ground", 1],
  ["ghost", 1],
  ["flying", 1],
  ["psychic", 1],
  ["bug", 1],
  ["rock", 1],
  ["dragon", 1],
  ["dark", 1],
  ["fairy", 1],
  ["steel", 0.5],
]);

const electricDefense = new Map<MonsterType, number>([
  ["normal", 1],
  ["fire", 1],
  ["water", 1],
  ["electric", 0.5],
  ["grass", 1],
  ["ice", 1],
  ["fighting", 1],
  ["poison", 1],
  ["ground", 2],
  ["ghost", 1],
  ["flying", 0.5],
  ["psychic", 1],
  ["bug", 1],
  ["rock", 1],
  ["dragon", 1],
  ["dark", 1],
  ["fairy", 1],
  ["steel", 0.5],
]);

const grassDefense = new Map<MonsterType, number>([
  ["normal", 1],
  ["fire", 2],
  ["water", 0.5],
  ["electric", 0.5],
  ["grass", 0.5],
  ["ice", 2],
  ["fighting", 1],
  ["poison", 2],
  ["ground", 0.5],
  ["ghost", 1],
  ["flying", 2],
  ["psychic", 1],
  ["bug", 2],
  ["rock", 1],
  ["dragon", 1],
  ["dark", 1],
  ["fairy", 1],
  ["steel", 1],
]);

const iceDefense = new Map<MonsterType, number>([
  ["normal", 1],
  ["fire", 2],
  ["water", 1],
  ["electric", 1],
  ["grass", 1],
  ["ice", 0.5],
  ["fighting", 2],
  ["poison", 1],
  ["ground", 2],
  ["ghost", 1],
  ["flying", 1],
  ["psychic", 1],
  ["bug", 1],
  ["rock", 2],
  ["dragon", 1],
  ["dark", 1],
  ["fairy", 1],
  ["steel", 2],
]);

const fightingDefense = new Map<MonsterType, number>([
  ["normal", 1],
  ["fire", 1],
  ["water", 1],
  ["electric", 1],
  ["grass", 1],
  ["ice", 1],
  ["fighting", 1],
  ["poison", 1],
  ["ground", 1],
  ["ghost", 1],
  ["flying", 2],
  ["psychic", 2],
  ["bug", 0.5],
  ["rock", 0.5],
  ["dragon", 1],
  ["dark", 0.5],
  ["fairy", 2],
  ["steel", 2],
]);

const poisonDefense = new Map<MonsterType, number>([
  ["normal", 1],
  ["fire", 1],
  ["water", 1],
  ["electric", 1],
  ["grass", 0.5],
  ["ice", 1],
  ["fighting", 0.5],
  ["poison", 0.5],
  ["ground", 2],
  ["ghost", 1],
  ["flying", 1],
  ["psychic", 2],
  ["bug", 0.5],
  ["rock", 1],
  ["dragon", 1],
  ["dark", 1],
  ["fairy", 0.5],
  ["steel", 1],
]);

const groundDefense = new Map<MonsterType, number>([
  ["normal", 1],
  ["fire", 1],
  ["water", 2],
  ["electric", 0],
  ["grass", 2],
  ["ice", 2],
  ["fighting", 1],
  ["poison", 0.5],
  ["ground", 1],
  ["ghost", 1],
  ["flying", 1],
  ["psychic", 1],
  ["bug", 1],
  ["rock", 0.5],
  ["dragon", 1],
  ["dark", 1],
  ["fairy", 1],
  ["steel", 1],
]);

const flyingDefense = new Map<MonsterType, number>([
  ["normal", 1],
  ["fire", 1],
  ["water", 1],
  ["electric", 2],
  ["grass", 0.5],
  ["ice", 2],
  ["fighting", 0.5],
  ["poison", 1],
  ["ground", 0],
  ["ghost", 1],
  ["flying", 1],
  ["psychic", 1],
  ["bug", 0.5],
  ["rock", 2],
  ["dragon", 1],
  ["dark", 1],
  ["fairy", 1],
  ["steel", 1],
]);

const psychicDefense = new Map<MonsterType, number>([
  ["normal", 1],
  ["fire", 1],
  ["water", 1],
  ["electric", 1],
  ["grass", 1],
  ["ice", 1],
  ["fighting", 0.5],
  ["poison", 1],
  ["ground", 1],
  ["ghost", 2],
  ["flying", 1],
  ["psychic", 0.5],
  ["bug", 2],
  ["rock", 1],
  ["dragon", 1],
  ["dark", 2],
  ["fairy", 1],
  ["steel", 1],
]);

const bugDefense = new Map<MonsterType, number>([
  ["normal", 1],
  ["fire", 2],
  ["water", 1],
  ["electric", 1],
  ["grass", 0.5],
  ["ice", 1],
  ["fighting", 0.5],
  ["poison", 1],
  ["ground", 0.5],
  ["ghost", 1],
  ["flying", 2],
  ["psychic", 1],
  ["bug", 1],
  ["rock", 2],
  ["dragon", 1],
  ["dark", 1],
  ["fairy", 1],
  ["steel", 1],
]);

const ghostDefense = new Map<MonsterType, number>([
  ["normal", 0],
  ["fire", 1],
  ["water", 1],
  ["electric", 1],
  ["grass", 1],
  ["ice", 1],
  ["fighting", 0],
  ["poison", 0.5],
  ["ground", 1],
  ["ghost", 2],
  ["flying", 1],
  ["psychic", 1],
  ["bug", 0.5],
  ["rock", 1],
  ["dragon", 1],
  ["dark", 2],
  ["fairy", 1],
  ["steel", 1],
]);

const dragonDefense = new Map<MonsterType, number>([
  ["normal", 1],
  ["fire", 0.5],
  ["water", 0.5],
  ["electric", 0.5],
  ["grass", 0.5],
  ["ice", 2],
  ["fighting", 1],
  ["poison", 1],
  ["ground", 1],
  ["ghost", 1],
  ["flying", 1],
  ["psychic", 1],
  ["bug", 1],
  ["rock", 1],
  ["dragon", 2],
  ["dark", 1],
  ["fairy", 2],
  ["steel", 1],
]);

const darkDefense = new Map<MonsterType, number>([
  ["normal", 1],
  ["fire", 1],
  ["water", 1],
  ["electric", 1],
  ["grass", 1],
  ["ice", 1],
  ["fighting", 2],
  ["poison", 1],
  ["ground", 1],
  ["ghost", 0.5],
  ["flying", 1],
  ["psychic", 0],
  ["bug", 2],
  ["rock", 1],
  ["dragon", 1],
  ["dark", 0.5],
  ["fairy", 2],
  ["steel", 1],
]);

const fairyDefense = new Map<MonsterType, number>([
  ["normal", 1],
  ["fire", 1],
  ["water", 1],
  ["electric", 1],
  ["grass", 1],
  ["ice", 1],
  ["fighting", 0.5],
  ["poison", 2],
  ["ground", 1],
  ["ghost", 1],
  ["flying", 1],
  ["psychic", 1],
  ["bug", 0.5],
  ["rock", 1],
  ["dragon", 0],
  ["dark", 0.5],
  ["fairy", 1],
  ["steel", 2],
]);

const steelDefense = new Map<MonsterType, number>([
  ["normal", 0.5],
  ["fire", 2],
  ["water", 1],
  ["electric", 1],
  ["grass", 0.5],
  ["ice", 0.5],
  ["fighting", 2],
  ["poison", 0],
  ["ground", 2],
  ["ghost", 1],
  ["flying", 0.5],
  ["psychic", 0.5],
  ["bug", 0.5],
  ["rock", 0.5],
  ["dragon", 0.5],
  ["dark", 1],
  ["fairy", 0.5],
  ["steel", 0.5],
]);

const rockDefense = new Map<MonsterType, number>([
  ["normal", 0.5],
  ["fire", 0.5],
  ["water", 2],
  ["electric", 1],
  ["grass", 2],
  ["ice", 1],
  ["fighting", 2],
  ["poison", 0.5],
  ["ground", 2],
  ["ghost", 1],
  ["flying", 0.5],
  ["psychic", 1],
  ["bug", 1],
  ["rock", 1],
  ["dragon", 1],
  ["dark", 1],
  ["fairy", 1],
  ["steel", 2],
]);

export const defenseChart = new Map<MonsterType, Map<MonsterType, number>>([
  ["normal", normalDefense],
  ["fire", fireDefense],
  ["water", waterDefense],
  ["electric", electricDefense],
  ["grass", grassDefense],
  ["ice", iceDefense],
  ["fighting", fightingDefense],
  ["poison", poisonDefense],
  ["ground", groundDefense],
  ["flying", flyingDefense],
  ["psychic", psychicDefense],
  ["bug", bugDefense],
  ["ghost", ghostDefense],
  ["dragon", dragonDefense],
  ["dark", darkDefense],
  ["fairy", fairyDefense],
  ["steel", steelDefense],
  ["rock", rockDefense],
]);

export const getValueLte =
  <T>(value: number) =>
  ([_, v]: [T, number]) =>
    v <= value;

export const getValueGte =
  <T>(value: number) =>
  ([_, v]: [T, number]) =>
    v >= value;

export function unique<T>(items: T[]) {
  return [...new Set(items)];
}

export const areParallel =
  <T>(items: T[]) =>
  (item: T) =>
    !items.includes(item);

export const some = (...bools: boolean[]) => bools.some(Boolean);

export const every = (...bools: boolean[]) => bools.every(Boolean);

export const asType = <T>([type]: [T, number]) => type;

export const asSelf = <T>(x: T) => x;

export const add = (x: number) => (y: number) => x + y;

export const product = (x: number) => (y: number) => x * y;

export const intersection = <T>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter((item) => arr2.includes(item));
};
