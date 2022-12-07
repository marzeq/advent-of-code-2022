const fs = require("node:fs")
const os = require("node:os")
const child_process = require("node:child_process")

const YEAR = 2022

const days = fs.readdirSync("src/days")

const day = days.length + 1

const waitTime = () => {
	const midnight = new Date(Date.UTC(YEAR, 11, day, 5, 0, 0, 0))
	const now = new Date()
	return midnight.getTime() - now.getTime()
}

const needToWait = waitTime()

const create = () => {
  const url = `https://adventofcode.com/${YEAR}/day/${day}`

	const dayDir = `src/days/day${day}`

	fs.mkdirSync(dayDir, { recursive: true })

	fs.writeFileSync(
		`${dayDir}/index.ts`,
		`// Day ${day}
// ${url}
export const part1 = (input: string) => {
  return null
}

export const part2 = (input: string) => {
  return null
}
`
	)

	fs.writeFileSync(`${dayDir}/sample.txt`, "")
	fs.writeFileSync(`${dayDir}/real.txt`, "")

	const index = fs.readFileSync("src/index.ts", "utf8")

	const lines = index.split("\n")

	lines.splice(10, 0, `    await import("./days/day${day}/"),`)

	fs.writeFileSync("src/index.ts", lines.join("\n"))

	if (os.platform() === "linux") child_process.spawn("xdg-open", [url])
	else if (os.platform() === "darwin") child_process.exec("open", [url])
	else if (os.platform() === "win32") child_process.exec("rundll32" ["url.dll,FileProtocolHandler", url])
}

if (needToWait > 0) {
	console.log("Please be patient, it's not time yet! (CTRL+C to exit countdown)")
	const log = () =>
		console.log(
			`The puzzle will open in ${(ms => {
				const s = Math.floor(ms / 1000)
				const m = Math.floor(s / 60)
				const h = Math.floor(m / 60)

				return `${h.toString().padStart(2, "0")}:${(m % 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`
			})(waitTime())}!`
		)

	log()

	setInterval(() => {
		// clear previous line
		process.stdout.write("\033[1A")

		// move cursor to beginning of line
		process.stdout.write("\033[0G")

		// write new line
    if (waitTime() > 0)
		  log()
    else {
      console.log("It's time!")
      create()
      process.exit()
    }
	}, 1000)
} else create()
