// ─────────────────────────────────────────────────────────────
//  THE TOURNAMENT  (32 → 16 → 8 → 4 → 2 → Champion)
//
//  Nothing is announced yet, so every cat slot and winner is `null`.
//  The site doesn't show any of this until you set
//      showResults: true
//  in src/data/config.js.
//
//  WHEN ROUND 1 IS ANNOUNCED
//  Fill in the two cats for each Round of 32 match:
//      { id: 1, round: "Round of 32", cat1: 3, cat2: 17, winner: null },
//
//  WHEN A MATCH IS DECIDED
//  Set winner to that cat's id (it must be cat1 or cat2):
//      { id: 1, round: "Round of 32", cat1: 3, cat2: 17, winner: 17 },
//  The next round fills itself in. `from: [1, 2]` means "the winner of
//  match 1 plays the winner of match 2" — you never type those cats in.
//
//  DIFFERENT PAIRING IN A LATER ROUND?
//  Replace `from` with explicit cats:  cat1: 8, cat2: 10
//
//  `status` (upcoming / completed) is worked out for you.
//  Keep matches in this order: earlier rounds first.
// ─────────────────────────────────────────────────────────────

// The round names, in order. Don't rename without updating `round` below.
export const ROUNDS = [
  "Round of 32",
  "Round of 16",
  "Quarterfinals",
  "Semifinals",
  "Final",
]

export const matches = [
  // ── ROUND OF 32 — waiting for the real matchups ──────────
  { id: 1,  round: "Round of 32", cat1: null, cat2: null, winner: null },
  { id: 2,  round: "Round of 32", cat1: null, cat2: null, winner: null },
  { id: 3,  round: "Round of 32", cat1: null, cat2: null, winner: null },
  { id: 4,  round: "Round of 32", cat1: null, cat2: null, winner: null },
  { id: 5,  round: "Round of 32", cat1: null, cat2: null, winner: null },
  { id: 6,  round: "Round of 32", cat1: null, cat2: null, winner: null },
  { id: 7,  round: "Round of 32", cat1: null, cat2: null, winner: null },
  { id: 8,  round: "Round of 32", cat1: null, cat2: null, winner: null },
  { id: 9,  round: "Round of 32", cat1: null, cat2: null, winner: null },
  { id: 10, round: "Round of 32", cat1: null, cat2: null, winner: null },
  { id: 11, round: "Round of 32", cat1: null, cat2: null, winner: null },
  { id: 12, round: "Round of 32", cat1: null, cat2: null, winner: null },
  { id: 13, round: "Round of 32", cat1: null, cat2: null, winner: null },
  { id: 14, round: "Round of 32", cat1: null, cat2: null, winner: null },
  { id: 15, round: "Round of 32", cat1: null, cat2: null, winner: null },
  { id: 16, round: "Round of 32", cat1: null, cat2: null, winner: null },

  // ── ROUND OF 16 ──────────────────────────────────────────
  { id: 17, round: "Round of 16", from: [1, 2],   winner: null },
  { id: 18, round: "Round of 16", from: [3, 4],   winner: null },
  { id: 19, round: "Round of 16", from: [5, 6],   winner: null },
  { id: 20, round: "Round of 16", from: [7, 8],   winner: null },
  { id: 21, round: "Round of 16", from: [9, 10],  winner: null },
  { id: 22, round: "Round of 16", from: [11, 12], winner: null },
  { id: 23, round: "Round of 16", from: [13, 14], winner: null },
  { id: 24, round: "Round of 16", from: [15, 16], winner: null },

  // ── QUARTERFINALS ────────────────────────────────────────
  { id: 25, round: "Quarterfinals", from: [17, 18], winner: null },
  { id: 26, round: "Quarterfinals", from: [19, 20], winner: null },
  { id: 27, round: "Quarterfinals", from: [21, 22], winner: null },
  { id: 28, round: "Quarterfinals", from: [23, 24], winner: null },

  // ── SEMIFINALS ───────────────────────────────────────────
  { id: 29, round: "Semifinals", from: [25, 26], winner: null },
  { id: 30, round: "Semifinals", from: [27, 28], winner: null },

  // ── FINAL ────────────────────────────────────────────────
  { id: 31, round: "Final", from: [29, 30], winner: null },
]
