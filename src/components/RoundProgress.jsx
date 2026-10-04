import { progress, currentRound } from "../lib/tournament.js"

const CATS_LEFT = { "Round of 32": 32, "Round of 16": 16, Quarterfinals: 8, Semifinals: 4, Final: 2 }

export default function RoundProgress() {
  return (
    <ol className="progress">
      {progress.map((p, i) => {
        const done = p.done === p.total
        const now = p.round === currentRound && !done
        return (
          <li key={p.round} className={`step ${done ? "done" : ""} ${now ? "now" : ""}`} style={{ "--i": i }}>
            <span className="step-cats">{CATS_LEFT[p.round]} cats</span>
            <strong>{p.round}</strong>
            <span className="step-dots" aria-hidden="true">
              {Array.from({ length: p.total }, (_, k) => (
                <i key={k} className={k < p.done ? "on" : ""} />
              ))}
            </span>
            <span className="step-count">
              {done ? "Complete" : `${p.done} of ${p.total} decided`}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
