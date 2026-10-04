import BracketView from "../components/BracketView.jsx"

export default function Bracket() {
  return (
    <div className="section">
      <div className="wrap">
        <header className="page-head">
          <p className="eyebrow">32 → 16 → 8 → 4 → 2 → 🏆</p>
          <h1>The bracket</h1>
          <p className="lede">
            Winners move right. Cats that are out fade back. <span className="swipe-hint">Swipe sideways to follow the road.</span>
          </p>
        </header>
      </div>
      <BracketView />
    </div>
  )
}
