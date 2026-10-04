import { useState } from "react"
import MatchCard from "../components/MatchCard.jsx"
import { ROUNDS, currentRound, matchesIn, progress } from "../lib/tournament.js"

export default function Matches() {
  const [round, setRound] = useState(currentRound)
  const list = matchesIn(round)
  const p = progress.find((x) => x.round === round)

  return (
    <div className="wrap section">
      <header className="page-head">
        <p className="eyebrow">{round === currentRound ? "Happening now" : "Browse rounds"}</p>
        <h1>{round}</h1>
        <p className="lede">
          {p.done === p.total
            ? "Every match in this round is decided."
            : `${p.done} of ${p.total} matches decided.`}
        </p>
      </header>

      <div className="chips round-tabs" role="tablist" aria-label="Rounds">
        {ROUNDS.map((r) => (
          <button
            key={r}
            role="tab"
            aria-selected={r === round}
            className={`chip ${r === round ? "on" : ""} ${r === currentRound ? "is-current" : ""}`}
            onClick={() => setRound(r)}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="match-grid" key={round}>
        {list.map((m, i) => (
          <MatchCard key={m.id} match={m} index={i} />
        ))}
      </div>
    </div>
  )
}
