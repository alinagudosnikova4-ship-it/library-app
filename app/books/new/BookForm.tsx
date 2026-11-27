'use client';

import { useState } from 'react';
import Link from 'next/link';

const GENRES = [
  'Роман', 'Психология', 'Фэнтези', 'Детектив', 'Хоррор', 
  'Классика', 'Фантастика', 'Саморазвитие', 'Современная проза', 
  'Мистика', 'Триллер', 'Ромэнтези', 'Азиатская новелла', 'Сянься', 'Поэма', 'Эпопея', 'Комедия', 'Повесть'
];

export default function BookForm({ books, addBook }: { books: any[], addBook: (formData: FormData) => void }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [ageRestriction, setAgeRestriction] = useState('');

  // Функция автозаполнения при выборе книги
  const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTitle = e.target.value;
    setTitle(selectedTitle);

    // Ищем книгу с таким названием в базе
    const foundBook = books.find(b => b.title.trim() === selectedTitle.trim());
    
    if (foundBook) {
      setAuthor(foundBook.author || '');
      setGenre(foundBook.genre || '');
      setAgeRestriction(foundBook.ageRestriction || '');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 font-sans selection:bg-[#ff6600] selection:text-black relative flex items-center justify-center">
      
      {/* Сетка на фоне */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff660010_1px,transparent_1px),linear-gradient(to_bottom,#ff660010_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="max-w-2xl w-full relative z-10">
        
        {/* Шапка */}
        <div className="flex justify-between items-center mb-8 border-4 border-[#ff6600] p-6 bg-[#1a1a1a] shadow-[8px_8px_0px_0px_#ff6600]">
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
            Новая<span className="text-[#ff6600]">.</span>
          </h1>
          <Link href="/books" className="bg-transparent border-2 border-[#ff6600] text-[#ff6600] font-black uppercase tracking-wider px-4 py-2 shadow-[4px_4px_0px_0px_#ff6600] hover:bg-[#ff6600] hover:text-black hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_#ff6600] transition-all text-sm">
            &larr; Назад
          </Link>
        </div>

        {/* Форма */}
        <form action={addBook} className="bg-[#1a1a1a] border-4 border-[#ff6600] p-8 shadow-[8px_8px_0px_0px_#ff6600] flex flex-col gap-6">
          
          <div>
            <label className="block text-zinc-400 font-mono text-sm mb-2 uppercase">Название книги *</label>
            <select 
              name="title" 
              required 
              value={title}
              onChange={handleTitleChange}
              className="w-full bg-[#0a0a0a] border-2 border-[#333] text-white px-4 py-3 focus:outline-none focus:border-[#ff6600] transition-colors font-mono appearance-none cursor-pointer" 
            >
              <option value="">-- Выберите книгу из базы --</option>
              {books.map((book) => (
                <option key={book.id} value={book.title}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-zinc-400 font-mono text-sm mb-2 uppercase">Автор *</label>
            <select 
              name="author" 
              required 
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-[#0a0a0a] border-2 border-[#333] text-white px-4 py-3 focus:outline-none focus:border-[#ff6600] transition-colors font-mono appearance-none cursor-pointer"
            >
              <option value="">-- Выберите автора --</option>
              {Array.from(new Set(books.map(b => b.author))).map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-zinc-400 font-mono text-sm mb-2 uppercase">Жанр</label>
              <select 
                name="genre" 
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-[#0a0a0a] border-2 border-[#333] text-white px-4 py-3 focus:outline-none focus:border-[#ff6600] transition-colors font-mono appearance-none cursor-pointer"
              >
                <option value="">-- Выберите жанр --</option>
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-zinc-400 font-mono text-sm mb-2 uppercase">Возрастная категория</label>
              <select 
                name="ageRestriction" 
                value={ageRestriction}
                onChange={(e) => setAgeRestriction(e.target.value)}
                className="w-full bg-[#0a0a0a] border-2 border-[#333] text-white px-4 py-3 focus:outline-none focus:border-[#ff6600] transition-colors font-mono appearance-none cursor-pointer"
              >
                <option value="">-- Выберите --</option>
                <option value="0+">0+</option>
                <option value="6+">6+</option>
                <option value="12+">12+</option>
                <option value="16+">16+</option>
                <option value="18+">18+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 font-mono text-sm mb-2 uppercase">Кол-во экземпляров</label>
            <input type="number" name="copiesTotal" defaultValue={1} min={1} required className="w-full bg-[#0a0a0a] border-2 border-[#333] text-white px-4 py-3 focus:outline-none focus:border-[#ff6600] transition-colors font-mono" />
          </div>

          <button type="submit" className="bg-[#ff6600] text-black font-black uppercase tracking-wider text-xl px-8 py-4 border-4 border-[#ff6600] shadow-[6px_6px_0px_0px_#ffffff] hover:bg-white hover:border-white hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#ffffff] transition-all mt-4">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}