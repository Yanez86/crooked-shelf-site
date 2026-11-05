// Genera le pagine della documentazione da docs-src/<lingua>/*.md: npm run docs.
// L'italiano è copiato da docs/ del repository di Crooked Shelf; l'inglese è la sua traduzione.
// Le pagine generate (docs/ e it/docs/) sono file statici e stanno nel repository, come il resto del sito.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { Marked } from 'marked';

const REPO = 'https://github.com/yanez86/crooked-shelf';
const SITE_REPO = 'https://github.com/yanez86/crooked-shelf-site';
const VERSION = '2026-11-05c'; // per stile e script: cambiarla quando cambiano, così il browser li riscarica

// Le guide, nello stesso ordine nelle due lingue: il nome del file è anche quello della pagina.
const GUIDES = [
	{ en: 'installation', it: 'installazione', icon: 'download' },
	{ en: 'guide', it: 'guida', icon: 'book' },
	{ en: 'plugins', it: 'plugin', icon: 'plug' },
	{ en: 'claude', it: 'claude', icon: 'chat' }
];

const LANGS = {
	en: {
		dir: 'docs',
		root: '../', // dalla cartella della documentazione alla radice del sito
		home: '../',
		other: 'it',
		otherDir: '../it/docs/',
		t: {
			docs: 'Documentation',
			back: 'Back to the site',
			contents: 'Contents',
			edit: 'Edit this page on GitHub',
			prev: 'Previous',
			next: 'Next',
			skip: 'Skip to content',
			sections: 'Documentation',
			language: 'Language',
			theme: 'Dark theme',
			table: 'Table',
			code: 'Code',
			legal: 'Code: GNU AGPL-3.0. Crooked Shelf is not affiliated with D&amp;D Beyond or Wizards of the Coast.',
			title: (t) => `${t} — Crooked Shelf documentation`,
			intro: 'Everything you need to install Crooked Shelf, run your campaigns and extend it. The guides follow version 0.18 and are translated from the Italian originals.',
			more: 'More on GitHub',
			readme: 'README',
			changelog: 'Changelog',
			contributing: 'Contributing',
			labels: { installation: 'Installation', guide: 'User guide', plugins: 'Plugins', claude: 'Claude' },
			blurbs: {
				installation: 'Docker, without Docker, on a Raspberry Pi, online with HTTPS; settings, backups and security.',
				guide: 'Roles and campaigns, pages and secrets, maps, timelines, roll tables, sessions, profile and administration.',
				plugins: 'Data-only plugins: themes, templates, calendars, languages, rules and links. How to write and install one.',
				claude: 'Connect Claude to a campaign: the Claude Code plugin, the claude.ai connector and the token.'
			}
		}
	},
	it: {
		dir: 'it/docs',
		root: '../../',
		home: '../',
		other: 'en',
		otherDir: '../../docs/',
		t: {
			docs: 'Documentazione',
			back: 'Torna al sito',
			contents: 'Indice',
			edit: 'Modifica questa pagina su GitHub',
			prev: 'Precedente',
			next: 'Successiva',
			skip: 'Vai al contenuto',
			sections: 'Documentazione',
			language: 'Lingua',
			theme: 'Tema scuro',
			table: 'Tabella',
			code: 'Codice',
			legal: 'Codice: GNU AGPL-3.0. Crooked Shelf non è affiliato a D&amp;D Beyond né a Wizards of the Coast.',
			title: (t) => `${t} — documentazione di Crooked Shelf`,
			intro: 'Tutto quello che serve per installare Crooked Shelf, giocare le tue campagne ed estenderlo. Le guide seguono la versione 0.18.',
			more: 'Altro su GitHub',
			readme: 'README',
			changelog: 'Novità',
			contributing: 'Contribuire',
			labels: { installazione: 'Installazione', guida: "Guida all'uso", plugin: 'Plugin', claude: 'Claude' },
			blurbs: {
				installazione: 'Con Docker, senza Docker, su Raspberry Pi, su internet con HTTPS; impostazioni, backup e sicurezza.',
				guida: 'Ruoli e campagne, pagine e segreti, mappe, cronologie, tabelle di tiro, appuntamenti, profilo e amministrazione.',
				plugin: 'Plugin di soli dati: temi, template, calendari, lingue, regole e link. Come scriverne uno e installarlo.',
				claude: 'Collegare Claude a una campagna: il plugin per Claude Code, il connettore su claude.ai e il token.'
			}
		}
	}
};

