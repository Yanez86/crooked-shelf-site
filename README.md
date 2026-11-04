# Crooked Shelf — sito

Il sito di presentazione di [Crooked Shelf](https://github.com/yanez86/crooked-shelf), la wiki self-hosted per le campagne di giochi di ruolo da tavolo. In italiano (`index.html`) e in inglese (`en/index.html`).

*The presentation site of Crooked Shelf, the self-hosted wiki for tabletop RPG campaigns. In Italian (`index.html`) and English (`en/index.html`).*

## Com'è fatto

Solo file statici: HTML, un foglio di stile (`assets/style.css`) e un piccolo script (`assets/site.js`) per la prova dei segreti del Master. Nessuna dipendenza e nessun passaggio di compilazione; i caratteri (Archivo e Inter) arrivano da Google Fonts.

- Colori e forme sono quelli del tema Chiaro della wiki.
- Gli screenshot dei temi in `assets/img/themes/` sono della wiki 0.14 sul telefono, con l'avventura di esempio «La Notte in Affitto».
- Le illustrazioni dell'avventura sono in `assets/img/`.

## Vederlo

Apri `index.html` nel browser, oppure:

```bash
python3 -m http.server 8000
```

e vai su http://localhost:8000.

## Pubblicarlo con GitHub Pages

Settings › Pages › Source: «Deploy from a branch», branch `main`, cartella `/ (root)`.

## Licenza

Codice del sito: GNU AGPL-3.0, come Crooked Shelf. Crooked Shelf non è affiliato a D&D Beyond né a Wizards of the Coast.
