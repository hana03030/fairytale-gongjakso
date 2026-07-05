// 상수 오브젝트
import { ThemeType } from '@/types/story';

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
