import { useNow, startTime } from "../lib/time.js"
import { config } from "../data/config.js"

const pad = (n) => String(n).padStart(2, "0")

export default function Countdown() {
  const now = useNow(1000)
  const diff = Math.max(0, startTime - now)

  if (diff === 0) {
    return <p className="countdown-done">Voting is open now!</p>
  }

  const units = [
    ["Days", Math.floor(diff / 86400000)],
    ["Hours", Math.floor(diff / 3600000) % 24],
    ["Minutes", Math.floor(diff / 60000) % 60],
    ["Seconds", Math.floor(diff / 1000) % 60],
  ]

  return (
    <div className="countdown" role="timer" aria-label={`Time until voting begins, ${config.startLabel}`}>
      {units.map(([label, value]) => (
        <div className="count-box" key={label}>
          <span className="count-num" key={value}>{pad(value)}</span>
          <span className="count-label">{label}</span>
        </div>
      ))}
    </div>
  )
}
