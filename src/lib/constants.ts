// 상수 오브젝트
import { ThemeType } from '@/types/story';
import { ArtStyleType } from '@/types/story';

// 배경 테마별 추천 캐릭터
export const RECOMMENDED_CHARACTERS: Record<ThemeType, string[]> = {
  ocean: [
    '인어공주',
    '왕자',
    '해적',
    '돌고래',
    '상어',
    '고래',
    '바다거북',
    '해파리',
    '어부',
  ],
  castle: [
    '공주',
    '왕자',
    '왕',
    '왕비',
    '고양이',
    '기사',
    '마법사',
    '난쟁이',
    '요리사',
  ],
  forest: [
    '부엉이',
    '도깨비',
    '나무꾼',
    '여우',
    '곰',
    '요정',
    '아이',
    '토끼',
    '새',
  ],
  village: [
    '소녀',
    '소년',
    '엄마',
    '아빠',
    '강아지',
    '할아버지',
    '할머니',
    '다람쥐',
    '농부',
  ],
  space: [
    '별',
    '우주인',
    '우주괴물',
    '외계인',
    '달토끼',
    '별의 요정',
    '행성',
    '시간여행자',
    '탐험가',
  ],
  desert: [
    '카멜레온',
    '사막여우',
    '미어캣',
    '탐험가',
    '낙타',
    '독수리',
    '상인',
    '스핑크스',
    '코브라',
  ],
};

// 장소 렌더링용 한글 영어 매핑
export const THEME_NAMES: Record<ThemeType, string> = {
  ocean: '바다',
  castle: '궁전',
  forest: '숲',
  village: '마을',
  space: '우주',
  desert: '사막',
};

// 테마 목록
export const BACKGROUND_THEMES: {
  id: ThemeType;
  label: string;
  localImg: string;
}[] = [
  { id: 'ocean', label: '바다', localImg: '/images/select-bg/bg-ocean.png' },
  { id: 'castle', label: '궁전', localImg: '/images/select-bg/bg-castle.png' },
  { id: 'forest', label: '숲', localImg: '/images/select-bg/bg-forest.png' },
  {
    id: 'village',
    label: '마을',
    localImg: '/images/select-bg/bg-village.png',
  },
  { id: 'space', label: '우주', localImg: '/images/select-bg/bg-space.png' },
  { id: 'desert', label: '사막', localImg: '/images/select-bg/bg-desert.png' },
];

// 바다 캐릭터
export const OCEAN_CHARACTER_LIST = [
  {
    id: '인어공주',
    label: '인어공주',
    localImg: '/images/select-char/char-mermaid.png',
  },
  {
    id: '왕자',
    label: '왕자',
    localImg: '/images/select-char/char-prince.png',
  },
  {
    id: '해적',
    label: '해적',
    localImg: '/images/select-char/char-pirate.png',
  },
  {
    id: '돌고래',
    label: '돌고래',
    localImg: '/images/select-char/char-dolphin.png',
  },
  { id: '상어', label: '상어', localImg: '/images/select-char/char-shark.png' },
  { id: '고래', label: '고래', localImg: '/images/select-char/char-whale.png' },
  {
    id: '바다거북',
    label: '바다거북',
    localImg: '/images/select-char/char-turtle.png',
  },
  {
    id: '해파리',
    label: '해파리',
    localImg: '/images/select-char/char-jellyfish.png',
  },
  {
    id: '어부',
    label: '어부',
    localImg: '/images/select-char/char-fisherman.png',
  },
];

// 그림 스타일 데이터 목록
export const ART_STYLES: {
  id: ArtStyleType;
  label: string;
  localImg: string;
  prompt: string;
}[] = [
  {
    id: 'watercolor',
    label: '수채화',
    localImg: '/images/select-style/style-watercolor.png',
    prompt:
      'Soft pastel watercolor storybook illustration, fantasy, magical, detailed blending',
  },
  {
    id: 'animation3d',
    label: '애니메이션', // 3d 애니메이션
    localImg: '/images/select-style/style-animation.png',
    prompt:
      'Cute 3D clay animation style, pixar style, vibrant colors, soft lighting, smooth textures',
  },
  {
    id: 'crayon', // 손그림
    label: '손그림',
    localImg: '/images/select-style/style-crayon.png',
    prompt:
      'Children drawing style, crayon and oil pastel texture, textured paper, colorful, cozy hand-drawn look',
  },
  {
    id: 'paperart',
    label: '페이퍼아트',
    localImg: '/images/select-style/style-paperart.png',
    prompt:
      'Detailed 3D paper cut craft style, layered paper art, depth of field, paper textures, whimsical shadow',
  },
];

// 캐릭터 한글명 -> 영어 프롬프트 변환용 딕셔너리 (바다 테마)
export const CHARACTER_ENGLISH_NAMES: Record<string, string> = {
  인어공주: 'a cute little mermaid princess with shiny scales',
  왕자: 'a handsome little ocean prince',
  해적: 'a friendly cartoon pirate with a smile',
  돌고래: 'a happy playful dolphin',
  상어: 'a cute little baby shark',
  고래: 'a giant gentle blue whale',
  바다거북: 'a friendly little sea turtle',
  해파리: 'a glowing colorful jellyfish',
  어부: 'a kind old fisherman with a fishing rod',
};
