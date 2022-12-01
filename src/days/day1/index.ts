// Day 1
const readCalories = (input: string) => input.split("\n")

const countCalories = (input: string) => {
  const calories = readCalories(input)

  const count: number[] = []
  let i = 0

  for (const calorieStr of calories) {
    if (calorieStr === "") {
      i++
      continue
    }

    const calorie = parseInt(calorieStr)

    if (isNaN(calorie)) {
      console.error("Invalid calorie: " + calorieStr)
      process.exit(1)
    }

    if (count[i] === undefined) {
      count[i] = 0
    }

    count[i] += calorie
  }

  return count
}

export const part1 = (input: string) => Math.max(...countCalories(input))

export const part2 = (input: string) => countCalories(input)
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a + b, 0)
