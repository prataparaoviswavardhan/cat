import { Link } from "../lib/router.jsx"
import CatCard from "../components/CatCard.jsx"
import NinoHero from "../components/NinoHero.jsx"
import WaitingForResults from "../components/WaitingForResults.jsx"
import LiveHome from "./LiveHome.jsx"
import { cats } from "../data/cats.js"
import { competitionLive } from "../lib/tournament.js"

function PreCompetitionHome() {
  return (
    <>
      <NinoHero />

      <WaitingForResults variant="band" />

      <section className="section wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">The contenders</p>
            <h2>Meet all 32 cats</h2>
          </div>
          <Link to="/cats" className="text-link">Search the cats →</Link>
        </div>
        <div className="cat-grid">
          {cats.map((cat, i) => (
            <CatCard key={cat.id} cat={cat} index={i % 8} />
          ))}
        </div>
      </section>
    </>
  )
}

export default function Home() {
  return competitionLive ? <LiveHome /> : <PreCompetitionHome />
}
