import InstagramButton from "./InstagramButton.jsx"
import { useNow, startTime } from "../lib/time.js"
import { config } from "../data/config.js"

// A sleeping cat, drawn inline so it needs no image file.
function SleepingCat() {
  return (
    <svg className="sleeping-cat" viewBox="0 0 240 130" aria-hidden="true">
      <path d="M196 96 Q232 90 216 58" fill="none" stroke="#c8552b" strokeWidth="15" strokeLinecap="round" />
      <ellipse cx="116" cy="92" rx="88" ry="30" fill="#c8552b" />
      <circle cx="62" cy="76" r="27" fill="#c8552b" />
      <path d="M40 60 L42 36 L60 52 Z" fill="#c8552b" />
      <path d="M84 60 L82 36 L66 52 Z" fill="#c8552b" />
      <path d="M50 78 q6 6 12 0" fill="none" stroke="#2a1f17" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M68 78 q6 6 12 0" fill="none" stroke="#2a1f17" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M60 88 L66 88 L63 92 Z" fill="#2a1f17" />
      <g fontFamily="Georgia, serif" fontWeight="700" fill="#2a1f17">
        <text className="zzz z1" x="96" y="46" fontSize="18">z</text>
        <text className="zzz z2" x="112" y="30" fontSize="24">z</text>
        <text className="zzz z3" x="132" y="12" fontSize="30">z</text>
      </g>
    </svg>
  )
}

export default function WaitingForResults({ variant = "band" }) {
  const started = useNow(1000) >= startTime

  return (
    <section className={`waiting waiting-${variant}`}>
      <div className="wrap waiting-inner">
        <SleepingCat />
        <div className="waiting-text">
          <h2>Waiting for Results</h2>
          <p className="waiting-when">
            {started
              ? "The competition is under way."
              : `The competition begins ${config.startLabel}.`}
          </p>
          <p>
            {started
              ? "Follow the competition on Instagram and vote when the matches are posted. Results will appear here once they're announced."
              : "Follow the competition on Instagram and vote when the matches are posted."}
          </p>
          <InstagramButton />
        </div>
      </div>
    </section>
  )
}
