// Day 4
type Pair = [{ start: number, end: number }, { start: number, end: number }]

const parseInput = (input: string) => input
  .split("\n")
  .map(line => line.split(",").map(item => ({
    start: parseInt(item.split("-")[0]),
    end: parseInt(item.split("-")[1])
  }))) as Pair[]

const doesRangeContain = ([range1, range2]: Pair) =>
  (range1.start <= range2.start && range1.end >= range2.end) ||
  (range2.start <= range1.start && range2.end >= range1.end)

const doesPairOverlap = ([range1, range2]: Pair) =>
  (range1.start <= range2.start && range1.end >= range2.start) || 
  (range2.start <= range1.start && range2.end >= range1.start)

export const part1 = (input: string) => parseInput(input).filter(doesRangeContain).length

export const part2 = (input: string) => parseInput(input).filter(doesPairOverlap).length