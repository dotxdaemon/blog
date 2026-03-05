/* ABOUTME: Renders artwork grids for music, movies, and games with artwork-scoped overlays. */
/* ABOUTME: Sizes contain-fit artwork interactions to the visible image bounds and shuffles entries. */
function setupArtworkGrid() {
  const albumList = document.getElementById('album-list');
  if (!albumList) return;

  const sourceKey =
    typeof albumList.dataset.source === 'string' && albumList.dataset.source.trim()
      ? albumList.dataset.source.trim()
      : 'LISTENING_TO_ALBUMS';
  const overlayMode =
    typeof albumList.dataset.overlay === 'string' && albumList.dataset.overlay.trim()
      ? albumList.dataset.overlay.trim().toLowerCase()
      : 'title-secondary';
  const artworkFitMode =
    typeof albumList.dataset.fit === 'string' && albumList.dataset.fit.trim()
      ? albumList.dataset.fit.trim().toLowerCase()
      : 'cover';
  const touchOverlayEnabled =
    window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const albums = Array.isArray(window[sourceKey]) ? window[sourceKey] : [];
  const shuffledAlbums = shuffleArtworkItems([...albums]);
  const frameBoundsUpdaters = [];
  const clearTouchOverlays = () => {
    albumList.querySelectorAll('.album-artwork-frame.is-overlay-visible').forEach((artworkFrame) => {
      artworkFrame.classList.remove('is-overlay-visible');
    });
  };

  albumList.innerHTML = '';
  shuffledAlbums.forEach((album) => {
    if (!album || typeof album !== 'object') {
      return;
    }

    const albumTitle = typeof album.title === 'string' ? album.title.trim() : '';
    const albumArtist = typeof album.artist === 'string' ? album.artist.trim() : '';
    const albumDirector = typeof album.director === 'string' ? album.director.trim() : '';
    const artwork = typeof album.artwork === 'string' ? album.artwork.trim() : '';
    if (!albumTitle || !artwork) {
      return;
    }

    const secondaryName = albumArtist || albumDirector;
    const label = overlayMode === 'title' ? albumTitle : [albumTitle, secondaryName].filter(Boolean).join(' - ');

    const item = document.createElement('li');
    item.className = 'album-item';

    const artworkFrame = document.createElement('span');
    artworkFrame.className = 'album-artwork-frame';
    artworkFrame.tabIndex = 0;

    const artworkImage = document.createElement('img');
    artworkImage.className = 'album-artwork';
    artworkImage.src = artwork;
    artworkImage.alt = `${(label || albumTitle)} artwork`;
    artworkImage.loading = 'lazy';
    artworkImage.style.objectFit = artworkFitMode === 'contain' ? 'contain' : 'cover';

    const overlay = document.createElement('span');
    overlay.className = 'album-overlay';
    overlay.textContent = label || albumTitle;

    artworkFrame.appendChild(artworkImage);
    artworkFrame.appendChild(overlay);
    item.appendChild(artworkFrame);

    if (artworkFitMode === 'contain') {
      const updateArtworkFrameBounds = () => {
        const itemWidth = item.clientWidth;
        const itemHeight = item.clientHeight;
        const naturalWidth = artworkImage.naturalWidth;
        const naturalHeight = artworkImage.naturalHeight;
        if (!(itemWidth > 0 && itemHeight > 0 && naturalWidth > 0 && naturalHeight > 0)) {
          return;
        }

        const itemRatio = itemWidth / itemHeight;
        const artworkRatio = naturalWidth / naturalHeight;
        let frameWidth = itemWidth;
        let frameHeight = itemHeight;

        if (artworkRatio > itemRatio) {
          frameHeight = itemWidth / artworkRatio;
        } else {
          frameWidth = itemHeight * artworkRatio;
        }

        const frameLeft = (itemWidth - frameWidth) / 2;
        const frameTop = (itemHeight - frameHeight) / 2;
        artworkFrame.style.setProperty('--artwork-frame-top', `${frameTop}px`);
        artworkFrame.style.setProperty('--artwork-frame-right', `${frameLeft}px`);
        artworkFrame.style.setProperty('--artwork-frame-bottom', `${frameTop}px`);
        artworkFrame.style.setProperty('--artwork-frame-left', `${frameLeft}px`);
      };

      frameBoundsUpdaters.push(updateArtworkFrameBounds);
      if (artworkImage.complete) {
        updateArtworkFrameBounds();
      } else {
        artworkImage.addEventListener('load', updateArtworkFrameBounds, { once: true });
      }
    }

    if (touchOverlayEnabled) {
      artworkFrame.addEventListener('click', () => {
        if (artworkFrame.classList.contains('is-overlay-visible')) {
          artworkFrame.classList.remove('is-overlay-visible');
          return;
        }
        clearTouchOverlays();
        artworkFrame.classList.add('is-overlay-visible');
      });
    }

    albumList.appendChild(item);
  });

  if (frameBoundsUpdaters.length > 0) {
    const refreshArtworkFrames = () => {
      frameBoundsUpdaters.forEach((updateArtworkFrameBounds) => {
        updateArtworkFrameBounds();
      });
    };
    window.addEventListener('resize', refreshArtworkFrames);
    requestAnimationFrame(refreshArtworkFrames);
  }

  if (touchOverlayEnabled) {
    document.addEventListener('click', (event) => {
      if (!(event.target instanceof Node)) {
        return;
      }
      if (!albumList.contains(event.target)) {
        clearTouchOverlays();
      }
    });
  }
}

function shuffleArtworkItems(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
  }
  return items;
}

setupArtworkGrid();
