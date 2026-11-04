// La lingua scelta dal selettore: la pagina inglese la legge prima di decidere se mandare alla versione italiana.
for (const link of document.querySelectorAll('.lang-switch a[hreflang]')) {
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
