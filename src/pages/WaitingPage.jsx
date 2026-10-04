import { Link } from "../lib/router.jsx"
import WaitingForResults from "../components/WaitingForResults.jsx"

// Shown for Matches, Bracket, Results and Champion until showResults is true.
export default function WaitingPage() {
  return (
    <div className="section">
      <WaitingForResults variant="page" />
      <p className="centered waiting-links">
        <Link to="/cats" className="btn btn-ghost">Meet the cats</Link>
      </p>
    </div>
  )
}
