import input from "@marzeq/awaitinput"
import fs from "node:fs"

type Awaitable<T> = T | Promise<T>

const main = async () => {
  const dayModules: {
    part1: (input: string) => Awaitable<any>
    part2: (input: string) => Awaitable<any>
  }[] = [
    await import("./days/day7/"),
    await import("./days/day6/"),
    await import("./days/day5/"),
    await import("./days/day4/"),
    await import("./days/day3/"),
    await import("./days/day2/"),
    await import("./days/day1/"),
  ].reverse()

  if (dayModules.length === 0) {
    console.error("There are no days to run yet!")
    return
  }

  let [dayStr, partStr, sampleOrReal] = process.argv.slice(2)

  if (!dayStr) {
    dayStr = await input("Which day do you want to run? ")
  }

  if (!partStr) {
    partStr = await input("Which part do you want to run? ")
  }

  if (isNaN(Number(dayStr))) {
    console.error("Day must be a number!")
    return
  }
  
  if (isNaN(Number(partStr))) {
    console.error("Part must be a number!")
    return
  }

  const day = Number(dayStr), part = Number(partStr)

  if (day < 1 || day > dayModules.length) {
    console.error("Day must be between 1 and " + dayModules.length)
    return
  }

  if (part < 1 || part > 2) {
    console.error("Part must be either 1 or 2")
    return
  }

  const dayModule = dayModules[day - 1]

  if (!sampleOrReal) {
    sampleOrReal = await input("Do you want to run the sample or the real input? ")
    if (sampleOrReal.toLowerCase() === "real") {
      sampleOrReal = "real"
    } else {
      sampleOrReal = "sample"
    }
  }

  if (sampleOrReal.toLowerCase() !== "real" && sampleOrReal.toLowerCase() !== "sample") {
    console.error("Sample or real must be either 'sample' or 'real'")
    return
  }

  const inpt = fs.readFileSync(`src/days/day${day}/${sampleOrReal}.txt`, "utf-8")

  if (part === 1) {
    console.log(await dayModule.part1(inpt))
  } else {
    console.log(await dayModule.part2(inpt))
  }
}

main().catch(console.error)
