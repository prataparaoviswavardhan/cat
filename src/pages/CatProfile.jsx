import { Link } from "../lib/router.jsx"
import CatImage from "../components/CatImage.jsx"
import MatchCard from "../components/MatchCard.jsx"
import ResultRow from "../components/ResultRow.jsx"
import InstagramButton from "../components/InstagramButton.jsx"
import { getCat, catMatches, catRecord, catStatus, competitionLive } from "../lib/tournament.js"
import { config } from "../data/config.js"
import { cats } from "../data/cats.js"

export default function CatProfile({ id }) {
  const c = getCat(id)
  if (!c) {
    return (
      <div className="wrap section">
        <h1>Cat not found</h1>
        <p className="lede">We couldn't find that cat.</p>
        <Link to="/cats" className="btn btn-primary">See all cats</Link>
      </div>
    )
  }

  const status = catStatus(c.id)
  const record = catRecord(c.id)
  const all = catMatches(c.id)
  const finished = all.filter((m) => m.status === "completed")
  const upcoming = all.filter((m) => m.status !== "completed")
  const prev = cats[(c.id - 2 + cats.length) % cats.length]
  const next = cats[c.id % cats.length]

  return (
    <div className="wrap section profile">
      <Link to="/cats" className="text-link back">← All cats</Link>

      <div className="profile-top">
        <figure className="polaroid profile-photo">
          <div className="polaroid-photo">
            <CatImage cat={c} />
            <span className="number-tag big">#{c.number}</span>
          </div>
        </figure>

        <div className="profile-info">
          <p className="eyebrow">Cat number {c.number}</p>
          <h1 className="profile-name">{c.name}</h1>
          <p className="location">📍 {c.location}</p>

          {competitionLive ? (
            <>
              <span className={`status status-${status.tone}`}>{status.label}</span>
              <dl className="stats">
                <div><dt>Wins</dt><dd>{record.wins}</dd></div>
                <div><dt>Losses</dt><dd>{record.losses}</dd></div>
                <div><dt>Matches</dt><dd>{record.played}</dd></div>
              </dl>
            </>
          ) : (
            <>
              <p className="waiting-chip"><span className="dot" />Waiting for Results</p>
              <p className="profile-note">
                The competition begins {config.startLabel}. Follow it on Instagram and vote when
                the matches are posted.
              </p>
              <InstagramButton />
            </>
          )}
        </div>
      </div>

      {competitionLive && upcoming.length > 0 && (
        <section className="section-sub">
          <h2>Coming up</h2>
          <div className="match-grid">
            {upcoming.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)}
          </div>
        </section>
      )}

      {competitionLive && (
        <section className="section-sub">
          <h2>Match history</h2>
          {finished.length === 0 ? (
            <p className="empty">{c.name} hasn't played a decided match yet.</p>
          ) : (
            <div className="result-list">
              {finished.map((m, i) => <ResultRow key={m.id} match={m} focusId={c.id} index={i} />)}
            </div>
          )}
        </section>
      )}

      <nav className="pager">
        <Link to={`/cats/${prev.id}`}>← #{prev.number} {prev.name}</Link>
        <Link to={`/cats/${next.id}`}>#{next.number} {next.name} →</Link>
      </nav>
    </div>
  )
}
