'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/common/Header';
import SelectCard from '@/components/book/SelectCard';
import NextButton from '@/components/book/NextButton';
import { ART_STYLES } from '@/lib/constants';
import { ArtStyleType } from '@/types/story';

export default function ArtStyleSelectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 이전 페이지들로부터 누적된 장바구니 데이터 파싱
  const selectedTheme = searchParams.get('theme') || 'ocean';
  const selectedCharacters = searchParams.get('character') || ''; // 예: "인어공주,왕자,해적,돌고래"

  // 선택된 그림 스타일 상태 (단일 선택)
  const [selectedStyle, setSelectedStyle] = useState<ArtStyleType | ''>('');

  const handleNextStep = () => {
    if (!selectedStyle) {
      alert('동화책에 입힐 그림 스타일을 선택해주세요!');
      return;
    }

    // 동화 생성/뷰어 페이지로 3가지 핵심 스노우볼 데이터를 들고 이동
    router.push(
      `/book/viewer?theme=${selectedTheme}&character=${selectedCharacters}&style=${selectedStyle}/viewer`,
    );
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950 flex flex-col items-center justify-center">
      {/* 전체 통배경 이미지 */}
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
      <Header type={2} />

      {/* 콘텐츠 메인 레이어 */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[1200px] px-4">
        {/* 타이틀 */}
        <h2 className="font-cafe24 text-48 text-white text-center tracking-wide mb-14 md:text-48 sm:text-24 sm:mb-4 md:mb-14">
          그림 스타일을 선택해주세요
        </h2>

        {/* 4가지 그림 스타일 배치 (4칸 그리드) */}
        <div className="grid grid-cols-4 gap-12 justify-items-center max-w-250 mx-auto w-fit md:gap-12 sm:gap-8 ">
          {ART_STYLES.map((style) => {
            const isSelected = selectedStyle === style.id;

            return (
              <SelectCard
                key={style.id}
                label={style.label}
                imageUrl={style.localImg} // 저장해 둘 로컬 샘플 스타일 이미지
                isSelected={isSelected}
                onClick={() => setSelectedStyle(style.id)}
              />
            );
          })}
        </div>
      </div>

      {/* 다음 단계로 가는 우측 하단 버튼 */}
      <NextButton visible={!!selectedStyle} onClick={handleNextStep} />
    </main>
  );
}
