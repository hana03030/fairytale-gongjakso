'use client';

import Image from 'next/image';

interface CloseButtonProps {
  onClick: () => void;
  size?: number;
}

export default function CloseButton({ onClick, size = 50 }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer hover:scale-110 active:scale-95 transition-all duration-200 select-none group"
      style={{ width: size, height: size }}
      title="닫기"
    >
      <Image
        src="/images/icons/icon-close.png"
        alt="닫기 버튼"
        width={size}
        height={size}
        draggable={false}
        className="drop-shadow-md group-hover:opacity-90 transition-opacity"
      />
    </button>
  );
}
