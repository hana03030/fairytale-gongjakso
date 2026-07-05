'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface NextButtonProps {
  visible: boolean; // 버튼을 보여줄지 여부 (예: 무언가 선택되었을 때 true)
  onClick: () => void; // 클릭 시 실행할 함수
}

export default function NextButton({ visible, onClick }: NextButtonProps) {
  return (
    // AnimatePresence는 컴포넌트가 사라질 때(exit)의 애니메이션을 보장
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          onClick={onClick}
          className="absolute bottom-10 right-10 cursor-pointer z-20 select-none"
        >
          <Image
            src="/images/icons/icon-next-arrow.png"
            alt="다음 단계로"
            width={100}
            height={50}
            className="drop-shadow-md"
            draggable={false}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
