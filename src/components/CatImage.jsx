import { useState } from "react"
import { imgSrc, placeholder } from "../lib/img.js"

// A cat photo that falls back to a friendly drawing if the file is missing.
export default function CatImage({ cat, className = "" }) {
  const [failed, setFailed] = useState(false)
  return (
    <img
      className={`cat-img ${className}`}
      src={failed ? placeholder(cat.number) : imgSrc(cat.image)}
      alt={`${cat.name}, cat number ${cat.number}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
