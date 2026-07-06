'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/common/Header';
import SelectCard from '@/components/book/SelectCard';
import { BACKGROUND_THEMES } from '@/lib/constants';
import { ThemeType } from '@/types/story';
import { useDragScroll } from '@/hooks/useDragScroll';
import NextButton from '@/components/book/NextButton';

export default function BackgroundSelectPage() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState<ThemeType | ''>('');

  const { scrollRef, scrollProps } = useDragScroll();

  const handleNextStep = () => {
    if (!selectedTheme) {
      alert('동화의 배경을 선택해주세요!');
      return;
    }
    router.push(`/book/character?theme=${selectedTheme}`);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/main-bg.png"
          alt="배경"
          fill
          priority
          className="object-cover"
        />
      </div>

      <Header type={2} />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-fit px-12">
        <h2 className="font-cafe24 text-48 text-white text-center tracking-wide mb-14">
          배경을 선택해주세요
        </h2>

        {/* 스크롤 영역 */}
        <div
          ref={scrollRef}
          {...scrollProps}
          className="w-full overflow-x-auto flex items-center gap-10 scrollbar-hide snap-x select-none scroll-smooth p-4"
        >
          {BACKGROUND_THEMES.map((theme) => (
            <div key={theme.id} className="snap-center shrink-0">
              <SelectCard
                label={theme.label}
                imageUrl={theme.localImg} // 로컬 파일 경로 매핑
                isSelected={selectedTheme === theme.id}
                onClick={() => setSelectedTheme(theme.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <NextButton visible={!!selectedTheme} onClick={handleNextStep} />
    </main>
  );
}
