import type { MonsterType } from "../atoms/types";
import { unique } from "../atoms/Iterable";
import { getCompliments } from "../compounds/DualTypeTraversal";
import { checkUserInput } from "../compounds/DualTypeUserInput";
import { findCoverageGaps } from "../compounds/TypeCoverage";

export function getIdealTeam(query: MonsterType[][]) {
  const [_isValid, offendingTypes, sharedWeakness] = checkUserInput(query);
  const [gaps, suggestions] = findCoverageGaps(query);
  const results = unique([...query, ...suggestions].flatMap(getCompliments));
  return [results, offendingTypes, sharedWeakness, gaps];
}

function TeamBuilder() {
  return getIdealTeam;
}

export default TeamBuilder;
