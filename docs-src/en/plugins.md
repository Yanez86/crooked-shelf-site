# Creating a plugin

A plugin is a folder with a `plugin.json` file and some JSON files. It contains **only data**, never code: installing it doesn't give access to the server.

A plugin can add:

| What | Key in `contributes` |
|---|---|
| Themes | `themes` |
| Page templates | `templates` |
| Ready-made calendars | `calendars` |
| Languages or translations | `locales` |
| Rules you can look up with `@` | `rules` |
| Links from rules to an external site | `links` |

The full example is in [`plugins/esempio-gotico`](../plugins/esempio-gotico): copy it and change it. [`plugins/dndbeyond`](../plugins/dndbeyond) is the D&D Beyond integration, made with a single `links`.

## Installing

1. Copy the plugin folder into `<data folder>/plugins/` (with Docker: inside the volume, `/data/plugins/`).
2. Administration › Plugins › “Look for plugins again”.
3. Press “Turn on”.

Plugins stay off until the Admin turns them on. An installed plugin with the same `id` as a bundled one replaces it.

## plugin.json

```json
{
	"id": "il-mio-plugin",
	"name": "Il mio plugin",
	"version": "1.0.0",
	"description": "A cosa serve.",
	"instructions": "1. Premi «Accendi».\n2. Come si usa, passo per passo.",
	"author": "Il tuo nome",
	"license": "CC-BY-4.0",
	"contributes": {
		"themes": ["themes/mio-tema.json"],
		"templates": ["templates/nave.json"],
		"calendars": ["calendars/calendario.json"],
		"locales": { "es": "locales/es.json" },
		"rules": ["rules/regole.json"],
		"links": ["links/sito.json"]
	}
}
```

- `id`: lowercase letters, numbers and hyphens.
- `description` and `instructions`: what it's for and how to use it (in `instructions`, `\n` starts a new line). You read them by clicking the plugin; if they're missing, the Plugins page points it out.
- Paths are relative to the plugin folder and can't go outside it.
- An invalid file is ignored and reported on the Plugins page; the rest of the plugin works.

## Theme

The same colors as the theme editor, in `#rrggbb` format. The theme is **rejected** if any text isn't readable (WCAG AA contrast). It's best to create it in the theme editor and use “Export”. Plugin themes don't have the background image.

```json
{ "name": "Gotico", "scheme": "dark", "colors": { "bg": "#14111a", "text": "#efe9f5", "…": "…" } }
```

## Template

```json
{
	"name": "Nave",
	"description": "Una nave e il suo equipaggio.",
	"fields": ["Capitano", "Porto", "Bandiera"],
	"session": false,
	"content": { "type": "doc", "content": [ { "type": "heading", "attrs": { "level": 2 }, "content": [ { "type": "text", "text": "Equipaggio" } ] }, { "type": "paragraph" } ] }
}
```

`content` is the editor's format: create the template in the wiki (New page › New template) and copy it from an exported world package (in `pages.json`, the page with `"kind": "template"`). A block with `"attrs": { "visibility": "master" }` is a Master's secret: only copies made by the Master get it. The old box `{ "type": "secret", "content": [...] }` still works: it turns into its blocks, hidden.

When you turn the plugin on, its templates become wiki pages, only once: you edit them like the others, and they stay even when it's turned off.

## Calendar

As in the example's `calendars/lunargento.json`: `months` (name, days, `festival` for holidays outside the months), `weekdays`, `eras` (name, abbreviation, starting year), `leap` (or `null`), `today` (or `null`).

## Language

A file with the same keys as `src/lib/i18n/locales/it.json`. Missing keys fall back to English. For a new language, put `"_meta": { "name": "Español" }` at the top.

## Rules

A list of entries you can look up with `@` and on the Rules page:

```json
[
	{ "kind": "rule", "key": "riposo-in-taverna", "name": "Riposo in taverna", "summary": "Regola della casa", "text": "Testo con **grassetto**.\nUna riga per paragrafo." }
]
```

`kind` is one of `spell`, `monster`, `condition`, `item`, `feat`, `species`, `class`, `background`, `rule`. An entry with the same name as one in the SRD replaces it (useful for translations or variants).

Mind the licenses: include only your own texts or openly licensed ones.

## Links

Sends `@rule` references to an external site. `{name}` becomes the rule's name:

```json
{ "site": "D&D Beyond", "url": "https://www.dndbeyond.com/search?q={name}" }
```

`url` starts with `https://` and contains `{name}`. The reference uses the first link from the plugins that are on; the preview and the rule's page show them all, with the “Open on `site`” button. Without links it leads to the rule's page, or stays plain text if the entry doesn't exist.
