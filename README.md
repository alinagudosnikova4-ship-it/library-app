git clone https://github.com/alinagudosnikova4-ship-it/library-app.git .

1. Установка библиотек: npm install

2. Подготовка базы (генерация клиента): npx prisma generate

3. Создание таблиц в базе: npx prisma migrate dev

4. Заполнение базы книгами и читателями: npx tsx prisma/seed.ts

5. Запуск сайта: npm run dev

http://localhost:3000
