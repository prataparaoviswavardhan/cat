import Logo from "./Logo.jsx"

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <Logo size={28} />
        <p>
          <strong>FatCat</strong> — 32 cats, one champion. Voting happens on Instagram;
          this site keeps the cats and the results.
        </p>
      </div>
    </footer>
  )
}
