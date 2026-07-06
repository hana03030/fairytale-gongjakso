'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/common/Button';

export default function WorldPage() {
  const router = useRouter();

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#E0F2F1] flex flex-col items-center justify-center select-none relative">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-40">
        <Image
          src="/images/main-bg.png"
          alt="배경"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="z-10 flex flex-col items-center text-center px-[4vw]">
        {/* 공사중/개발중 느낌의 귀여운 이모지 */}
        <div className="relative w-[24vw] aspect-square">
          <Image
            src="/images/char-develop.png"
            alt="개발중 캐릭터"
            fill
            className="object-contain"
            draggable={false}
          />
        </div>

        <h2 className="font-cafe24 text-[3.5vw] text-primary mb-4">
          새로운 세상이 준비 중이에요!
        </h2>

        <p className="font-noto text-[1.5vw] text-text-secondary mb-[6vh] leading-[1.6] break-keep">
          동화 세상을 만들고 있어요 ✨
        </p>

        {/* 홈으로 가기 버튼 */}
        <Button
          variant="sub"
          colorType="primary"
          fixedSize
          onClick={() => router.push('/home')}
        >
          동화 나라로 가기
        </Button>
      </div>
    </main>
  );
}
