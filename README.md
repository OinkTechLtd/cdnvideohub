# CDNVideoHub Universal Balancer

Production-ready заготовка универсального балансера embed-ссылок с поддержкой:

- VK Video
- YouTube (`youtube.com`, `youtu.be`, `youtube.ru`)
- RuTube (`rutube.ru`)

## Что сделано

- Сохранен основной `script.js` (без удаления ядра).
- Обновлен адрес iframe-плеера:
  - было: `https://player.cdnvideohub.com/s2/v2.5.10/frame`
  - стало: `https://cdnvideohub.vercel.app/iframes/player`
- Добавлен универсальный парсер и сборщик embed URL:
  - `CDNVideoHub.detectVideo(input)`
  - `CDNVideoHub.buildUniversalEmbed(baseUrl, video, options)`
- Исправлены «битые» символы в студиях озвучки и расширен список студий.
- Подготовлены страницы: Landing, Docs, FAQ, Terms, Privacy.

## Быстрый старт

```html
<script src="./script.js"></script>
<script>
  const parsed = CDNVideoHub.detectVideo('https://rutube.ru/video/0123456789abcdef/');
  const embed = CDNVideoHub.buildUniversalEmbed('https://cdnvideohub.vercel.app', parsed);
  console.log(embed);
</script>
```

## Формат ссылки

```text
https://cdnvideohub.vercel.app/iframes/player?provider=<vk|youtube|rutube>&id=<video-id>
```

## Локальный запуск

Открой `index.html` через любой статический сервер.
