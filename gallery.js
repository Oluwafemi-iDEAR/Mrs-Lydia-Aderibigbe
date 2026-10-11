(() => {
  'use strict';
  const grid = document.getElementById('gallery-grid');
  const status = document.getElementById('gallery-status');
  const modal = document.getElementById('lightbox');
  const viewer = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  const counter = document.getElementById('slide-counter');
  const closeBtn = document.getElementById('close-lightbox');
  let photos = [];
  let active = 0;
  let previousFocus = null;
  let touchStartX = null;
  const show = (index) => {
    if (!photos.length) return;
    active = (index + photos.length) % photos.length;
    const photo = photos[active];
    viewer.src = photo.src;
    viewer.alt = photo.caption;
    caption.textContent = photo.caption;
    counter.textContent = `${active + 1} / ${photos.length}`;
  };
  const open = (index) => {
    previousFocus = document.activeElement;
    show(index);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };
  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    viewer.removeAttribute('src');
    if (previousFocus) previousFocus.focus();
  };
  document.getElementById('slide-prev').addEventListener('click', () => show(active - 1));
  document.getElementById('slide-next').addEventListener('click', () => show(active + 1));
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(active - 1);
    else if (e.key === 'ArrowRight') show(active + 1);
    else if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); }
  });
  modal.addEventListener('touchstart', e => {touchStartX = e.changedTouches[0]?.screenX ?? null;}, {passive:true});
  modal.addEventListener('touchend', e => {
    if (touchStartX === null) return;
    const change = (e.changedTouches[0]?.screenX ?? touchStartX) - touchStartX;
    if (Math.abs(change) > 55) show(active + (change < 0 ? 1 : -1));
    touchStartX = null;
  }, {passive:true});
  fetch('assets/gallery.json', {cache:'no-cache'})
    .then(response => {if (!response.ok) throw new Error('Gallery index unavailable'); return response.json();})
    .then(entries => {
      if (!Array.isArray(entries)) throw new Error('Invalid gallery index');
      photos = entries.filter(entry => entry && typeof entry.src === 'string' && entry.src.startsWith('assets/gallery/') && typeof entry.caption === 'string');
      if (!photos.length) {status.textContent = 'Photographs will appear here soon. Please check back for cherished memories.';return;}
      status.textContent = `${photos.length} photograph${photos.length === 1 ? '' : 's'} · Select a photo to view it. Swipe or use the arrows to browse.`;
      const fragment = document.createDocumentFragment();
      photos.forEach((photo, index) => {
        const btn = document.createElement('button');
        btn.className = 'photo-card'; btn.type = 'button';
        btn.setAttribute('aria-label', `Open photograph ${index+1}: ${photo.caption}`);
        const img = document.createElement('img'); img.src = photo.src; img.alt = photo.caption; img.loading = 'lazy';
        const name = document.createElement('span'); name.textContent = photo.caption;
        btn.append(img, name); btn.addEventListener('click', () => open(index)); fragment.appendChild(btn);
      });
      grid.appendChild(fragment);
    }).catch(() => {status.textContent = 'The gallery could not be loaded. Please refresh the page shortly.';});
})();
