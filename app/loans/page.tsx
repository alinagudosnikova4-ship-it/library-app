import Link from 'next/link';
import { prisma } from '../lib/prisma';

export default async function LoansPage() {
  // Получаем все выдачи, включая данные о книге и читателе
  const loans = await prisma.loan.findMany({
    include: {
      book: true,
      reader: true,
    },
    orderBy: { loanDate: 'desc' },
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Журнал выдач</h1>
        <div className="flex gap-4">
          <Link href="/loans/new" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
            + Выдать книгу
          </Link>
          <Link href="/" className="text-blue-600 hover:underline font-medium self-center">
            &larr; На главную
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-4">Книга</th>
              <th className="py-3 px-4">Читатель</th>
              <th className="py-3 px-4">Дата выдачи</th>
              <th className="py-3 px-4">Статус</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {loans.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                  Пока нет ни одной выдачи. Нажмите «+ Выдать книгу».
                </td>
              </tr>
            ) : (
              loans.map((loan) => (
                <tr key={loan.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{loan.book.title}</td>
                  <td className="py-3 px-4">{loan.reader.fullName}</td>
                  <td className="py-3 px-4">{new Date(loan.loanDate).toLocaleDateString('ru-RU')}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                      {loan.status === 'ACTIVE' ? 'На руках' : 'Возвращена'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}