'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { MouseEvent } from 'react';

interface SelectCardProps {
  label: string;
  imageUrl: string;
  isSelected?: boolean;
  onClick: () => void;
}

export default function SelectCard({
  label,
  imageUrl,
  isSelected = false,
  onClick,
}: SelectCardProps) {
  const handleMouseUp = (e: MouseEvent<HTMLButtonElement>) => {
    // 부모 div에 커스텀 attribute로 드래그 중인지 기록
    const container = e.currentTarget.closest('.scrollbar-hide');
    const isDragging = container?.getAttribute('data-dragging') === 'true';

    // 드래그 중이 아닐 때만 클릭 실행
    if (!isDragging) {
      onClick();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 select-none md:gap-4 sm:gap-0">
      {/* 원형 이미지 카드 버튼 */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onMouseUp={handleMouseUp}
        className={cn(
          // 공통 스타일
          'relative w-35 h-35 rounded-full flex items-center justify-center cursor-pointer overflow-hidden bg-white transition-all duration-200 md:w-50 md:h-50 sm:w-20 sm:h-20',

          // 선택되었을 때 효과
          isSelected ? 'scale-105' : '',
        )}
      >
        {/* 로컬 원형 일러스트 이미지 */}
        <Image
          src={imageUrl}
          alt={label}
          fill
          className="object-cover"
          sizes="170px"
          draggable={false}
        />

        {/* 선택 시 색깔 덮기 */}
        <div
          className={cn(
            'absolute inset-0 bg-primary/80 transition-opacity duration-200 pointer-events-none',
            // 선택되었을 때는 투명도를 100(보임)으로, 선택 안 됐을 때는 0(안보임)으로 제어
            isSelected ? 'opacity-100' : 'opacity-0',
          )}
        />
      </motion.button>

      {/* 하단 텍스트 */}
      <span
        className={cn(
          'font-cafe24 text-36 transition-colors duration-200 text-white sm:text-20 md:text-36',
        )}
      >
        {label}
      </span>
    </div>
  );
}
