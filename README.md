# CDNVideoHub Universal Balancer

Универсальный фронтенд для генерации embed-ссылок и предпросмотра плеера.

## Что сделано

- Полный лендинг + навигация: `index.html`.
- Документация: `docs.html`.
- FAQ: `faq.html`.
- Условия: `terms.html`.
- Политика конфиденциальности: `privacy.html`.
- Новый чистый `script.js` без мусора/битых символов.
- Заменен путь `ifremes` на корректный `/iframes/player`.
- База по умолчанию: `https://cdnvideohub.vercel.app`.
- Поддержка провайдеров:
  - VK (`vk.com/video...`)
  - YouTube (`youtube.com`, `youtu.be`, `youtube.ru`)
  - RuTube (`rutube.ru/video/...`)

## Быстрый пример

```js
const input = 'https://rutube.ru/video/0123456789abcdef/';
const video = window.CDNVideoHub.detectVideo(input);
const url = window.CDNVideoHub.buildUniversalEmbed('https://cdnvideohub.vercel.app', video);
console.log(url);
```

## Локальный запуск

Открой `index.html` через любой статический сервер.

