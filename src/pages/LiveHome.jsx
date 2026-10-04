import { Link } from "../lib/router.jsx"
import CatImage from "../components/CatImage.jsx"
import CatCard from "../components/CatCard.jsx"
import MatchCard from "../components/MatchCard.jsx"
import RoundProgress from "../components/RoundProgress.jsx"
import ResultRow from "../components/ResultRow.jsx"
import { cats } from "../data/cats.js"
import {
  currentRound, currentMatches, champion, aliveCats, getCat, matches, progress, catMatches,
} from "../lib/tournament.js"

export default function Home() {
  // Hero cats: the cats in the first undecided matches, else the first few cats.
  const live = currentMatches.filter((m) => m.status !== "completed")
  const heroIds = []
  ;(live.length ? live : currentMatches).forEach((m) => {
    ;[m.cat1, m.cat2].forEach((id) => id != null && !heroIds.includes(id) && heroIds.push(id))
  })
  const heroCats = (champion ? [champion] : heroIds.map(getCat)).concat(cats).filter(Boolean)
  const hero = heroCats.filter((c, i, a) => a.indexOf(c) === i).slice(0, 3)

  const roundProg = progress.find((p) => p.round === currentRound)

  // Matches to feature: undecided first, then the most recent results.
  const undecided = currentMatches.filter((m) => m.status !== "completed")
  const decided = currentMatches.filter((m) => m.status === "completed").reverse()
  const featured = [...undecided, ...decided].slice(0, 4)

  const recent = matches.filter((m) => m.status === "completed").slice(-3).reverse()

  return (
    <>
      <section className="hero wrap">
        <div className="hero-text">
          <p className="eyebrow">Real cats · Real rivalry · One crown</p>
          <h1>
            Who will be the <em>FatCat?</em>
          </h1>
          <p className="lede">
            Thirty-two much-loved cats from our community, one single-elimination bracket. The
            votes happen out in the real world. This is where the results live.
          </p>
          <div className="round-banner">
            <span className="dot" />
            {champion ? (
              <span>The tournament is complete — we have a champion!</span>
            ) : (
              <span>
                Now playing: <strong>{currentRound}</strong> · {roundProg.done} of {roundProg.total} matches decided
              </span>
            )}
          </div>
          <div className="hero-actions">
            <Link to="/bracket" className="btn btn-primary">See the bracket</Link>
            <Link to="/cats" className="btn btn-ghost">Meet all 32 cats</Link>
          </div>
        </div>

        <div className="hero-photos" aria-hidden="false">
          {hero.map((cat, i) => (
            <Link to={`/cats/${cat.id}`} key={cat.id} className={`hero-polaroid hp-${i}`}>
              <div className="polaroid">
                <div className="polaroid-photo">
                  <CatImage cat={cat} />
                  <span className="number-tag">#{cat.number}</span>
                </div>
                <div className="polaroid-cap">
                  <strong className="cat-name">{cat.name}</strong>
                  <span className="cat-place">{cat.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {champion && (
        <section className="champ-banner">
          <div className="wrap champ-banner-inner">
            <div className="champ-banner-photo">
              <CatImage cat={champion} />
            </div>
            <div>
              <p className="eyebrow">🏆 FatCat Champion</p>
              <h2>{champion.name}</h2>
              <p>#{champion.number} from {champion.location} takes the crown.</p>
              <Link to="/champion" className="btn btn-primary">Relive the journey</Link>
            </div>
          </div>
        </section>
      )}

      <section className="section wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">{champion ? "The final" : "On the card"}</p>
            <h2>{champion ? "How it ended" : `${currentRound} matches`}</h2>
          </div>
          <Link to="/matches" className="text-link">All matches →</Link>
        </div>
        <div className="match-grid">
          {featured.map((m, i) => (
            <MatchCard key={m.id} match={m} index={i} />
          ))}
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">32 → 16 → 8 → 4 → 2 → 🏆</p>
              <h2>Road to the crown</h2>
            </div>
            <Link to="/bracket" className="text-link">Full bracket →</Link>
          </div>
          <RoundProgress />
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">{aliveCats.length} of 32 still in</p>
            <h2>Still in the running</h2>
          </div>
          <Link to="/cats" className="text-link">Every cat →</Link>
        </div>
        <div className="cat-grid">
          {aliveCats.slice(0, 8).map((cat, i) => (
            <CatCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>
      </section>

      {recent.length > 0 && (
        <section className="section wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Latest results</p>
              <h2>Fresh off the whiskers</h2>
            </div>
            <Link to="/history" className="text-link">All results →</Link>
          </div>
          <div className="result-list">
            {recent.map((m, i) => (
              <ResultRow key={m.id} match={m} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
