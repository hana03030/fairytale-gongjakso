// 동화책 타입

// 배경 테마 (유저가 선택)
export type ThemeType =
  | 'ocean'
  | 'castle'
  | 'forest'
  | 'village'
  | 'space'
  | 'desert'
  | string;

// 테마별로 가지는 기본 캐릭터 목록 타입
export type OceanCharacter =
  | '인어공주'
  | '왕자'
  | '해적'
  | '돌고래'
  | '상어'
  | '고래'
  | '바다거북'
  | '해파리'
  | '어부';

export type CastleCharacter =
  | '공주'
  | '왕자'
  | '왕'
  | '왕비'
  | '고양이'
  | '기사'
  | '마법사'
  | '난쟁이'
  | '요리사';

export type ForestCharacter =
  | '부엉이'
  | '도깨비'
  | '나무꾼'
  | '여우'
  | '곰'
  | '요정'
  | '아이'
  | '토끼'
  | '새';

export type VillageCharacter =
  | '소녀'
  | '소년'
  | '엄마'
  | '아빠'
  | '강아'
  | '할아버지'
  | '할머니'
  | '다람쥐'
  | '농부';

export type SpaceCharacter =
  | '별'
  | '우주인'
  | '우주괴물'
  | '외계인'
  | '달토끼'
  | '별의 요정'
  | '행성'
  | '시간여행자'
  | '탐험가';

export type DesertCharacter =
  | '카멜레온'
  | '사막여우'
  | '미어캣'
  | '탐험가'
  | '낙타'
  | '독수리'
  | '상인'
  | '스핑크스'
  | '코브라';

// 종합 캐릭터 타입
export type CharacterType =
  | OceanCharacter
  | CastleCharacter
  | ForestCharacter
  | VillageCharacter
  | SpaceCharacter
  | DesertCharacter
  | string;

// 그림 스타일 (유저가 선택)
export type ArtStyleType = 'watercolor' | 'animation3d' | 'crayon' | 'paperart';

// 동화책 각 장의 데이터 구조
export interface ChapterData {
  chapterNumber: number;
  text: string;
  imageUrl: string;
  choices: string[]; // 선택지 3개
}
