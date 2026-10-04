import { Link } from "../lib/router.jsx"
import CatImage from "./CatImage.jsx"
import { getCat } from "../lib/tournament.js"

function Mini({ cat, win }) {
  return (
    <Link to={`/cats/${cat.id}`} className={`mini ${win ? "mini-win" : "mini-lose"}`}>
      <CatImage cat={cat} />
      <span>
        <b>#{cat.number}</b> {cat.name}
      </span>
    </Link>
  )
}

// "#1 <winner>  defeated  #8 <loser>" — only for completed matches.
// Pass `focusId` to also show a W / L badge from that cat's point of view.
export default function ResultRow({ match, focusId, index = 0 }) {
  const w = getCat(match.winner)
  const l = getCat(match.loser)
  if (!w || !l) return null
  const badge = focusId == null ? null : match.winner === focusId ? "W" : "L"
  return (
    <div className="result-row" style={{ "--i": index }}>
      {badge && <span className={`wl wl-${badge}`}>{badge}</span>}
      <Mini cat={w} win />
      <span className="defeated">defeated</span>
      <Mini cat={l} />
      <span className="result-round">{match.round}</span>
    </div>
  )
}
