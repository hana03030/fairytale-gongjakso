'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/common/Header';
import { motion } from 'framer-motion';

export default function HomePage() {
  // 애니메이션 설정 세팅
  const floatingAnimation = (delay: number) =>
    ({
      animate: {
        y: [0, -12, 0] as number[],
      },
      whileHover: {
        scale: 1.05,
        transition: { duration: 0.2 },
      },
      whileTap: {
        scale: 0.95,
      },
      transition: {
        scale: { duration: 0.15, ease: 'easeInOut' },

        // 둥둥거리는 Y축 이동 속도는 3초로 유지
        y: {
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: delay,
        },
      },
    }) as const;

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950 flex flex-col items-center justify-center">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/main-bg.png"
          alt="배경"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* 헤더 */}
      <Header type={1} userName="이주현" />

      {/* 중앙 레이어 */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[1200px] h-full">
        {/* 무지개 책 컨테이너 */}
        <div className="relative w-screen h-[80vh] flex items-center justify-center">
          <Image
            src="/images/rainbow-book.png"
            alt="무지개 동화책"
            fill
            priority
            className="object-contain"
          />

          {/* 페이지 연결 3개 버튼 그룹 */}
          <div className="absolute bottom-[220px] flex items-center justify-center gap-6 w-full">
            {/* 메뉴 1: 동화 생성 */}
            <motion.div {...floatingAnimation(0)}>
              <Link href="/book/background" className="block w-[20vw]">
                <Image
                  src="/images/buttons/btn-create.png"
                  alt="동화 생성하기"
                  width={300}
                  height={240}
                  className="drop-shadow-lg"
                />
              </Link>
            </motion.div>

            {/* 메뉴 2: 동화 앨범 */}
            <motion.div {...floatingAnimation(0.4)}>
              {' '}
              {/* delay 0.4초로 엇박자 */}
              <Link href="/library" className="block w-[15vw]">
                <Image
                  src="/images/buttons/btn-album.png"
                  alt="동화 앨범 가기"
                  width={220}
                  height={240}
                  className="drop-shadow-lg"
                />
              </Link>
            </motion.div>

            {/* 메뉴 3: 동화 세상 */}
            <motion.div {...floatingAnimation(0.2)}>
              {' '}
              {/* delay 0.2초로 엇박자 */}
              <Link href="/world" className="block w-[18vw]">
                <Image
                  src="/images/buttons/btn-world.png"
                  alt="동화 세상 구경"
                  width={280}
                  height={270}
                  className="drop-shadow-lg"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
