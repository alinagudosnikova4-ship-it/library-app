import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export default async function NewLoanPage() {
  const books = await prisma.book.findMany({
    where: { copiesAvailable: { gt: 0 } },
    orderBy: { title: 'asc' },
  });
  const readers = await prisma.reader.findMany({ orderBy: { fullName: 'asc' } });

  async function createLoan(formData: FormData) {
    'use server';
    const bookId = parseInt(formData.get('bookId') as string);
    const readerId = parseInt(formData.get('readerId') as string);
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    await prisma.loan.create({
      data: { bookId, readerId, dueDate, status: 'ACTIVE' },
    });
    await prisma.book.update({
      where: { id: bookId },
      data: { copiesAvailable: { decrement: 1 } },
    });

    revalidatePath('/loans');
    revalidatePath('/books');
    revalidatePath('/');
    redirect('/loans');
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 font-sans selection:bg-[#ff6600] selection:text-black relative flex items-center justify-center">
      
      {/* Сетка на фоне */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff660010_1px,transparent_1px),linear-gradient(to_bottom,#ff660010_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="max-w-2xl w-full relative z-10">
        
        {/* Шапка */}
        <div className="flex justify-between items-center mb-8 border-4 border-[#ff6600] p-6 bg-[#1a1a1a] shadow-[8px_8px_0px_0px_#ff6600]">
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
            Выдать<span className="text-[#ff6600]">.</span>
          </h1>
          <Link href="/loans" className="bg-transparent border-2 border-[#ff6600] text-[#ff6600] font-black uppercase tracking-wider px-4 py-2 shadow-[4px_4px_0px_0px_#ff6600] hover:bg-[#ff6600] hover:text-black hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_#ff6600] transition-all text-sm">
            &larr; Назад
          </Link>
        </div>

        {/* Форма */}
        <form action={createLoan} className="bg-[#1a1a1a] border-4 border-[#ff6600] p-8 shadow-[8px_8px_0px_0px_#ff6600] flex flex-col gap-6">
          
          <div>
            <label className="block text-zinc-400 font-mono text-sm mb-2 uppercase">Читатель *</label>
            <select name="readerId" required className="w-full bg-[#0a0a0a] border-2 border-[#333] text-white px-4 py-3 focus:outline-none focus:border-[#ff6600] transition-colors font-mono appearance-none cursor-pointer">
              <option value="">-- Выберите читателя --</option>
              {readers.map((reader) => (
                <option key={reader.id} value={reader.id}>
                  {reader.fullName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-zinc-400 font-mono text-sm mb-2 uppercase">Книга *</label>
            <select name="bookId" required className="w-full bg-[#0a0a0a] border-2 border-[#333] text-white px-4 py-3 focus:outline-none focus:border-[#ff6600] transition-colors font-mono appearance-none cursor-pointer">
              <option value="">-- Выберите книгу --</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} (в наличии: {book.copiesAvailable})
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="bg-[#ff6600] text-black font-black uppercase tracking-wider text-xl px-8 py-4 border-4 border-[#ff6600] shadow-[6px_6px_0px_0px_#ffffff] hover:bg-white hover:border-white hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#ffffff] transition-all mt-4">
            Оформить выдачу
          </button>
        </form>
      </div>
    </div>
  );
}