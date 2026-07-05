'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/common/Header';
import SelectCard from '@/components/book/SelectCard';
import { OCEAN_CHARACTER_LIST } from '@/lib/constants';
import { OceanCharacter } from '@/types/story';
import NextButton from '@/components/book/NextButton';

export default function CharacterSelectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 이전 페이지에서 넘겨받은 배경(Theme) 키워드 가져오기
  const selectedTheme = searchParams.get('theme') || 'ocean';
  // 기본값 방어코드로 ocean 지정

  // 다중 선택 상태 배열로 선언
  const [selectedChars, setSelectedChars] = useState<OceanCharacter[]>([]);

  // 카드를 클릭했을 때 실행되는 다중 선택 토글 함수
  const handleSelectChar = (charName: OceanCharacter) => {
    setSelectedChars((prev) => {
      // 이미 선택된 캐릭터라면 배열에서 제거 (선택 해제)
      if (prev.includes(charName)) {
        return prev.filter((name) => name !== charName);
      }
      // 선택되지 않은 캐릭터라면 배열에 추가 (최대 선택 개수를 제한하고 싶다면 여기에 if문을 넣으면 됩니다)
      else {
        return [...prev, charName];
      }
    });
  };

  // 다음 단계(그림 스타일 선택)로 넘어가는 함수
  const handleNextStep = () => {
    if (selectedChars.length === 0) {
      alert('동화에 등장할 주인공을 한 명 이상 선택해주세요!');
      return;
    }

    // 여러 명의 캐릭터 이름을 쉼표(,) 등으로 합쳐서 쿼리스트링으로 토스
    // 예: character=인어공주,돌고래,상어
    const characterQuery = selectedChars.join(',');
    router.push(
      `/book/style?theme=${selectedTheme}&character=${characterQuery}`,
    );
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950 flex flex-col items-center justify-center">
      {/* 전체 통배경 이미지 */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/main-bg.png"
          alt="배경"
          fill
          priority
          className="object-cover"
        />
      </div>

      <Header type={2} />

      {/* 콘텐츠 메인 레이어 */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[1400px] px-6">
        {/* 타이틀 */}
        <h2 className="font-cafe24 text-48 text-white text-center mb-5">
          등장인물을 선택해주세요
        </h2>

        {/* 피그마 레이아웃 맞춤 격자 그리드 배치 */}
        {/* - grid-cols-5: 가로로 무조건 5칸 정렬
            - gap-x-8, gap-y-10: 피그마 배율에 맞춘 조밀한 간격
            - max-h-[500px] overflow-y-auto: 혹시 아이템이 너무 많아지면 내부 세로 스크롤 방어
        */}
        <div className="grid grid-cols-5 gap-x-10 gap-y-8 justify-items-center w-full max-w-fit mx-auto px-4 py-4">
          {OCEAN_CHARACTER_LIST.map((char) => {
            // 현재 캐릭터가 선택된 배열 안에 포함되어 있는지 확인
            const isSelected = selectedChars.includes(
              char.id as OceanCharacter,
            );

            return (
              <SelectCard
                key={char.id}
                label={char.label}
                imageUrl={char.localImg}
                isSelected={isSelected} // true/false 전달
                onClick={() => handleSelectChar(char.id as OceanCharacter)}
              />
            );
          })}
        </div>
      </div>

      <NextButton visible={selectedChars.length > 0} onClick={handleNextStep} />
    </main>
  );
}
