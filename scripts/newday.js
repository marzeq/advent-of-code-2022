const fs = require("node:fs")

const days = fs.readdirSync("src/days")

const day = days.length + 1

const dayDir = `src/days/day${day}`

fs.mkdirSync(dayDir, { recursive: true })

fs.writeFileSync(`${dayDir}/index.ts`, `// Day ${day}
export const part1 = (input: string) => {
  return null
}

export const part2 = (input: string) => {
  return null
}
`)

fs.writeFileSync(`${dayDir}/sample.txt`, "")
fs.writeFileSync(`${dayDir}/real.txt`, "")

// add line below line 10 in src/index.ts that says: await import(`./days/day${day}/`),
const index = fs.readFileSync("src/index.ts", "utf8")

const lines = index.split("\n")

lines.splice(10, 0, `    await import("./days/day${day}/"),`)

fs.writeFileSync("src/index.ts", lines.join("\n"))