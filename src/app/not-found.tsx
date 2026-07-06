'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/common/Button';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#E0F2F1] flex flex-col items-center justify-center select-none relative">
      {/* 귀여운 배경 이미지 데코 */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-40">
        <Image
          src="/images/main-bg.png"
          alt="배경"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="z-10 flex justify-center items-center text-center px-[4vw] gap-14">
        {/* 캐릭터나 길 잃은 아이콘 배치 */}
        <img
          src="/images/char-not-found.png"
          alt="notfound 캐릭터"
          className="w-[26vw]"
        />

        <div className="flex flex-col justify-center items-center">
          <h2 className="font-cafe24 text-[3vw] text-text-primary mb-4">
            어라? 길을 잃어버렸어요!
          </h2>

          <p className="font-noto text-[1.6vw] text-text-secondary mb-[6vh] leading-[1.6] break-keep">
            요청하신 페이지를 찾을 수 없어요. <br />
            아래 버튼을 눌러 안전한 동화책 마을 홈으로 돌아가 보아요!
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
      </div>
    </main>
  );
}
