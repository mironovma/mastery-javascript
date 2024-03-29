Сервис по прокачке твоих знаний во Frontend по JavaScript, React, Angular, Vue, Webpack, Vite и многим других технологиях. Включая, теоретичекие вопросы: про JS, TS, React (и фреймоврки), базовые вопросы по Computer Science, алгоритмам, структурах данных. Quiz-вопросы "что будет в консоли"

Для запуска:

/client:
npm i
npm start

/server:
npm i
npm run dev

Необходимо выполнить настройку подключения БД (см. список поддерживаемых БД ORM Prisma)

Необходимо добавить переменные .env:
DATABASE_URL=
SERVER_PORT=5000
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
API_URL=
CLIENT_URL=
