// Day 7
// https://adventofcode.com/2022/day/7

type FNode = {
	type: "file"
	name: string
	size: number
}

type DNode = {
	type: "dir"
	name: string
	children: Node[]
}

type Node = FNode | DNode

const parseInput = (input: string) => {
	const lines = input.split("\n")
	const dirStack: DNode[] = []

	for (const line of lines) {
		const parent = dirStack.at(-1)
		const [, command, arg] = line.match(/^\$ ([a-z]{2})\s?(.*)$/) || []

		if (command === "cd") {
			if (arg === "..")
				dirStack.pop()
			else {
				const dirNode: DNode = {
					type: "dir",
					name: arg,
					children: [],
				}

				parent?.children.push(dirNode)
				dirStack.push(dirNode)
			}
		}

		const [, size, filename] = line.match(/(\d+) (.+)/) || []

		if (filename && parent?.type === "dir")
			parent.children.push({
				type: "file",
				name: filename,
				size: parseInt(size),
			})
	}

	return dirStack[0]
}

const getSizes = (node: Node) => {
	const sizes: number[] = []

	const count = (child: Node): number => {
		if (child.type === "dir") {
			const dirSize = child.children.reduce((n, c) => n + count(c), 0)

			sizes.push(dirSize)

			return dirSize
		}

		return child.size
	}

	count(node)

	return sizes
}

export const part1 = (input: string) =>
	getSizes(parseInput(input))
		.filter(dirSize => dirSize <= 100000)
		.reduce((n, dirSize) => n + dirSize, 0)

export const part2 = (input: string) => {
	const sizes = getSizes(parseInput(input)).sort((a, b) => a - b)
	const usedSpace = sizes.at(-1) || 0
	const unusedSpace = 70000000 - usedSpace
	const requiredSpace = 30000000 - unusedSpace

	return sizes.find(size => size >= requiredSpace)
}
