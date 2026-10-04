// Turns the raw data in src/data/ into everything the pages need.
// You should never have to edit this file to record results.

import { cats } from "../data/cats.js"
import { matches as allMatches, ROUNDS } from "../data/tournament.js"
import { config } from "../data/config.js"

export { ROUNDS }

// While showResults is false, the site behaves as if no matches exist at all,
// so nothing (winners, eliminations, matchups, champion) can leak onto a page.
export const competitionLive = config.showResults === true
const rawMatches = competitionLive ? allMatches : []

const catById = new Map(cats.map((c) => [c.id, c]))
export const getCat = (id) => catById.get(id) || null

// ── Resolve every match: fill in cats from earlier rounds, decide status ──
const resolvedById = {}

export const matches = rawMatches.map((m) => {
  const from = m.from || []
  const pick = (explicit, i) => {
    if (explicit != null) return explicit
    const src = from[i] != null ? resolvedById[from[i]] : null
    return src ? src.winner : null
  }
  const cat1 = pick(m.cat1, 0)
  const cat2 = pick(m.cat2, 1)

  let winner = m.winner ?? null
  if (winner != null && winner !== cat1 && winner !== cat2) {
    console.warn(`Match ${m.id}: winner ${winner} is not one of the two cats in this match. Ignoring it.`)
    winner = null
  }
  const loser = winner == null ? null : winner === cat1 ? cat2 : cat1
  const status = winner != null ? "completed" : cat1 != null && cat2 != null ? "upcoming" : "pending"

  const resolved = { ...m, cat1, cat2, winner, loser, status }
  resolvedById[m.id] = resolved
  return resolved
})

export const matchesIn = (round) => matches.filter((m) => m.round === round)

export const isRoundDone = (round) => matchesIn(round).every((m) => m.status === "completed")

// The first round that still has an undecided match (or the Final once finished).
export const currentRound =
  ROUNDS.find((r) => !isRoundDone(r)) || ROUNDS[ROUNDS.length - 1]

export const currentMatches = matchesIn(currentRound)

export const finalMatch = matches.find((m) => m.round === ROUNDS[ROUNDS.length - 1])
export const champion = finalMatch && finalMatch.winner != null ? getCat(finalMatch.winner) : null

export const progress = ROUNDS.map((round) => {
  const list = matchesIn(round)
  return { round, total: list.length, done: list.filter((m) => m.status === "completed").length }
})

export const totalDone = matches.filter((m) => m.status === "completed").length

export const nextRound = (round) => ROUNDS[ROUNDS.indexOf(round) + 1] || null

// ── Per-cat helpers ──
export const eliminatedIds = new Set(matches.filter((m) => m.loser != null).map((m) => m.loser))
export const isAlive = (id) => !eliminatedIds.has(id)
export const aliveCats = cats.filter((c) => isAlive(c.id))

export const catMatches = (id) =>
  matches.filter((m) => m.cat1 === id || m.cat2 === id)

export const catRecord = (id) => {
  const played = catMatches(id).filter((m) => m.status === "completed")
  const wins = played.filter((m) => m.winner === id).length
  return { wins, losses: played.length - wins, played: played.length }
}

// A short, friendly status for a cat: { label, tone }
export function catStatus(id) {
  const list = catMatches(id)
  const last = list[list.length - 1]
  if (!last) return { label: "Waiting for first match", tone: "waiting" }
  if (last.status === "completed") {
    if (last.winner === id) {
      if (last.round === ROUNDS[ROUNDS.length - 1]) return { label: "FatCat Champion", tone: "champion" }
      return { label: `Through to the ${nextRound(last.round)}`, tone: "through" }
    }
    return { label: `Out in the ${last.round}`, tone: "out" }
  }
  return { label: `Playing in the ${last.round}`, tone: "live" }
}

export const ROUND_SHORT = {
  "Round of 32": "R32",
  "Round of 16": "R16",
  Quarterfinals: "QF",
  Semifinals: "SF",
  Final: "Final",
}
