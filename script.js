(function () {
  const DEFAULT_BASE_DOMAIN = 'https://cdnvideohub.vercel.app';

  function safeUrl(value) {
    try {
      return new URL(value);
    } catch {
      return null;
    }
  }

  function normalizeBaseDomain(value) {
    const url = safeUrl(value || DEFAULT_BASE_DOMAIN);
    return url ? url.origin : DEFAULT_BASE_DOMAIN;
  }

  function parseVk(url) {
    const match = url.href.match(/vk\.com\/video(-?\d+)_(-?\d+)/i);
    if (!match) return null;

    return {
      provider: 'vk',
      videoId: `${match[1]}_${match[2]}`,
      externalUrl: `https://vk.com/video${match[1]}_${match[2]}`,
      nativeEmbed: `https://vk.com/video_ext.php?oid=${match[1]}&id=${match[2]}&hd=2&autoplay=0`
    };
  }

  function parseYoutube(url) {
    const host = url.hostname.replace(/^www\./, '');
    const isYoutube = host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtu.be' || host === 'youtube.ru';
    if (!isYoutube) return null;

    let id = '';
    if (host === 'youtu.be') {
      id = url.pathname.slice(1);
    } else {
      id = url.searchParams.get('v') || (url.pathname.startsWith('/shorts/') ? url.pathname.split('/')[2] : '');
    }

    if (!id) return null;

    return {
      provider: 'youtube',
      videoId: id,
      externalUrl: `https://www.youtube.com/watch?v=${id}`,
      nativeEmbed: `https://www.youtube.com/embed/${id}`
    };
  }

  function parseRutube(url) {
    const host = url.hostname.replace(/^www\./, '');
    if (host !== 'rutube.ru') return null;

    const match = url.pathname.match(/^\/video\/([a-zA-Z0-9]+)/);
    if (!match) return null;

    const id = match[1];
    return {
      provider: 'rutube',
      videoId: id,
      externalUrl: `https://rutube.ru/video/${id}/`,
      nativeEmbed: `https://rutube.ru/play/embed/${id}`
    };
  }

  function detectVideo(input) {
    const url = safeUrl(input);
    if (!url) return null;
    return parseVk(url) || parseYoutube(url) || parseRutube(url);
  }

  function buildUniversalEmbed(baseDomain, video) {
    const base = normalizeBaseDomain(baseDomain);
    const params = new URLSearchParams({ provider: video.provider, id: video.videoId, src: video.externalUrl });
    return `${base}/iframes/player?${params.toString()}`;
  }

  function initLanding() {
    const form = document.getElementById('embed-form');
    if (!form) return;

    const sourceInput = document.getElementById('source-url');
    const baseInput = document.getElementById('base-domain');
    const output = document.getElementById('embed-output');
    const status = document.getElementById('status');
    const preview = document.getElementById('preview-player');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const video = detectVideo(sourceInput.value.trim());
      if (!video) {
        status.textContent = 'Ошибка: поддерживаются только VK, YouTube и RuTube ссылки.';
        output.textContent = 'Невозможно определить провайдера.';
        preview.removeAttribute('src');
        return;
      }

      const universalUrl = buildUniversalEmbed(baseInput.value.trim(), video);
      output.textContent = universalUrl;
      preview.src = universalUrl;
      status.textContent = `ОК: ${video.provider.toUpperCase()} · ID: ${video.videoId}`;
    });
  }

  window.CDNVideoHub = {
    detectVideo,
    buildUniversalEmbed,
    normalizeBaseDomain
  };

  initLanding();
})();
