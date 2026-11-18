import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export default function NewBookPage() {
  // Это и есть Server Action — функция, которая выполнится на сервере при отправке формы
  async function addBook(formData: FormData) {
    'use server';

    // Получаем данные из полей формы
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const genre = formData.get('genre') as string;
    const year = parseInt(formData.get('year') as string) || null;
    const copiesTotal = parseInt(formData.get('copiesTotal') as string) || 1;

    // Генерируем случайный ISBN (чтобы база данных не ругалась на уникальность)
    const isbn = crypto.randomUUID();

    // Сохраняем книгу в базу данных
    await prisma.book.create({
      data: {
        title,
        author,
        genre,
        year,
        isbn,
        copiesTotal,
        copiesAvailable: copiesTotal,
      },
    });

    // Обновляем кэш страницы каталога и перекидываем пользователя туда
    revalidatePath('/books');
    redirect('/books');
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Добавить книгу</h1>
        <Link href="/books" className="text-blue-600 hover:underline font-medium">
          &larr; Назад в каталог
        </Link>
      </div>

      <form action={addBook} className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Название книги *</label>
          <input type="text" name="title" required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Автор *</label>
          <input type="text" name="author" required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Жанр</label>
            <input type="text" name="genre" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Год издания</label>
            <input type="number" name="year" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Количество экземпляров</label>
          <input type="number" name="copiesTotal" defaultValue={1} min={1} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
        </div>

        <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition mt-4">
          Сохранить книгу
        </button>
      </form>
    </div>
  );
}