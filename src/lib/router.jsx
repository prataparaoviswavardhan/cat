// A tiny hash router (#/cats/5). Hash URLs work on GitHub Pages with no setup,
// and refreshing or sharing a link never gives a 404.

import { useEffect, useState } from "react"

const read = () => window.location.hash.replace(/^#/, "") || "/"

export function useHashRoute() {
  const [path, setPath] = useState(read())
  useEffect(() => {
    const onChange = () => {
      setPath(read())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])
  return path
}

export function Link({ to, children, ...props }) {
  return (
    <a href={`#${to}`} {...props}>
      {children}
    </a>
  )
}
