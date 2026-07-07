'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChoiceButtonProps {
  text: string;
  isCustom?: boolean;
  onClick: () => void;
}

export default function ChoiceButton({
  text,
  isCustom = false,
  onClick,
}: ChoiceButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        // 선택지
        'w-[100%] max-w-[800px] bg-black-50 border border-white/20 px-[1vw] py-[3.4vh] rounded-full text-white text-center cursor-pointer backdrop-blur-sm transition-colors duration-200 select-none',
      )}
    >
      <span className="font-noto text-[1.2vw] md:text-20 xl:text-[28px] break-keep block font-regular">
        {text}
      </span>
    </motion.button>
  );
}
