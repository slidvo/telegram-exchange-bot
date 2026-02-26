# Второе задание: бот для получения курса валют

## Conventional Commits — Scopes
В проекте придерживаются convential commits.
Для удобства можно исопльзовать плагин для vscode convential commits.
В .vscode/settings.json необходимо добавить сипок стандартных scopes
которые используются в проекте:
## Conventional Commits — Scopes

| Scope | Эмодзи | Название | Описание |
|-------|--------|----------|----------|
| `core` | 🏗️ | `:building_construction:` | Ядро приложения, базовая логика |
| `config` | 🔧 | `:wrench:` | Конфигурационные файлы и настройки |
| `deps` | 📦 | `:package:` | Зависимости (package.json, обновления пакетов) |
| `scripts` | 🔨 | `:hammer:` | Вспомогательные скрипты (build, deploy, утилиты) |
| `build` | 🏗️ | `:building_construction:` | Система сборки (webpack, vite, tsc и т.д.) |
| `ci` | 👷 | `:construction_worker:` | CI/CD пайплайны и автоматизация |
| `docs` | 📝 | `:memo:` | Документация и комментарии |
| `tests` | 🧪 | `:test_tube:` | Тесты (unit, integration, e2e) |
| `types` | 🏷️ | `:label:` | TypeScript типы, интерфейсы, enum'ы |
| `utils` | ♻️ | `:recycle:` | Вспомогательные функции и хелперы |
| `env` | 🌱 | `:seedling:` | Переменные окружения (.env файлы, конфиг окружений) |
| `lint` | 🚨 | `:rotating_light:` | Линтер, форматтер (eslint, prettier, конфиги) |
| `ui` | 💄 | `:lipstick:` | UI компоненты и интерфейс пользователя |
| `components` | 🧩 | `:puzzle_piece:` | Переиспользуемые компоненты |
| `layout` | 📱 | `:iphone:` | Структура и разметка страниц |
| `styles` | 🎨 | `:art:` | Стили (CSS, SCSS, темы) |
| `state` | 🗃️ | `:card_file_box:` | Управление состоянием (store, контекст) |
| `api` | 👽️ | `:alien:` | API клиент, запросы, эндпоинты |
| `router` | 🚚 | `:truck:` | Маршрутизация и навигация |
| `db` | 🗃️ | `:card_file_box:` | База данных, миграции, схемы |
| `auth` | 🛂 | `:passport_control:` | Аутентификация и авторизация |
| `services` | ⚡️ | `:zap:` | Бизнес-логика, сервисный слой |
| `models` | 🏷️ | `:label:` | Модели данных |
| `middleware` | 🔀 | `:twisted_rightwards_arrows:` | Промежуточные обработчики запросов |
| `logging` | 🔊 | `:loud_sound:` | Логирование и трассировка |
| `docker` | 📦 | `:package:` | Docker образы и docker-compose |
| `k8s` | 🧱 | `:bricks:` | Kubernetes манифесты и конфиги |
| `infra` | 🧱 | `:bricks:` | Инфраструктура (облако, сервера, сеть) |
| `monitoring` | 📈 | `:chart_with_upwards_trend:` | Мониторинг, метрики, алерты |
| `security` | 🔒️ | `:lock:` | Безопасность, уязвимости, шифрование |


<details>
<summary>./vscode/settings.json</summary>

```jsonc
{
    // .vscode/settings.json
    "conventionalCommits.scopes": [
        "core",
        "config",
        "core",
        "config",
        "deps",
        "scripts",
        "build",
        "ci",
        "docs",
        "tests",
        "types",
        "utils",
        "env",
        "lint",
        "ui",
        "components",
        "layout",
        "styles",
        "state",
        "api",
        "router",
        "db",
        "auth",
        "services",
        "models",
        "middleware",
        "logging",
        "docker",
        "k8s",
        "infra",
        "monitoring",
        "security"
    ]
}
```
</details>

## Nginx команды
| № | Команда | Описание |
|---|---------|----------|
| 1 | `sudo nano /etc/nginx/sites-available/default` | Открыть конфиг для редактирования |
| 2 | `sudo nginx -t` | Проверка корректности конфига |
| 3 | `sudo systemctl restart nginx` | Перезапуск nginx |
| 4 | `sudo systemctl status nginx` | Проверка статуса |