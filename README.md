# EvolutionTask

Simple Expo app with two tabs:

- `Модули` — показывает список учебных модулей с состояниями (готов, в процессе, закрыт) и быстрыми действиями.
- `Настройки` — переключение темы: светлая, темная или системная.

## Быстрый старт

```bash
npm install
npx expo start
```

Затем выберите запуск в Expo Go, эмуляторе Android или симуляторе iOS.

## Структура

- `app/(tabs)/index.tsx` — экран модулей.
- `app/(tabs)/settings.tsx` — выбор темы.
- `context/theme-context.tsx` и `hooks/` — управление темой и палитрой.
