// Day 5

const parseInput = (input: string) => {
	const [stacksUnparsed, movesUnparsed] = input.replace(/^( \d  ?)+$/gm, "").split("\n\n\n")

	const moves = movesUnparsed
		.replace(/move (\d+) from (\d+) to (\d+)/g, "$1 $2 $3")
		.split("\n")
		.map(l => [parseInt(l.split(" ")[0]), parseInt(l.split(" ")[1]) - 1, parseInt(l.split(" ")[2]) - 1])

	const stacks: string[][] = []

	const lines = stacksUnparsed
		.split("\n")
		.map(l => l.match(/.{1,4}/g)!)
		.map(l => l.map(s => s.trim().replaceAll("[", "").replaceAll("]", "")))
		.reverse()

	for (let i = 0; i < lines[0].length; i++)
		stacks.push(lines.map(l => l[i]).filter(s => s !== ""))

	return [stacks, moves] as [string[][], [number, number, number][]]
}

const shared = (input: string, moveOperation: (times: number, from: number, to: number, stacks: string[][]) => void) => {
	const [stacks, moves] = parseInput(input)

	moves.forEach(move => moveOperation(move[0], move[1], move[2], stacks))

	return stacks.map(s => s.pop()).join("")
}

export const part1 = (input: string) =>
	shared(input, (times, from, to, stacks) => {
		for (let i = 0; i < times; i++) {
			stacks[to].push(stacks[from].pop()!)
		}
	})

export const part2 = (input: string) =>
	shared(input, (times, from, to, stacks) => {
		const lastN = stacks[from].slice(-times)
		stacks[from] = stacks[from].slice(0, -times)

		stacks[to] = [...stacks[to], ...lastN]
	})
