import { Link } from "../lib/router.jsx"
import CatImage from "./CatImage.jsx"
import { ROUNDS, matchesIn, getCat, champion } from "../lib/tournament.js"

function Slot({ catId, match }) {
  const cat = getCat(catId)
  if (!cat) {
    return (
      <div className="b-slot b-tbd">
        <span className="b-photo">?</span>
        <span className="b-name">To be decided</span>
      </div>
    )
  }
  const won = match.winner === cat.id
  const lost = match.loser === cat.id
  return (
    <Link to={`/cats/${cat.id}`} className={`b-slot ${won ? "b-won" : ""} ${lost ? "b-lost" : ""}`}>
      <span className="b-photo">
        <CatImage cat={cat} />
      </span>
      <span className="b-name">
        <b>#{cat.number}</b> {cat.name}
      </span>
      {won && <span className="b-check" aria-label="winner">✓</span>}
    </Link>
  )
}

export default function BracketView() {
  return (
    <div className="bracket-scroll" tabIndex={0} aria-label="Tournament bracket, scrolls sideways">
      <div className="bracket">
        {ROUNDS.map((round, ri) => (
          <section className="b-round" key={round} style={{ "--ri": ri }}>
            <h3>{round}</h3>
            <div className="b-matches">
              {matchesIn(round).map((m) => (
                <div className={`b-match is-${m.status}`} key={m.id}>
                  <Slot catId={m.cat1} match={m} />
                  <Slot catId={m.cat2} match={m} />
                </div>
              ))}
            </div>
          </section>
        ))}
        <section className="b-round b-champ" style={{ "--ri": ROUNDS.length }}>
          <h3>Champion</h3>
          <div className="b-matches">
            <div className={`b-trophy ${champion ? "has-champ" : ""}`}>
              <span className="trophy" aria-hidden="true">🏆</span>
              {champion ? (
                <Link to="/champion" className="b-champ-cat">
                  <CatImage cat={champion} />
                  <strong>{champion.name}</strong>
                  <span>#{champion.number} · {champion.location}</span>
                </Link>
              ) : (
                <p>The crown is waiting for its cat.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
