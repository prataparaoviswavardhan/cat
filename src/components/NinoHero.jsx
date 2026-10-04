import { useRef, useState } from "react"
import { Link } from "../lib/router.jsx"
import Countdown from "./Countdown.jsx"
import { config } from "../data/config.js"
import { getCat } from "../lib/tournament.js"
import { imgSrc, placeholder } from "../lib/img.js"
import { useNow, startTime } from "../lib/time.js"

// Put these three photos in the public/ folder.
// Tip for phones: ~900px wide, compressed JPGs (under ~200 KB each) load fastest.
const PHOTOS = [
  { file: "/nino1.jpg", caption: "Nino, being perfect" },
  { file: "/nino2.jpg", caption: "Nino, still perfect" },
  { file: "/nino3.jpg", caption: "Nino, obviously deserving" },
]

function Photo({ file, alt, first, number }) {
  const [failed, setFailed] = useState(false)
  return (
    <img
      className="cat-img"
      src={failed ? placeholder(number) : imgSrc(file)}
      alt={alt}
      width="720"
      height="900"
      loading={first ? "eager" : "lazy"}
      fetchpriority={first ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

export default function NinoHero() {
  const cat = getCat(config.featuredCatId)
  const started = useNow(1000) >= startTime
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  // One slide + the gap between slides = how far a swipe travels.
  const step = () => {
    const el = trackRef.current
    const gap = parseFloat(getComputedStyle(el).columnGap) || 14
    return el.children[0].offsetWidth + gap
  }
  const onScroll = () => {
    const i = Math.round(trackRef.current.scrollLeft / step())
    setActive(Math.min(PHOTOS.length - 1, Math.max(0, i)))
  }
  const goTo = (i) => trackRef.current.scrollTo({ left: i * step(), behavior: "smooth" })

  const d = (n) => ({ "--d": n })

  return (
    <section className="nino-hero">
      <p className="eyebrow nino-eyebrow" style={d(0)}>FatCat Competition · 32 cats · 1 champion</p>

      <div className="nino-stage" style={d(1)}>
        <div className="nino-sticker" aria-hidden="true">
          <span>CAT</span>
          <b>#{cat ? cat.number : config.featuredCatId}</b>
        </div>
        <div className="nino-hearts" aria-hidden="true">
          <i>♥</i><i>♥</i><i>♥</i><i>♥</i>
        </div>

        <div className="nino-track" ref={trackRef} onScroll={onScroll} tabIndex={0} aria-label="Photos of Nino. Swipe sideways.">
          {PHOTOS.map((p, i) => (
            <figure className={`nino-slide ${i === active ? "on" : ""}`} key={p.file}>
              <div className="polaroid">
                <div className="polaroid-photo">
                  <Photo
                    file={p.file}
                    first={i === 0}
                    number={config.featuredCatId}
                    alt={`${cat ? cat.name : "Nino"}, photo ${i + 1} of ${PHOTOS.length}`}
                  />
                </div>
                <figcaption className="nino-caption">{p.caption}</figcaption>
              </div>
            </figure>
          ))}
        </div>

        <div className="nino-dots" role="group" aria-label="Choose photo">
          {PHOTOS.map((p, i) => (
            <button
              key={p.file}
              className={i === active ? "on" : ""}
              onClick={() => goTo(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === active}
            />
          ))}
        </div>
        <p className="nino-swipe">swipe, there's more of her</p>
      </div>

      <h1 className="nino-title" style={d(2)}>
        PLEASE VOTE FOR MY <em>BABY</em>
        <span className="nino-emoji" aria-hidden="true"> 🥹🐾</span>
      </h1>
      <p className="nino-sub" style={d(3)}><span>She deserves your vote.</span></p>
      <p className="nino-bias" style={d(3)}>(yes, I'm biased. no, I'm not sorry.)</p>

      <p className="nino-insta" style={d(4)}>
        Voting happens on Instagram{" "}
        <a href={config.instagramProfileUrl} target="_blank" rel="noopener noreferrer">
          @{config.instagramHandle}
        </a>
      </p>

      <a className="nino-cta" style={d(5)} href={config.instagramProfileUrl} target="_blank" rel="noopener noreferrer">
        VOTE FOR NINO <span aria-hidden="true">→</span>
      </a>

      <div className="nino-countdown" style={d(6)}>
        {!started && <p className="nino-when">Voting begins {config.startLabel}.</p>}
        <Countdown />
        {!started && <p className="time-note">{config.timeNote}</p>}
      </div>

      <Link to={`/cats/${config.featuredCatId}`} className="text-link nino-meet" style={d(7)}>
        Meet Nino properly →
      </Link>
    </section>
  )
}
