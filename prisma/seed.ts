import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Очищаем базу перед заполнением, чтобы не было дубликатов
  await prisma.loan.deleteMany();
  await prisma.reader.deleteMany();
  await prisma.book.deleteMany();

  // Добавляем книги
  const books = [
    { title: 'Четвертое крыло', author: 'Ребекка Яррос', isbn: '9785000000012', ageRestriction: '18+', genre: 'Ромэнтези', copiesTotal: 3, copiesAvailable: 3 },
    { title: 'Если все кошки в мире исчезнут', author: 'Гэнки Кавамура', isbn: '9785000000013', ageRestriction: '16+', genre: 'Современная проза', copiesTotal: 4, copiesAvailable: 4 },
    { title: 'Точка зрения Всеведущего читателя', author: 'singNsong', isbn: '9785000000014', ageRestriction: '16+', genre: 'Азиатская новелла', copiesTotal: 2, copiesAvailable: 2 },
    { title: 'Система "Спаси-Себя-Сам" для Главного Злодея', author: 'Мосян Тунсю', isbn: '9785000000015', ageRestriction: '16+', genre: 'Сянься', copiesTotal: 2, copiesAvailable: 2 },
    { title: 'Нормальные люди', author: 'Салли Руни', isbn: '9785000000029', ageRestriction: '18+', genre: 'Современная проза', copiesTotal: 3, copiesAvailable: 3 },
    { title: 'Золушка и дракон', author: 'Елена Михалкова', isbn: '9785000000023', ageRestriction: '16+', genre: 'Детектив', copiesTotal: 2, copiesAvailable: 2 },
    { title: 'Оно', author: 'Стивен Кинг', isbn: '9785000000024', ageRestriction: '18+', genre: 'Хоррор', copiesTotal: 1, copiesAvailable: 1 },
    { title: 'Тайная история', author: 'Донна Тартт', isbn: '9785000000030', ageRestriction: '18+', genre: 'Триллер', copiesTotal: 2, copiesAvailable: 2 },
    { title: 'Дом, в котором...', author: 'Мариам Петросян', isbn: '9785000000031', ageRestriction: '18+', genre: 'Мистика', copiesTotal: 2, copiesAvailable: 2 },
    { title: 'Первому игроку приготовиться', author: 'Эрнест Клайн', isbn: '9785000000032', ageRestriction: '12+', genre: 'Фантастика', copiesTotal: 3, copiesAvailable: 3 },
    { title: 'Цветы для Элджернона', author: 'Дэниел Киз', isbn: '9785000000033', ageRestriction: '16+', genre: 'Фантастика', copiesTotal: 2, copiesAvailable: 2 },
    { title: 'К себе нежно', author: 'Ольга Примаченко', isbn: '9785000000016', ageRestriction: '16+', genre: 'Психология', copiesTotal: 3, copiesAvailable: 3 },
    { title: 'Тонкое искусство пофигизма', author: 'Марк Мэнсон', isbn: '9785000000017', ageRestriction: '18+', genre: 'Психология', copiesTotal: 2, copiesAvailable: 2 },
    { title: 'Атомные привычки', author: 'Джеймс Клир', isbn: '9785000000018', ageRestriction: '16+', genre: 'Саморазвитие', copiesTotal: 3, copiesAvailable: 3 },
    { title: 'Быть эгоистом', author: 'Андрей Курпатов', isbn: '9785000000026', ageRestriction: '16+', genre: 'Психология', copiesTotal: 2, copiesAvailable: 2 },
    { title: 'Как избавиться от переутомления', author: 'Андрей Курпатов', isbn: '9785000000027', ageRestriction: '16+', genre: 'Психология', copiesTotal: 3, copiesAvailable: 3 },
    { title: 'Мы в порядке', author: 'Алина Адлер', isbn: '9785000000028', ageRestriction: '18+', genre: 'Психология', copiesTotal: 2, copiesAvailable: 2 },
    { title: 'Граф Монте-Кристо', author: 'Александр Дюма', isbn: '9785000000020', ageRestriction: '12+', genre: 'Приключения', copiesTotal: 2, copiesAvailable: 2 },
    { title: 'Портрет Дориана Грея', author: 'Оскар Уайльд', isbn: '9785000000021', ageRestriction: '16+', genre: 'Классика', copiesTotal: 2, copiesAvailable: 2 },
    { title: 'Норвежский лес', author: 'Харуки Мураками', isbn: '9785000000022', ageRestriction: '18+', genre: 'Современная проза', copiesTotal: 1, copiesAvailable: 1 },
  ];
  
  await prisma.book.createMany({ data: books });

  // Добавляем читателей
  const readers = [
    { fullName: 'Иванов Иван Иванович', email: 'ivanov@example.com', phone: '+7-000-000-00-01' },
    { fullName: 'Петрова Анна Сергеевна', email: 'petrova@example.com', phone: '+7-000-000-00-02' },
    { fullName: 'Сидоров Алексей Петрович', email: 'sidorov@example.com', phone: '+7-000-000-00-03' },
    { fullName: 'Кузнецова Мария Владимировна', email: 'kuznetsova@example.com', phone: '+7-000-000-00-04' },
    { fullName: 'Смирнов Дмитрий Андреевич', email: 'smirnov@example.com', phone: '+7-000-000-00-05' },
  ];
  
  await prisma.reader.createMany({ data: readers });

  console.log('База данных успешно заполнена тестовыми данными!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });