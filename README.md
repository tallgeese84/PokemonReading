# Poké Reading — v1.9.0

Learn-to-read app for Jonah. Synthetic phonics wrapped in a Pokémon journey:
12 routes, one decodable book each, and Pokémon whose names he can read by the
time he meets them.

## Deploy

Copy all five files to the repo root and push. Upload `index.html` and
`sw.js` **together** — the cache name is tied to the version, and pushing the
page alone can strand a device on an old build.

## How a route runs

    shapes -> meet the sound -> write it -> hunt -> blend -> build -> heart words -> book

Each stage ends in a Pokémon. Stages with nothing to teach are skipped, so
later routes are shorter.

- **shapes** — match the letterform. No sound knowledge needed; distractors are
  the pairs children actually muddle (b/d, p/q, n/u).
- **write** — trace the letter with a finger, correct stroke order enforced.
  Runs on routes 1-5 and covers all 26 letters exactly once.
- Choices ramp 2 -> 3 -> 4 options as the routes progress.
- After two misses on a question, wrong choices fade out so he can always finish.

## Which build is live

Version shows at the bottom of the home screen. If it does not match what you
pushed, open the grown-ups panel and tap **Force update**.

## Letter names

Off by default (Settings). Sounds are what let a child blend a word; a child who
learns "bee ay tee" tends to blend the names, and the word never appears. Turn
them on once he is decoding comfortably.

## Family sync

Grown-ups → Family sync → same code on every device. Firebase Realtime Database
over REST, no SDK. Progress **merges** — stars and route take the higher value,
books and Pokémon take the union — so an offline device can never undo progress
made elsewhere. Node: `pokeReading/<CODE>`; rules must allow read/write there.
His portrait and any voice recordings stay on the device.

## Artwork

Portrait embedded. Pokémon sprites stream from the PokéAPI sprite CDN into
their own cache bucket, so a code deploy never discards sprites saved for
offline use. Grown-ups → Pictures → **Download all artwork**.

## Still worth doing

Grown-ups → **Record the sounds in your voice**. Speech synthesis cannot say a
clean /b/ — it adds "buh", which is exactly what makes blending hard.

## Changelog

- **1.9.0** — handwriting: trace all 26 lowercase letters with correct stroke
  order, "show me" animation, forgiving tolerance, resume after lifting a
  finger; write mode in "my letters"
- **1.8.0** — letter-shape matching stage; confusable-pair distractors;
  choices ramp by route; "my letters" screen; optional letter names
- **1.7.1** — purple ball app icon
- **1.7.0** — family sync (Firebase RTDB, REST, merge-not-overwrite)
- **1.6.0** — version stamp, build panel, force update
- **1.5.0** — quest strip, per-answer sound, shorter activities, scaffolding
  after two misses, evolution on duplicates, buddy on the home screen
