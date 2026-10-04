import { config } from "../data/config.js"

export default function InstagramButton({ children = "Follow on Instagram", className = "btn btn-primary" }) {
  return (
    <a className={className} href={config.instagramUrl} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
