import { useHashRoute } from "./lib/router.jsx"
import { competitionLive } from "./lib/tournament.js"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import Home from "./pages/Home.jsx"
import Cats from "./pages/Cats.jsx"
import CatProfile from "./pages/CatProfile.jsx"
import Matches from "./pages/Matches.jsx"
import Bracket from "./pages/Bracket.jsx"
import History from "./pages/History.jsx"
import Champion from "./pages/Champion.jsx"
import WaitingPage from "./pages/WaitingPage.jsx"

function pickPage(path) {
  if (path === "/") return <Home />
  if (path === "/cats") return <Cats />
  if (path.startsWith("/cats/")) return <CatProfile id={Number(path.split("/")[2])} />

  // Before the competition goes live, every results page is just "Waiting for Results".
  const resultPages = ["/matches", "/bracket", "/history", "/results", "/champion"]
  if (resultPages.includes(path) && !competitionLive) return <WaitingPage />

  if (path === "/matches") return <Matches />
  if (path === "/bracket") return <Bracket />
  if (path === "/history" || path === "/results") return <History />
  if (path === "/champion") return <Champion />
  return <Home />
}

export default function App() {
  const path = useHashRoute()
  return (
    <>
      <Header path={path} />
      {/* key={path} restarts the entrance animation on every page change */}
      <main className="page" key={path}>
        {pickPage(path)}
      </main>
      <Footer />
    </>
  )
}
