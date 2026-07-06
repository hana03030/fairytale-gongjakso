'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChoiceButton from '@/components/book/ChoiceButton';

interface StoryDisplayProps {
  currentStep: number;
  totalSteps: number;
  text: string;
  choices?: { text: string; nextChapterId: number; isCustom?: boolean }[];
  onChoiceClick?: (nextId: number, isCustom?: boolean) => void;
  showChoices?: boolean;
}

export default function StoryDisplay({
  currentStep,
  totalSteps,
  text,
  choices = [],
  onChoiceClick = () => {},
  showChoices = true,
}: StoryDisplayProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const textQueueRef = useRef<string[]>([]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    textQueueRef.current = text.split('');
    setDisplayedText('');
    setIsDone(false);

    timerRef.current = setInterval(() => {
      const nextChar = textQueueRef.current.shift();
      if (nextChar !== undefined) {
        setDisplayedText((prev) => prev + nextChar);
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsDone(true);
      }
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text]);

  // 화면 터치 시 즉시 전체 문장 노출 및 선택지 등장
  const handleSkipTyping = () => {
    if (isDone) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setDisplayedText(text);
    setIsDone(true);
  };

  return (
    <>
      {/* 왼쪽 스토리 본문 */}
      <div
        onClick={handleSkipTyping}
        className="relative w-1/2 h-full bg-black/50 backdrop-blur-[2px] flex flex-col justify-center px-[6vw] text-white z-10 select-none cursor-pointer"
      >
        {/* 진행도 */}
        <div className="font-cafe24 text-[2.5vw] font-bold opacity-90 mb-[4vh] tracking-wider">
          {currentStep} / {totalSteps}
        </div>

        {/* 동화 본문 */}
        <p className="font-noto text-[1.8vw] leading-[1.6] tracking-wide font-regular whitespace-pre-line break-keep min-h-[150px]">
          {displayedText}
          {!isDone && (
            <span className="inline-block w-[3px] h-[2vw] bg-white ml-1 animate-pulse" />
          )}
        </p>

        {/* 아직 타이핑 중일 때만 나타나는 하단 안내 가이드 문구 */}
        {!isDone && (
          <span className="text-[1.2vw] text-white/50 mt-4 animate-bounce absolute bottom-10 left-20 font-noto font-regular">
            👆 화면을 터치하면 글자가 한 번에 나와요!
          </span>
        )}

        {/* {isDone && !showChoices && (
          <span className="text-[1.2vw] text-white/50 mt-4 animate-bounce absolute bottom-10 left-20 font-noto font-regular">
            📖 하단의 화살표를 눌러 책장을 넘겨보세요!
          </span>
        )} */}
      </div>

      {/* 오른쪽 선택지 영역 */}
      {showChoices && (
        <div className="w-1/2 h-full flex flex-col justify-center items-center z-10 px-[4vw]">
          <AnimatePresence>
            {isDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ type: 'spring', damping: 14, stiffness: 100 }}
                className="w-full flex flex-col justify-center items-center gap-[3vh]"
              >
                <h3 className="font-cafe24 text-[2.5vw] text-white font-bold tracking-wide mb-[1vh] drop-shadow-md text-center">
                  {currentStep === 5
                    ? '멋진 동화책이 완성되었어요!'
                    : '다음에 이어질 내용은?'}
                </h3>

                {choices.map((choice, idx) => (
                  <ChoiceButton
                    key={idx}
                    text={choice.text}
                    isCustom={choice.isCustom}
                    onClick={() =>
                      onChoiceClick(choice.nextChapterId, choice.isCustom)
                    }
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {!showChoices && <div className="w-1/2 h-full z-10" />}
    </>
  );
}