const ICONS = {
	home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
	docs: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
	download: '<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 17v4h16v-4"/>',
	book: '<path d="M2 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2z"/><path d="M22 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z"/>',
	plug: '<path d="M9 2v6"/><path d="M15 2v6"/><path d="M6 8h12v4a6 6 0 0 1-12 0z"/><path d="M12 18v4"/>',
	chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>'
};
const icon = (name, size = 18) =>
	`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

const LOGO = (size) =>
	`<svg width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true"><rect class="logo-bg" width="32" height="32" rx="7" fill="#3b4fd8"/><g class="logo-books" fill="#fff"><rect x="6" y="7" width="4" height="18"/><rect x="11" y="9" width="4" height="16"/><rect x="16.5" y="8" width="4" height="17" transform="rotate(12 18.5 16.5)"/><rect x="5" y="25" width="22" height="2.5" transform="rotate(-4 16 26)"/></g></svg>`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const plain = (html) => decode(html.replace(/<[^>]+>/g, ''));
// Come GitHub: minuscole, via la punteggiatura, spazi in trattini. Così i link scritti per GitHub (#backup-automatico) funzionano.
const slug = (text) => text.toLowerCase().trim().replace(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, '').replace(/ /g, '-');

/** Trasforma una guida: titolo, sezioni (h2) per la barra, HTML del testo. */
function render(markdown, lang) {
	const L = LANGS[lang];
	const names = new Map(GUIDES.map((g) => [`${g[lang]}.md`, `${g[lang]}.html`]));
	const used = new Map();
	const sections = [];
	let title = '';
	const marked = new Marked({ gfm: true });
	marked.use({
		renderer: {
			heading({ tokens, depth }) {
				const inner = this.parser.parseInline(tokens);
				if (depth === 1) {
					title = plain(inner);
					return '';
				}
				let id = slug(plain(inner));
				const n = used.get(id) ?? 0;
				used.set(id, n + 1);
				if (n) id = `${id}-${n}`;
				if (depth === 2) sections.push({ id, text: plain(inner) });
				return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
			},
			link({ href, title: linkTitle, tokens }) {
				const text = this.parser.parseInline(tokens);
				let target = href;
				const m = /^([\w-]+\.md)(#.*)?$/.exec(href);
				if (m && names.has(m[1])) target = names.get(m[1]) + (m[2] ?? '');
				else if (href.startsWith('../')) target = `${REPO}/tree/main/${href.slice(3)}`;
				else if (/^[\w-]+\.md(#.*)?$/.test(href)) target = `${REPO}/blob/main/${href}`;
				const t = linkTitle ? ` title="${esc(linkTitle)}"` : '';
				return `<a href="${esc(target)}"${t}>${text}</a>`;
			}
		}
	});
	let html = marked.parse(markdown);
	// Tabelle e codice larghi scorrono di lato in un riquadro che si raggiunge anche da tastiera.
	html = html
		.replace(/<table>/g, `<div class="table-wrap" tabindex="0" role="region" aria-label="${L.t.table}"><table>`)
		.replace(/<\/table>/g, '</table></div>')
		.replace(/<pre>/g, `<pre tabindex="0" aria-label="${L.t.code}">`);
	return { title, sections, html };
}

function langMenu(lang, here, there) {
	const flag = (l) => `<img src="${LANGS[lang].root}assets/img/flag-${l === 'en' ? 'gb' : 'it'}.svg" width="21" height="14" alt="">`;
	const items = [
		['en', 'English', lang === 'en' ? here : there],
		['it', 'Italiano', lang === 'it' ? here : there]
	];
	return `<details class="lang-menu">
<summary>${flag(lang)}${lang.toUpperCase()}<span class="sr-only"> – ${LANGS[lang].t.language}</span><svg class="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></summary>
<ul>
${items.map(([l, name, href]) => `<li><a href="${href}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="page"' : ''}>${flag(l)}${name}</a></li>`).join('\n')}
</ul>
</details>`;
}

/** Le guide con, sotto quella aperta, le sue sezioni: per la barra a sinistra e per l'indice sul telefono. */
function guideList(lang, current, sections, withIcons) {
	const T = LANGS[lang].t;
	return GUIDES.map((g) => {
		const name = g[lang];
		const open = name === current;
		const sub = open && sections.length
			? `\n<ul class="sub">${sections.map((s) => `<li><a href="#${s.id}">${esc(s.text)}</a></li>`).join('')}</ul>`
			: '';
		return `<li><a href="${name}.html"${open ? ' aria-current="page"' : ''}>${withIcons ? icon(g.icon) : ''}${T.labels[name]}</a>${sub}</li>`;
	}).join('\n');
}

function page({ lang, current, title, sections, body, here, there, desc }) {
	const L = LANGS[lang];
	const T = L.t;
	const R = L.root;
	return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>
// Il tema scelto col pulsante (assets/site.js lo ricorda): si mette subito, prima che la pagina si disegni.
try { var cs = localStorage.getItem('cs-theme'); if (cs === 'light' || cs === 'dark') document.documentElement.setAttribute('data-theme', cs); } catch (e) {}
</script>
<title>${esc(T.title(title))}</title>
<meta name="description" content="${esc(desc)}">
<link rel="icon" href="${R}favicon.ico?v=2" sizes="48x48">
<link rel="icon" href="${R}favicon.svg?v=3" type="image/svg+xml">
<link rel="icon" href="${R}favicon-32.png?v=2" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${R}apple-touch-icon.png?v=2">
<link rel="manifest" href="${R}site.webmanifest">
<meta name="theme-color" content="#f3f4f7" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#18191e" media="(prefers-color-scheme: dark)">
<link rel="alternate" hreflang="${lang}" href="${here}">
<link rel="alternate" hreflang="${L.other}" href="${there}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&amp;display=swap">
<link rel="stylesheet" href="${R}assets/style.css?v=${VERSION}">
<script src="${R}assets/site.js?v=${VERSION}" defer></script>
</head>
<body class="docs">
<a class="skip" href="#content">${T.skip}</a>

<header class="site-header">
<div class="bar">
<a class="brand" href="${L.home}">
${LOGO(30)}
Crooked Shelf</a>
<nav class="nav" aria-label="${T.sections}">
<ul>
<li><a href="${L.home}">${icon('home')}${T.back}</a></li>
<li class="sep"><a href="index.html"${current === 'index' ? ' aria-current="page"' : ''}>${icon('docs')}${T.docs}</a></li>
${guideList(lang, current, sections, true)}
</ul>
</nav>
<div class="tools">
${langMenu(lang, here, there)}
<button type="button" class="btn theme-toggle" aria-pressed="false" aria-label="${T.theme}" title="${T.theme}" hidden><svg class="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg><svg class="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></button>
<a class="btn btn-github" href="${REPO}" aria-label="GitHub">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 7l-5 5 5 5"/><path d="M16 7l5 5-5 5"/><path d="M14 4l-4 16"/></svg>
<span>GitHub</span></a>
</div>
</div>
</header>

<main id="content">
<div class="doc">
<details class="doc-toc">
<summary>${T.contents}</summary>
<ul>
<li><a href="${L.home}">${T.back}</a></li>
<li><a href="index.html"${current === 'index' ? ' aria-current="page"' : ''}>${T.docs}</a></li>
${guideList(lang, current, sections, false)}
</ul>
</details>
${body}
</div>
</main>

<footer class="site-footer">
<div class="wrap legal">
<p>${T.legal}</p>
<p><a href="https://happysquid.ink">happysquid.ink</a></p>
</div>
</footer>
</body>
</html>
`;
}

const ids = new Map(); // pagina generata → ancore che contiene, per controllare i link
const links = []; // [pagina, href]

for (const [lang, L] of Object.entries(LANGS)) {
	const T = L.t;
	mkdirSync(L.dir, { recursive: true });
	const done = [];
	for (const g of GUIDES) {
		const name = g[lang];
		const src = `docs-src/${lang}/${name}.md`;
		const { title, sections, html } = render(readFileSync(src, 'utf-8'), lang);
		done.push({ name, title, sections, html, g });
	}
	for (const [i, d] of done.entries()) {
		const prev = done[i - 1];
		const next = done[i + 1];
		const edit = lang === 'it' ? `${REPO}/blob/main/docs/${d.name}.md` : `${SITE_REPO}/blob/main/docs-src/en/${d.name}.md`;
		const pager = [
			prev ? `<a class="prev" href="${prev.name}.html"><small>${T.prev}</small>${T.labels[prev.name]}</a>` : '',
			next ? `<a class="next" href="${next.name}.html"><small>${T.next}</small>${T.labels[next.name]}</a>` : ''
		].join('');
		const body = `<p class="crumbs"><a href="index.html">${T.docs}</a> › ${esc(T.labels[d.name])}</p>
<h1>${esc(d.title)}</h1>
<article class="prose">
${d.html}</article>
<div class="doc-foot">
<p><a href="${edit}">${T.edit}</a></p>
<nav class="pager" aria-label="${T.prev} / ${T.next}">${pager}</nav>
</div>`;
		const other = d.g[L.other];
		const file = `${L.dir}/${d.name}.html`;
		writeFileSync(file, page({ lang, current: d.name, title: d.title, sections: d.sections, body, here: `${d.name}.html`, there: `${L.otherDir}${other}.html`, desc: T.blurbs[d.name] }));
		ids.set(file, new Set(d.sections.map((s) => s.id).concat([...d.html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]))));
		for (const m of d.html.matchAll(/href="([^"]+)"/g)) links.push([file, decode(m[1])]);
	}
	// La pagina iniziale della documentazione: una scheda per guida.
	const cards = done
		.map((d) => `<a class="doc-card" href="${d.name}.html">${icon(d.g.icon, 22)}<strong>${T.labels[d.name]}</strong><span>${T.blurbs[d.name]}</span></a>`)
		.join('\n');
	const more = [
		[T.readme, `${REPO}#readme`],
		[T.changelog, `${REPO}/blob/main/CHANGELOG.md`],
		[T.contributing, `${REPO}/blob/main/CONTRIBUTING.md`]
	].map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('');
	const body = `<h1>${T.docs}</h1>
<p class="lead">${T.intro}</p>
<div class="doc-cards">
${cards}
</div>
<h2 class="doc-more">${T.more}</h2>
<ul class="doc-links">${more}</ul>`;
	writeFileSync(`${L.dir}/index.html`, page({ lang, current: 'index', title: T.docs, sections: [], body, here: 'index.html', there: `${L.otherDir}index.html`, desc: T.intro }));
	ids.set(`${L.dir}/index.html`, new Set());
	console.log(`${lang}: ${done.length} guide e l'indice in ${L.dir}/`);
}

// Controllo: ogni link a una pagina della documentazione porta a una pagina e a un'ancora che esistono.
let broken = 0;
for (const [file, href] of links) {
	if (/^[a-z]+:/.test(href)) continue;
	const [path, hash] = href.split('#');
	const dir = file.slice(0, file.lastIndexOf('/'));
	const target = path ? `${dir}/${path}` : file;
	if (!ids.has(target)) {
		console.log(`  link rotto in ${file}: ${href} (pagina)`);
		broken++;
	} else if (hash && !ids.get(target).has(hash)) {
		console.log(`  link rotto in ${file}: ${href} (ancora)`);
		broken++;
	}
}
console.log(broken ? `${broken} link rotti` : 'link interni a posto');
process.exitCode = broken ? 1 : 0;
