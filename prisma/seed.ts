import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Очищаем базу перед заполнением, чтобы не было дубликатов при повторном запуске
  await prisma.loan.deleteMany();
  await prisma.reader.deleteMany();
  await prisma.book.deleteMany();

  // Добавляем книги (11 штук)
  const books = [
    { title: 'Мастер и Маргарита', author: 'М. Булгаков', isbn: '9785000000001', year: 1940, genre: 'Роман', copiesTotal: 3, copiesAvailable: 3 },
    { title: 'Преступление и наказание', author: 'Ф. Достоевский', isbn: '9785000000002', year: 1866, genre: 'Роман', copiesTotal: 2, copiesAvailable: 2 },
    { title: 'Война и мир', author: 'Л. Толстой', isbn: '9785000000003', year: 1869, genre: 'Эпопея', copiesTotal: 4, copiesAvailable: 4 },
    { title: 'Евгений Онегин', author: 'А. Пушкин', isbn: '9785000000004', year: 1833, genre: 'Роман в стихах', copiesTotal: 1, copiesAvailable: 1 },
    { title: 'Мертвые души', author: 'Н. Гоголь', isbn: '9785000000005', year: 1842, genre: 'Поэма', copiesTotal: 2, copiesAvailable: 2 },
    { title: 'Отцы и дети', author: 'И. Тургенев', isbn: '9785000000006', year: 1862, genre: 'Роман', copiesTotal: 3, copiesAvailable: 3 },
    { title: 'Герой нашего времени', author: 'М. Лермонтов', isbn: '9785000000007', year: 1840, genre: 'Роман', copiesTotal: 2, copiesAvailable: 2 },
    { title: 'Тихий Дон', author: 'М. Шолохов', isbn: '9785000000008', year: 1940, genre: 'Эпопея', copiesTotal: 5, copiesAvailable: 5 },
    { title: 'Собачье сердце', author: 'М. Булгаков', isbn: '9785000000009', year: 1925, genre: 'Повесть', copiesTotal: 2, copiesAvailable: 2 },
    { title: 'Идиот', author: 'Ф. Достоевский', isbn: '9785000000010', year: 1869, genre: 'Роман', copiesTotal: 1, copiesAvailable: 1 },
    { title: 'Ревизор', author: 'Н. Гоголь', isbn: '9785000000011', year: 1836, genre: 'Комедия', copiesTotal: 3, copiesAvailable: 3 },
  ];
  await prisma.book.createMany({ data: books });

  // Добавляем читателей (5 штук)
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