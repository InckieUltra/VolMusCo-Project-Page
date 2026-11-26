(function () {
  'use strict';

  const CFG = window.VOLMUSCO_CONFIG;
  if (!CFG) return;

  const resolveDemoUrl = (path) => {
    if (!path) return '';
    if (/^(https?:|blob:|data:)/i.test(path) || path.startsWith('./')) return path;
    const base = (CFG.demoGalleryBase || '').replace(/\/+$/, '');
    return base + (path.startsWith('/') ? path : '/' + path);
  };

  const resolveMeshUrl = (path) => {
    if (!path) return '';
    if (/^(https?:|blob:|data:)/i.test(path) || path.startsWith('./')) return path;
    const base = (CFG.meshInspectorBase || '').replace(/\/+$/, '');
    return base + (path.startsWith('/') ? path : '/' + path);
  };

  const formatTime = (sec) => {
    const s = Math.max(0, Number.isFinite(sec) ? Math.floor(sec) : 0);
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  };

  // --------------------------------------------------------------------------
  // 0. ENPIRE-Style Full-Screen Hero & Scroll-Reveal Navigation
  // --------------------------------------------------------------------------
  function initEnpireHeroAndScroll() {
    const heroCenter = document.getElementById('enpire-hero-center');
    const heroVideo = document.getElementById('enpire-hero-video');
    const nav = document.getElementById('site-nav');
    const heroSec = document.getElementById('top-hero');

    if (heroVideo && CFG.heroTeaser) {
      if (!heroVideo.getAttribute('src')) heroVideo.src = CFG.heroTeaser.video;
      if (!heroVideo.getAttribute('poster')) heroVideo.poster = CFG.heroTeaser.poster;
      const syncHeroMeta = () => {
        if (heroVideo.videoWidth) {
          heroVideo.dataset.res = heroVideo.videoWidth + 'x' + heroVideo.videoHeight;
        }
      };
      heroVideo.addEventListener('loadedmetadata', syncHeroMeta);
      syncHeroMeta();
      heroVideo.play().catch(() => {});
    }

    // Trigger letter-by-letter blur-in reveal shortly after mount
    if (heroCenter) {
      setTimeout(() => {
        heroCenter.setAttribute('data-revealed', 'true');
      }, 220);
    }

    // Show top sticky navigation once user scrolls past the 100svh hero
    const updateNavVisibility = () => {
      if (!nav) return;
      const threshold = heroSec ? Math.max(240, heroSec.offsetHeight * 0.65) : 360;
      nav.classList.toggle('is-shown', window.scrollY > threshold);
    };
    window.addEventListener('scroll', updateNavVisibility, { passive: true });
    updateNavVisibility();

    // Smooth scroll-reveal for sections below the hero
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }

    // Paper & Code placeholder links
    const pdfBtn = document.getElementById('hero-pdf-btn');
    if (pdfBtn && CFG.links && CFG.links.paperPdf) {
      pdfBtn.href = CFG.links.paperPdf;
    }
    const codeBtn = document.getElementById('hero-code-btn');
    if (codeBtn) {
      const codeHref = (CFG.links && CFG.links.code) || '#';
      codeBtn.href = codeHref;
      codeBtn.addEventListener('click', (e) => {
        if (!codeHref || codeHref === '#') {
          e.preventDefault();
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 1. Full 1080p Video & Complete Timestamp Tags
  // --------------------------------------------------------------------------
  function initFeaturedVideo() {
    const video = document.getElementById('featured-video');
    const groupsWrap = document.getElementById('chapter-groups');
    const dlLink = document.getElementById('featured-download');

    if (!video || !CFG.featuredVideo) return;
    const fv = CFG.featuredVideo;
    const syncFullMeta = () => {
      if (video.videoWidth) {
        video.dataset.res = video.videoWidth + 'x' + video.videoHeight;
      }
    };
    video.addEventListener('loadedmetadata', syncFullMeta);
    if (!video.dataset.encryptedReady) {
      video.poster = resolveDemoUrl(fv.poster);
      video.src = resolveDemoUrl(fv.video);
      if (dlLink) dlLink.href = resolveDemoUrl(fv.video);
      syncFullMeta();
    }

    if (groupsWrap && Array.isArray(fv.chapterGroups)) {
      groupsWrap.innerHTML = '';
      const allButtons = [];

      fv.chapterGroups.forEach((grp) => {
        const row = document.createElement('div');
        row.className = 'chapter-group-row';
        if (grp.label) {
          const lbl = document.createElement('span');
          lbl.className = 'chapter-group-label';
          lbl.textContent = grp.label + ':';
          row.appendChild(lbl);
        }
        (grp.items || []).forEach((ch) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'chapter-chip';
          btn.dataset.time = String(ch.time);
          btn.innerHTML = `<code>${formatTime(ch.time)}</code><span>${ch.label}</span>`;
          btn.addEventListener('click', () => {
            const seekAndPlay = () => {
              video.currentTime = ch.time;
              video.play().catch(() => {});
            };
            if (typeof window.__ensureFullVideoReady === 'function') {
              window.__ensureFullVideoReady().then(seekAndPlay);
            } else {
              seekAndPlay();
            }
          });
          row.appendChild(btn);
          allButtons.push({ time: ch.time, btn });
        });
        groupsWrap.appendChild(row);
      });

      video.addEventListener('timeupdate', () => {
        const t = video.currentTime || 0;
        let activeBtn = null;
        for (let i = 0; i < allButtons.length; i++) {
          if (t >= allButtons[i].time - 0.3) activeBtn = allButtons[i].btn;
        }
        allButtons.forEach((b) => b.btn.classList.toggle('is-active', b.btn === activeBtn));
      });
    }
  }

  // --------------------------------------------------------------------------
  // 2. Interactive Dual-View 9-Tet Mesh vs. Continuous Surface Inspector
  // --------------------------------------------------------------------------
  const SPLIT_GEOM = {
    totalW: 1536,
    totalH: 916,
    viewW: 768,
    viewH: 864,
    band: 52,
    slope: 0.68,
    compute(percent, viewIdx) {
      const w = this.viewW, h = this.viewH, slope = this.slope, band = this.band;
      const lean = (slope * h) / 2;
      const clamped = Math.max(0, Math.min(100, percent));
      const center = (clamped / 100) * (w + 2 * lean) - lean;
      const dist = (p) => p[0] + slope * (p[1] - h / 2) - center;
      const corners = [[0, 0], [w, 0], [w, h], [0, h]];
      const poly = [];
      for (let i = 0; i < 4; i++) {
        const a = corners[i], b = corners[(i + 1) % 4];
        const da = dist(a), db = dist(b);
        if (da <= 0) poly.push(a);
        if ((da < 0 && db > 0) || (da > 0 && db < 0)) {
          const t = da / (da - db);
          poly.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]);
        }
      }
      const cands = [
        [center + lean, 0],
        [center - lean, h],
        [0, (center + lean) / slope],
        [w, (center + lean - w) / slope]
      ];
      const line = cands
        .filter((p) => p[0] >= -1e-4 && p[0] <= w + 1e-4 && p[1] >= -1e-4 && p[1] <= h + 1e-4)
        .filter((p, idx, arr) => arr.findIndex((q) => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-4) === idx);
      const toWorld = (p) => [p[0] + viewIdx * w, p[1] + band];
      const anchor = line.length
        ? line.reduce((acc, q) => [acc[0] + q[0] / line.length, acc[1] + q[1] / line.length], [0, 0])
        : [clamped <= 0 ? 0 : w, clamped <= 0 ? 0 : h];
      return {
        polygon: poly.map(toWorld),
        line: clamped > 0 && clamped < 100 && line.length >= 2 ? line.slice(0, 2).map(toWorld) : [],
        handle: toWorld(anchor)
      };
    },
    pointToPercent(px, py, viewIdx) {
      const lean = (this.slope * this.viewH) / 2;
      return (100 * (px - viewIdx * this.viewW + this.slope * (py - this.band - this.viewH / 2) + lean)) / (this.viewW + 2 * lean);
    }
  };

  function initMeshInspector() {
    const clips = CFG.inspectorClips || [];
    if (!clips.length) return;

    const stage = document.getElementById('inspector-stage');
    const baseVid = document.getElementById('inspector-base-video');
    const wireVid = document.getElementById('inspector-wire-video');
    const polyA = document.getElementById('split-poly-a');
    const polyB = document.getElementById('split-poly-b');
    const lineA = document.getElementById('split-line-a');
    const lineB = document.getElementById('split-line-b');
    const handleA = document.getElementById('split-handle-a');
    const handleB = document.getElementById('split-handle-b');
    const sliderWrap = document.getElementById('inspector-sliders');
    const sliderA = document.getElementById('slider-view-a');
    const sliderB = document.getElementById('slider-view-b');
    const valA = document.getElementById('slider-val-a');
    const valB = document.getElementById('slider-val-b');
    const resetBtn = document.getElementById('slider-reset-btn');
    const playBtn = document.getElementById('inspector-play-btn');
    const scrubber = document.getElementById('inspector-scrubber');
    const timeEl = document.getElementById('inspector-time');
    const speedSel = document.getElementById('inspector-speed');
    const fsBtn = document.getElementById('inspector-fullscreen');
    const playlistEl = document.getElementById('inspector-playlist');
    const titleEl = document.getElementById('inspector-clip-title');
    const metaEl = document.getElementById('inspector-clip-meta');
    const bannerModeEl = document.getElementById('inspector-banner-mode');

    if (!stage || !baseVid || !wireVid) return;

    let currentClip = clips[0];
    let mode = 'split';
    let splitPos = [50, 50];
    let wantedPlay = false;

    function updateSplitGraphics() {
      const isSplit = mode === 'split';
      wireVid.hidden = !isSplit;
      handleA.hidden = !isSplit;
      handleB.hidden = !isSplit;
      sliderWrap.hidden = !isSplit;

      if (bannerModeEl) {
        bannerModeEl.textContent =
          mode === 'split'
            ? 'Interactive Split · 9-Tet Mesh (Top-Left) vs. Surface (Bottom-Right)'
            : mode === 'wire'
            ? 'Runtime 9-Tet Coarse Mesh & Routed Tendons'
            : 'Continuous Anatomical Surface (Activation: Blue → Red)';
      }

      if (!isSplit) {
        lineA.setAttribute('opacity', '0');
        lineB.setAttribute('opacity', '0');
        return;
      }

      const rect = stage.getBoundingClientRect();
      [0, 1].forEach((viewIdx) => {
        const g = SPLIT_GEOM.compute(splitPos[viewIdx], viewIdx);
        const polyEl = viewIdx === 0 ? polyA : polyB;
        const lineEl = viewIdx === 0 ? lineA : lineB;
        const handleEl = viewIdx === 0 ? handleA : handleB;

        const pts = g.polygon
          .map(([x, y]) => `${(x / SPLIT_GEOM.totalW).toFixed(5)},${(y / SPLIT_GEOM.totalH).toFixed(5)}`)
          .join(' ');
        polyEl.setAttribute('points', pts);

        if (g.line.length === 2) {
          lineEl.setAttribute('x1', g.line[0][0].toFixed(1));
          lineEl.setAttribute('y1', g.line[0][1].toFixed(1));
          lineEl.setAttribute('x2', g.line[1][0].toFixed(1));
          lineEl.setAttribute('y2', g.line[1][1].toFixed(1));
          lineEl.setAttribute('opacity', '0.92');
        } else {
          lineEl.setAttribute('opacity', '0');
        }

        if (rect.width > 0 && rect.height > 0) {
          const minX = (viewIdx * 768 + 26) / SPLIT_GEOM.totalW;
          const maxX = ((viewIdx + 1) * 768 - 26) / SPLIT_GEOM.totalW;
          const minY = (SPLIT_GEOM.band + 28) / SPLIT_GEOM.totalH;
          const maxY = (SPLIT_GEOM.totalH - 36) / SPLIT_GEOM.totalH;
          const nx = Math.max(minX, Math.min(maxX, g.handle[0] / SPLIT_GEOM.totalW));
          const ny = Math.max(minY, Math.min(maxY, g.handle[1] / SPLIT_GEOM.totalH));
          handleEl.style.left = `${(nx * 100).toFixed(2)}%`;
          handleEl.style.top = `${(ny * 100).toFixed(2)}%`;
        }
      });
    }

    function setSplit(viewIdx, val) {
      splitPos[viewIdx] = Math.max(0, Math.min(100, Math.round(val)));
      if (viewIdx === 0) {
        sliderA.value = String(splitPos[0]);
        valA.textContent = `${splitPos[0]}%`;
      } else {
        sliderB.value = String(splitPos[1]);
        valB.textContent = `${splitPos[1]}%`;
      }
      updateSplitGraphics();
    }

    function syncWire(force) {
      if (mode !== 'split' || wireVid.readyState < 1 || baseVid.readyState < 1) return;
      const diff = wireVid.currentTime - baseVid.currentTime;
      if (force || Math.abs(diff) > 0.06) {
        try { wireVid.currentTime = baseVid.currentTime; } catch (_) {}
      }
      wireVid.playbackRate = baseVid.playbackRate;
    }

    function updateTransportUI() {
      const dur = Number.isFinite(baseVid.duration) ? baseVid.duration : 0;
      scrubber.max = dur > 0 ? dur.toFixed(2) : '10';
      scrubber.value = (baseVid.currentTime || 0).toFixed(2);
      timeEl.textContent = `${formatTime(baseVid.currentTime)} / ${formatTime(dur)}`;
      playBtn.textContent = baseVid.paused ? 'Play' : 'Pause';
    }

    function loadInspectorClip(clip, nextMode, preserveTime) {
      const prevTime = preserveTime ? baseVid.currentTime || 0 : 0;
      const rate = Number(speedSel.value) || 1;
      currentClip = clip;
      mode = nextMode;

      const ver = clip.version ? `?v=${clip.version}` : '';
      const posterUrl = resolveMeshUrl(`/assets/${clip.id}.jpg${ver}`);
      const baseKind = mode === 'wire' ? 'wire' : 'solid';
      baseVid.poster = posterUrl;
      baseVid.src = resolveMeshUrl(`/assets/${clip.id}_${baseKind}.mp4${ver}`);

      if (mode === 'split') {
        wireVid.poster = posterUrl;
        wireVid.src = resolveMeshUrl(`/assets/${clip.id}_wire.mp4${ver}`);
        wireVid.load();
      } else {
        wireVid.pause();
        wireVid.removeAttribute('src');
      }

      titleEl.textContent = clip.title;
      metaEl.textContent = clip.meta;

      document.querySelectorAll('[data-inspector-mode]').forEach((btn) => {
        btn.classList.toggle('is-active', btn.dataset.inspectorMode === mode);
      });
      document.querySelectorAll('.inspector-clip-btn').forEach((btn) => {
        btn.classList.toggle('is-active', btn.dataset.clipId === clip.id);
      });

      updateSplitGraphics();

      baseVid.addEventListener(
        'loadedmetadata',
        () => {
          if (preserveTime && prevTime > 0 && baseVid.duration) {
            baseVid.currentTime = Math.min(prevTime, Math.max(0, baseVid.duration - 0.05));
          }
          baseVid.playbackRate = rate;
          syncWire(true);
          if (wantedPlay) {
            baseVid.play().catch(() => {});
            if (mode === 'split') wireVid.play().catch(() => {});
          }
          updateTransportUI();
        },
        { once: true }
      );
      baseVid.load();
    }

    playlistEl.innerHTML = '';
    clips.forEach((clip) => {
      const ver = clip.version ? `?v=${clip.version}` : '';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'inspector-clip-btn';
      btn.dataset.clipId = clip.id;
      btn.innerHTML = `
        <img src="${resolveMeshUrl(`/assets/${clip.id}.jpg${ver}`)}" alt="" loading="lazy">
        <span class="inspector-clip-meta">
          <strong>${clip.title}</strong>
          <span>${clip.meta}</span>
        </span>
      `;
      btn.addEventListener('click', () => {
        wantedPlay = true;
        loadInspectorClip(clip, mode, false);
      });
      playlistEl.appendChild(btn);
    });

    document.querySelectorAll('[data-inspector-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = btn.dataset.inspectorMode;
        if (next && next !== mode) loadInspectorClip(currentClip, next, true);
      });
    });

    [handleA, handleB].forEach((handleEl, viewIdx) => {
      let dragging = null;
      handleEl.addEventListener('pointerdown', (e) => {
        if (mode !== 'split') return;
        e.preventDefault();
        const rect = stage.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * SPLIT_GEOM.totalW;
        const py = ((e.clientY - rect.top) / rect.height) * SPLIT_GEOM.totalH;
        dragging = {
          id: e.pointerId,
          startVal: splitPos[viewIdx],
          startProj: SPLIT_GEOM.pointToPercent(px, py, viewIdx)
        };
        handleEl.setPointerCapture(e.pointerId);
        handleEl.classList.add('is-dragging');
      });
      handleEl.addEventListener('pointermove', (e) => {
        if (!dragging || dragging.id !== e.pointerId) return;
        const rect = stage.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * SPLIT_GEOM.totalW;
        const py = ((e.clientY - rect.top) / rect.height) * SPLIT_GEOM.totalH;
        const proj = SPLIT_GEOM.pointToPercent(px, py, viewIdx);
        setSplit(viewIdx, dragging.startVal + (proj - dragging.startProj));
      });
      const stopDrag = (e) => {
        if (!dragging || dragging.id !== e.pointerId) return;
        dragging = null;
        handleEl.classList.remove('is-dragging');
      };
      handleEl.addEventListener('pointerup', stopDrag);
      handleEl.addEventListener('pointercancel', stopDrag);
    });

    sliderA.addEventListener('input', () => setSplit(0, Number(sliderA.value)));
    sliderB.addEventListener('input', () => setSplit(1, Number(sliderB.value)));
    resetBtn.addEventListener('click', () => { setSplit(0, 50); setSplit(1, 50); });

    playBtn.addEventListener('click', () => {
      if (baseVid.paused) {
        wantedPlay = true;
        syncWire(true);
        baseVid.play().catch(() => {});
        if (mode === 'split') wireVid.play().catch(() => {});
      } else {
        wantedPlay = false;
        baseVid.pause();
        wireVid.pause();
      }
      updateTransportUI();
    });

    scrubber.addEventListener('input', () => {
      baseVid.currentTime = Number(scrubber.value);
      syncWire(true);
      updateTransportUI();
    });

    speedSel.addEventListener('change', () => {
      const r = Number(speedSel.value) || 1;
      baseVid.playbackRate = r;
      wireVid.playbackRate = r;
    });

    fsBtn.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      else stage.requestFullscreen?.().catch(() => {});
    });

    baseVid.addEventListener('timeupdate', () => { syncWire(false); updateTransportUI(); });
    baseVid.addEventListener('play', () => {
      if (mode === 'split') { syncWire(true); wireVid.play().catch(() => {}); }
      updateTransportUI();
    });
    baseVid.addEventListener('pause', () => { wireVid.pause(); updateTransportUI(); });
    window.addEventListener('resize', updateSplitGraphics);

    loadInspectorClip(clips[0], 'split', false);
  }

  // --------------------------------------------------------------------------
  // 3. 3-Column Motion Gallery (51 Blue-to-Red Policy Clips)
  // --------------------------------------------------------------------------
  function initGallery() {
    const cards = CFG.galleryCards || [];
    const tabsWrap = document.getElementById('gallery-tabs');
    const searchInput = document.getElementById('gallery-search-input');
    const grid = document.getElementById('gallery-grid');
    const moreWrap = document.getElementById('gallery-more-wrap');
    const moreBtn = document.getElementById('gallery-more-btn');
    if (!grid || !tabsWrap) return;

    let activeTab = 'featured';
    let query = '';
    let expandedAll = false;
    const PAGE_LIMIT = 15; // 5 rows x 3 columns

    const tabDefs = [
      { key: 'featured', label: 'Featured Highlights', match: (c) => !!c.featured },
      { key: 'props', label: 'Props & Sports', match: (c) => c.category === 'props' },
      { key: 'tracking', label: 'Motion Tracking', match: (c) => c.category === 'tracking' },
      { key: 'video', label: 'Monocular Video', match: (c) => c.category === 'video' },
      { key: 'additional', label: 'Biomechanics & Additional', match: (c) => c.category === 'additional' },
      { key: 'ablation', label: 'RL Ablations', match: (c) => c.category === 'ablation' },
      { key: 'all', label: 'All Demos', match: () => true }
    ];

    tabsWrap.innerHTML = '';
    tabDefs.forEach((td) => {
      const count = cards.filter(td.match).length;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-tab' + (td.key === activeTab ? ' is-active' : '');
      btn.dataset.tab = td.key;
      btn.innerHTML = `${td.label}<span class="tab-count">${count}</span>`;
      btn.addEventListener('click', () => {
        activeTab = td.key;
        expandedAll = false;
        tabsWrap.querySelectorAll('.filter-tab').forEach((b) => b.classList.toggle('is-active', b === btn));
        renderGallery();
      });
      tabsWrap.appendChild(btn);
    });

    function createSingleCard(item) {
      const article = document.createElement('article');
      article.className = 'demo-card' + (item.wide ? ' is-wide' : '');

      let currentPoster = resolveDemoUrl(item.poster);
      let currentVideo = resolveDemoUrl(item.video);
      let currentRate = 1;
      let activeVidEl = null;

      const mediaDiv = document.createElement('div');
      mediaDiv.className = 'demo-media';

      function mountPoster() {
        mediaDiv.innerHTML = `
          <img class="demo-poster" src="${currentPoster}" alt="${item.title}" loading="lazy">
          <button type="button" class="demo-play-overlay" aria-label="Play ${item.title}">
            <span class="play-circle">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v14l11-7-11-7z"/></svg>
            </span>
          </button>
        `;
        mediaDiv.querySelector('.demo-play-overlay').addEventListener('click', () => mountVideo(true));
      }

      function mountVideo(autoplay, seekTime = 0) {
        mediaDiv.innerHTML = '';
        const v = document.createElement('video');
        v.controls = true;
        v.playsInline = true;
        v.loop = true;
        v.poster = currentPoster;
        v.src = currentVideo;
        v.playbackRate = currentRate;
        v.addEventListener(
          'loadedmetadata',
          () => {
            if (seekTime > 0 && v.duration) {
              v.currentTime = Math.min(seekTime, Math.max(0, v.duration - 0.05));
            }
            v.playbackRate = currentRate;
            if (autoplay) v.play().catch(() => {});
          },
          { once: true }
        );
        mediaDiv.appendChild(v);
        activeVidEl = v;
      }

      mountPoster();

      const bodyDiv = document.createElement('div');
      bodyDiv.className = 'demo-body';
      bodyDiv.innerHTML = `
        <div>
          <span class="demo-badge">${item.badge}</span>
          <h3 class="demo-title">${item.title}</h3>
        </div>
        <p class="demo-desc">${item.desc}</p>
      `;

      if (Array.isArray(item.variants) && item.variants.length > 1) {
        const vBar = document.createElement('div');
        vBar.className = 'variant-bar';
        item.variants.forEach((vr, idx) => {
          const pill = document.createElement('button');
          pill.type = 'button';
          pill.className = 'variant-pill' + (idx === 0 ? ' is-active' : '');
          pill.textContent = vr.label;
          pill.addEventListener('click', () => {
            vBar.querySelectorAll('.variant-pill').forEach((p) => p.classList.toggle('is-active', p === pill));
            const prevT = activeVidEl ? activeVidEl.currentTime || 0 : 0;
            currentPoster = resolveDemoUrl(vr.poster);
            currentVideo = resolveDemoUrl(vr.video);
            dlAnchor.href = currentVideo;
            mountVideo(true, prevT);
          });
          vBar.appendChild(pill);
        });
        bodyDiv.appendChild(vBar);
      }

      const footerDiv = document.createElement('div');
      footerDiv.className = 'demo-footer';

      const speedWrap = document.createElement('div');
      speedWrap.className = 'speed-pills';
      speedWrap.innerHTML = '<span>Speed:</span>';
      [1, 0.5, 0.25].forEach((sp) => {
        const sb = document.createElement('button');
        sb.type = 'button';
        sb.className = 'speed-btn' + (sp === 1 ? ' is-active' : '');
        sb.textContent = `${sp}×`;
        sb.addEventListener('click', () => {
          currentRate = sp;
          speedWrap.querySelectorAll('.speed-btn').forEach((b) => b.classList.toggle('is-active', b === sb));
          if (activeVidEl) activeVidEl.playbackRate = sp;
        });
        speedWrap.appendChild(sb);
      });

      const dlAnchor = document.createElement('a');
      dlAnchor.className = 'download-link';
      dlAnchor.href = currentVideo;
      dlAnchor.target = '_blank';
      dlAnchor.rel = 'noopener';
      dlAnchor.textContent = 'MP4 ↗';

      footerDiv.append(speedWrap, dlAnchor);
      bodyDiv.appendChild(footerDiv);
      article.append(mediaDiv, bodyDiv);
      return article;
    }

    function renderGallery() {
      const def = tabDefs.find((t) => t.key === activeTab) || tabDefs[0];
      const q = query.trim().toLowerCase();
      const matched = cards.filter((c) => {
        if (!def.match(c)) return false;
        if (!q) return true;
        return (
          c.title.toLowerCase().includes(q) ||
          c.desc.toLowerCase().includes(q) ||
          c.badge.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
        );
      });

      const visible = expandedAll || q ? matched : matched.slice(0, PAGE_LIMIT);
      grid.innerHTML = '';
      visible.forEach((item) => grid.appendChild(createSingleCard(item)));

      if (moreWrap && moreBtn) {
        const remaining = matched.length - visible.length;
        moreWrap.hidden = remaining <= 0;
        if (remaining > 0) {
          moreBtn.textContent = `Show All ${matched.length} Clips (+${remaining} more)`;
        }
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        query = e.target.value || '';
        if (query.trim() && activeTab === 'featured') {
          activeTab = 'all';
          tabsWrap.querySelectorAll('.filter-tab').forEach((b) => b.classList.toggle('is-active', b.dataset.tab === 'all'));
        }
        renderGallery();
      });
    }

    if (moreBtn) {
      moreBtn.addEventListener('click', () => {
        expandedAll = true;
        renderGallery();
      });
    }

    renderGallery();
  }

  // --------------------------------------------------------------------------
  // 4. Deep-Dive Study Tabs, BibTeX Copy & Scroll-to-Top
  // --------------------------------------------------------------------------
  function initUIExtras() {
    const studyBtns = document.querySelectorAll('[data-study-tab]');
    const studyPanels = document.querySelectorAll('[data-study-panel]');
    studyBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.studyTab;
        studyBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
        studyPanels.forEach((p) => {
          p.hidden = p.dataset.studyPanel !== key;
        });
      });
    });

    const copyBtn = document.getElementById('copy-bibtex-btn');
    const bibCode = document.getElementById('bibtex-code');
    if (copyBtn && bibCode) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard?.writeText(bibCode.textContent.trim()).then(() => {
          const orig = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = orig; }, 1800);
        });
      });
    }

    const topBtn = document.getElementById('scroll-top-btn');
    if (topBtn) {
      window.addEventListener('scroll', () => {
        topBtn.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.9);
      }, { passive: true });
      topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function bootVolMusCo() {
    initEnpireHeroAndScroll();
    initFeaturedVideo();
    initMeshInspector();
    initGallery();
    initUIExtras();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootVolMusCo);
  } else {
    bootVolMusCo();
  }
})();
