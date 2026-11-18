import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export default async function NewLoanPage() {
  // Берем только те книги, которые есть в наличии, и всех читателей
  const books = await prisma.book.findMany({
    where: { copiesAvailable: { gt: 0 } }, // gt: 0 означает "больше нуля"
    orderBy: { title: 'asc' },
  });
  const readers = await prisma.reader.findMany({ orderBy: { fullName: 'asc' } });

  async function createLoan(formData: FormData) {
    'use server';
    const bookId = parseInt(formData.get('bookId') as string);
    const readerId = parseInt(formData.get('readerId') as string);

    // Устанавливаем срок возврата - 14 дней от сегодня
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    // 1. Создаем запись о выдаче
    await prisma.loan.create({
      data: {
        bookId,
        readerId,
        dueDate,
        status: 'ACTIVE',
      },
    });

    // 2. Уменьшаем количество доступных книг на 1
    await prisma.book.update({
      where: { id: bookId },
      data: { copiesAvailable: { decrement: 1 } }, // decrement уменьшает значение
    });

    // Обновляем страницы и перекидываем на журнал выдач
    revalidatePath('/loans');
    revalidatePath('/books');
    revalidatePath('/');
    redirect('/loans');
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Выдать книгу</h1>
        <Link href="/loans" className="text-blue-600 hover:underline font-medium">
          &larr; Назад
        </Link>
      </div>

      <form action={createLoan} className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Выберите читателя *</label>
          <select name="readerId" required className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">-- Кто берет книгу? --</option>
            {readers.map((reader) => (
              <option key={reader.id} value={reader.id}>
                {reader.fullName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Выберите книгу *</label>
          <select name="bookId" required className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">-- Какую книгу выдать? --</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} (в наличии: {book.copiesAvailable})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-purple-600 text-white font-bold py-3 px-4 rounded hover:bg-purple-700 transition mt-4">
          Оформить выдачу
        </button>
      </form>
    </div>
  );
}