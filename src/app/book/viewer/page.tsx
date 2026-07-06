'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import StoryDisplay from '@/components/book/StoryDisplay';
import ChoiceButton from '@/components/book/ChoiceButton';
import { DUMMY_STORY_TREE } from '@/lib/storyDummy';
import { ART_STYLES, CHARACTER_ENGLISH_NAMES } from '@/lib/constants';
import { ArtStyleType } from '@/types/story';
import { motion, AnimatePresence } from 'framer-motion';
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
  // 선택된 그림 스타일의 프롬프트 뼈대 가져오기
  const stylePrompt =
    ART_STYLES.find((s) => s.id === styleId)?.prompt ||
    'Fairy tale illustration';

  // 한글 캐릭터 목록 파싱
  const charList = characterString
    ? characterString.split(',')
    : ['인어공주', '왕자'];
  const englishChars = charList
    .map((char) => CHARACTER_ENGLISH_NAMES[char.trim()] || char)
    .join(', and ');

  // 프롬프트 전면 고도화
  // - 각 스타일의 고유 기법(style technique)을 극대화하도록 지시
  // - 기형적인 신체 구조(extra limbs, mutated hands 등)를 강력하게 금지
  const finalPrompt = `A masterpiece of ${stylePrompt}, emphasizing the distinct textures and artistic technique of ${styleId}. Featuring ${englishChars} together looking at the viewer and smiling happily. Beautiful fantasy ${theme} background environment, clear center composition, vibrant and professional color palette. (child-friendly, cute faces, flawless anatomy, regular human bodies, 2 arms, 2 legs:1.5), (perfect hands, perfect fingers:1.4), no text, no blur, no watermark, no extra limbs, no deformed bodies, no mutated hands, no creepy faces`;

  return `https://image.pollinations.ai/p/${encodeURIComponent(finalPrompt)}?width=1024&height=576&nologo=true&enhance=true`;
}

export default function BookViewerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 주소창에서 3가지 핵심 데이터 추출
  const theme = searchParams.get('theme') || 'ocean';
  const character = searchParams.get('character') || '인어공주,왕자';
  const style = (searchParams.get('style') || 'watercolor') as ArtStyleType;

  // 상태 관리
  const [currentChapterId, setCurrentChapterId] = useState<number>(1);
  const [stepCount, setStepCount] = useState<number>(1); // 1~5장 체크용
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  const currentChapter =
    DUMMY_STORY_TREE[currentChapterId] || DUMMY_STORY_TREE[1];

  // 글자 타이핑 체크
  const [isTextFinished, setIsTextFinished] = useState<boolean>(false);

  // 분기 선택 처리
  const handleChoiceClick = (nextId: number, isCustom?: boolean) => {
    if (isCustom) {
      alert('커스텀 작성 페이지는 다음 스텝에 개발 예정입니다!');
      return;
    }

    if (nextId === 888) {
      router.push(
        `/book/title?theme=${theme}&character=${character}&style=${style}`,
      );
      return;
    }

    // setTimeout을 걷어내고, 데이터 변경과 타이핑 상태 리셋을 동시에 처리
    // 이렇게 하면 React 19가 엇박자 렌더링을 일으키지 않고 한 번의 배치(Batch) 업데이트로 안전하게 처리
    setCurrentChapterId(nextId);
    setStepCount((prev) => prev + 1);
    setIsTextFinished(false); // 다음 페이지를 위해 선택지 창을 닫아줌
  };

  // 변경된 파라미터 구조에 맞게 객체 형태로 3가지 정보 주입
  const fixedImageUrl = generateFixedImageUrl({
    theme,
    characterString: character,
    styleId: style,
  });

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-900 flex select-none">
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

      {/* 동화 텍스트 레이어 */}
      <StoryDisplay
        key={currentChapterId}
        currentStep={stepCount}
        totalSteps={5}
        text={currentChapter.storyText}
        choices={currentChapter.choices}
        onChoiceClick={handleChoiceClick}
      />

      {/* 닫기 버튼 */}
      <div className="absolute top-[4vh] right-[4vw] z-30">
        <CloseButton onClick={() => setShowExitModal(true)} size={50} />
      </div>

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
