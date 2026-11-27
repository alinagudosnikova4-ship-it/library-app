import { prisma } from './lib/prisma'; 
import Link from 'next/link';

// Эта строчка убирает предупреждение "Blocking Route"
export const instant = false;

export default async function Home() {
  // Получаем статистику из базы данных
  const booksCount = await prisma.book.count();
  const readersCount = await prisma.reader.count();
  const activeLoansCount = await prisma.loan.count({ where: { status: 'ACTIVE' } });

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 font-sans selection:bg-[#ff6600] selection:text-black relative flex flex-col items-center pt-20">
      
      {/* Сетка на фоне */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff660010_1px,transparent_1px),linear-gradient(to_bottom,#ff660010_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="max-w-4xl w-full relative z-10">
        
        {/* Шапка / Логотип */}
        <div className="mb-12">
          <div className="inline-block bg-[#1a1a1a] border-2 border-[#ff6600] px-3 py-1 mb-4 shadow-[4px_4px_0px_0px_#ff6600]">
            <span className="text-[#ff6600] font-mono text-xs font-bold uppercase tracking-widest">System Online</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
            htivo<span className="text-[#ff6600]">.me</span>
          </h1>
          <p className="text-zinc-400 font-mono text-lg md:text-xl">
            // твоя библиотека. читай для души и управляй хаосом.
          </p>
        </div>

        {/* Карточки со статистикой */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-[#1a1a1a] border-4 border-[#ff6600] p-6 shadow-[8px_8px_0px_0px_#ff6600]">
            <p className="text-zinc-400 font-mono text-sm uppercase mb-2">Всего книг</p>
            <p className="text-5xl font-black text-white">{booksCount}</p>
          </div>

          <div className="bg-[#1a1a1a] border-4 border-[#ff6600] p-6 shadow-[8px_8px_0px_0px_#ff6600]">
            <p className="text-zinc-400 font-mono text-sm uppercase mb-2">Читатели</p>
            <p className="text-5xl font-black text-white">{readersCount}</p>
          </div>

          <div className="bg-[#1a1a1a] border-4 border-[#ff6600] p-6 shadow-[8px_8px_0px_0px_#ff6600]">
            <p className="text-zinc-400 font-mono text-sm uppercase mb-2">Активные выдачи</p>
            <p className="text-5xl font-black text-white">{activeLoansCount}</p>
          </div>

        </div>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-6">
          <Link href="/books" className="bg-[#ff6600] text-black font-black uppercase tracking-wider text-lg px-8 py-4 border-2 border-[#ff6600] shadow-[6px_6px_0px_0px_#ffffff] hover:bg-white hover:border-white hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#ffffff] transition-all text-center">
            Каталог книг
          </Link>
          
          <Link href="/loans" className="bg-transparent border-2 border-[#ff6600] text-[#ff6600] font-black uppercase tracking-wider text-lg px-8 py-4 shadow-[6px_6px_0px_0px_#ff6600] hover:bg-[#ff6600] hover:text-black hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#ff6600] transition-all text-center">
            Журнал выдач
          </Link>
        </div>

      </div>
    </div>
  );
}