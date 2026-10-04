import { useState } from "react"
import CatCard from "../components/CatCard.jsx"
import { cats } from "../data/cats.js"
import { isAlive, competitionLive } from "../lib/tournament.js"

const FILTERS = [
  ["all", "All 32"],
  ["in", "Still in"],
  ["out", "Eliminated"],
]

export default function Cats() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const q = query.trim().toLowerCase()
  const shown = cats.filter((c) => {
    const matchesText =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q) ||
      String(c.number) === q.replace("#", "")
    const matchesFilter = filter === "all" || (filter === "in" ? isAlive(c.id) : !isAlive(c.id))
    return matchesText && matchesFilter
  })

  return (
    <div className="wrap section">
      <header className="page-head">
        <p className="eyebrow">The contenders</p>
        <h1>Meet the cats</h1>
        <p className="lede">Thirty-two cats, thirty-two personalities. Tap any photo to see them up close.</p>
      </header>

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search by name, area or number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search cats"
        />
        {/* Win/lose filters only make sense once results are public. */}
        {competitionLive && (
          <div className="chips" role="group" aria-label="Filter cats">
            {FILTERS.map(([key, label]) => (
              <button
                key={key}
                className={`chip ${filter === key ? "on" : ""}`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {shown.length === 0 ? (
        <p className="empty">No cats match that search. Try another name or area.</p>
      ) : (
        <div className="cat-grid">
          {shown.map((cat, i) => (
            <CatCard key={cat.id} cat={cat} index={i % 12} />
          ))}
        </div>
      )}
    </div>
  )
}
