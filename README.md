# Личный кабинет продавца 👉👈

## Установка проекта 🛠️

### Локальный запуск

1. Убедиться, что у вас установлен [NodeJS (>=20)](https://nodejs.org/en/download/package-manager).
2. Выполнить `npm install` для установки зависимостей.
3. Выполнить `npm run server` для старта json-server (бэкенд на порту 3000).
4. Выполнить `npm run dev` и открыть в браузере сайт `http://localhost:5173/`

### Запуск в Docker 🐳

> **Требования:** [Docker](https://docs.docker.com/get-docker/) и [Docker Compose](https://docs.docker.com/compose/install/)

#### Один командой

```bash
docker compose up
```

Приложение будет доступно по адресу **http://localhost:5173/**.

Запуск создаст два контейнера:
- **frontend** — собранный React-фронтенд на nginx (порт 5173)
- **backend** — json-server с mock-данными (порт 3000)

#### Другие команды

| Команда | Описание |
| --- | --- |
| `docker compose up -d` | Запустить в фоновом режиме |
| `docker compose build` | Собрать образы без запуска |
| `docker compose down` | Остановить и удалить контейнеры |
| `docker compose down -v` | Остановить, удалить контейнеры и тома |

#### Пересборка образа

```bash
docker compose up --build
```
