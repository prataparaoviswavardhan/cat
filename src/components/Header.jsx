import { Link } from "../lib/router.jsx"
import Logo from "./Logo.jsx"
import { competitionLive } from "../lib/tournament.js"

// Before launch there is nothing to browse but the cats.
const links = competitionLive
  ? [
      ["/", "Home"],
      ["/cats", "The Cats"],
      ["/matches", "Matches"],
      ["/bracket", "Bracket"],
      ["/history", "Results"],
      ["/champion", "Champion"],
    ]
  : [
      ["/", "Home"],
      ["/cats", "The Cats"],
      ["/results", "Results"],
    ]

export default function Header({ path }) {
  const isActive = (to) => (to === "/" ? path === "/" : path.startsWith(to))
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link to="/" className="wordmark" aria-label="FatCat home">
          <Logo />
          <span>FatCat</span>
        </Link>
        <nav className="nav" aria-label="Main">
          {links.map(([to, label]) => (
            <Link key={to} to={to} className={isActive(to) ? "active" : ""}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
