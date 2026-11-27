import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "htivo.me | читай меня",
  description: "Твоя креативная библиотека",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-[#0a0a0a] min-h-screen flex flex-col justify-between relative`}>
        
        <main className="flex-grow relative z-10">
          {children}
        </main>

        <footer className="w-full max-w-6xl mx-auto relative z-10 flex justify-between items-end p-6 mt-auto">
          <Link href="/" className="group cursor-pointer hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center">
            <div className="relative w-[48px] h-[60px]">
              <div className="absolute top-0 left-[8px] w-[32px] h-[8px] bg-[#ff6600]"></div>
              <div className="absolute top-[8px] left-0 w-[48px] h-[24px] bg-[#ff6600]"></div>
              <div className="absolute top-[32px] left-0 w-[8px] h-[16px] bg-[#ff6600]"></div>
              <div className="absolute top-[32px] left-[16px] w-[8px] h-[16px] bg-[#ff6600]"></div>
              <div className="absolute top-[32px] left-[32px] w-[8px] h-[16px] bg-[#ff6600]"></div>
              <div className="absolute top-[16px] left-[12px] w-[8px] h-[12px] bg-white">
                <div className="w-[4px] h-[4px] bg-black mt-[4px] ml-[4px]"></div>
              </div>
              <div className="absolute top-[16px] right-[12px] w-[8px] h-[12px] bg-white">
                <div className="w-[4px] h-[4px] bg-black mt-[4px] ml-[4px]"></div>
              </div>
            </div>
            <div className="text-[#ff6600] text-sm font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Ш-ш-ш...</div>
          </Link>

          <div className="text-center text-zinc-500 font-bold text-xs md:text-sm pb-2">
            <p className="mb-1">Разработка: alinagosnikova4-ship-it</p>
            <p>© 2026 htivo.me — Все права защищены</p>
          </div>

          <Link href="/" className="group cursor-pointer hover:scale-110 transition-transform duration-300 flex flex-col items-center">
            <div className="relative w-[40px] h-[48px]">
              <div className="absolute top-0 right-0 w-[32px] h-[16px] bg-[#ff6600]"></div>
              <div className="absolute top-[16px] right-[8px] w-[16px] h-[16px] bg-[#ff6600]"></div>
              <div className="absolute top-[16px] right-[24px] w-[16px] h-[8px] bg-[#ff6600]"></div>
              <div className="absolute top-[4px] right-[4px] w-[4px] h-[4px] bg-white">
                <div className="w-[2px] h-[2px] bg-black"></div>
              </div>
              <div className="absolute bottom-0 right-[8px] w-[4px] h-[16px] bg-[#ff6600]"></div>
              <div className="absolute bottom-0 right-[16px] w-[4px] h-[16px] bg-[#ff6600]"></div>
            </div>
            <div className="text-[#ff6600] text-sm font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Твой выбор!</div>
          </Link>
        </footer>
      </body>
    </html>
  );
}