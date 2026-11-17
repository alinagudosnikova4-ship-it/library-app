import Link from 'next/link';
import { prisma } from './lib/prisma';

export default async function Home() {
  // Получаем данные из базы
  const booksCount = await prisma.book.count();
  const readersCount = await prisma.reader.count();
  const activeLoansCount = await prisma.loan.count({ where: { status: 'ACTIVE' } });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Главная страница Библиотеки</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500 text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-600">Всего книг</h2>
          <p className="text-4xl font-bold text-blue-600">{booksCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500 text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-600">Читателей</h2>
          <p className="text-4xl font-bold text-green-600">{readersCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500 text-center">
          <h2 className="text-xl font-semibold mb-2 text-gray-600">Активных выдач</h2>
          <p className="text-4xl font-bold text-purple-600">{activeLoansCount}</p>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <Link href="/books" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Перейти к каталогу книг
        </Link>
        <Link href="/readers" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
          Список читателей
        </Link>
      </div>
    </div>
  );
}