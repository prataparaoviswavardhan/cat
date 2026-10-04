// Image helpers.
// Data files use "/cats/1.jpg". This adds the site's base path so the
// image also works when hosted at https://name.github.io/repo/.

export const imgSrc = (path) => import.meta.env.BASE_URL + path.replace(/^\//, "")

// Shown automatically if a photo file is missing.
export function placeholder(n) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><rect width='400' height='500' fill='#F2C9B0'/><g fill='#C8552B'><path d='M110 210 L130 110 L195 175 Z'/><path d='M290 210 L270 110 L205 175 Z'/><ellipse cx='200' cy='270' rx='105' ry='95'/></g><g fill='#2A1F17'><circle cx='165' cy='260' r='9'/><circle cx='235' cy='260' r='9'/><path d='M190 290 L210 290 L200 302 Z'/></g><text x='200' y='440' font-family='Georgia,serif' font-size='64' font-weight='700' text-anchor='middle' fill='#2A1F17'>#${n}</text></svg>`
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg)
}
