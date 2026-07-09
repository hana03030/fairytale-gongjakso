'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import TitleInput from '@/components/book/TitleInput';
import { ART_STYLES, CHARACTER_ENGLISH_NAMES } from '@/lib/constants';
import { ArtStyleType } from '@/types/story';
import NextButton from '@/components/book/NextButton';
import CloseButton from '@/components/common/CloseButton';

interface FixedPromptProps {
  theme: string;
  characterString: string;
  styleId: ArtStyleType;
}

function generateFixedImageUrl({
  theme,
  characterString,
  styleId,
}: FixedPromptProps): string {
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

function BookTitleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const theme = searchParams.get('theme') || 'ocean';
  const character = searchParams.get('character') || '인어공주,왕자';
  const style = (searchParams.get('style') || 'watercolor') as ArtStyleType;

  const [bookTitle, setBookTitle] = useState<string>('');

  // 모달 상태 관리
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  const fixedImageUrl = generateFixedImageUrl({
    theme,
    characterString: character,
    styleId: style,
  });

  const handleNextStep = () => {
    if (!bookTitle.trim()) {
      alert('동화책의 멋진 제목을 먼저 지어주세요!');
      return;
    }
    router.push(
      `/book/cover?theme=${theme}&character=${character}&style=${style}&title=${encodeURIComponent(bookTitle)}`,
    );
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-900 flex flex-col items-center justify-center select-none">
      {/* 동화 배경 */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={fixedImageUrl}
          alt="동화 배경"
          fill
          priority
          className="object-cover"
          unoptimized
        />
      </div>

      {/* 50% 레이어 */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* 우측 상단 닫기 버튼 */}
      <div className="absolute top-[4vh] right-[4vw] z-30">
        <CloseButton onClick={() => setShowExitModal(true)} size={50} />
      </div>

      {/* 제목 입력 영역 */}
      <div className="z-20 flex flex-col items-center justify-center text-center px-[4vw]">
        <h2 className="font-cafe24 text-[3vw] text-white font-bold mb-[6vh] tracking-wide drop-shadow-md">
          제목을 지어주세요
        </h2>

        {/* 타이틀 인풋 컴포넌트 */}
        <TitleInput value={bookTitle} onChange={setBookTitle} />
      </div>

      {/* 지은이 정보 */}
      <div className="absolute bottom-20 left-[4vw] z-20 pointer-events-none">
        <p className="font-cafe24 text-[2vw] text-white">
          지은이 | 이주현 꼬마 작가
        </p>
      </div>

      <NextButton visible={true} onClick={handleNextStep}></NextButton>

      {/* 모달 */}
      {showExitModal && (
        <div className="absolute inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-[24px] max-w-[600px] w-[90%] text-center">
            <h4 className="font-cafe24 text-32 text-primary mb-8">
              동화 만들기 중지
            </h4>
            <p className="font-noto text-20 text-text-primary mb-16 leading-relaxed">
              지금 나가시면 작성 중이던 동화책이 사라집니다.
              <br />
              정말로 가실건가요?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push('/home')}
                className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-full cursor-pointer transition-colors"
              >
                예, 나갈래요
              </button>
              <button
                onClick={() => setShowExitModal(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white font-medium px-6 py-3 rounded-full cursor-pointer transition-colors"
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function BookTitlePage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <BookTitleContent />
    </Suspense>
  );
}
