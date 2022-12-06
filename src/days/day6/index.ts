// Day 6
// https://adventofcode.com/2022/day/6

const lookForMarker = (input: string, markerLength: number) => {
  for (let i = 0; i < input.length - markerLength; i++) {
    if (new Set(input.substring(i, i + markerLength).split("")).size === markerLength)
      return i + markerLength
  }

  return null
}

export const part1 = (input: string) => lookForMarker(input, 4)

export const part2 = (input: string) => lookForMarker(input, 14)
