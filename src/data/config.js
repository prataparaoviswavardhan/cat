// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS
// ─────────────────────────────────────────────────────────────

export const config = {
  // When voting opens. This exact moment drives the countdown.
  // (+05:30 = India Standard Time.)
  competitionStart: "2026-10-05T12:00:00+05:30",

  // How the date reads on the page.
  startLabel: "October 5 at 12:00 PM",
  timeNote: "India Standard Time",

  // Placeholder: swap in your real Instagram page, e.g. "https://www.instagram.com/yourname/"
  instagramUrl: "https://www.instagram.com/",

  // The cat featured in the home-page hero, and the Instagram account to vote on.
  featuredCatId: 18,
  instagramHandle: "_thundryn_",

  // The hero's featured cat and her Instagram. Nino is cat number 18.
  featuredCatId: 18,
  instagramHandle: "_thundryn_",
  instagramProfileUrl: "https://www.instagram.com/_thundryn_/",

  // ── THE BIG SWITCH ──────────────────────────────────────────
  // false → pre-competition showcase. The site shows ONLY the cats and
  //         "Waiting for Results". Matchups, winners, eliminations, the
  //         bracket and the champion are completely hidden, even if
  //         tournament.js contains data.
  // true  → the full competition site (matches, bracket, results, champion).
  showResults: false,
}
