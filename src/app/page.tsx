'use client';

import Button from '@/components/common/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/main-bg.png"
          alt="동화공작소 메인 배경"
          fill // 채우기
          priority // 빠르게 로딩
          className="object-cover" // 비율 유지
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {/* 로고 제목 */}
        <h1 className="font-logo text-96 text-white drop-shadow-md">
          동화공작소
        </h1>

        {/* 소개 */}
        <p className="font-cafe24 text-48 text-white font-medium leading-tight mb-10">
          이주현 꼬마 작가님, 환영해요!
          <br />
          동화책을 만들러 가볼까요?
        </p>

        {/* 시작 버튼 */}
        <Link href="/home">
          <Button variant="sub" colorType="primary" fixedSize>
            좋아!
          </Button>
        </Link>
      </div>
    </main>
  );
}
