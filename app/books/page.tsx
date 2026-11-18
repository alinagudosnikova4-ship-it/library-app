import Link from 'next/link';
import { prisma } from '../lib/prisma';

export default async function BooksPage() {
  // Получаем все книги из базы данных и сортируем их по названию
  const books = await prisma.book.findMany({
    orderBy: { title: 'asc' },
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Каталог книг</h1>
        <Link href="/" className="text-blue-600 hover:underline font-medium">
          &larr; На главную
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4">Название</th>
              <th className="py-3 px-4">Автор</th>
              <th className="py-3 px-4">Жанр</th>
              <th className="py-3 px-4">Год</th>
              <th className="py-3 px-4 text-center">В наличии</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {books.map((book) => (
              <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-800">{book.title}</td>
                <td className="py-3 px-4">{book.author}</td>
                <td className="py-3 px-4">{book.genre || '—'}</td>
                <td className="py-3 px-4">{book.year || '—'}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${book.copiesAvailable > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {book.copiesAvailable} из {book.copiesTotal}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}