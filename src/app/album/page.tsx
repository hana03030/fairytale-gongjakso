'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/common/Header';
import BookCard from '@/components/album/BookCard';
import { useDragScroll } from '@/hooks/useDragScroll';

interface BookItem {
  id: number;
  title: string;
  coverImage: string;
  date: string;
}

export default function AlbumPage() {
  const router = useRouter();
  const [books, setBooks] = useState<BookItem[]>([]);

  const { scrollRef, scrollProps } = useDragScroll();

  useEffect(() => {
    const stored = localStorage.getItem('fairytale_album');
    if (stored) {
      setBooks(JSON.parse(stored));
    }
  }, []);

  return (
    <main className="w-screen h-screen bg-[#B2DFDB] overflow-hidden px-[6vw] py-[5vh] relative flex flex-col justify-between select-none">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/main-bg.png"
          alt="배경"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* 헤더 */}
      <Header type={2} userName="이주현" />

      {/* 가로 마우스 드래그 스크롤 컨테이너 */}
      <div className="pt-[8vh] z-10 w-full flex-1 flex items-center my-auto min-h-[65vh]">
        {books.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center text-white font-cafe24 text-[2vw]">
            <p>아직 만들어진 동화책이 없어요.</p>
          </div>
        ) : (
          <div
            ref={scrollRef}
            {...scrollProps}
            className="w-full flex flex-row gap-[3.5vw] overflow-x-auto py-6 px-2 scrollbar-none select-none items-center"
            style={{ ...scrollProps.style, scrollBehavior: 'auto' }}
          >
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => {
                  // 드래그 예방
                  if (
                    scrollRef.current?.getAttribute('data-dragging') === 'true'
                  )
                    return;
                  router.push(`/album/viewer?id=${book.id}`);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
