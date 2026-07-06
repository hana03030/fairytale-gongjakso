'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import CloseButton from '@/components/common/CloseButton';
import StoryDisplay from '@/components/book/StoryDisplay';
import { ART_STYLES, CHARACTER_ENGLISH_NAMES } from '@/lib/constants';
import { ArtStyleType } from '@/types/story';

interface AlbumBook {
  id: number;
  title: string;
  theme: string;
  character: string;
  style: string;
  stories: string[];
  coverImage: string;
  date: string;
}

interface BookDetail {
  id: number;
  title: string;
  theme: string;
  character: string;
  style: ArtStyleType;
  stories: string[];
}

function generateFixedImageUrl({
  theme,
  characterString,
  styleId,
}: {
  theme: string;
  characterString: string;
  styleId: ArtStyleType;
}) {
  const stylePrompt =
    ART_STYLES.find((s) => s.id === styleId)?.prompt ||
    'Fairy tale illustration';
  const charList = characterString
    ? characterString.split(',')
    : ['인어공주', '왕자'];
  const englishChars = charList
    .map((char) => CHARACTER_ENGLISH_NAMES[char.trim()] || char)
    .join(', and ');

  const finalPrompt = `A masterpiece of ${stylePrompt}, emphasizing the distinct textures and artistic technique of ${styleId}. Featuring ${englishChars} together looking at the viewer and smiling happily. Beautiful fantasy ${theme} background environment, clear center composition, vibrant and professional color palette. (child-friendly, cute faces, flawless anatomy, regular human bodies, 2 arms, 2 legs:1.5), (perfect hands, perfect fingers:1.4), no text, no blur, no watermark, no extra limbs, no deformed bodies, no mutated hands, no creepy faces`;

  return `https://image.pollinations.ai/p/${encodeURIComponent(finalPrompt)}?width=1024&height=576&nologo=true&enhance=true`;
}

export default function AlbumViewerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get('id');

  const [book, setBook] = useState<BookDetail | null>(null);
  const [pageIndex, setPageIndex] = useState<number>(0);

  useEffect(() => {
    if (!bookId) return;
    const stored = localStorage.getItem('fairytale_album');
    if (stored) {
      const album = JSON.parse(stored) as AlbumBook[];
      const found = album.find((b: AlbumBook) => b.id === Number(bookId));
      if (found) {
        setBook({
          ...found,
          style: found.style as ArtStyleType,
        });
      }
    }
  }, [bookId]);

  if (!book) {
    return (
      <div className="w-screen h-screen bg-slate-900 text-white flex items-center justify-center font-cafe24">
        책을 찾는 중입니다...
      </div>
    );
  }

  const fixedBgUrl = generateFixedImageUrl({
    theme: book.theme,
    characterString: book.character,
    styleId: book.style,
  });

  const handlePrevPage = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  const handleNextPage = () => {
    if (pageIndex < book.stories.length - 1) setPageIndex(pageIndex + 1);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-900 flex select-none">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={fixedBgUrl}
          alt="스토리 일러스트 배경"
          fill
          priority
          className="object-cover"
          unoptimized
        />
      </div>

      <StoryDisplay
        currentStep={pageIndex + 1}
        totalSteps={book.stories.length}
        text={book.stories[pageIndex]}
        showChoices={false} // 선택지 off
      />

      {/* 닫기 버튼 */}
      <div className="absolute top-[4vh] right-[4vw] z-30">
        <CloseButton onClick={() => router.push('/album')} size={50} />
      </div>

      {/* 왼쪽 전 장 버튼 */}
      {pageIndex > 0 && (
        <button
          onClick={handlePrevPage}
          className="absolute bottom-[4vh] left-[4vw] z-30 hover:scale-105 transition-all active:scale-95 cursor-pointer"
        >
          <Image
            src="/images/icons/icon-next-arrow.png"
            alt="이전 단계로"
            width={100}
            height={50}
            className="drop-shadow-md transform: scale-x-[-1]"
            draggable={false}
          />
        </button>
      )}

      {/* 오른쪽 다음 장 버튼 */}
      {pageIndex < book.stories.length - 1 && (
        <button
          onClick={handleNextPage}
          className="absolute bottom-[4vh] right-[4vw] z-30 hover:scale-105 transition-all active:scale-95 cursor-pointer"
        >
          <Image
            src="/images/icons/icon-next-arrow.png"
            alt="다음 단계로"
            width={100}
            height={50}
            className="drop-shadow-md"
            draggable={false}
          />
        </button>
      )}
    </main>
  );
}
