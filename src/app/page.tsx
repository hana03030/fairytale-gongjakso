'use client';

import { div } from 'framer-motion/client';
import Image from 'next/image';

export default function Home() {
  return (
    // 1. 브라우저 전체 화면을 꽉 채우는 최상위 컨테이너 (스크롤 차단)
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950 flex flex-col items-center justify-center">
      {/* 2. 피그마 복합 통배경 레이어 (가장 바닥에 배치: z-0) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/main-bg.png" // ⚠️ public/images/main-bg.png 파일 경로
          alt="동화공작소 메인 배경"
          fill // 부모 박스 크기에 꽉 채우기
          priority // 첫 화면 배경이므로 가장 빠르게 로딩
          className="object-cover" // 비율 유지하며 화면 채우기 (깨짐/늘어남 방지)
        />
      </div>

      {/* 3. 배경 위에 올라가는 콘텐츠 레이어 (z-10) */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {/* Cafe24 Ssurround 폰트 + 64px 크기 + 슬레이트 블루 컬러 검증 */}
        <h1 className="font-cafe24 text-64 text-primary drop-shadow-md">
          동화공작소
        </h1>

        {/* Noto Sans KR 폰트 + 24px 크기 + 서브 가독성 컬러 검증 */}
        <p className="font-noto text-24 text-text-secondary font-medium tracking-wide bg-white/80 px-6 py-2 rounded-full shadow-sm">
          나만의 AI 동화책을 만들어보세요
        </p>

        {/* 인터랙션 버튼 예시 */}
        <button className="mt-4 px-8 py-4 bg-primary text-white font-cafe24 text-24 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
          동화나라로 입장하기
        </button>
      </div>
    </main>
  );
}
