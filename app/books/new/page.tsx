import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import BookForm from './BookForm';

export default async function NewBookPage() {
  // Получаем все книги из базы для автозаполнения
  const books = await prisma.book.findMany();

  async function addBook(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const genre = formData.get('genre') as string;
    const ageRestriction = formData.get('ageRestriction') as string;
    const copiesTotal = parseInt(formData.get('copiesTotal') as string) || 1;
    const isbn = crypto.randomUUID();

    await prisma.book.create({
      data: { title, author, genre, ageRestriction, isbn, copiesTotal, copiesAvailable: copiesTotal },
    });

    revalidatePath('/books');
    redirect('/books');
  }

  return <BookForm books={books} addBook={addBook} />;
}