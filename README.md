# CDNVideoHub Universal Balancer

Production-ready заготовка универсального балансера embed-ссылок с поддержкой:

- VK Video
- YouTube (`youtube.com`, `youtu.be`, `youtube.ru`)
- RuTube (`rutube.ru`)

## Что обновлено

- Сохранен основной `script.js` (ядро плеера не удалялось).
- Адрес iframe-плеера заменен:
  - было: `https://player.cdnvideohub.com/s2/v2.5.10/frame`
  - стало: `https://cdnvideohub.vercel.app/iframes/player`
- Добавлен универсальный парсер и сборщик embed URL:
  - `CDNVideoHub.detectVideo(input)`
  - `CDNVideoHub.buildUniversalEmbed(baseUrl, video, options)`
- Исправлены битые символы студий (`дубляж`, `субтитры`).
- Расширен приоритетный список студий озвучивания (LostFilm, HDRezka, NewStudio, ColdFilm, AniLibria и др.).

## Быстрый старт

```html
<script src="./script.js"></script>
<script>
  const parsed = CDNVideoHub.detectVideo('https://rutube.ru/video/0123456789abcdef/');
  const embed = CDNVideoHub.buildUniversalEmbed('https://cdnvideohub.vercel.app', parsed, { autoplay: true });
  console.log(parsed, embed);
</script>
```

## Примеры распознавания

```js
CDNVideoHub.detectVideo('https://vk.com/video-1_456239017');
// { provider: 'vk', id: '-1_456239017' }

CDNVideoHub.detectVideo('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
// { provider: 'youtube', id: 'dQw4w9WgXcQ' }

CDNVideoHub.detectVideo('https://rutube.ru/video/0123456789abcdef/');
// { provider: 'rutube', id: '0123456789abcdef' }
```

## Формат универсальной ссылки

```text
https://cdnvideohub.vercel.app/iframes/player?provider=<vk|youtube|rutube>&id=<video-id>
```

## Локальный запуск

Открой `index.html` через любой статический сервер.
