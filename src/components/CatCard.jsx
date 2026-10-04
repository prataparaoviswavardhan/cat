import { Link } from "../lib/router.jsx"
import CatImage from "./CatImage.jsx"
import { catStatus } from "../lib/tournament.js"

export default function CatCard({ cat, index = 0 }) {
  const status = catStatus(cat.id)
  return (
    <Link
      to={`/cats/${cat.id}`}
      className={`cat-card tone-${status.tone}`}
      style={{ "--i": index }}
    >
      <figure className="polaroid">
        <div className="polaroid-photo">
          <CatImage cat={cat} />
          <span className="number-tag">#{cat.number}</span>
          {status.tone === "out" && <span className="out-tag">Out</span>}
          {status.tone === "champion" && <span className="out-tag champ">Champion</span>}
        </div>
        <figcaption>
          <strong className="cat-name">{cat.name}</strong>
          <span className="cat-place">{cat.location}</span>
        </figcaption>
      </figure>
    </Link>
  )
}
