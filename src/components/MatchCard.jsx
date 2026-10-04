import { Link } from "../lib/router.jsx"
import CatImage from "./CatImage.jsx"
import { getCat } from "../lib/tournament.js"

function Side({ catId, match }) {
  const cat = getCat(catId)
  if (!cat) {
    return (
      <div className="side side-tbd">
        <div className="side-photo tbd-photo">?</div>
        <strong>To be decided</strong>
        <span>Awaiting earlier result</span>
      </div>
    )
  }
  const won = match.winner === cat.id
  const lost = match.loser === cat.id
  return (
    <Link to={`/cats/${cat.id}`} className={`side ${won ? "won" : ""} ${lost ? "lost" : ""}`}>
      <div className="side-photo">
        <CatImage cat={cat} />
        <span className="number-tag">#{cat.number}</span>
        {won && <span className="winner-stamp">Winner</span>}
      </div>
      <strong>{cat.name}</strong>
      <span>{cat.location}</span>
    </Link>
  )
}

export default function MatchCard({ match, index = 0 }) {
  const winner = getCat(match.winner)
  return (
    <article className={`match-card is-${match.status}`} style={{ "--i": index }}>
      <header className="match-head">
        <span>{match.round} · Match {match.id}</span>
        <span className={`pill pill-${match.status}`}>
          {match.status === "completed" ? "Decided" : match.status === "upcoming" ? "Up next" : "Waiting"}
        </span>
      </header>
      <div className="match-body">
        <Side catId={match.cat1} match={match} />
        <div className="vs">VS</div>
        <Side catId={match.cat2} match={match} />
      </div>
      {winner && (
        <footer className="match-foot">
          Winner: <strong>#{winner.number} {winner.name}</strong>
        </footer>
      )}
    </article>
  )
}
