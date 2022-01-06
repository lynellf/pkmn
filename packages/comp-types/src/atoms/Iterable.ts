import { Box } from "ezell-toolbelt";

export function toArray<T>(iterable: Iterable<T>): T[] {
  return [...iterable];
}

export function toSet<T>(iterable: Iterable<T>): Set<T> {
  return new Set(iterable);
}

export function unique<T>(iterable: Iterable<T>): T[] {
  const output = Box(iterable).map(toSet).map(toArray).value as T[];
  return output;
}

export function byLongestLength<T>(arrA: T[], arrB: T[]) {
  return arrB.length - arrA.length;
}

export function group<T>(iterableA: Iterable<T>) {
  return (iterableB: Iterable<T>) =>
    [Box(iterableA).map(toArray).value, Box(iterableB).map(toArray).value] as [
      T[],
      T[]
    ];
}

export function doesNotInclude<T>(arr: T[]) {
  return (item: T) => !arr.includes(item);
}

export function doesInclude<T>(arr: T[]) {
  return (item: T) => arr.includes(item);
}

export function diffGroup<T>([longest, shortest]: [T[], T[]]) {
  return [
    ...longest.filter(doesNotInclude(shortest)),
    ...shortest.filter(doesNotInclude(longest)),
  ];
}

export function interGroup<T>([longest, shortest]: [T[], T[]]) {
  return [
    ...longest.filter(doesInclude(shortest)),
    ...shortest.filter(doesInclude(longest)),
  ];
}

export function flatten<T>(iterable: Iterable<T>) {
  return Box(iterable)
    .map((itr) => toArray(itr))
    .map((arr) => arr.flat()).value;
}

export function sort<T>(compareFn: (a: T, b: T) => number) {
  return (arr: T[]) => arr.sort(compareFn);
}

export function difference<T>(iterable: Iterable<T>) {
  return (other: Iterable<T>) =>
    Box(iterable).map(group(other)).map(sort(byLongestLength)).map(diffGroup)
      .value as T[];
}

export function intersection<T>(iterableA: Iterable<T>) {
  return (iterableB: Iterable<T>) =>
    Box(iterableA)
      .map(group(iterableB))
      .map(sort(byLongestLength))
      .map(interGroup).value as T[];
}

export function union<T>(iterableA: Iterable<T>) {
  return (iterableB: Iterable<T>) =>
    Box([...iterableA, ...iterableB])
      .map(toSet)
      .map(toArray).value as T[];
}

type IterTypes = "array" | "string" | "map" | "set" | "other";
function getIterType<T>(query: T) {
  const isArray = Array.isArray(query);
  const isString = typeof query === "string";
  const isMap = query instanceof Map;
  const isSet = query instanceof Set;
  const cases: [boolean, IterTypes][] = [
    [isArray, "array"],
    [isString, "string"],
    [isMap, "map"],
    [isSet, "set"],
    [false, "other"],
  ];
  return cases.find(([condition]) => condition)[1];
}

export default function Iter<K, V>(iterable: Iterable<V>, type?: IterTypes) {
  const currentType = type ? type : getIterType(iterable);
  const toArray = () => Array.from(iterable);
  const toString = () => iterable.toString();
  const toMap = () => new Map(iterable as Map<K, V>);
  const toSet = () => new Set(iterable);
  const toIterable = () => iterable;
  const cases: [IterTypes, () => Iterable<V> | string | Map<K, V>][] = [
    ["array", toArray],
    ["string", toString],

    ["map", toMap],
    ["set", toSet],
    ["other", toIterable],
  ];
  const caseMap = new Map(cases);
  const toUnwrap = caseMap.get(currentType);
  const value = toUnwrap();
  const asArr = Array.from(iterable);
  const unit = <T>(value: Iterable<T>, type: IterTypes) => Iter(value, type);

  const map = (fn: (item: V, i: number, self: V[]) => V) =>
    unit(asArr.map(fn), currentType);

  const filter = (fn: (item: V, i: number, self: V[]) => boolean) =>
    unit(asArr.filter(fn), currentType);

  const reduce = (
    fn: (acc: V[], item: V, i: number, self: V[]) => V[],
    init: V[]
  ) => unit(asArr.reduce(fn, init), currentType);

  const flatMap = (fn: (item: V, i: number, self: V[]) => V[]) =>
    unit(asArr.flatMap(fn), currentType);

  const slice = (start: number, end?: number) =>
    unit(asArr.slice(start, end), currentType);

  const intersection = (other: Iterable<V>) => {
    const otherArr = Array.from(other);
    return unit(
      asArr.filter((item) => otherArr.includes(item)),
      currentType
    );
  };

  /**
   * @description same as map but unwraps the result as no longer
   * guaranteed to be an iterable of the same type
   */
  const unpack = <T>(fn: (item: V, i: number, self: V[]) => T) => asArr.map(fn);

  const unique = () => unit(new Set(asArr), currentType);

  return {
    value,
    map,
    filter,
    reduce,
    flatMap,
    slice,
    currentType,
    unit,
    unpack,
    unique,
    asArr,
    intersection,
  };
}
