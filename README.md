# Crooked Shelf — site

The presentation site of [Crooked Shelf](https://github.com/yanez86/crooked-shelf), the self-hosted wiki for tabletop RPG campaigns: https://crookedshelf.quest. English at the root (`index.html`), Italian in `it/index.html`, with the language menu in the header.

*Il sito di presentazione di Crooked Shelf, la wiki self-hosted per le campagne di giochi di ruolo da tavolo. In inglese alla radice (`index.html`), in italiano in `it/index.html`, con il selettore della lingua nell'intestazione.*

## How it's made

Static files only: HTML, one stylesheet (`assets/style.css`) and a small script (`assets/site.js`) for the Master's secrets demo, the language menu and the current section in the side bar. No dependencies and no build step; the font (Inter) comes from Google Fonts.

- Colours, type and shapes follow the wiki's Aria theme: cool greys, one indigo accent, Inter, soft corners, a full-height bar on the left on large screens.
- The theme screenshots in `assets/img/themes/` come from the wiki 0.18 on a phone, with the example adventure «La Notte in Affitto» (`en-*` with the English interface, `it-*` with the Italian one).
- The adventure's illustrations are in `assets/img/`; the flags of the language switch are `assets/img/flag-*.svg`.
- Icons: `favicon.svg`, `favicon.ico`, `favicon-32.png` and `apple-touch-icon.png` at the root, `assets/icons/icon-*.png` for `site.webmanifest`. They are the wiki's mark in the Aria colours.
- `en/index.html` only sends the old `/en/` address to the root.
- Visitors whose browser prefers Italian are sent from the root to `it/` until they pick a language with the switch; the choice is kept in `localStorage` (`cs-lang`).

## Viewing it

Open `index.html` in a browser, or:

```bash
python3 -m http.server 8000
```

and go to http://localhost:8000.

## Publishing

GitHub Pages: Settings › Pages › Source «Deploy from a branch», branch `main`, folder `/ (root)`. The `CNAME` file holds the custom domain.

## Licence

Site code: GNU AGPL-3.0, like Crooked Shelf. Crooked Shelf is not affiliated with D&D Beyond or Wizards of the Coast.
