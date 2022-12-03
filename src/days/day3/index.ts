// Day 3
const lowercase = [..."abcdefghijklmnopqrstuvwxyz"]
const uppercase = lowercase.map((letter) => letter.toUpperCase())

const letterValue = (letter: string) => {
  if (lowercase.includes(letter)) {
    return lowercase.indexOf(letter) + 1
  } else if (uppercase.includes(letter)) {
    return uppercase.indexOf(letter) + 27
  } else {
    throw new Error("Invalid letter")
  }
}

const divideString = (str: string, n: number) => {
  const len = str.length
  const chunkSize = Math.ceil(len / n)

  return Array.from({ length: n }, (_, i) => {
    const start = i * chunkSize
    const end = start + chunkSize
    return str.slice(start, end)
  })
}

const splitRuckSacks = (input: string) => input
  .split("\n")
  .map(line => divideString(line, 2)) as [string, string][]

const getGroups = (input: string) => 
  input.split("\n").reduce((groups, line, i) => {
    if (i % 3 === 0) {
      groups.push([])
    }
    groups[groups.length - 1].push(line)
    return groups
  }, [] as string[][]) as [string, string, string][]

const removeDuplicates = (arr: string[]) => [...new Set(arr)]

const getDuplicates = (rucksack: [string, string]) => [...rucksack[0]].filter(letter => rucksack[1].includes(letter))

export const part1 = (input: string) => splitRuckSacks(input)
  .map(getDuplicates)
  .map(removeDuplicates)
  .flat()
  .map(letterValue)
  .reduce((a, b) => a + b, 0)

export const part2 = (input: string) => getGroups(input)
  .map(([a, b, c]) => [...a].filter(letter => b.includes(letter) && c.includes(letter)))
  .map(removeDuplicates)
  .flat()
  .map(letterValue)
  .reduce((a, b) => a + b, 0)
