export type Types =
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

const normalDefense = new Map<Types, number>([
  ["fighting", 2],
  ["ghost", 0],
]);

const fireDefense = new Map<Types, number>([
  ["fire", 0.5],
  ["water", 2],
  ["grass", 0.5],
  ["ice", 0.5],
  ["ground", 2],
  ["bug", 0.5],
  ["rock", 2],
  ["steel", 0.5],
  ["fairy", 0.5],
]);

const waterDefense = new Map<Types, number>([
  ["fire", 0.5],
  ["water", 0.5],
  ["electric", 2],
  ["grass", 2],
  ["ice", 0.5],
  ["steel", 0.5],
]);

const electricDefense = new Map<Types, number>([
  ["electric", 0.5],
  ["ground", 2],
  ["flying", 0.5],
  ["steel", 0.5],
]);

const grassDefense = new Map<Types, number>([
  ["fire", 2],
  ["water", 0.5],
  ["electric", 0.5],
  ["grass", 0.5],
  ["ice", 2],
  ["poison", 2],
  ["ground", 0.5],
  ["flying", 2],
  ["bug", 2],
]);

const iceDefense = new Map<Types, number>([
  ["fire", 2],
  ["ice", 0.5],
  ["fighting", 2],
  ["rock", 2],
  ["steel", 2],
]);

const fightingDefense = new Map<Types, number>([
  ["flying", 2],
  ["psychic", 2],
  ["bug", 0.5],
  ["rock", 0.5],
  ["dark", 0.5],
  ["fairy", 2],
]);

const poisonDefense = new Map<Types, number>([
  ["grass", 0.5],
  ["fighting", 0.5],
  ["poison", 0.5],
  ["ground", 2],
  ["psychic", 2],
  ["bug", 0.5],
  ["fairy", 0.5],
]);

const groundDefense = new Map<Types, number>([
  ["electric", 0],
  ["water", 2],
  ["grass", 2],
  ["ice", 2],
  ["poison", 0.5],
  ["rock", 0.5],
]);

const flyingDefense = new Map<Types, number>([
  ["electric", 2],
  ["grass", 0.5],
  ["ice", 2],
  ["fighting", 0.5],
  ["ground", 0],
  ["bug", 0.5],
  ["rock", 2],
]);

const psychicDefense = new Map<Types, number>([
  ["fighting", 0.5],
  ["psychic", 0.5],
  ["bug", 2],
  ["ghost", 2],
  ["dark", 2],
]);

const bugDefense = new Map<Types, number>([
  ["fire", 2],
  ["grass", 0.5],
  ["fighting", 0.5],
  ["ground", 0.5],
  ["flying", 2],
  ["rock", 2],
]);

const ghostDefense = new Map<Types, number>([
  ["normal", 0],
  ["fighting", 0],
  ["poison", 0.5],
  ["bug", 0.5],
  ["ghost", 2],
  ["dark", 2],
]);

const dragonDefense = new Map<Types, number>([
  ["fire", 0.5],
  ["water", 0.5],
  ["electric", 0.5],
  ["grass", 0.5],
  ["ice", 2],
  ["dragon", 2],
  ["fairy", 2],
]);

const darkDefense = new Map<Types, number>([
  ["fighting", 2],
  ["psychic", 0],
  ["bug", 2],
  ["ghost", 0.5],
  ["dark", 0.5],
  ["fairy", 2],
]);

const fairyDefense = new Map<Types, number>([
  ["fighting", 0.5],
  ["poison", 2],
  ["bug", 0.5],
  ["dragon", 0],
  ["dark", 0.5],
  ["steel", 2],
]);

const steelDefense = new Map<Types, number>([
  ["normal", 0.5],
  ["fire", 2],
  ["grass", 0.5],
  ["ice", 0.5],
  ["fighting", 2],
  ["poison", 0],
  ["ground", 2],
  ["flying", 0.5],
  ["psychic", 0.5],
  ["bug", 0.5],
  ["rock", 0.5],
  ["dragon", 0.5],
  ["steel", 0.5],
  ["fairy", 0.5],
]);

const rockDefense = new Map<Types, number>([
  ["normal", 0.5],
  ["fire", 0.5],
  ["water", 2],
  ["grass", 2],
  ["fighting", 2],
  ["poison", 0.5],
  ["ground", 2],
  ["flying", 0.5],
  ["steel", 2],
]);

export const defenseChart = new Map<Types, Map<Types, number>>([
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

export type TType = [Types, number];

export type TypeChart = Map<Types, Map<Types, number>>;

export const asType = <T>([type]: [T, number]) => type;

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

export const intersection = <T>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter((item) => arr2.includes(item));
};

export const defChart = (typeChart: TypeChart) => (type: Types) => {
  return Array.from(typeChart.get(type)?.entries() ?? []);
};

export const baseTypes = {
  asType,
  getValueLte,
  getValueGte,
  unique,
  byNonType: areParallel,
  byNonIntersection: areParallel,
  some,
  defChart,
  defenseChart,
  intersection,
};
