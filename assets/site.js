// Nella barra a sinistra è evidenziata la sezione che si sta leggendo, come la pagina aperta nell'albero della wiki.
(() => {
	const links = new Map();
	for (const a of document.querySelectorAll('.nav a[href^="#"]')) {
		const section = document.getElementById(a.getAttribute('href').slice(1));
		if (section) links.set(section, a);
	}
	if (!links.size || !('IntersectionObserver' in window)) return;
	const visible = new Set();
	const mark = () => {
		// La prima sezione in ordine di pagina tra quelle che occupano la fascia centrale dello schermo.
		const current = [...links.keys()].find((s) => visible.has(s));
		for (const [s, a] of links) {
			if (s === current) a.setAttribute('aria-current', 'true');
			else a.removeAttribute('aria-current');
		}
	};
	const observer = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) visible.add(e.target);
				else visible.delete(e.target);
			}
			mark();
		},
		{ rootMargin: '-35% 0px -55% 0px' }
	);
	for (const s of links.keys()) observer.observe(s);
})();

// Il menu della lingua si chiude con Esc (il fuoco torna sul pulsante) e cliccando fuori.
for (const menu of document.querySelectorAll('.lang-menu')) {
	document.addEventListener('click', (e) => {
		if (menu.open && !menu.contains(e.target)) menu.open = false;
	});
	menu.addEventListener('keydown', (e) => {
		if (e.key !== 'Escape' || !menu.open) return;
		menu.open = false;
		menu.querySelector('summary').focus();
	});
}

// La lingua scelta (dal menu o dal link nel piè di pagina): la pagina inglese la legge prima di decidere
// se mandare alla versione italiana. Senza, chi ha il browser in italiano non potrebbe restare sull'inglese.
for (const link of document.querySelectorAll('a[hreflang]')) {
	link.addEventListener('click', () => {
		try {
			localStorage.setItem('cs-lang', link.hreflang);
		} catch {
			// Senza localStorage la scelta non si ricorda, e la pagina inglese non sposta nessuno.
		}
	});
}

// La prova dei segreti: vista Master o giocatore, e l'occhio che oscura un blocco.
// I testi stanno nell'HTML (data-*), così lo stesso script vale per ogni lingua.
(() => {
	const demo = document.querySelector('[data-demo]');
	if (!demo) return;
	const views = demo.querySelectorAll('[data-view-btn]');
	const blocks = [...demo.querySelectorAll('.block')];
	const note = demo.querySelector('[data-note]');

	function update() {
		let previous = false;
		let hidden = 0;
		for (const block of blocks) {
			const secret = block.classList.contains('is-secret');
			// «Segreto del Master» compare sopra il primo blocco oscurato di fila, come nell'editor.
			block.classList.toggle('is-first', secret && !previous);
			previous = secret;
			if (secret) hidden++;
			const eye = block.querySelector('.eye');
			const label = secret ? eye.dataset.show : eye.dataset.hide;
			eye.setAttribute('aria-pressed', String(secret));
			eye.setAttribute('aria-label', label);
			eye.title = label;
		}
		if (demo.dataset.view === 'player') note.textContent = note.dataset.player;
		else if (hidden === 0) note.textContent = note.dataset.zero;
		else if (hidden === 1) note.textContent = note.dataset.one;
		else note.textContent = note.dataset.many.replace('{n}', String(hidden));
	}

	function setView(view) {
		demo.dataset.view = view;
		for (const b of views) b.setAttribute('aria-pressed', String(b.dataset.viewBtn === view));
		update();
	}

	for (const b of views) b.addEventListener('click', () => setView(b.dataset.viewBtn));
	for (const block of blocks) {
		block.querySelector('.eye').addEventListener('click', () => {
			block.classList.toggle('is-secret');
			update();
		});
	}
	setView('master');
})();
