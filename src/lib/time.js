import { useEffect, useState } from "react"
import { config } from "../data/config.js"

export const startTime = new Date(config.competitionStart).getTime()

// Current time as a number, refreshed every `ms` milliseconds.
export function useNow(ms = 1000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), ms)
    return () => clearInterval(id)
  }, [ms])
  return now
}
