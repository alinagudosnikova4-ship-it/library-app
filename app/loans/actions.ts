'use server';

import { prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache';

export async function returnBook(loanId: number, bookId: number) {
  // 1. Обновляем запись о выдаче (ставим статус "Возвращена" и дату возврата)
  await prisma.loan.update({
    where: { id: loanId },
    data: {
      status: 'RETURNED',
      returnDate: new Date(),
    },
  });

  // 2. Возвращаем книгу на склад (увеличиваем количество доступных на 1)
  await prisma.book.update({
    where: { id: bookId },
    data: {
      copiesAvailable: { increment: 1 },
    },
  });

  // 3. Обновляем страницы, чтобы данные обновились
  revalidatePath('/loans');
  revalidatePath('/books');
  revalidatePath('/');
}