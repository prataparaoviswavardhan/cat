import ResultRow from "../components/ResultRow.jsx"
import { ROUNDS, matchesIn } from "../lib/tournament.js"

export default function History() {
  // Latest round first; inside a round, latest match first.
  const groups = [...ROUNDS]
    .reverse()
    .map((round) => ({
      round,
      done: matchesIn(round).filter((m) => m.status === "completed").reverse(),
    }))
    .filter((g) => g.done.length > 0)

  return (
    <div className="wrap section">
      <header className="page-head">
        <p className="eyebrow">The record</p>
        <h1>Results so far</h1>
        <p className="lede">Every decided match, newest first.</p>
      </header>

      {groups.length === 0 ? (
        <p className="empty">No matches have been decided yet. Check back soon!</p>
      ) : (
        groups.map((g) => (
          <section key={g.round} className="history-group">
            <h2>{g.round}</h2>
            <div className="result-list">
              {g.done.map((m, i) => (
                <ResultRow key={m.id} match={m} index={i} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}
