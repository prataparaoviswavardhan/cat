import { Link } from "../lib/router.jsx"
import CatImage from "../components/CatImage.jsx"
import ResultRow from "../components/ResultRow.jsx"
import { champion, catMatches, catRecord, aliveCats } from "../lib/tournament.js"

// Soft falling confetti, pure CSS. Positions are fixed so it never re-randomises.
const confetti = Array.from({ length: 24 }, (_, i) => ({
  left: (i * 41) % 100,
  delay: (i % 8) * 0.35,
  dur: 4 + (i % 5),
  tone: i % 4,
}))

export default function Champion() {
  if (!champion) {
    return (
      <div className="wrap section">
        <header className="page-head">
          <p className="eyebrow">The crown</p>
          <h1>No champion yet</h1>
          <p className="lede">
            {aliveCats.length} cats are still in the hunt. When the final is decided, the winner
            is crowned right here.
          </p>
          <div className="hero-actions">
            <Link to="/bracket" className="btn btn-primary">Follow the bracket</Link>
            <Link to="/matches" className="btn btn-ghost">Current matches</Link>
          </div>
        </header>
        <div className="empty-crown" aria-hidden="true">🏆</div>
      </div>
    )
  }

  const record = catRecord(champion.id)
  const journey = catMatches(champion.id).filter((m) => m.status === "completed")

  return (
    <div className="champion-page">
      <div className="confetti" aria-hidden="true">
        {confetti.map((c, i) => (
          <i key={i} className={`c${c.tone}`} style={{ left: `${c.left}%`, animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s` }} />
        ))}
      </div>

      <section className="wrap champion-hero">
        <p className="eyebrow crown-eyebrow">🏆 FatCat Champion</p>
        <figure className="polaroid champion-photo">
          <div className="polaroid-photo">
            <CatImage cat={champion} />
            <span className="number-tag big">#{champion.number}</span>
          </div>
        </figure>
        <h1 className="champion-name">{champion.name}</h1>
        <p className="location">📍 {champion.location}</p>
        <p className="lede centered">
          Won {record.wins} matches in a row to take the crown.
        </p>
      </section>

      <section className="wrap section-sub">
        <h2 className="centered">The journey</h2>
        <div className="result-list journey">
          {journey.map((m, i) => (
            <ResultRow key={m.id} match={m} focusId={champion.id} index={i} />
          ))}
        </div>
        <p className="centered">
          <Link to="/bracket" className="btn btn-ghost">See the full bracket</Link>
        </p>
      </section>
    </div>
  )
}
