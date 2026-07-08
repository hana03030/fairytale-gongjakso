'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 헤더의 4가지 유형
type HeaderType = 1 | 2 | 3 | 4;

interface HeaderProps {
  type: HeaderType;
  userName?: string;
  avatarUrl?: string;
  onClose?: () => void; // X 버튼 클릭 시 실행할 커스텀 함수
}

export default function Header({
  type,
  userName = '이주현',
  avatarUrl = '/images/avatar.png',
  onClose,
}: HeaderProps) {
  const router = useRouter();

  // 3, 4번 유형은 프로필이 없는 유형
  const hasProfile = type === 1 || type === 2;

  // X 버튼 핸들러 (3, 4번 유형 공통 - 기본값은 홈으로 이동하되 onClose가 있으면 그걸 실행)
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push('/home');
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 md:px-10 md:py-8 pointer-events-none">
      {/* pointer-events-auto를 주면 
        헤더의 투명한 빈 공간을 클릭했을 때 뒷배경 요소들이 정상적으로 클릭됨
      */}

      {/* 왼쪽 프로필 영역 */}
      <div className="flex items-center pointer-events-auto">
        {hasProfile ? (
          // 1, 2번 유형
          <div className="flex items-center relative">
            <div className="relative w-12 h-12 md:w-[6vw] md:h-[6vw] rounded-full overflow-hidden z-20 bg-white border-4 md:border-8 border-primary shadow-sm">
              <Image
                src={avatarUrl}
                alt="프로필"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-primary pl-8 pr-6 md:pl-10 md:pr-10 py-[0.5vw] rounded-full -ml-6 md:sub-ml-8 z-10 flex items-center">
              <span className="font-cafe24 text-14 md:text-24 text-white tracking-wide">
                {userName} 꼬마 작가
              </span>
            </div>
          </div>
        ) : (
          // 3번 유형은 왼쪽에 아무것도 없음
          <div />
        )}
      </div>

      {/* 오른쪽 아이콘 영역 */}
      <div className="flex items-center gap-4 pointer-events-auto">
        {/* 1, 2번 유형: 우측 아이콘 바 */}
        {hasProfile && (
          <div className="flex items-center gap-4 md:gap-10 bg-transparent">
            {/* 2번 유형: 홈 아이콘 */}
            {type === 2 && (
              <Link
                href="/home"
                className="hover:scale-110 transition-transform"
              >
                <Image
                  src="/images/icons/icon-home.png"
                  alt="홈"
                  width={50}
                  height={50}
                  className="w-10 h-auto md:w-12 sm:w-6"
                />
              </Link>
            )}
            {/* 1, 2번 공통 아이콘 (업적, 설정) */}
            <button className="hover:scale-110 transition-transform cursor-pointer">
              <Image
                src="/images/icons/icon-trophy.png"
                alt="업적"
                width={50}
                height={50}
                className="w-10 h-auto md:w-12 sm:w-6"
              />
            </button>
            <button className="hover:scale-110 transition-transform cursor-pointer">
              <Image
                src="/images/icons/icon-setting.png"
                alt="설정"
                width={50}
                height={50}
                className="w-10 h-auto md:w-12 sm:w-6"
              />
            </button>
          </div>
        )}

        {/* 3번 유형: X 버튼만 존재 */}
        {type === 3 && (
          <button
            onClick={handleClose}
            className="flex items-center gap-10 bg-transparent hover:scale-110 transition-transform cursor-pointer"
          >
            <Image
              src="/images/icons/icon-close.png"
              alt="닫기"
              width={50}
              height={50}
              className="w-10 h-auto md:w-12 sm:w-6"
            />
          </button>
        )}

        {/* 4번 유형: 로봇 아이콘 + X 버튼 */}
        {type === 4 && (
          <div className="flex items-center gap-10">
            <button className="hover:scale-110 transition-transform cursor-pointer">
              <Image
                src="/images/icons/icon-back.png"
                alt="뒤로가기"
                width={50}
                height={50}
                className="w-10 h-auto md:w-12 sm:w-6"
              />
            </button>
            <button className="hover:scale-110 transition-transform cursor-pointer">
              <Image
                src="/images/icons/icon-robot.png"
                alt="AI 로봇 보조"
                width={60}
                height={60}
                className="w-10 h-auto md:w-12 sm:w-6"
              />
            </button>
            <button
              onClick={handleClose}
              className="hover:scale-110 transition-transform cursor-pointer"
            >
              <Image
                src="/images/icons/icon-close.png"
                alt="닫기"
                width={50}
                height={50}
                className="w-10 h-auto md:w-12 sm:w-6"
              />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
