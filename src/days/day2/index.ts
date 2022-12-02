// Day 2
enum Move {
	Rock,
	Paper,
	Scissors
}

enum GameOutcome {
  Win,
  Loss,
  Draw
}

const parseInput = (input: string) =>
	input
    .trim()
		.split("\n")
		.map(line => line.split(" ")) as [string, string][]

const compareMoves = (move1: Move, move2: Move): GameOutcome => {
	if (move1 === move2) {
		return GameOutcome.Draw
	} else if (move1 === Move.Rock && move2 === Move.Scissors) {
		return GameOutcome.Win
	} else if (move1 === Move.Paper && move2 === Move.Rock) {
		return GameOutcome.Win
	} else if (move1 === Move.Scissors && move2 === Move.Paper) {
		return GameOutcome.Win
	} else {
		return GameOutcome.Loss
	}
}

const getMoveAgainst = (move: Move, outcome: GameOutcome): Move => {
  if (outcome === GameOutcome.Draw) {
    return move
  } else if (outcome === GameOutcome.Win) {
    if (move === Move.Rock) {
      return Move.Paper
    } else if (move === Move.Paper) {
      return Move.Scissors
    } else {
      return Move.Rock
    }
  } else {
    if (move === Move.Rock) {
      return Move.Scissors
    } else if (move === Move.Paper) {
      return Move.Rock
    } else {
      return Move.Paper
    }
  }
}

const sumMoves = (moves: [Move, Move][]) => moves
		.map(([ourMove, opponentMove]) => {
			let score = 0

			const result = compareMoves(ourMove, opponentMove)

			if (result === GameOutcome.Win) {
				score += 6
			} else if (result === GameOutcome.Draw) {
				score += 3
			} else {
				score += 0
			}

			switch (ourMove) {
				case Move.Rock:
					score += 1
					break
				case Move.Paper:
					score += 2
					break
				case Move.Scissors:
					score += 3
					break
			}

			return score
		})
		.reduce((a, b) => a + b, 0)


export const part1 = (input: string) => {
	const moves = parseInput(input).map(
    line =>
      [
        line[1] === "X" ? Move.Rock : line[1] === "Y" ? Move.Paper : Move.Scissors,
        line[0] === "A" ? Move.Rock : line[0] === "B" ? Move.Paper : Move.Scissors
      ] as [us: Move, opponent: Move]
  )

	return sumMoves(moves)
}

export const part2 = (input: string) => {
  const expectedResult = parseInput(input).map(
    line =>
      [
        line[0] === "A" ? Move.Rock : line[0] === "B" ? Move.Paper : Move.Scissors,
        line[1] === "X" ? GameOutcome.Loss : line[1] === "Y" ? GameOutcome.Draw : GameOutcome.Win
      ] as [opponent: Move, neededOutcome: GameOutcome]
  )

  const moves = expectedResult.map(([opponentMove, neededOutcome]) => {
    const ourMove = getMoveAgainst(opponentMove, neededOutcome)

    return [ourMove, opponentMove] as [us: Move, opponent: Move]
  })

	return sumMoves(moves)
}
