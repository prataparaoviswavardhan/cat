# 🐈 FatCat

A display-only website for a real cat competition: 32 cats, single elimination, one champion.
Voting happens on Instagram. No backend, no voting, no login. The source code is the source of truth.

## Run it

```bash
npm install
npm run dev      # local preview
npm run build    # production build into dist/
```

## Where things live

| File | What it's for |
| --- | --- |
| `src/data/cats.js` | The 32 cats: name, area, photo. Every page reads from here. |
| `src/data/config.js` | Start time, Instagram link, and the `showResults` switch. |
| `src/data/tournament.js` | Matchups and winners (empty until the competition starts). |

Photos go in `public/cats/` as `1.jpg` … `32.jpg`. (A placeholder cat shows until a file exists.)

## Right now: pre-competition mode

`showResults: false` in `config.js`. The site shows the hero with a countdown to
**October 5, 2026, 12:00 PM IST**, all 32 cats, and "Waiting for Results". Matchups, winners,
eliminations, the bracket and the champion are hidden completely, even if `tournament.js`
has data in it.

Set your real Instagram page in `config.js` (`instagramUrl`).

## Going live

1. When Round 1 is announced, fill in `cat1` / `cat2` for matches 1–16 in `tournament.js`.
2. Set `showResults: true` in `config.js`.
3. After each match, set `winner:` to the winning cat's id. The next round fills itself in
   (`from: [1, 2]` = winner of match 1 vs winner of match 2), and the bracket, cat profiles,
   records, results and champion page all update.

`winner: null` means "not decided yet". The winner must be one of the two cats in that match.

## Publish to GitHub Pages

1. Create a GitHub repo and push this project to the `main` branch.
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. Every push to `main` builds and deploys (`.github/workflows/deploy.yml`).

The site uses hash links (`#/cats/5`) and a relative base path, so it works from any repo
name and never shows a 404 on refresh.

## Project layout

```
src/
├── data/        cats.js, config.js, tournament.js   ← the files you edit
├── lib/         tournament logic, tiny router, clock, image helpers
├── components/  CatCard, Countdown, WaitingForResults, MatchCard, BracketView, …
├── pages/       Home, Cats, CatProfile, WaitingPage, Matches, Bracket, History, Champion
├── App.jsx
└── styles.css
public/cats/     1.jpg … 32.jpg
```
# cat
