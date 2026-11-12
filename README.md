# Нейросреда — журнал об искусственном интеллекте

Русскоязычный адаптивный редакционный сайт: белый фон, синие и cyan-акценты, 5 статей об ИИ и отдельные информационные страницы.

## Содержимое

- `index.html` — главная
- `about.html` — о проекте
- `privacy.html` — политика конфиденциальности
- `contact.html` — контакты
- `disclaimer.html` — отказ от ответственности
- `articles/` — 5 полноценных статей на русском языке
- `assets/style.css`, `assets/main.js` — стили и интерактивное мобильное меню
- `robots.txt` — правила для поисковых роботов
- `scripts/generate-sitemap.js` — рекурсивный генератор sitemap
- `.github/workflows/deploy.yml` — автоматическая сборка и публикация на GitHub Pages

## Важно: настройте домен перед публикацией

В HTML сейчас используется шаблон:
`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

Замените `YOUR-USERNAME` и `YOUR-REPOSITORY` во всех `link rel="canonical"` и в `robots.txt` на адрес вашего сайта. Если используете собственный домен, укажите его вместо адреса GitHub Pages.

GitHub Actions генерирует `sitemap.xml` на каждом push в ветку `main`, используя адрес из переменной `SITE_URL`. Генератор рекурсивно обходит вложенные папки, находит все файлы `.html` (кроме исключённых служебных каталогов) и перезаписывает `sitemap.xml`. Это не статический sitemap.

## Локальная сборка

Требуется Node.js 18+ (рекомендуется 20).

```bash
npm run build
```

Для собственного домена:

```bash
SITE_URL=https://example.com npm run build
```

В PowerShell:

```powershell
$env:SITE_URL="https://example.com"
npm run build
```

## Публикация на GitHub Pages

1. Создайте новый GitHub-репозиторий.
2. Распакуйте архив и загрузите всё содержимое в корень репозитория.
3. Убедитесь, что основная ветка называется `main`.
4. Откройте **Settings → Pages** и в разделе Build and deployment выберите **GitHub Actions**.
5. Отправьте commit в `main`. Workflow соберёт сайт, создаст sitemap и опубликует его.
6. После успешного workflow сайт будет доступен по адресу `https://USERNAME.github.io/REPOSITORY/`.

## Перед запуском

- Замените домен в canonical и `robots.txt`.
- Замените `hello@example.com` в `contact.html` на рабочий email.
- При добавлении новых HTML-страниц генератор автоматически включит их в sitemap при следующей сборке.
- Google Fonts подключаются внешним запросом; при необходимости замените их локальными шрифтами.
