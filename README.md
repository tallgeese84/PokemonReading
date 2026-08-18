# Poké Reading — v1.7.0

Learn-to-read app for Jonah. Synthetic phonics wrapped in a Pokémon journey:
12 routes, one decodable book each, and Pokémon whose names he can read by
the time he meets them.

## Deploy

Copy all five files to the repo root and push. GitHub Pages serves it as-is.

    index.html            the whole app, self-contained
    sw.js                 service worker (cache: poke-reading-1.7.0)
    manifest.webmanifest  PWA install
    icon-192.png
    icon-512.png

**Upload `index.html` and `sw.js` together.** The worker's cache name is tied
to the version; pushing the page alone can leave a device on an old build.

## Checking which build is live

The version shows at the bottom of the home screen. If it does not match what
you just pushed, the browser is serving a cached copy — open the grown-ups
panel (gear, then the multiplication gate) and tap **Force update**.

## Family sync

Optional. Grown-ups panel → Family sync → type the same code on every device.

- Firebase Realtime Database, REST only — no SDK, works offline
- Progress **merges**: stars and route take the higher value, books and
  Pokémon take the union. A stale device cannot undo progress made elsewhere
- Node: `pokeReading/<CODE>` on family-db-d2198
- His portrait and any voice recordings stay on the device; they are never uploaded
- Database rules must allow read/write at `/pokeReading`

## Artwork

Jonah's portrait is embedded in `index.html`. Pokémon sprites stream from the
PokéAPI sprite CDN at run time and are cached separately by the worker, so a
code deploy never discards sprites already saved for offline use.
Grown-ups → Pictures → **Download all artwork** fetches them in one pass.

## Worth doing

Grown-ups → **Record the sounds in your voice**. Speech synthesis cannot say a
clean /b/ — it adds "buh", which is exactly what makes blending hard. Your
recordings replace it everywhere. One tap per letter, 46 in total.
