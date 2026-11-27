import Link from 'next/link';
import { prisma } from '../lib/prisma';
import { returnBook } from './actions';

export default async function LoansPage() {
  const loans = await prisma.loan.findMany({
    include: {
      book: true,
      reader: true,
    },
    orderBy: { loanDate: 'desc' },
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 font-sans selection:bg-[#ff6600] selection:text-black relative">
      
      {/* Сетка на фоне */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff660010_1px,transparent_1px),linear-gradient(to_bottom,#ff660010_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Шапка */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-4 border-[#ff6600] p-6 bg-[#1a1a1a] shadow-[8px_8px_0px_0px_#ff6600]">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 md:mb-0">
            Журнал<span className="text-[#ff6600]">.</span>
          </h1>
          <div className="flex gap-4">
            <Link href="/loans/new" className="bg-[#ff6600] text-black font-black uppercase tracking-wider px-6 py-3 border-2 border-[#ff6600] shadow-[4px_4px_0px_0px_#ffffff] hover:bg-white hover:border-white hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_#ffffff] transition-all">
              + Выдать
            </Link>
            <Link href="/" className="bg-transparent border-2 border-[#ff6600] text-[#ff6600] font-black uppercase tracking-wider px-6 py-3 shadow-[4px_4px_0px_0px_#ff6600] hover:bg-[#ff6600] hover:text-black hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_#ff6600] transition-all">
              На главную
            </Link>
          </div>
        </div>

        {/* Таблица */}
        <div className="bg-[#1a1a1a] border-4 border-[#ff6600] shadow-[8px_8px_0px_0px_#ff6600] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#ff6600] text-black uppercase text-sm tracking-wider font-bold">
                <th className="py-4 px-4 border-b-4 border-[#ff6600] border-r-4">Книга</th>
                <th className="py-4 px-4 border-b-4 border-[#ff6600] border-r-4">Читатель</th>
                <th className="py-4 px-4 border-b-4 border-[#ff6600] border-r-4">Дата выдачи</th>
                <th className="py-4 px-4 border-b-4 border-[#ff6600] border-r-4">Статус</th>
                <th className="py-4 px-4 border-b-4 border-[#ff6600] text-center">Действие</th>
              </tr>
            </thead>
            <tbody className="text-white text-base font-mono">
              {loans.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 px-4 text-center text-zinc-500">
                    // Пока нет ни одной выдачи. Нажмите «+ Выдать».
                  </td>
                </tr>
              ) : (
                loans.map((loan) => {
                  const returnBookWithIds = returnBook.bind(null, loan.id, loan.bookId);
                  return (
                    <tr key={loan.id} className="border-b-2 border-[#333] hover:bg-[#222] transition-colors">
                      <td className="py-4 px-4 border-r-2 border-[#333] font-bold">{loan.book.title}</td>
                      <td className="py-4 px-4 border-r-2 border-[#333]">{loan.reader.fullName}</td>
                      <td className="py-4 px-4 border-r-2 border-[#333] text-zinc-400">{new Date(loan.loanDate).toLocaleDateString('ru-RU')}</td>
                      <td className="py-4 px-4 border-r-2 border-[#333]">
                        <span className={`px-3 py-1 font-black ${loan.status === 'ACTIVE' ? 'bg-[#ff6600] text-black' : 'bg-[#333] text-zinc-400'}`}>
                          {loan.status === 'ACTIVE' ? 'На руках' : 'Возвращена'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {loan.status === 'ACTIVE' && (
                          <form action={returnBookWithIds}>
                            <button type="submit" className="bg-transparent border-2 border-[#ff6600] text-[#ff6600] font-bold px-4 py-2 hover:bg-[#ff6600] hover:text-black transition-colors">
                              Вернуть
                            </button>
                          </form>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}